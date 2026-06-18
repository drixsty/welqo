import { BrevoClient } from "@getbrevo/brevo";

function getClient(): BrevoClient {
  return new BrevoClient({ apiKey: process.env.BREVO_API_KEY! });
}

export interface ContactPayload {
  email: string;
  firstName?: string;
  phone?: string;
  listIds: number[];
  attributes?: Record<string, string | number | boolean>;
}

export interface TransactionalPayload {
  to: string;
  subject: string;
  html: string;
}

export async function addOrUpdateContact(payload: ContactPayload) {
  const client = getClient();
  return client.contacts.createContact({
    email: payload.email,
    listIds: payload.listIds,
    updateEnabled: true,
    attributes: {
      ...(payload.firstName ? { PRENOM: payload.firstName } : {}),
      ...(payload.phone ? { TELEPHONE: payload.phone } : {}),
      ...payload.attributes,
    },
  });
}

export async function sendEmail(payload: TransactionalPayload): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.log("[email mock]", payload.to, payload.subject);
    return;
  }

  const client = getClient();
  await client.transactionalEmails.sendTransacEmail({
    sender: {
      email: process.env.BREVO_SENDER_EMAIL ?? "contact@welqo.fr",
      name: process.env.BREVO_SENDER_NAME ?? "Welqo",
    },
    to: [{ email: payload.to }],
    subject: payload.subject,
    htmlContent: payload.html,
  });
}
