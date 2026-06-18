export type ContactSource = "contact_form" | "revenue_simulator";

export interface Contact {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly city: string;
  readonly message?: string | null;
  readonly source: ContactSource;
}

export function makeContact(data: Contact): Contact {
  if (!data.email || !data.name || !data.phone || !data.city) {
    throw new Error("Contact: required fields missing");
  }
  return Object.freeze({ ...data });
}
