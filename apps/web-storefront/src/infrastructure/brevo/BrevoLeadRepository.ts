import { addOrUpdateContact } from "@/lib/email";
import type { ILeadRepository } from "@/domain/contact/ILeadRepository";
import type { Contact } from "@/domain/contact/Contact";

export class BrevoLeadRepository implements ILeadRepository {
  async save(contact: Contact, listId: number): Promise<void> {
    await addOrUpdateContact({
      email: contact.email,
      firstName: contact.name.split(" ")[0],
      phone: contact.phone,
      listIds: [listId],
      attributes: {
        VILLE: contact.city,
        SOURCE: contact.source,
        ...(contact.message ? { DERNIER_MESSAGE: contact.message } : {}),
      },
    });
  }
}
