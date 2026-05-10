import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PricingService {
  private readonly logger = new Logger(PricingService.name);

  constructor(private prisma: PrismaService) {}

  async calculateSmartPrice(propertyId: string, date: Date, basePrice: number): Promise<number> {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
      select: { city: true },
    });

    if (!property) return basePrice;

    // Check for events in this city on this date
    const event = await this.prisma.localEvent.findFirst({
      where: {
        city: property.city,
        startDate: { lte: date },
        endDate: { gte: date },
      },
    });

    if (event) {
      this.logger.debug(`Applying multiplier ${event.multiplier} for event "${event.name}" in ${property.city}`);
      return basePrice * event.multiplier;
    }

    return basePrice;
  }

  async seedDemoEvents() {
    const count = await this.prisma.localEvent.count();
    if (count > 0) return;

    await this.prisma.localEvent.createMany({
      data: [
        {
          name: 'Main Square Festival',
          city: 'Arras',
          startDate: new Date('2026-07-03T00:00:00Z'),
          endDate: new Date('2026-07-05T23:59:59Z'),
          multiplier: 1.5,
          description: 'Grand festival de musique sur la Grand-Place.',
        },
        {
          name: 'Match RC Lens vs Lille (Derby du Nord)',
          city: 'Lens',
          startDate: new Date('2026-09-12T00:00:00Z'),
          endDate: new Date('2026-09-12T23:59:59Z'),
          multiplier: 1.8,
          description: 'Forte demande hôtelière pour le Derby.',
        },
        {
          name: 'Exposition Louvre-Lens (Noël)',
          city: 'Lens',
          startDate: new Date('2026-12-20T00:00:00Z'),
          endDate: new Date('2026-12-31T23:59:59Z'),
          multiplier: 1.2,
          description: 'Période de fêtes et tourisme culturel.',
        },
      ],
    });
    this.logger.log('Demo events seeded successfully.');
  }
}
