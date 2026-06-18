import { Injectable } from "@nestjs/common";
import { BookingStatus } from "@prisma/client";
import { PrismaService } from "../../../common/prisma/prisma.service";
import type {
  IBookingRepository,
  BookingRecord,
  BookingWithProperty,
  CalendarBooking,
} from "../domain/IBookingRepository";

@Injectable()
export class PrismaBookingRepository implements IBookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<BookingWithProperty | null> {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        property: {
          select: { id: true, titleFr: true, slug: true, beds24PropertyId: true },
        },
      },
    }) as Promise<BookingWithProperty | null>;
  }

  async findBySessionId(sessionId: string): Promise<BookingRecord | null> {
    return this.prisma.booking.findFirst({
      where: { stripeSessionId: sessionId },
    }) as Promise<BookingRecord | null>;
  }

  async findByCancellationToken(token: string): Promise<BookingRecord | null> {
    return this.prisma.booking.findUnique({
      where: { cancellationToken: token },
    }) as Promise<BookingRecord | null>;
  }

  async countOverlapping(
    propertyId: string,
    checkIn: Date,
    checkOut: Date,
  ): Promise<number> {
    return this.prisma.booking.count({
      where: {
        propertyId,
        status: { in: ["CONFIRMED", "PENDING", "EXTERNAL" as any] },
        AND: [{ checkIn: { lt: checkOut } }, { checkOut: { gt: checkIn } }],
      },
    });
  }

  async findCalendarBookings(
    startDate: Date,
    endDate: Date,
  ): Promise<CalendarBooking[]> {
    return this.prisma.booking.findMany({
      where: {
        status: { in: ["CONFIRMED", "PENDING"] },
        OR: [
          { checkIn: { gte: startDate, lte: endDate } },
          { checkOut: { gte: startDate, lte: endDate } },
          { AND: [{ checkIn: { lte: startDate } }, { checkOut: { gte: endDate } }] },
        ],
      },
      include: { property: { select: { id: true, titleFr: true, city: true } } },
      orderBy: { checkIn: "asc" },
    }) as Promise<CalendarBooking[]>;
  }

  async create(
    data: Omit<BookingRecord, "id" | "confirmedAt" | "cancelledAt">,
  ): Promise<BookingRecord> {
    return this.prisma.booking.create({
      data: { ...data, status: data.status as BookingStatus },
    }) as Promise<BookingRecord>;
  }

  async updateStatus(
    id: string,
    status: string,
    extra?: Partial<Pick<BookingRecord, "stripeSessionId" | "beds24BookingId" | "confirmedAt" | "cancelledAt">>,
  ): Promise<void> {
    await this.prisma.booking.update({
      where: { id },
      data: { status: status as BookingStatus, ...extra },
    });
  }

  async confirmWithPayment(
    booking: Pick<import("../domain/IBookingRepository").BookingRecord, "id" | "propertyId" | "guestEmail" | "totalAmountGross">,
    payment: {
      stripePaymentIntentId: string;
      idempotencyKey: string;
    },
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.booking.update({
        where: { id: booking.id },
        data: { status: "CONFIRMED", confirmedAt: new Date() },
      }),
      this.prisma.payment.create({
        data: {
          bookingId: booking.id,
          status: "SUCCEEDED",
          stripePaymentIntentId: payment.stripePaymentIntentId,
          amountPaid: booking.totalAmountGross,
          idempotencyKey: payment.idempotencyKey,
          paidAt: new Date(),
        },
      }),
      this.prisma.conversation.upsert({
        where: { bookingId: booking.id },
        update: {},
        create: {
          bookingId: booking.id,
          propertyId: booking.propertyId,
          guestEmail: booking.guestEmail,
        },
      }),
    ]);
  }
}
