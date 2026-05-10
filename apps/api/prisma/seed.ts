import {
  PrismaClient,
  OwnerRole,
  PropertyStatus,
  BookingStatus,
  PaymentStatus,
} from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // 1. Clean database
  await prisma.syncJob.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.propertyPhoto.deleteMany();
  await prisma.property.deleteMany();
  await prisma.owner.deleteMany();

  console.log("🧹 Database cleaned.");

  // 2. Create Owners
  const passwordHash = await bcrypt.hash("password123", 10);

  const ownerMarc = await prisma.owner.create({
    data: {
      email: "marc@welqo.fr",
      passwordHash,
      firstName: "Marc",
      lastName: "Dupont",
      phone: "+33 6 12 34 56 78",
      role: OwnerRole.OWNER,
    },
  });

  await prisma.owner.create({
    data: {
      email: "admin@welqo.fr",
      passwordHash,
      firstName: "Kevin",
      lastName: "Tsague",
      role: OwnerRole.ADMIN,
    },
  });

  console.log("👤 Owners created.");

  // 3. Create Properties
  const prop1 = await prisma.property.create({
    data: {
      ownerId: ownerMarc.id,
      slug: "cocon-lillois",
      status: PropertyStatus.ACTIVE,
      titleFr: "Le Cocon Lillois",
      titleEn: "The Lille Cocoon",
      descFr: "Un superbe appartement en plein centre-ville de Lille.",
      descEn: "A superb apartment in the heart of Lille.",
      address: "10 Rue de la Paix",
      city: "Lille",
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      basePricePerNight: 120,
      cleaningFee: 40,
      touristTax: 1.5,
      beds24PropertyId: "123456",
      latitude: 50.63297,
      longitude: 3.05858,
    },
  });

  const prop2 = await prisma.property.create({
    data: {
      ownerId: ownerMarc.id,
      slug: "loft-industriel",
      status: PropertyStatus.ACTIVE,
      titleFr: "Le Loft Industriel",
      titleEn: "The Industrial Loft",
      descFr: "Design moderne et espace ouvert à Lille.",
      descEn: "Modern design and open space in Lille.",
      address: "25 Avenue Foch",
      city: "Lille",
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      basePricePerNight: 95,
      cleaningFee: 30,
      touristTax: 1.2,
      beds24PropertyId: "789012",
      latitude: 50.63717,
      longitude: 3.06348,
    },
  });

  const prop3 = await prisma.property.create({
    data: {
      ownerId: ownerMarc.id,
      slug: "suite-art-deco-lens",
      status: PropertyStatus.ACTIVE,
      titleFr: "Suite Art Déco - Lens",
      titleEn: "Art Deco Suite - Lens",
      descFr: "Proche du Louvre-Lens, une suite élégante.",
      descEn: "Near Louvre-Lens, an elegant suite.",
      address: "5 Rue de la Gare",
      city: "Lens",
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      basePricePerNight: 110,
      cleaningFee: 35,
      touristTax: 1.1,
      beds24PropertyId: "345678",
      latitude: 50.4333,
      longitude: 2.8333,
    },
  });

  console.log("🏠 Properties created.");

  // 4. Create Amenities
  await prisma.propertyAmenity.createMany({
    data: [
      {
        propertyId: prop1.id,
        key: "wifi",
        labelFr: "WiFi Haute Vitesse",
        labelEn: "High Speed WiFi",
      },
      {
        propertyId: prop1.id,
        key: "kitchen",
        labelFr: "Cuisine Équipée",
        labelEn: "Full Kitchen",
      },
      { propertyId: prop2.id, key: "wifi", labelFr: "WiFi", labelEn: "WiFi" },
      {
        propertyId: prop2.id,
        key: "tv",
        labelFr: "Smart TV",
        labelEn: "Smart TV",
      },
    ],
  });

  // 5. Create Photos
  await prisma.propertyPhoto.createMany({
    data: [
      {
        propertyId: prop1.id,
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
        isCover: true,
        position: 0,
      },
      {
        propertyId: prop2.id,
        url: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8",
        isCover: true,
        position: 0,
      },
    ],
  });

  console.log("✨ Amenities and Photos created.");

  // 6. Create Bookings & Payments
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 5);
  const checkOut = new Date();
  checkOut.setDate(checkOut.getDate() + 10);

  const booking = await prisma.booking.create({
    data: {
      propertyId: prop1.id,
      status: BookingStatus.CONFIRMED,
      guestFirstName: "Jean",
      guestLastName: "Reno",
      guestEmail: "jean@example.com",
      guestCount: 2,
      checkIn,
      checkOut,
      nightsCount: 5,
      nightlyRate: 120,
      cleaningFee: 40,
      touristTax: 1.5 * 5,
      totalAmountGross: 647.5,
      welqoCommission: 129.5,
      totalAmountNet: 518,
      confirmedAt: new Date(),
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      status: PaymentStatus.SUCCEEDED,
      amountPaid: 647.5,
      currency: "EUR",
      idempotencyKey: "seed_payment_1",
      paidAt: new Date(),
    },
  });

  console.log("📅 Bookings and Payments created.");
  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
