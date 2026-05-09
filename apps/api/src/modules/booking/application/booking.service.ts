import { Injectable, Logger, BadRequestException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { EmailService } from "../../email/email.service";
import { StripeClient } from "@welqo/stripe-client";
import { Beds24Client } from "@welqo/beds24-client";
import { CreateCheckoutDto } from "../application/dto/create-checkout.dto";

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  private stripeClient: StripeClient;
  private beds24Client: Beds24Client;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {
    this.stripeClient = new StripeClient(
      this.configService.get<string>("STRIPE_SECRET_KEY") || "",
    );
    this.beds24Client = new Beds24Client(
      this.configService.get<string>("BEDS24_API_KEY") || "",
    );
  }

  async createCheckoutSession(dto: CreateCheckoutDto) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new BadRequestException("Logement introuvable");
    }

    const booking = await this.prisma.booking.create({
      data: {
        propertyId: dto.propertyId,
        guestFirstName: dto.guestFirstName,
        guestLastName: dto.guestLastName,
        guestEmail: dto.guestEmail,
        guestPhone: dto.guestPhone,
        guestCount: dto.guestCount,
        checkIn: new Date(dto.checkIn),
        checkOut: new Date(dto.checkOut),
        nightsCount: dto.nightsCount,
        nightlyRate: property.basePricePerNight,
        cleaningFee: property.cleaningFee,
        touristTax: property.touristTax,
        totalAmountGross:
          property.basePricePerNight * dto.nightsCount +
          property.cleaningFee +
          property.touristTax * dto.nightsCount,
        welqoCommission: property.basePricePerNight * dto.nightsCount * 0.2,
        totalAmountNet:
          property.basePricePerNight * dto.nightsCount * 0.8 +
          property.cleaningFee +
          property.touristTax * dto.nightsCount,
        status: "PENDING",
      },
    });

    const session = await this.stripeClient.createCheckoutSession({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Séjour à ${property.titleFr}`,
              description: `Du ${dto.checkIn} au ${dto.checkOut} (${dto.nightsCount} nuits)`,
            },
            unit_amount: Math.round(booking.totalAmountGross * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${this.configService.get("FRONTEND_URL")}/reservation/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get("FRONTEND_URL")}/logements/${property.slug}`,
      customer_email: dto.guestEmail,
      metadata: {
        bookingId: booking.id,
        propertyId: property.id,
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 min
    });

    await this.prisma.booking.update({
      where: { id: booking.id },
      data: { stripeSessionId: session.id },
    });

    return { url: session.url };
  }

  async cancelByToken(cancellationToken: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { cancellationToken },
    });

    if (!booking) {
      throw new NotFoundException("Réservation introuvable ou lien invalide");
    }
    if (booking.status === "CANCELLED") {
      throw new BadRequestException("Cette réservation est déjà annulée");
    }
    if (booking.status !== "CONFIRMED") {
      throw new BadRequestException("Cette réservation ne peut pas être annulée");
    }

    await this.prisma.booking.update({
      where: { id: booking.id },
      data: { status: "CANCELLED", cancelledAt: new Date() },
    });

    this.logger.log(`Booking ${booking.id} cancelled via token`);
    return { success: true };
  }

  async handleStripeWebhook(payload: any, signature: string) {
    const webhookSecret =
      this.configService.get<string>("STRIPE_WEBHOOK_SECRET") || "";
    let event: any;

    try {
      event = await this.stripeClient.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } catch (err: any) {
      this.logger.error(
        `Webhook signature verification failed: ${err.message}`,
      );
      throw new BadRequestException("Invalid signature");
    }

    switch (event.type) {
      case "checkout.session.completed":
        await this.processSuccessfulPayment(event.data.object);
        break;
      case "checkout.session.expired":
        await this.cancelExpiredSession(event.data.object);
        break;
      case "charge.refunded":
        await this.processRefund(event.data.object);
        break;
      default:
        this.logger.debug(`Unhandled Stripe event: ${event.type}`);
    }

    return { received: true };
  }

  private async processSuccessfulPayment(session: any) {
    const bookingId = session.metadata?.bookingId;
    if (!bookingId) return;

    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: true },
    });

    if (!booking || booking.status === "CONFIRMED") {
      return;
    }

    await this.prisma.$transaction([
      this.prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED", confirmedAt: new Date() },
      }),
      this.prisma.payment.create({
        data: {
          bookingId: booking.id,
          status: "SUCCEEDED",
          stripePaymentIntentId: session.payment_intent as string,
          amountPaid: booking.totalAmountGross,
          idempotencyKey: session.id,
          paidAt: new Date(),
        },
      }),
    ]);

    // Send confirmation email (non-blocking)
    this.emailService
      .sendBookingConfirmation({
        to: booking.guestEmail,
        guestFirstName: booking.guestFirstName,
        guestLastName: booking.guestLastName,
        bookingId: booking.id,
        propertyNameFr: booking.property.titleFr,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        nightsCount: booking.nightsCount,
        totalAmount: booking.totalAmountGross,
        cancellationToken: booking.cancellationToken ?? null,
      })
      .catch((err) =>
        this.logger.error(`Email confirmation failed for booking ${bookingId}: ${err.message}`),
      );

    // Sync to Beds24 (reconciliation job handles retries on failure)
    if (booking.property.beds24PropertyId) {
      try {
        const beds24Response = await this.beds24Client.createBooking({
          arrival: booking.checkIn.toISOString().split("T")[0],
          departure: booking.checkOut.toISOString().split("T")[0],
          propertyId: parseInt(booking.property.beds24PropertyId),
          roomId: 0,
          firstName: booking.guestFirstName,
          lastName: booking.guestLastName,
          email: booking.guestEmail,
          numAdult: booking.guestCount,
          apiSource: "Welqo Direct",
        });

        const beds24Id = String(
          beds24Response?.bookId ?? beds24Response?.id ?? "",
        );
        if (beds24Id) {
          await this.prisma.booking.update({
            where: { id: bookingId },
            data: { beds24BookingId: beds24Id },
          });
        }
        this.logger.log(`Booking ${bookingId} synced to Beds24`);
      } catch (err: any) {
        this.logger.error(
          `Beds24 sync failed for booking ${bookingId}: ${err.message} — reconciliation job will retry`,
        );
      }
    }
  }

  private async cancelExpiredSession(session: any) {
    const bookingId = session.metadata?.bookingId;
    if (!bookingId) return;

    const updated = await this.prisma.booking.updateMany({
      where: { id: bookingId, status: "PENDING" },
      data: { status: "CANCELLED", cancelledAt: new Date() },
    });

    if (updated.count > 0) {
      this.logger.log(
        `Booking ${bookingId} cancelled — Stripe session expired`,
      );
    }
  }

  private async processRefund(charge: any) {
    const paymentIntentId = charge.payment_intent;
    if (!paymentIntentId) return;

    const payment = await this.prisma.payment.findUnique({
      where: { stripePaymentIntentId: paymentIntentId },
    });

    if (!payment) {
      this.logger.warn(
        `No payment found for payment_intent: ${paymentIntentId}`,
      );
      return;
    }

    const amountRefunded = charge.amount_refunded / 100;
    const isFullRefund = charge.amount_refunded >= charge.amount;
    const latestRefundId = charge.refunds?.data?.[0]?.id ?? null;

    await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: isFullRefund ? "REFUNDED" : "PARTIALLY_REFUNDED",
          stripeRefundId: latestRefundId,
          amountRefunded,
          refundedAt: new Date(),
        },
      }),
      ...(isFullRefund
        ? [
            this.prisma.booking.update({
              where: { id: payment.bookingId },
              data: { status: "CANCELLED", cancelledAt: new Date() },
            }),
          ]
        : []),
    ]);

    this.logger.log(
      `Refund processed for booking ${payment.bookingId} — ${isFullRefund ? "full" : "partial"} (${amountRefunded} €)`,
    );
  }
}
