import type { Subscriber } from "./Subscriber";

export interface ISubscriberRepository {
  subscribe(subscriber: Subscriber, listId: number): Promise<void>;
}
