import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getOverview(ownerId: string) {
    const properties = await this.prisma.property.findMany({
      where: { ownerId },
      select: { id: true },
    });

    const propertyIds = properties.map((p: any) => p.id);

    if (propertyIds.length === 0) {
      return {
        totalRevenue: 0,
        occupancyRate: 0,
        adr: 0,
        upcomingBookingsCount: 0,
      };
    }

    // 1. Total Revenue (all time confirmed)
    const totalRevenueResult = await this.prisma.booking.aggregate({
      where: {
        propertyId: { in: propertyIds },
        status: "CONFIRMED",
      },
      _sum: {
        totalAmountGross: true,
      },
    });

    // 2. Occupancy & ADR (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentBookings = await this.prisma.booking.findMany({
      where: {
        propertyId: { in: propertyIds },
        status: "CONFIRMED",
        checkIn: { gte: thirtyDaysAgo },
      },
    });

    const bookedNights = recentBookings.reduce(
      (acc: number, b: any) => acc + b.nightsCount,
      0,
    );
    const recentRevenue = recentBookings.reduce(
      (acc: number, b: any) => acc + b.totalAmountGross,
      0,
    );

    const occupancyRate = (bookedNights / (30 * propertyIds.length)) * 100;
    const adr = bookedNights > 0 ? recentRevenue / bookedNights : 0;

    // 3. Upcoming Bookings
    const upcomingBookings = await this.prisma.booking.findMany({
      where: {
        propertyId: { in: propertyIds },
        status: "CONFIRMED",
        checkIn: { gte: new Date() },
      },
      take: 5,
      orderBy: { checkIn: "asc" },
      include: { property: { select: { titleFr: true, titleEn: true } } },
    });

    // 4. Local Events (Hauts-de-France Smart Pricing)
    const cities = await this.prisma.property.findMany({
      where: { id: { in: propertyIds } },
      select: { city: true },
      distinct: ['city'],
    }).then(res => res.map(r => r.city));

    const upcomingEvents = await this.prisma.localEvent.findMany({
      where: {
        city: { in: cities },
        endDate: { gte: new Date() },
      },
      take: 2,
      orderBy: { startDate: 'asc' },
    });

    return {
      totalRevenue: totalRevenueResult._sum.totalAmountGross || 0,
      occupancyRate: Math.round(occupancyRate * 10) / 10,
      adr: Math.round(adr),
      upcomingBookings,
      upcomingEvents,
    };
  }

  async getBookingsHistory(ownerId: string) {
    const properties = await this.prisma.property.findMany({
      where: { ownerId },
      select: { id: true },
    });

    const propertyIds = properties.map((p: any) => p.id);
    if (propertyIds.length === 0) return [];

    return this.prisma.booking.findMany({
      where: {
        propertyId: { in: propertyIds },
        status: { in: ["CONFIRMED", "COMPLETED", "CANCELLED"] },
      },
      select: {
        id: true,
        status: true,
        guestFirstName: true,
        guestLastName: true,
        guestEmail: true,
        checkIn: true,
        checkOut: true,
        nightsCount: true,
        totalAmountGross: true,
        totalAmountNet: true,
        welqoCommission: true,
        confirmedAt: true,
        property: { select: { titleFr: true } },
        payment: {
          select: { status: true, paidAt: true, stripePaymentIntentId: true },
        },
      },
      orderBy: { confirmedAt: "desc" },
    });
  }

  async getCalendarEvents(ownerId: string) {
    const properties = await this.prisma.property.findMany({
      where: { ownerId },
      select: { id: true },
    });

    const propertyIds = properties.map((p: any) => p.id);

    return this.prisma.booking.findMany({
      where: {
        propertyId: { in: propertyIds },
        status: "CONFIRMED",
      },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        guestFirstName: true,
        guestLastName: true,
        property: { select: { titleFr: true } },
      },
    });
  }
}
