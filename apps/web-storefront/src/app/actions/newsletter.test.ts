import { vi, describe, it, expect, beforeEach } from "vitest";

const { mockAddOrUpdateContact } = vi.hoisted(() => ({
  mockAddOrUpdateContact: vi.fn().mockResolvedValue({ id: 2 }),
}));

vi.mock("@/lib/email", () => ({
  addOrUpdateContact: mockAddOrUpdateContact,
}));

import { subscribeToNewsletter } from "./newsletter";

function makeFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
}

describe("subscribeToNewsletter", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retourne success:true pour un email valide en FR", async () => {
    const result = await subscribeToNewsletter(
      undefined,
      makeFormData({ email: "user@test.fr", locale: "fr" }),
    );
    expect(result.success).toBe(true);
    expect(result.error).toBe("");
  });

  it("ajoute le contact dans la liste Newsletter (id 2)", async () => {
    await subscribeToNewsletter(
      undefined,
      makeFormData({ email: "user@test.fr", locale: "fr" }),
    );
    expect(mockAddOrUpdateContact).toHaveBeenCalledWith(
      expect.objectContaining({ listIds: [2] }),
    );
  });

  it("passe l'attribut LANGUE correctement", async () => {
    await subscribeToNewsletter(
      undefined,
      makeFormData({ email: "user@test.com", locale: "en" }),
    );
    expect(mockAddOrUpdateContact).toHaveBeenCalledWith(
      expect.objectContaining({
        attributes: expect.objectContaining({ LANGUE: "en" }),
      }),
    );
  });

  it("passe SOURCE: newsletter_footer", async () => {
    await subscribeToNewsletter(
      undefined,
      makeFormData({ email: "user@test.fr", locale: "fr" }),
    );
    expect(mockAddOrUpdateContact).toHaveBeenCalledWith(
      expect.objectContaining({
        attributes: expect.objectContaining({ SOURCE: "newsletter_footer" }),
      }),
    );
  });

  it("retourne success:false pour un email invalide", async () => {
    const result = await subscribeToNewsletter(
      undefined,
      makeFormData({ email: "pas-un-email", locale: "fr" }),
    );
    expect(result.success).toBe(false);
    expect(result.error).toBe("Email invalide");
    expect(mockAddOrUpdateContact).not.toHaveBeenCalled();
  });

  it("retourne success:false si email absent", async () => {
    const result = await subscribeToNewsletter(
      undefined,
      makeFormData({ locale: "fr" }),
    );
    expect(result.success).toBe(false);
  });

  it("retourne success:false si Brevo lève une exception", async () => {
    mockAddOrUpdateContact.mockRejectedValueOnce(new Error("503 Brevo"));
    const result = await subscribeToNewsletter(
      undefined,
      makeFormData({ email: "ok@test.fr", locale: "fr" }),
    );
    expect(result.success).toBe(false);
    expect(result.error).toBe("Erreur lors de l'inscription");
  });
});
