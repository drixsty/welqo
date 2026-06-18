import type { Contact } from "./Contact";

export interface ILeadRepository {
  save(contact: Contact, listId: number): Promise<void>;
}
