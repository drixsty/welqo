import Stripe from "stripe";
export declare class StripeClient {
    private stripe;
    constructor(apiKey: string);
    createCheckoutSession(params: Stripe.Checkout.SessionCreateParams): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    constructEvent(payload: string | Buffer, signature: string, secret: string): Promise<Stripe.Event>;
    createRefund(params: Stripe.RefundCreateParams): Promise<Stripe.Response<Stripe.Refund>>;
}
//# sourceMappingURL=index.d.ts.map