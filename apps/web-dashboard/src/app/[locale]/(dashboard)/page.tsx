"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CalendarDays, ArrowRight, User, AlertCircle, TrendingUp } from "lucide-react";
import { KPIStats } from "../../../components/KPIStats";
import { fetchApi } from "../../../lib/api";
import { getStoredOwner } from "../../../lib/auth";
import { useAuthGuard } from "../../../lib/useAuthGuard";

import { LuxuryCard } from "@welqo/ui";

interface OverviewData {
  totalRevenue: number;
  occupancyRate: number;
  adr: number;
  upcomingBookings: {
    id: string;
    guestFirstName: string;
    guestLastName: string;
    checkIn: string;
    checkOut: string;
    totalAmountGross: number;
    property: { titleFr: string };
  }[];
  upcomingEvents: {
    id: string;
    name: string;
    city: string;
    startDate: string;
    endDate: string;
    multiplier: number;
  }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { locale } = useAuthGuard();
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const owner = getStoredOwner();

  useEffect(() => {
    fetchApi<OverviewData>("/stats/overview")
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-welqo-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
        <LuxuryCard className="border-red-100 dark:border-red-900 flex items-center gap-4 text-red-600 max-w-md bg-red-50/50">
          <AlertCircle className="w-8 h-8 shrink-0" />
          <div>
            <p className="font-bold font-serif">
              Impossible de charger le tableau de bord
            </p>
            <p className="text-sm font-medium mt-1">{error}</p>
          </div>
        </LuxuryCard>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchApi<OverviewData>("/stats/overview")
              .then(setData)
              .catch((e) => setError(e.message))
              .finally(() => setLoading(false));
          }}
          className="px-8 py-4 bg-welqo-anthracite text-white rounded-full font-bold hover:bg-welqo-terracotta transition-all"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const stats = data!;
  const ownerName = owner?.firstName ?? "Propriétaire";

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Bonjour, {ownerName}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Voici le résumé de vos performances pour le mois en cours.
        </p>
      </header>

      <div className="mb-12">
        <KPIStats stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Upcoming Bookings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Arrivées prévues
            </h2>
            <button
              onClick={() => router.push(`/${locale}/calendrier`)}
              className="text-welqo-terracotta font-bold text-xs flex items-center gap-1.5 hover:underline"
            >
              Calendrier complet <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {stats.upcomingBookings.length === 0 ? (
            <LuxuryCard
              variant="outline"
              className="py-16 text-center border-dashed"
            >
              <p className="text-slate-400 text-sm italic">
                Aucune réservation pour les 7 prochains jours.
              </p>
            </LuxuryCard>
          ) : (
            <div className="space-y-3">
              {stats.upcomingBookings.map((booking) => (
                <LuxuryCard
                  key={booking.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        {booking.guestFirstName} {booking.guestLastName}
                      </h3>
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                        {booking.property.titleFr}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 mt-4 sm:mt-0">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-medium">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      <span>
                        {new Date(booking.checkIn).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })}
                        {" - "}
                        {new Date(booking.checkOut).toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "short" },
                        )}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded border border-emerald-100 dark:border-emerald-500/20 uppercase tracking-tight">
                      Confirmé
                    </span>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Actions */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Actions rapides
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => router.push(`/${locale}/calendrier`)}
              className="w-full p-4 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-lg font-bold text-sm text-left hover:bg-slate-800 dark:hover:bg-white transition-colors flex justify-between items-center group"
            >
              Bloquer des dates
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push(`/${locale}/paiements`)}
              className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg font-bold text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-between items-center group"
            >
              Historique financier
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Smart Pricing Events */}
          {stats.upcomingEvents.length > 0 && (
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-welqo-terracotta" />
                Smart Pricing
              </h2>
              <div className="space-y-3">
                {stats.upcomingEvents.map(event => (
                  <LuxuryCard key={event.id} className="p-4 border-welqo-terracotta/20 bg-welqo-terracotta/5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-welqo-terracotta">
                        {event.city}
                      </span>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        +{Math.round((event.multiplier - 1) * 100)}%
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                      {event.name}
                    </h4>
                    <p className="text-slate-500 text-[10px]">
                      Du {new Date(event.startDate).toLocaleDateString('fr-FR')} au {new Date(event.endDate).toLocaleDateString('fr-FR')}
                    </p>
                  </LuxuryCard>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 italic">
                * Les prix de vos nuitées sont automatiquement ajustés pour ces périodes de forte demande.
              </p>
            </div>
          )}

          <LuxuryCard className="bg-welqo-terracotta/5 border-welqo-terracotta/10 p-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-welqo-terracotta" />
              Besoin d'assistance ?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-6">
              Votre gestionnaire dédié est à votre disposition pour toute
              question.
            </p>
            <button className="w-full py-2.5 bg-welqo-terracotta text-white rounded-lg font-bold text-xs hover:bg-welqo-terracotta-dark transition-colors">
              Contacter le support
            </button>
          </LuxuryCard>
        </div>
      </div>
    </div>
  );
}
