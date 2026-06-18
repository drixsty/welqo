export interface BookingRecord {
  id: string;
  propertyId: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string | null;
  guestCount: number;
  checkIn: Date;
  checkOut: Date;
  nightsCount: number;
  nightlyRate: number;
  cleaningFee: number;
  touristTax: number;
  totalAmountGross: number;
  welqoCommission: number;
  totalAmountNet: number;
  status: string;
  stripeSessionId: string | null;
  beds24BookingId: string | null;
  cancellationToken: string | null;
  confirmedAt: Date | null;
  cancelledAt: Date | null;
}

export interface BookingWithProperty extends BookingRecord {
  property: {
    id: string;
    titleFr: string;
    slug: string;
    beds24PropertyId: string | null;
  };
}

export interface CalendarBooking {
  id: string;
  checkIn: Date;
  checkOut: Date;
  status: string;
  property: { id: string; titleFr: string; city: string };
}

export interface IBookingRepository {
  findById(id: string): Promise<BookingWithProperty | null>;
  findBySessionId(sessionId: string): Promise<BookingRecord | null>;
  findByCancellationToken(token: string): Promise<BookingRecord | null>;
  countOverlapping(
    propertyId: string,
    checkIn: Date,
    checkOut: Date,
  ): Promise<number>;
  findCalendarBookings(
    startDate: Date,
    endDate: Date,
  ): Promise<CalendarBooking[]>;
  create(data: Omit<BookingRecord, "id" | "confirmedAt" | "cancelledAt">): Promise<BookingRecord>;
  updateStatus(
    id: string,
    status: string,
    extra?: Partial<Pick<BookingRecord, "stripeSessionId" | "beds24BookingId" | "confirmedAt" | "cancelledAt">>,
  ): Promise<void>;
  confirmWithPayment(
    booking: Pick<BookingRecord, "id" | "propertyId" | "guestEmail" | "totalAmountGross">,
    payment: {
      stripePaymentIntentId: string;
      idempotencyKey: string;
    },
  ): Promise<void>;
}
