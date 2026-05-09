"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight, User, AlertCircle } from "lucide-react";
import { KPIStats } from "../../../components/KPIStats";
import { fetchApi } from "../../../lib/api";
import { getStoredOwner } from "../../../lib/auth";
import { useAuthGuard } from "../../../lib/useAuthGuard";

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
}

export default function DashboardPage() {
  const router = useRouter();
  const { locale } = useAuthGuard();
  const [data, setData]       = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
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
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="p-6 bg-red-50 dark:bg-red-950/30 rounded-3xl border border-red-100 dark:border-red-900 flex items-center gap-4 text-red-600 max-w-md">
          <AlertCircle className="w-8 h-8 shrink-0" />
          <div>
            <p className="font-black">Impossible de charger le tableau de bord</p>
            <p className="text-sm font-medium mt-1">{error}</p>
          </div>
        </div>
        <button
          onClick={() => { setError(null); setLoading(true); fetchApi<OverviewData>("/stats/overview").then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false)); }}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const stats = data!;
  const ownerName = owner?.firstName ?? "Propriétaire";

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Bienvenue, {ownerName} 👋
        </h1>
        <p className="text-slate-500 font-bold text-lg">
          Voici les performances de vos biens ce mois-ci.
        </p>
      </header>

      <KPIStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Upcoming Bookings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Prochaines arrivées
            </h2>
            <button
              onClick={() => router.push(`/${locale}/calendrier`)}
              className="text-blue-600 font-black text-sm flex items-center gap-2 hover:gap-3 transition-all"
            >
              Voir tout <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {stats.upcomingBookings.length === 0 ? (
            <div className="p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-slate-400 font-medium">Aucune arrivée prochaine</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.upcomingBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  whileHover={{ x: 10 }}
                  className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 dark:text-white text-lg">
                        {booking.guestFirstName} {booking.guestLastName}
                      </h3>
                      <p className="text-slate-500 font-bold text-sm uppercase">
                        {booking.property.titleFr}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black mb-1">
                      <CalendarDays className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        {new Date(booking.checkIn).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                        {" — "}
                        {new Date(booking.checkOut).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <span className="text-xs font-black px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full">
                      Confirmé
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Actions */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Actions rapides
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => router.push(`/${locale}/calendrier`)}
              className="w-full p-6 bg-blue-600 text-white rounded-[2rem] font-black text-left shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform active:scale-95"
            >
              <span className="block text-blue-200 text-xs uppercase mb-1">Calendrier</span>
              Bloquer des dates
            </button>
            <button
              onClick={() => router.push(`/${locale}/paiements`)}
              className="w-full p-6 bg-slate-900 text-white rounded-[2rem] font-black text-left border border-slate-800 hover:scale-105 transition-transform active:scale-95"
            >
              <span className="block text-slate-500 text-xs uppercase mb-1">Finances</span>
              Historique des paiements
            </button>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
            <h3 className="text-xl font-black mb-4">Besoin d'aide ?</h3>
            <p className="text-blue-100 font-medium mb-6 text-sm">
              Votre gestionnaire dédié est disponible pour répondre à toutes vos questions.
            </p>
            <button className="w-full py-4 bg-white text-blue-700 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-colors">
              Contacter Welqo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
