import { vi, describe, it, expect, beforeEach } from "vitest";

const { mockAddOrUpdateContact } = vi.hoisted(() => ({
  mockAddOrUpdateContact: vi.fn().mockResolvedValue({ id: 3 }),
}));

vi.mock("@/lib/email", () => ({
  addOrUpdateContact: mockAddOrUpdateContact,
}));

import { POST } from "./route";
import { NextRequest } from "next/server";

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/brevo/guest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  email: "guest@test.fr",
  firstName: "Alice",
  lastName: "Dupont",
  phone: "0600000000",
  propertyId: "prop-123",
  checkIn: "2026-07-01",
  checkOut: "2026-07-05",
  bookingId: "bk-abc",
};

describe("POST /api/brevo/guest", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retourne 200 pour un payload valide", async () => {
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("appelle addOrUpdateContact avec la liste Guests (id 3)", async () => {
    await POST(makeRequest(validPayload));
    await vi.waitFor(() => expect(mockAddOrUpdateContact).toHaveBeenCalled());
    expect(mockAddOrUpdateContact).toHaveBeenCalledWith(
      expect.objectContaining({ listIds: [3] }),
    );
  });

  it("passe les attributs booking correctement", async () => {
    await POST(makeRequest(validPayload));
    await vi.waitFor(() => expect(mockAddOrUpdateContact).toHaveBeenCalled());
    expect(mockAddOrUpdateContact).toHaveBeenCalledWith(
      expect.objectContaining({
        attributes: expect.objectContaining({
          BOOKING_ID: "bk-abc",
          LAST_CHECKIN: "2026-07-01",
          SOURCE: "reservation_tunnel",
        }),
      }),
    );
  });

  it("retourne 400 si email manquant", async () => {
    const { email: _, ...noEmail } = validPayload;
    const res = await POST(makeRequest(noEmail));
    expect(res.status).toBe(400);
  });

  it("retourne 400 si firstName manquant", async () => {
    const { firstName: _, ...noFirstName } = validPayload;
    const res = await POST(makeRequest(noFirstName));
    expect(res.status).toBe(400);
  });

  it("retourne 400 si email invalide", async () => {
    const res = await POST(makeRequest({ ...validPayload, email: "invalid" }));
    expect(res.status).toBe(400);
  });

  it("retourne 200 même si Brevo échoue (fire-and-forget)", async () => {
    mockAddOrUpdateContact.mockRejectedValueOnce(new Error("Brevo timeout"));
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(200);
  });

  it("retourne 400 si body non-JSON", async () => {
    const req = new NextRequest("http://localhost/api/brevo/guest", {
      method: "POST",
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
