// Property bounded context — shared types

export type PropertyStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

export interface PropertyContent {
  title: string;
  description: string;
}

export interface PropertyPhoto {
  id: string;
  url: string;
  alt?: string;
  isCover: boolean;
  position: number;
}

export interface PropertyAmenity {
  key: string;
  label: string;
}

export interface PropertyPricing {
  basePricePerNight: number;
  cleaningFee: number;
  touristTax: number;
}

export interface PropertyCapacity {
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  surface?: number;
}

export interface PropertyLocation {
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface Property {
  id: string;
  slug: string;
  ownerId: string;
  status: PropertyStatus;
  content: {
    fr: PropertyContent;
    en: PropertyContent;
  };
  location: PropertyLocation;
  capacity: PropertyCapacity;
  pricing: PropertyPricing;
  photos: PropertyPhoto[];
  amenities: PropertyAmenity[];
  beds24PropertyId?: string;
  createdAt: string;
  updatedAt: string;
}

// Calendar day for the availability widget
export interface CalendarDay {
  date: string; // YYYY-MM-DD
  available: boolean;
  price?: number; // Dynamic price from PriceLabs via Beds24
  minStay?: number; // Minimum stay in nights
  bookingId?: string; // If occupied, booking reference
}

export interface PropertyCalendar {
  propertyId: string;
  month: string; // YYYY-MM
  days: CalendarDay[];
  lastSyncedAt: string;
}

// Monthly revenue for owner dashboard
export interface PropertyMonthlyRevenue {
  month: string; // YYYY-MM
  reservedNights: number;
  grossRevenue: number;
  welqoCommission: number;
  cleaningFees: number;
  netRevenue: number;
}

// Search & Filtering
export interface BookingQuote {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nightsCount: number;
  priceBreakdown: {
    nightlyRate: number;
    totalNights: number;
    cleaningFee: number;
    touristTax: number;
    totalGross: number;
  };
  securityDeposit: number;
}


export interface PropertySearchFilters {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string;
}

export interface PropertySummary {
  id: string;
  slug: string;
  title: string;
  location: {
    city: string;
    address: string;
    latitude?: number;
    longitude?: number;
  };
  capacity: {
    maxGuests: number;
    bedrooms: number;
  };
  price: {
    base: number;
    cleaning: number;
  };
  coverPhoto: string;
  rating: number;
  reviewsCount: number;
}
