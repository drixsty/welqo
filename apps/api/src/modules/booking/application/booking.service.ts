import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { StripeClient } from "@welqo/stripe-client";
import { CreateBookingDto } from "@welqo/types";
import { IBookingRepository } from "../domain/IBookingRepository";
import { BookingPricingService } from "../domain/BookingPricingService";
import { ConfirmBookingUseCase } from "./ConfirmBookingUseCase";
import { BOOKING_REPOSITORY } from "../booking.tokens";

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  private readonly stripeClient: StripeClient;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    @Inject(BOOKING_REPOSITORY) private readonly bookingRepo: IBookingRepository,
    private readonly confirmBooking: ConfirmBookingUseCase,
  ) {
    this.stripeClient = new StripeClient(
      this.configService.get<string>("STRIPE_SECRET_KEY") || "",
    );
  }

  async isAvailable(
    propertyId: string,
    checkIn: Date,
    checkOut: Date,
  ): Promise<boolean> {
    const count = await this.bookingRepo.countOverlapping(
      propertyId,
      checkIn,
      checkOut,
    );
    return count === 0;
  }

  async calculateQuote(
    propertyId: string,
    checkIn: string,
    checkOut: string,
    guests: number,
  ) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const available = await this.isAvailable(propertyId, start, end);
    if (!available)
      throw new BadRequestException("Ces dates ne sont plus disponibles");

    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) throw new BadRequestException("Propriété introuvable");

    const nightsCount = BookingPricingService.nightsCount(start, end);
    if (nightsCount <= 0) throw new BadRequestException("Dates invalides");

    const quote = BookingPricingService.calculate(
      {
        basePricePerNight: property.basePricePerNight,
        cleaningFee: property.cleaningFee,
        touristTax: property.touristTax,
      },
      nightsCount,
      guests,
    );

    return {
      propertyId,
      checkIn,
      checkOut,
      guests,
      nightsCount: quote.nightsCount,
      priceBreakdown: {
        nightlyRate: quote.nightlyRate,
        totalNights: quote.totalNights,
        cleaningFee: quote.cleaningFee,
        touristTax: quote.touristTax,
        totalGross: quote.totalGross,
      },
      securityDeposit: (property as any).securityDeposit ?? 500,
    };
  }

  async createCheckoutSession(dto: CreateBookingDto & { nightsCount: number }) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });
    if (!property) throw new BadRequestException("Logement introuvable");

    const isAvailable = await this.isAvailable(
      dto.propertyId,
      new Date(dto.checkIn),
      new Date(dto.checkOut),
    );
    if (!isAvailable)
      throw new BadRequestException(
        "Désolé, ce logement a été réservé entre temps.",
      );

    const quote = await this.calculateQuote(
      dto.propertyId,
      dto.checkIn,
      dto.checkOut,
      dto.guestCount,
    );

    const booking = await this.bookingRepo.create({
      propertyId: dto.propertyId,
      guestFirstName: dto.guestFirstName,
      guestLastName: dto.guestLastName,
      guestEmail: dto.guestEmail,
      guestPhone: dto.guestPhone ?? null,
      guestCount: dto.guestCount,
      checkIn: new Date(dto.checkIn),
      checkOut: new Date(dto.checkOut),
      nightsCount: quote.nightsCount,
      nightlyRate: quote.priceBreakdown.nightlyRate,
      cleaningFee: quote.priceBreakdown.cleaningFee,
      touristTax: quote.priceBreakdown.touristTax,
      totalAmountGross: quote.priceBreakdown.totalGross,
      welqoCommission: quote.priceBreakdown.totalNights * 0.2,
      totalAmountNet:
        quote.priceBreakdown.totalNights * 0.8 +
        quote.priceBreakdown.cleaningFee +
        quote.priceBreakdown.touristTax,
      status: "PENDING",
      stripeSessionId: null,
      beds24BookingId: null,
      cancellationToken: null,
    });

    const session = await this.stripeClient.createCheckoutSession({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Séjour à ${property.titleFr}`,
              description: `Du ${dto.checkIn} au ${dto.checkOut} (${quote.nightsCount} nuits). Inclut l'empreinte de caution de ${quote.securityDeposit}€.`,
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
        securityDeposit: quote.securityDeposit.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    await this.bookingRepo.updateStatus(booking.id, "PENDING", {
      stripeSessionId: session.id,
    });

    return { url: session.url };
  }

  async getBookingBySessionId(sessionId: string) {
    return this.bookingRepo.findBySessionId(sessionId);
  }

  async cancelByToken(cancellationToken: string) {
    const booking =
      await this.bookingRepo.findByCancellationToken(cancellationToken);

    if (!booking)
      throw new NotFoundException("Réservation introuvable ou lien invalide");
    if (booking.status === "CANCELLED")
      throw new BadRequestException("Cette réservation est déjà annulée");
    if (booking.status !== "CONFIRMED")
      throw new BadRequestException(
        "Cette réservation ne peut pas être annulée",
      );

    await this.bookingRepo.updateStatus(booking.id, "CANCELLED", {
      cancelledAt: new Date(),
    });

    this.logger.log(`Booking ${booking.id} cancelled via token`);
    return { success: true };
  }

  async getCalendarBookings(startDate: string, endDate: string) {
    return this.bookingRepo.findCalendarBookings(
      new Date(startDate),
      new Date(endDate),
    );
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
        await this.confirmBooking.execute(event.data.object);
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

  private async cancelExpiredSession(session: any) {
    const bookingId = session.metadata?.bookingId;
    if (!bookingId) return;

    await this.prisma.booking.updateMany({
      where: { id: bookingId, status: "PENDING" },
      data: { status: "CANCELLED", cancelledAt: new Date() },
    });

    this.logger.log(`Booking ${bookingId} cancelled — Stripe session expired`);
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
