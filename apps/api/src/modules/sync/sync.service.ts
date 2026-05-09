import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../common/prisma/prisma.service";
import { Beds24Client } from "@welqo/beds24-client";

const RECONCILIATION_BATCH_SIZE = 50;

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);
  private beds24Client: Beds24Client;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.beds24Client = new Beds24Client(
      this.configService.get<string>("BEDS24_API_KEY") || "",
    );
  }

  // Runs every 10 minutes: reconcile CONFIRMED bookings not yet synced to Beds24
  @Cron("0 */10 * * * *")
  async reconcileBookings(): Promise<void> {
    const bookings = await this.prisma.booking.findMany({
      where: { status: "CONFIRMED", beds24BookingId: null },
      include: { property: true },
      take: RECONCILIATION_BATCH_SIZE,
    });

    if (bookings.length === 0) {
      this.logger.debug("Reconciliation: nothing to sync");
      return;
    }

    this.logger.log(`Reconciliation: ${bookings.length} booking(s) to sync`);

    for (const booking of bookings) {
      await this.syncBookingToBeds24(booking);
    }
  }

  private async syncBookingToBeds24(booking: any): Promise<void> {
    const syncJob = await this.prisma.syncJob.create({
      data: {
        propertyId: booking.propertyId,
        status: "PENDING",
        trigger: "cron",
      },
    });

    try {
      if (!booking.property.beds24PropertyId) {
        throw new Error("Property has no Beds24 ID configured");
      }

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

      await this.prisma.$transaction([
        this.prisma.booking.update({
          where: { id: booking.id },
          data: { beds24BookingId: beds24Id || `synced-${booking.id}` },
        }),
        this.prisma.syncJob.update({
          where: { id: syncJob.id },
          data: { status: "OK", syncedAt: new Date() },
        }),
      ]);

      this.logger.log(`Booking ${booking.id} reconciled → Beds24`);
    } catch (err: any) {
      await this.prisma.syncJob.update({
        where: { id: syncJob.id },
        data: { status: "FAILED", errorMessage: err.message },
      });
      this.logger.error(
        `Reconciliation failed for booking ${booking.id}: ${err.message}`,
      );
    }
  }
}
