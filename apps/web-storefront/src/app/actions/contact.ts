"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  city: z.string().min(1),
  message: z.string().optional(),
});

export async function submitContactForm(data: z.infer<typeof schema>) {
  try {
    const validatedData = schema.parse(data);

    // Read RESEND_API_KEY from environment
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Welqo Contact <noreply@welqo.fr>",
          to: ["contact@welqo.fr"],
          reply_to: undefined,
          subject: `🏠 Nouvelle demande de devis — ${validatedData.name} (${validatedData.city})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
              <h2 style="color: #d45537; margin-bottom: 24px;">Nouvelle demande de devis Welqo</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Prénom</td><td style="padding: 8px 0; font-weight: 600;">${validatedData.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Téléphone</td><td style="padding: 8px 0; font-weight: 600;">${validatedData.phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Ville</td><td style="padding: 8px 0; font-weight: 600;">${validatedData.city}</td></tr>
                ${validatedData.message ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Message</td><td style="padding: 8px 0;">${validatedData.message}</td></tr>` : ""}
              </table>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #94a3b8; font-size: 12px;">Welqo · Conciergerie Airbnb · Hauts-de-France</p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send email via Resend");
      }
    } else {
      // Fallback for development logging
      console.log("[contact form server action]", validatedData);
    }

    return { success: true };
  } catch (err) {
    console.error("Error in submitContactForm:", err);
    return { success: false, error: "Server error" };
  }
}
