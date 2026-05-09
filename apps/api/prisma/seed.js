"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting seeding...');
    // 1. Clean database
    await prisma.payment.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.propertyAmenity.deleteMany();
    await prisma.propertyPhoto.deleteMany();
    await prisma.property.deleteMany();
    await prisma.owner.deleteMany();
    console.log('🧹 Database cleaned.');
    // 2. Create Owners
    const passwordHash = await bcrypt.hash('password123', 10);
    const ownerMarc = await prisma.owner.create({
        data: {
            email: 'marc@welqo.fr',
            passwordHash,
            firstName: 'Marc',
            lastName: 'Dupont',
            phone: '+33 6 12 34 56 78',
            role: client_1.OwnerRole.OWNER,
        },
    });
    await prisma.owner.create({
        data: {
            email: 'admin@welqo.fr',
            passwordHash,
            firstName: 'Kevin',
            lastName: 'Tsague',
            role: client_1.OwnerRole.ADMIN,
        },
    });
    console.log('👤 Owners created.');
    // 3. Create Properties
    const prop1 = await prisma.property.create({
        data: {
            ownerId: ownerMarc.id,
            slug: 'appartement-bordelais',
            status: client_1.PropertyStatus.ACTIVE,
            titleFr: "L'Appartement Bordelais",
            titleEn: 'The Bordeaux Apartment',
            descFr: 'Un superbe appartement en plein centre-ville.',
            descEn: 'A superb apartment in the heart of the city.',
            address: '10 Rue de la Paix',
            city: 'Lille',
            maxGuests: 4,
            bedrooms: 2,
            bathrooms: 1,
            basePricePerNight: 120,
            cleaningFee: 40,
            touristTax: 1.5,
            beds24PropertyId: '123456',
        },
    });
    const prop2 = await prisma.property.create({
        data: {
            ownerId: ownerMarc.id,
            slug: 'loft-industriel',
            status: client_1.PropertyStatus.ACTIVE,
            titleFr: 'Le Loft Industriel',
            titleEn: 'The Industrial Loft',
            descFr: 'Design moderne et espace ouvert.',
            descEn: 'Modern design and open space.',
            address: '25 Avenue Foch',
            city: 'Lille',
            maxGuests: 2,
            bedrooms: 1,
            bathrooms: 1,
            basePricePerNight: 95,
            cleaningFee: 30,
            touristTax: 1.2,
            beds24PropertyId: '789012',
        },
    });
    console.log('🏠 Properties created.');
    // 4. Create Amenities
    await prisma.propertyAmenity.createMany({
        data: [
            { propertyId: prop1.id, key: 'wifi', labelFr: 'WiFi Haute Vitesse', labelEn: 'High Speed WiFi' },
            { propertyId: prop1.id, key: 'kitchen', labelFr: 'Cuisine Équipée', labelEn: 'Full Kitchen' },
            { propertyId: prop2.id, key: 'wifi', labelFr: 'WiFi', labelEn: 'WiFi' },
            { propertyId: prop2.id, key: 'tv', labelFr: 'Smart TV', labelEn: 'Smart TV' },
        ],
    });
    // 5. Create Photos
    await prisma.propertyPhoto.createMany({
        data: [
            { propertyId: prop1.id, url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', isCover: true, position: 0 },
            { propertyId: prop2.id, url: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8', isCover: true, position: 0 },
        ],
    });
    console.log('✨ Amenities and Photos created.');
    // 6. Create Bookings & Payments
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 5);
    const checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + 10);
    const booking = await prisma.booking.create({
        data: {
            propertyId: prop1.id,
            status: client_1.BookingStatus.CONFIRMED,
            guestFirstName: 'Jean',
            guestLastName: 'Reno',
            guestEmail: 'jean@example.com',
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
            status: client_1.PaymentStatus.SUCCEEDED,
            amountPaid: 647.5,
            currency: 'EUR',
            idempotencyKey: 'seed_payment_1',
            paidAt: new Date(),
        },
    });
    console.log('📅 Bookings and Payments created.');
    console.log('✅ Seeding completed!');
}
main()
    .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map