import { makeSubscriber, type Locale } from "@/domain/newsletter/Subscriber";
import type { ISubscriberRepository } from "@/domain/newsletter/ISubscriberRepository";

export interface SubscribeNewsletterInput {
  email: string;
  locale: Locale;
}

export interface SubscribeNewsletterResult {
  success: boolean;
  error: string;
}

export class SubscribeNewsletterUseCase {
  constructor(
    private readonly subscribers: ISubscriberRepository,
    private readonly config: { listId: number },
  ) {}

  async execute(
    input: SubscribeNewsletterInput,
  ): Promise<SubscribeNewsletterResult> {
    try {
      const subscriber = makeSubscriber(input.email, input.locale);
      await this.subscribers.subscribe(subscriber, this.config.listId);
      return { success: true, error: "" };
    } catch {
      return { success: false, error: "Erreur lors de l'inscription" };
    }
  }
}
