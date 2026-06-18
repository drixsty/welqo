import { vi, describe, it, expect, beforeEach } from "vitest";

const { mockCreateContact, mockSendTransacEmail } = vi.hoisted(() => ({
  mockCreateContact: vi.fn().mockResolvedValue({ id: 42 }),
  mockSendTransacEmail: vi.fn().mockResolvedValue({ messageId: "msg-1" }),
}));

vi.mock("@getbrevo/brevo", () => {
  class MockBrevoClient {
    contacts = { createContact: mockCreateContact };
    transactionalEmails = { sendTransacEmail: mockSendTransacEmail };
  }
  return { BrevoClient: MockBrevoClient };
});

import { addOrUpdateContact, sendEmail } from "./email";

describe("addOrUpdateContact", () => {
  beforeEach(() => vi.clearAllMocks());

  it("appelle createContact avec updateEnabled: true", async () => {
    await addOrUpdateContact({ email: "test@welqo.fr", listIds: [1] });
    expect(mockCreateContact).toHaveBeenCalledWith(
      expect.objectContaining({ updateEnabled: true }),
    );
  });

  it("mappe firstName vers PRENOM et phone vers TELEPHONE", async () => {
    await addOrUpdateContact({
      email: "test@welqo.fr",
      firstName: "Kevin",
      phone: "0600000000",
      listIds: [1],
    });
    expect(mockCreateContact).toHaveBeenCalledWith(
      expect.objectContaining({
        attributes: expect.objectContaining({ PRENOM: "Kevin", TELEPHONE: "0600000000" }),
      }),
    );
  });

  it("fusionne les attributs custom", async () => {
    await addOrUpdateContact({
      email: "test@welqo.fr",
      listIds: [1],
      attributes: { VILLE: "Lille", SOURCE: "test" },
    });
    expect(mockCreateContact).toHaveBeenCalledWith(
      expect.objectContaining({
        attributes: expect.objectContaining({ VILLE: "Lille", SOURCE: "test" }),
      }),
    );
  });

  it("passe les listIds corrects", async () => {
    await addOrUpdateContact({ email: "test@welqo.fr", listIds: [1, 2] });
    expect(mockCreateContact).toHaveBeenCalledWith(
      expect.objectContaining({ listIds: [1, 2] }),
    );
  });
});

describe("sendEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.BREVO_API_KEY = "test-key";
  });

  it("appelle sendTransacEmail avec subject et htmlContent", async () => {
    await sendEmail({ to: "user@test.fr", subject: "Test", html: "<p>Hi</p>" });
    expect(mockSendTransacEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "Test",
        htmlContent: "<p>Hi</p>",
        to: [{ email: "user@test.fr" }],
      }),
    );
  });

  it("utilise BREVO_SENDER_EMAIL comme expéditeur", async () => {
    process.env.BREVO_SENDER_EMAIL = "custom@welqo.fr";
    await sendEmail({ to: "u@test.fr", subject: "S", html: "<p/>" });
    expect(mockSendTransacEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: expect.objectContaining({ email: "custom@welqo.fr" }),
      }),
    );
  });

  it("log en console si BREVO_API_KEY absent (mock mode)", async () => {
    delete process.env.BREVO_API_KEY;
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await sendEmail({ to: "user@test.fr", subject: "S", html: "<p/>" });
    expect(mockSendTransacEmail).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith("[email mock]", "user@test.fr", "S");
    spy.mockRestore();
    process.env.BREVO_API_KEY = "test-key";
  });
});
