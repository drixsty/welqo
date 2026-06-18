const year = new Date().getFullYear();

export function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#0f172a;padding:28px 48px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700">Welqo</h1>
            <p style="color:rgba(255,255,255,0.45);margin:4px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:1.5px">Conciergerie Airbnb · Hauts-de-France</p>
          </td>
        </tr>
        <tr><td style="padding:40px 48px">${content}</td></tr>
        <tr>
          <td style="background:#f8faff;padding:20px 48px;text-align:center;border-top:1px solid #e2e8f0">
            <p style="color:#cbd5e1;font-size:12px;margin:0">© ${year} Welqo — Tous droits réservés</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
