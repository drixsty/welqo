import { emailLayout } from "./layout";

export interface AdminNotificationData {
  name: string;
  email?: string;
  phone: string;
  city: string;
  message?: string | null;
  source: "contact_form" | "revenue_simulator";
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;color:#64748b;font-size:13px;width:120px">${label}</td>
    <td style="padding:8px 0;font-weight:600;color:#0f172a">${value}</td>
  </tr>`;
}

export function adminNotificationHtml(data: AdminNotificationData): string {
  const sourceLabel =
    data.source === "revenue_simulator"
      ? "Simulateur de revenus"
      : "Formulaire de contact";

  return emailLayout(`
    <h2 style="color:#0f172a;margin:0 0 6px;font-size:20px;font-weight:700">Nouvelle demande</h2>
    <p style="color:#64748b;margin:0 0 28px;font-size:13px">Source : ${sourceLabel}</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
      <tbody>
        ${row("Nom", data.name)}
        ${data.email ? row("Email", data.email) : ""}
        ${row("Téléphone", data.phone)}
        ${row("Ville", data.city)}
        ${data.message ? row("Message", data.message) : ""}
      </tbody>
    </table>
  `);
}
