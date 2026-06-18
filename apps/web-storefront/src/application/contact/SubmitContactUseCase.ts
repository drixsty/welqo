import { makeContact, type Contact } from "@/domain/contact/Contact";
import type { ILeadRepository } from "@/domain/contact/ILeadRepository";
import type { INotificationGateway } from "@/domain/contact/INotificationGateway";

export interface SubmitContactInput {
  name: string;
  email: string;
  phone: string;
  city: string;
  message?: string | null;
  source: Contact["source"];
}

export interface SubmitContactResult {
  success: boolean;
  error?: string;
}

export class SubmitContactUseCase {
  constructor(
    private readonly leads: ILeadRepository,
    private readonly notifications: INotificationGateway,
    private readonly config: {
      adminEmail: string;
      calendlyUrl: string;
      listId: number;
    },
  ) {}

  async execute(input: SubmitContactInput): Promise<SubmitContactResult> {
    try {
      const contact = makeContact(input);

      const results = await Promise.allSettled([
        this.notifications.sendAdminAlert(contact, this.config.adminEmail),
        this.notifications.sendClientConfirmation(
          contact,
          this.config.calendlyUrl,
        ),
        this.leads.save(contact, this.config.listId),
      ]);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          const labels = ["admin alert", "client confirm", "lead save"];
          console.error(`[SubmitContact] ${labels[i]} failed:`, r.reason);
        }
      });

      return { success: true };
    } catch (err) {
      console.error("[SubmitContact] unexpected error:", err);
      return { success: false, error: "Server error" };
    }
  }
}
