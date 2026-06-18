import { emailLayout } from "./layout";

export interface ClientConfirmData {
  firstName: string;
  calendlyUrl: string;
  context: "contact" | "simulator";
}

export function clientConfirmHtml({
  firstName,
  calendlyUrl,
  context,
}: ClientConfirmData): string {
  const bodyText =
    context === "simulator"
      ? "Nous avons bien reçu votre simulation et nous vous recontacterons dans les <strong>24 heures</strong> pour discuter de votre projet."
      : "Nous avons bien reçu votre demande et nous vous recontacterons dans les <strong>24 heures</strong> pour discuter de votre projet.";

  return emailLayout(`
    <h2 style="color:#0f172a;margin:0 0 12px;font-size:20px;font-weight:700">Bonjour ${firstName},</h2>
    <p style="color:#475569;line-height:1.75;margin:0 0 28px;font-size:15px">${bodyText}</p>
    <div style="background:#f8faff;border-left:4px solid #d45537;padding:16px 20px;border-radius:4px;margin-bottom:28px">
      <p style="color:#475569;margin:0;font-size:14px;line-height:1.6">
        Vous pouvez également réserver un créneau directement sur notre calendrier via le bouton ci-dessous.
      </p>
    </div>
    <a href="${calendlyUrl}"
       style="display:inline-block;background:#d45537;color:#fff;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:700;font-size:14px">
      Planifier un appel
    </a>
  `);
}
