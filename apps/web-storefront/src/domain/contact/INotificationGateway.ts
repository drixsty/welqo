import type { Contact } from "./Contact";

export interface INotificationGateway {
  sendAdminAlert(contact: Contact, adminEmail: string): Promise<void>;
  sendClientConfirmation(contact: Contact, calendlyUrl: string): Promise<void>;
}
