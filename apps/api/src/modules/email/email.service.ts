import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

export interface BookingConfirmationContext {
  to: string;
  guestFirstName: string;
  guestLastName: string;
  bookingId: string;
  propertyNameFr: string;
  checkIn: Date;
  checkOut: Date;
  nightsCount: number;
  totalAmount: number;
  cancellationToken: string | null;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend | null = null;
  private readonly fromEmail: string;
  private readonly siteUrl: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("RESEND_API_KEY");
    this.fromEmail =
      this.configService.get<string>("RESEND_FROM_EMAIL") ?? "noreply@welqo.fr";
    this.siteUrl =
      this.configService.get<string>("NEXT_PUBLIC_SITE_URL") ??
      "https://welqo.fr";

    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.logger.log("Email service initialized with Resend");
    } else {
      this.logger.warn(
        "RESEND_API_KEY not set — emails will be logged to console only",
      );
    }
  }

  private async send(to: string, subject: string, html: string): Promise<void> {
    if (!this.resend) {
      this.logger.log(`[EMAIL MOCK] To: ${to} | Subject: ${subject}`);
      return;
    }
    try {
      await this.resend.emails.send({ from: this.fromEmail, to, subject, html });
      this.logger.log(`Email sent → ${to}`);
    } catch (err: any) {
      this.logger.error(`Failed to send email to ${to}: ${err.message}`);
    }
  }

  async sendBookingConfirmation(ctx: BookingConfirmationContext): Promise<void> {
    const fmt = (d: Date) =>
      new Date(d).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

    const cancellationUrl = ctx.cancellationToken
      ? `${this.siteUrl}/reservation/annuler?token=${ctx.cancellationToken}`
      : null;

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Confirmation de réservation — Welqo</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:#0f172a;padding:36px 48px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700;letter-spacing:-0.5px">Welqo</h1>
            <p style="color:rgba(255,255,255,0.55);margin:6px 0 0;font-size:13px;letter-spacing:1px;text-transform:uppercase">Locations de prestige</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:48px">
            <h2 style="color:#0f172a;margin:0 0 6px;font-size:22px;font-weight:700">Réservation confirmée ✓</h2>
            <p style="color:#64748b;margin:0 0 36px;font-size:15px;line-height:1.6">
              Bonjour <strong>${ctx.guestFirstName}</strong>, votre paiement a bien été reçu. Voici le récapitulatif de votre séjour.
            </p>

            <!-- Booking card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8faff;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:36px">
              <tr>
                <td style="padding:28px">
                  <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1.2px;margin:0 0 6px;font-weight:600">Logement</p>
                  <p style="color:#0f172a;font-size:19px;font-weight:700;margin:0 0 24px">${ctx.propertyNameFr}</p>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="50%" style="padding-right:12px">
                        <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1.2px;margin:0 0 4px;font-weight:600">Arrivée</p>
                        <p style="color:#0f172a;font-size:16px;font-weight:600;margin:0">${fmt(ctx.checkIn)}</p>
                      </td>
                      <td width="50%">
                        <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1.2px;margin:0 0 4px;font-weight:600">Départ</p>
                        <p style="color:#0f172a;font-size:16px;font-weight:600;margin:0">${fmt(ctx.checkOut)}</p>
                      </td>
                    </tr>
                  </table>

                  <hr style="border:none;border-top:1px solid #e2e8f0;margin:22px 0">

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="color:#64748b;font-size:14px">${ctx.nightsCount} nuit${ctx.nightsCount > 1 ? "s" : ""}</td>
                      <td align="right">
                        <span style="color:#0f172a;font-size:20px;font-weight:700">${ctx.totalAmount.toFixed(2)} €</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Reference -->
            <p style="color:#94a3b8;font-size:13px;margin:0 0 36px;text-align:center">
              Référence :&nbsp;
              <span style="color:#0f172a;font-weight:600;font-family:monospace;font-size:13px;background:#f1f5f9;padding:2px 8px;border-radius:4px">${ctx.bookingId}</span>
            </p>

            ${
              cancellationUrl
                ? `<p style="color:#94a3b8;font-size:13px;margin:0;text-align:center">
              Besoin d'annuler ?
              <a href="${cancellationUrl}" style="color:#64748b;text-decoration:underline">Gérer votre réservation</a>
            </p>`
                : ""
            }
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8faff;padding:24px 48px;text-align:center;border-top:1px solid #e2e8f0">
            <p style="color:#cbd5e1;font-size:12px;margin:0">© ${new Date().getFullYear()} Welqo — Tous droits réservés</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await this.send(
      ctx.to,
      `Confirmation de séjour — ${ctx.propertyNameFr}`,
      html,
    );
  }
}
