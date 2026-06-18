import { Injectable, Inject, Logger } from "@nestjs/common";
import { IBookingRepository } from "../domain/IBookingRepository";
import { EmailService } from "../../email/email.service";
import { ChatAutomationService } from "../../chat-automation/chat-automation.service";
import { Beds24Client } from "@welqo/beds24-client";
import { BOOKING_REPOSITORY } from "../booking.tokens";

@Injectable()
export class ConfirmBookingUseCase {
  private readonly logger = new Logger(ConfirmBookingUseCase.name);

  constructor(
    @Inject(BOOKING_REPOSITORY) private readonly bookingRepo: IBookingRepository,
    private readonly emailService: EmailService,
    private readonly automationService: ChatAutomationService,
    private readonly beds24Client: Beds24Client,
  ) {}

  async execute(stripeSession: {
    metadata?: { bookingId?: string };
    payment_intent?: string;
    id: string;
  }): Promise<void> {
    const bookingId = stripeSession.metadata?.bookingId;
    if (!bookingId) return;

    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking || booking.status === "CONFIRMED") return;

    await this.bookingRepo.confirmWithPayment(booking, {
      stripePaymentIntentId: stripeSession.payment_intent as string,
      idempotencyKey: stripeSession.id,
    });

    // Non-blocking side-effects
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
        cancellationToken: booking.cancellationToken,
      })
      .catch((err) =>
        this.logger.error(
          `Email confirmation failed for booking ${bookingId}: ${err.message}`,
        ),
      );

    this.automationService
      .scheduleAutomationForBooking(bookingId)
      .catch((err) =>
        this.logger.error(
          `Automation scheduling failed for booking ${bookingId}: ${err.message}`,
        ),
      );

    this.syncToBeds24(booking).catch((err) =>
      this.logger.error(
        `Beds24 sync failed for booking ${bookingId}: ${err.message} — reconciliation will retry`,
      ),
    );
  }

  private async syncToBeds24(booking: {
    id: string;
    property: { beds24PropertyId: string | null };
    checkIn: Date;
    checkOut: Date;
    guestFirstName: string;
    guestLastName: string;
    guestEmail: string;
    guestCount: number;
  }): Promise<void> {
    if (!booking.property.beds24PropertyId) return;

    const response = await this.beds24Client.createBooking({
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

    const beds24Id = String(response?.bookId ?? response?.id ?? "");
    if (beds24Id) {
      await this.bookingRepo.updateStatus(booking.id, "CONFIRMED", {
        beds24BookingId: beds24Id,
      });
      this.logger.log(`Booking ${booking.id} synced to Beds24`);
    }
  }
}
