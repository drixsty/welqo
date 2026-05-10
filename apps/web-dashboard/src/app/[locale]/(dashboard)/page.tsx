"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  MapPin,
  Moon,
  MessageCircle,
} from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { KPIStats } from "../../../components/KPIStats";
import { DetailPanel } from "../../../components/DetailPanel";
import { fetchApi } from "../../../lib/api";
import { getStoredOwner } from "../../../lib/auth";
import { useAuthGuard } from "../../../lib/useAuthGuard";
import { Button } from "@welqo/ui";
import { PageWrapper } from "../../../components/PageWrapper";

interface UpcomingBooking {
  id: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail?: string;
  checkIn: string;
  checkOut: string;
  totalAmountGross: number;
  totalAmountNet?: number;
  status?: string;
  property: { titleFr: string };
}

interface OverviewData {
  totalRevenue: number;
  occupancyRate: number;
  adr: number;
  upcomingBookings: UpcomingBooking[];
  upcomingEvents: {
    id: string;
    name: string;
    city: string;
    startDate: string;
    endDate: string;
    multiplier: number;
  }[];
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function DashboardPage() {
  const router = useRouter();
  const { locale } = useAuthGuard();
  const [data, setData]         = useState<OverviewData | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [selected, setSelected] = useState<UpcomingBooking | null>(null);
  const owner = getStoredOwner();

  useEffect(() => {
    fetchApi<OverviewData>("/stats/overview")
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="flex items-center gap-3 text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-lg px-4 py-3 text-sm font-medium max-w-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
        <Button onClick={() => window.location.reload()} variant="primary" size="sm">
          Réessayer
        </Button>
      </div>
    );
  }

  const stats       = data!;
  const ownerName   = owner?.firstName ?? "Propriétaire";
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const nights = selected
    ? differenceInDays(parseISO(selected.checkOut), parseISO(selected.checkIn))
    : 0;

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Bonjour, {ownerName}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 capitalize">
            {currentDate}
          </p>
        </div>

        {/* KPIs */}
        <KPIStats stats={stats} />

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── Upcoming bookings ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Prochaines arrivées
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">7 prochains jours</p>
              </div>
              <button
                onClick={() => router.push(`/${locale}/calendrier`)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-primary transition-colors font-medium"
              >
                Calendrier <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {stats.upcomingBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 text-xs font-medium">
                Aucune arrivée prévue cette semaine
              </div>
            ) : (
              <div className="rounded-lg border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800/60">
                {stats.upcomingBookings.map((booking) => {
                  const isActive = selected?.id === booking.id;
                  return (
                    <button
                      key={booking.id}
                      onClick={() => setSelected(isActive ? null : booking)}
                      className={[
                        "group relative w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all",
                        isActive
                          ? "bg-primary/[0.04] dark:bg-primary/[0.07]"
                          : "hover:bg-primary/[0.025] dark:hover:bg-primary/[0.05]",
                      ].join(" ")}
                    >
                      {/* Left accent bar */}
                      <span
                        className={[
                          "absolute left-0 inset-y-[8px] w-[2.5px] rounded-r-full transition-all duration-200",
                          isActive
                            ? "bg-primary scale-y-100"
                            : "bg-primary/50 scale-y-0 group-hover:scale-y-100 origin-center",
                        ].join(" ")}
                      />

                      {/* Avatar */}
                      <div
                        className={[
                          "w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-150",
                          isActive
                            ? "bg-primary text-white"
                            : "bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white",
                        ].join(" ")}
                      >
                        {booking.guestFirstName[0]}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {booking.guestFirstName} {booking.guestLastName}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {booking.property.titleFr}
                        </p>
                      </div>

                      {/* Dates */}
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                          <CalendarDays className="w-3 h-3 text-primary shrink-0" />
                          {fmtDate(booking.checkIn)} → {fmtDate(booking.checkOut)}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600">Confirmé</span>
                      </div>

                      {/* Chevron */}
                      <ChevronRight
                        className={[
                          "w-3.5 h-3.5 shrink-0 transition-colors",
                          isActive ? "text-primary" : "text-slate-300 group-hover:text-primary/50",
                        ].join(" ")}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Right panel ── */}
          <div className="space-y-4">
            {/* Quick actions */}
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-slate-400 dark:text-slate-600 mb-2">
                Accès rapide
              </p>
              <div className="space-y-1.5">
                <button
                  onClick={() => router.push(`/${locale}/calendrier`)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-primary/30 hover:text-primary transition-all"
                >
                  Bloquer des dates
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => router.push(`/${locale}/paiements`)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-primary/30 hover:text-primary transition-all"
                >
                  Revenus & factures
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Smart Pricing */}
            {stats.upcomingEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <p className="text-[10px] font-semibold tracking-wide text-slate-400 dark:text-slate-600">
                    Smart pricing
                  </p>
                </div>
                <div className="space-y-1.5">
                  {stats.upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="px-3.5 py-2.5 rounded-lg border border-primary/10 bg-primary/[0.04] dark:bg-primary/[0.08]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-primary/60">{event.city}</span>
                        <span className="text-[10px] font-bold text-white bg-primary px-1.5 py-0.5 rounded">
                          +{Math.round((event.multiplier - 1) * 100)}%
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-0.5">
                        {event.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {new Date(event.startDate).toLocaleDateString("fr-FR")} —{" "}
                        {new Date(event.endDate).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support */}
            <div className="px-4 py-4 rounded-lg bg-slate-900 dark:bg-slate-800 text-white">
              <h3 className="text-xs font-semibold mb-1">Support dédié</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Votre city manager est disponible 7j/7 pour vous accompagner.
              </p>
              <Button variant="primary" size="md" className="w-full">
                Contacter Welqo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Detail panel ── */}
      <DetailPanel
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.guestFirstName} ${selected.guestLastName}` : ""}
        subtitle={selected?.property.titleFr}
        footer={
          selected && (
            <Button
              href={`/${locale}/messages`}
              variant="secondary"
              size="md"
              className="w-full"
              icon={MessageCircle}
            >
              Ouvrir la messagerie
            </Button>
          )
        }
      >
        {selected && (
          <div className="p-5 space-y-5">
            {/* Status */}
            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold border bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              Confirmé
            </span>

            {/* Guest card */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 bg-primary/10 border border-primary/20 text-primary rounded-md flex items-center justify-center font-bold text-sm shrink-0">
                {selected.guestFirstName[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {selected.guestFirstName} {selected.guestLastName}
                </p>
                {selected.guestEmail && (
                  <p className="text-[11px] text-slate-400 truncate">{selected.guestEmail}</p>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-slate-400 mb-0.5">Logement</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selected.property.titleFr}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-slate-400 mb-1">Séjour</p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                      {format(parseISO(selected.checkIn), "dd MMM", { locale: fr })}
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                      {format(parseISO(selected.checkOut), "dd MMM", { locale: fr })}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <Moon className="w-3 h-3" />
                    {nights} nuit{nights > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {selected.totalAmountGross > 0 && (
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Total TTC</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {selected.totalAmountGross.toFixed(2)} €
                    </span>
                  </div>
                  {selected.totalAmountNet != null && (
                    <>
                      <div className="h-px bg-slate-200 dark:bg-slate-700" />
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Net propriétaire</span>
                        <span className="font-bold text-primary">
                          {selected.totalAmountNet.toFixed(2)} €
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] text-slate-400">
                Référence :{" "}
                <span className="font-mono font-semibold text-slate-600 dark:text-slate-400">
                  #{selected.id.slice(-8).toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        )}
      </DetailPanel>
    </PageWrapper>
  );
}
