// Booking bounded context — shared types

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export interface BookingGuest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  count: number;
}

export interface BookingFinancials {
  nightlyRate: number;
  cleaningFee: number;
  touristTax: number;
  totalAmountGross: number;
  welqoCommission: number; // 20% of gross
  totalAmountNet: number; // Owner receives
  currency: string;
}

export interface BookingDates {
  checkIn: string; // ISO 8601
  checkOut: string; // ISO 8601
  nightsCount: number;
}

export interface Booking {
  id: string;
  propertyId: string;
  status: BookingStatus;
  guest: BookingGuest;
  dates: BookingDates;
  financials: BookingFinancials;
  beds24BookingId?: string;
  stripeSessionId?: string;
  cancellationToken?: string;
  confirmedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

// DTOs for API requests
export interface CreateBookingDto {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guest: Omit<BookingGuest, "count"> & { count: number };
}

export interface BookingAvailabilityQuery {
  propertyId: string;
  checkIn: string;
  checkOut: string;
}

export interface BookingAvailabilityResult {
  available: boolean;
  totalPrice?: number;
  breakdown?: BookingFinancials;
  reason?: string;
}

// Owner dashboard KPIs
export interface BookingKpis {
  currentMonth: {
    occupancyRate: number;
    reservedNights: number;
    totalNights: number;
    grossRevenue: number;
    netRevenue: number;
    bookingsCount: number;
  };
  previousMonth: {
    occupancyRate: number;
    grossRevenue: number;
    netRevenue: number;
  };
  activeBooking?: {
    guestFirstName: string;
    checkOut: string;
  };
  nextBooking?: {
    guestFirstName: string;
    checkIn: string;
    nightsCount: number;
  };
  lastSyncedAt: string;
  syncStatus: "OK" | "STALE" | "FAILED";
}
