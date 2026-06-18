"use server";

import { z } from "zod";
import { SubmitContactUseCase } from "@/application/contact/SubmitContactUseCase";
import { BrevoLeadRepository } from "@/infrastructure/brevo/BrevoLeadRepository";
import { BrevoNotificationGateway } from "@/infrastructure/email/BrevoNotificationGateway";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  city: z.string().min(1),
  message: z.string().nullish(),
  consent: z.boolean().optional(),
});

const useCase = new SubmitContactUseCase(
  new BrevoLeadRepository(),
  new BrevoNotificationGateway(),
  {
    adminEmail: process.env.BREVO_ADMIN_EMAIL ?? "contact@welqo.fr",
    calendlyUrl:
      process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/welqo",
    listId: parseInt(process.env.BREVO_LIST_PROSPECTS ?? "3"),
  },
);

export async function submitContactForm(rawData: unknown) {
  const parsed = schema.safeParse(rawData);
  if (!parsed.success) return { success: false, error: "Données invalides" };

  return useCase.execute({ ...parsed.data, source: "contact_form" });
}
