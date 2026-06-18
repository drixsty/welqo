"use server";

import { z } from "zod";
import { addOrUpdateContact } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(["fr", "en"]),
});

export async function submitCookieConsentEmail(data: {
  email: string;
  locale: string;
}): Promise<void> {
  const parsed = schema.safeParse(data);
  if (!parsed.success) return;

  const { email, locale } = parsed.data;

  const today = new Date().toISOString().split("T")[0];

  try {
    await addOrUpdateContact({
      email,
      listIds: [parseInt(process.env.BREVO_LIST_NEWSLETTER ?? "4")],
      attributes: {
        LANGUE: locale.toUpperCase(),
        SOURCE: "cookie_banner",
        DATE_CONSENT_NEWSLETTER: today,
      },
    });
  } catch {
    // Silent — ne bloque pas l'UX
  }
}
