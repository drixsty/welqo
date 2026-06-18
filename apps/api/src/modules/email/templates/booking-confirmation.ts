import { BookingConfirmationContext } from "../email.service";

const year = new Date().getFullYear();

export function bookingConfirmationHtml(
  ctx: BookingConfirmationContext,
  fmt: (d: Date) => string,
  cancellationUrl: string | null,
): string {
  return `<!DOCTYPE html>
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

        <tr>
          <td style="background:#0f172a;padding:36px 48px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700;letter-spacing:-0.5px">Welqo</h1>
            <p style="color:rgba(255,255,255,0.55);margin:6px 0 0;font-size:13px;letter-spacing:1px;text-transform:uppercase">Locations de prestige</p>
          </td>
        </tr>

        <tr>
          <td style="padding:48px">
            <h2 style="color:#0f172a;margin:0 0 6px;font-size:22px;font-weight:700">Réservation confirmée ✓</h2>
            <p style="color:#64748b;margin:0 0 36px;font-size:15px;line-height:1.6">
              Bonjour <strong>${ctx.guestFirstName}</strong>, votre paiement a bien été reçu. Voici le récapitulatif de votre séjour.
            </p>

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

            <p style="color:#94a3b8;font-size:13px;margin:0 0 36px;text-align:center">
              Référence :&nbsp;
              <span style="color:#0f172a;font-weight:600;font-family:monospace;font-size:13px;background:#f1f5f9;padding:2px 8px;border-radius:4px">${ctx.bookingId}</span>
            </p>

            ${cancellationUrl ? `
            <p style="color:#94a3b8;font-size:13px;margin:0;text-align:center">
              Besoin d'annuler ?
              <a href="${cancellationUrl}" style="color:#64748b;text-decoration:underline">Gérer votre réservation</a>
            </p>` : ""}
          </td>
        </tr>

        <tr>
          <td style="background:#f8faff;padding:24px 48px;text-align:center;border-top:1px solid #e2e8f0">
            <p style="color:#cbd5e1;font-size:12px;margin:0">© ${year} Welqo — Tous droits réservés</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
