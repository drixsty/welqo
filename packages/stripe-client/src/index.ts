import Stripe from "stripe";

export class StripeClient {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: "2024-04-10" as any,
    });
  }

  async createCheckoutSession(params: Stripe.Checkout.SessionCreateParams) {
    return this.stripe.checkout.sessions.create(params);
  }

  async constructEvent(
    payload: string | Buffer,
    signature: string,
    secret: string,
  ) {
    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }

  async createRefund(params: Stripe.RefundCreateParams) {
    return this.stripe.refunds.create(params);
  }
}
