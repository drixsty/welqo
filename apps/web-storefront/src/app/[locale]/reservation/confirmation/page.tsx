import React from "react";
import Link from "next/link";
import { CheckCircle2, Calendar, Mail, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { addOrUpdateContact } from "@/lib/email";

interface ConfirmationPageProps {
  params: { locale: string };
  searchParams: { session_id?: string };
}

async function syncGuestToBrevo(sessionId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return;

  try {
    const res = await fetch(
      `${apiUrl}/bookings/confirmation?session_id=${sessionId}`,
      { cache: "no-store" },
    );
    if (!res.ok) return;

    const booking = await res.json();
    if (!booking?.guestEmail || booking.status !== "CONFIRMED") return;

    const listId = parseInt(process.env.BREVO_LIST_GUESTS ?? "3");

    await addOrUpdateContact({
      email: booking.guestEmail,
      firstName: booking.guestFirstName,
      phone: booking.guestPhone,
      listIds: [listId],
      attributes: {
        NOM: booking.guestLastName,
        PROPERTY_ID: booking.propertyId,
        LAST_CHECKIN: new Date(booking.checkIn).toISOString().split("T")[0],
        LAST_CHECKOUT: new Date(booking.checkOut).toISOString().split("T")[0],
        BOOKING_ID: booking.id,
        SOURCE: "confirmation_page",
      },
    });
  } catch {
    // Filet silencieux — le webhook NestJS est la source principale
  }
}

export default async function ConfirmationPage({
  params: { locale },
  searchParams,
}: ConfirmationPageProps) {
  const t = await getTranslations({ locale, namespace: "Confirmation" });
  const base = `/${locale}`;

  // Filet de sécurité : sync Brevo si le webhook NestJS a échoué
  if (searchParams.session_id) {
    await syncGuestToBrevo(searchParams.session_id).catch(() => {});
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon Animation Container */}
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-20" />
            <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
          {t("confirmed")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 max-w-lg mx-auto">
          {t("subtitle")}
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
          <div className="p-6 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-100 dark:border-white/5">
            <Mail className="w-5 h-5 text-welqo-terracotta mb-3" />
            <h3 className="font-bold text-sm mb-1">{t("emailTitle")}</h3>
            <p className="text-xs text-slate-500">{t("emailDesc")}</p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-100 dark:border-white/5">
            <Calendar className="w-5 h-5 text-welqo-terracotta mb-3" />
            <h3 className="font-bold text-sm mb-1">{t("checkInTitle")}</h3>
            <p className="text-xs text-slate-500">{t("checkInDesc")}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={base}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold hover:bg-welqo-terracotta hover:text-white transition-all flex items-center justify-center gap-2"
          >
            {t("backHome")}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
            {t("addToCalendar")}
          </button>
        </div>

        <p className="mt-12 text-[10px] font-bold text-slate-400 tracking-[0.2em]">
          Welqo conciergerie · {t("footer")}
        </p>
      </div>
    </main>
  );
}
