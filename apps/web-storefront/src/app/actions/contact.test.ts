import { vi, describe, it, expect, beforeEach } from "vitest";

const { mockSendEmail, mockAddOrUpdateContact } = vi.hoisted(() => ({
  mockSendEmail: vi.fn().mockResolvedValue(undefined),
  mockAddOrUpdateContact: vi.fn().mockResolvedValue({ id: 1 }),
}));

vi.mock("@/lib/email", () => ({
  sendEmail: mockSendEmail,
  addOrUpdateContact: mockAddOrUpdateContact,
}));

import { submitContactForm } from "./contact";

describe("submitContactForm", () => {
  beforeEach(() => vi.clearAllMocks());

  const validBase = {
    name: "Jean D",
    email: "jean@test.fr",
    phone: "0600000000",
    city: "Lille",
  };

  it("retourne success:true pour un payload valide", async () => {
    const result = await submitContactForm(validBase);
    expect(result.success).toBe(true);
  });

  it("envoie une notification admin avec la ville dans le sujet", async () => {
    await submitContactForm(validBase);
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ subject: expect.stringContaining("Lille") }),
    );
  });

  it("envoie une confirmation au client (2 appels sendEmail)", async () => {
    await submitContactForm(validBase);
    expect(mockSendEmail).toHaveBeenCalledTimes(2);
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ to: validBase.email }),
    );
  });

  it("inclut l'email dans le template HTML de la notification admin", async () => {
    await submitContactForm({ ...validBase, email: "jean@test.fr" });
    const adminCall = mockSendEmail.mock.calls.find(([p]) =>
      p.subject.includes("Lille"),
    );
    expect(adminCall?.[0].html).toContain("jean@test.fr");
  });

  it("ajoute le contact dans Brevo liste Prospects si email fourni", async () => {
    await submitContactForm({ ...validBase, email: "jean@test.fr" });
    expect(mockAddOrUpdateContact).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "jean@test.fr",
        listIds: [1],
        attributes: expect.objectContaining({
          VILLE: "Lille",
          SOURCE: "contact_form",
        }),
      }),
    );
  });

  it("toujours appelle addOrUpdateContact (email maintenant requis)", async () => {
    await submitContactForm(validBase);
    expect(mockAddOrUpdateContact).toHaveBeenCalled();
  });

  it("retourne success:true même si Brevo échoue (Promise.allSettled absorbe)", async () => {
    mockAddOrUpdateContact.mockRejectedValueOnce(new Error("Brevo down"));
    const result = await submitContactForm(validBase);
    expect(result.success).toBe(true);
  });

  it("retourne success:false si le payload est invalide (email manquant)", async () => {
    const result = await submitContactForm({
      name: "Jean D",
      phone: "0600000000",
      city: "Lille",
    });
    expect(result.success).toBe(false);
  });

  it("retourne success:false si le payload est invalide (phone trop court)", async () => {
    const result = await submitContactForm({
      name: "Jean D",
      email: "k@test.fr",
      phone: "06",
      city: "",
    });
    expect(result.success).toBe(false);
  });
});
