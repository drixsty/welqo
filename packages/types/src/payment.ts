// Payment bounded context

export type PaymentStatus =
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

export interface Payment {
  id: string;
  bookingId: string;
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  amountPaid: number;
  amountRefunded: number;
  currency: string;
  paidAt?: string;
  refundedAt?: string;
}

export interface StripeCheckoutSession {
  url: string;
  sessionId: string;
}
