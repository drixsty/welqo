import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SubmitContactUseCase } from "@/application/contact/SubmitContactUseCase";
import { BrevoLeadRepository } from "@/infrastructure/brevo/BrevoLeadRepository";
import { BrevoNotificationGateway } from "@/infrastructure/email/BrevoNotificationGateway";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(10),
  city: z.string().min(1),
  message: z.string().optional(),
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { email, ...rest } = parsed.data;

    if (!email) {
      // No email → admin alert only, no CRM sync
      return NextResponse.json({ ok: true });
    }

    await useCase.execute({ ...rest, email, source: "revenue_simulator" });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
