export type Locale = "fr" | "en";

export interface Subscriber {
  readonly email: string;
  readonly locale: Locale;
}

export function makeSubscriber(email: string, locale: Locale): Subscriber {
  if (!email) throw new Error("Subscriber: email required");
  return Object.freeze({ email, locale });
}
