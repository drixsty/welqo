"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeClient = void 0;
const stripe_1 = __importDefault(require("stripe"));
class StripeClient {
    stripe;
    constructor(apiKey) {
        this.stripe = new stripe_1.default(apiKey, {
            apiVersion: "2024-04-10",
        });
    }
    async createCheckoutSession(params) {
        return this.stripe.checkout.sessions.create(params);
    }
    async constructEvent(payload, signature, secret) {
        return this.stripe.webhooks.constructEvent(payload, signature, secret);
    }
    async createRefund(params) {
        return this.stripe.refunds.create(params);
    }
}
exports.StripeClient = StripeClient;
//# sourceMappingURL=index.js.map