"use server";

import { z } from "zod";
import { SubscribeNewsletterUseCase } from "@/application/newsletter/SubscribeNewsletterUseCase";
import { BrevoSubscriberRepository } from "@/infrastructure/brevo/BrevoSubscriberRepository";

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(["fr", "en"]).default("fr"),
});

const useCase = new SubscribeNewsletterUseCase(new BrevoSubscriberRepository(), {
  listId: parseInt(process.env.BREVO_LIST_NEWSLETTER ?? "4"),
});

export async function subscribeToNewsletter(
  _prevState: unknown,
  formData: FormData,
) {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    locale: formData.get("locale"),
  });

  if (!parsed.success) return { success: false, error: "Email invalide" };

  return useCase.execute(parsed.data);
}
