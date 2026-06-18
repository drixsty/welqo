import { sendEmail } from "@/lib/email";
import { adminNotificationHtml } from "@/lib/email-templates/admin-notification";
import { clientConfirmHtml } from "@/lib/email-templates/client-confirm";
import type { INotificationGateway } from "@/domain/contact/INotificationGateway";
import type { Contact } from "@/domain/contact/Contact";

export class BrevoNotificationGateway implements INotificationGateway {
  async sendAdminAlert(contact: Contact, adminEmail: string): Promise<void> {
    await sendEmail({
      to: adminEmail,
      subject: `🏠 Nouvelle demande — ${contact.name} (${contact.city})`,
      html: adminNotificationHtml({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        city: contact.city,
        message: contact.message,
        source: contact.source,
      }),
    });
  }

  async sendClientConfirmation(
    contact: Contact,
    calendlyUrl: string,
  ): Promise<void> {
    await sendEmail({
      to: contact.email,
      subject:
        contact.source === "revenue_simulator"
          ? "Welqo — Votre simulation a bien été reçue"
          : "Welqo — Votre demande a bien été reçue",
      html: clientConfirmHtml({
        firstName: contact.name.split(" ")[0],
        calendlyUrl,
        context: contact.source === "revenue_simulator" ? "simulator" : "contact",
      }),
    });
  }
}
