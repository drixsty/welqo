import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { PropertySearchFilters, PropertySummary } from "@welqo/types";

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    filters: PropertySearchFilters,
  ): Promise<{ properties: PropertySummary[]; distribution: number[] }> {
    const { city, guests, minPrice, maxPrice, amenities } = filters;

    let amenityList: string[] = [];
    if (amenities) {
      amenityList = Array.isArray(amenities)
        ? amenities
        : String(amenities).split(",");
    }

    // 1. Fetch properties with ALL filters
    const properties = await this.prisma.property.findMany({
      where: {
        status: "ACTIVE",
        ...(city && { city: { contains: city, mode: "insensitive" } }),
        ...(guests && { maxGuests: { gte: Number(guests) } }),
        ...(minPrice && { basePricePerNight: { gte: Number(minPrice) } }),
        ...(maxPrice && { basePricePerNight: { lte: Number(maxPrice) } }),
        ...(amenityList.length > 0 && {
          amenities: {
            some: {
              key: { in: amenityList },
            },
          },
        }),
      },
      include: {
        photos: {
          where: { isCover: true },
          take: 1,
        },
      },
    });

    // 2. Fetch price distribution (filtered by everything EXCEPT price)
    const distributionProps = await this.prisma.property.findMany({
      where: {
        status: "ACTIVE",
        ...(city && { city: { contains: city, mode: "insensitive" } }),
        ...(guests && { maxGuests: { gte: Number(guests) } }),
        ...(amenityList.length > 0 && {
          amenities: {
            some: {
              key: { in: amenityList },
            },
          },
        }),
      },
      select: { basePricePerNight: true },
    });

    // Calculate histogram (12 buckets from 0 to 500)
    const distribution = new Array(12).fill(0);
    const BUCKET_SIZE = 500 / 12;

    distributionProps.forEach((p) => {
      const bucketIndex = Math.min(
        Math.floor(p.basePricePerNight / BUCKET_SIZE),
        11,
      );
      distribution[bucketIndex]++;
    });

    // Normalize distribution to 0-100 for visual bars
    const maxCount = Math.max(...distribution, 1);
    const normalizedDistribution = distribution.map((count) =>
      Math.round((count / maxCount) * 100),
    );

    return {
      properties: properties.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.titleFr,
        location: {
          city: p.city,
          address: p.address,
          latitude: p.latitude || undefined,
          longitude: p.longitude || undefined,
        },
        capacity: {
          maxGuests: p.maxGuests,
          bedrooms: p.bedrooms,
        },
        price: {
          base: p.basePricePerNight,
          cleaning: p.cleaningFee,
        },
        coverPhoto: p.photos[0]?.url || "",
        rating: 4.8,
        reviewsCount: 12,
      })),
      distribution: normalizedDistribution,
    };
  }

  async findBySlug(slug: string): Promise<any> {
    const p = await this.prisma.property.findUnique({
      where: { slug },
      include: {
        photos: true,
        amenities: true,
      },
    });

    if (!p) return null;

    return {
      ...p,
      content: {
        fr: { title: p.titleFr, description: p.descFr },
        en: { title: p.titleEn, description: p.descEn },
      },
      location: {
        address: p.address,
        city: p.city,
        latitude: p.latitude,
        longitude: p.longitude,
      },
      capacity: {
        maxGuests: p.maxGuests,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        surface: p.surface,
      },
      pricing: {
        basePricePerNight: p.basePricePerNight,
        cleaningFee: p.cleaningFee,
        touristTax: p.touristTax,
      },
      amenities: p.amenities.map((a) => ({
        key: a.key,
        label: a.labelFr, // Default to French for now or handle via locale if passed
      })),
    };
  }
}
