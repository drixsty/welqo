import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addOrUpdateContact } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  propertyId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  bookingId: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const d = parsed.data;
  const listId = parseInt(process.env.BREVO_LIST_GUESTS ?? "3");

  // Fire-and-forget : ne pas bloquer la réponse si Brevo est lent
  addOrUpdateContact({
    email: d.email,
    firstName: d.firstName,
    phone: d.phone,
    listIds: [listId],
    attributes: {
      NOM: d.lastName,
      PROPERTY_ID: d.propertyId,
      LAST_CHECKIN: d.checkIn,
      LAST_CHECKOUT: d.checkOut,
      BOOKING_ID: d.bookingId,
      SOURCE: "reservation_tunnel",
    },
  }).catch((err) => console.warn("[brevo/guest] sync failed:", err));

  return NextResponse.json({ success: true });
}
