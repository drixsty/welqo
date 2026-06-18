import { addOrUpdateContact } from "@/lib/email";
import type { ISubscriberRepository } from "@/domain/newsletter/ISubscriberRepository";
import type { Subscriber } from "@/domain/newsletter/Subscriber";

export class BrevoSubscriberRepository implements ISubscriberRepository {
  async subscribe(subscriber: Subscriber, listId: number): Promise<void> {
    await addOrUpdateContact({
      email: subscriber.email,
      listIds: [listId],
      attributes: {
        LANGUE: subscriber.locale,
        SOURCE: "newsletter_footer",
      },
    });
  }
}
