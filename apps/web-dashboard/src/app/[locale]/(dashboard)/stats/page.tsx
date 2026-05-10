"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Euro,
  CalendarCheck,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { fetchApi } from "../../../../lib/api";
import { useAuthGuard } from "../../../../lib/useAuthGuard";

interface OverviewData {
  totalRevenue: number;
  occupancyRate: number;
  adr: number;
  upcomingBookings: { id: string }[];
}

function StatBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          {label}
        </span>
        <span className={`text-sm font-black ${color}`}>
          {value.toFixed(1)}%
        </span>
      </div>
      <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
        />
      </div>
    </div>
  );
}

export default function StatsPage() {
  useAuthGuard();
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<OverviewData>("/stats/overview")
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="p-6 bg-red-50 dark:bg-red-950/30 rounded-3xl border border-red-100 dark:border-red-900 flex items-center gap-4 text-red-600 max-w-md">
          <AlertCircle className="w-7 h-7 shrink-0" />
          <p className="font-bold">{error ?? "Erreur de chargement"}</p>
        </div>
      </div>
    );
  }

  const kpis = [
    {
      label: "Revenu total",
      value: `${data.totalRevenue.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`,
      icon: Euro,
      color: "text-slate-900 dark:text-white",
      bg: "bg-slate-100 dark:bg-slate-800",
      desc: "Depuis le début",
    },
    {
      label: "Taux d'occupation",
      value: `${data.occupancyRate}%`,
      icon: CalendarCheck,
      color: "text-welqo-terracotta",
      bg: "bg-welqo-terracotta/10",
      desc: "30 derniers jours",
    },
    {
      label: "Prix moyen / nuit",
      value: `${data.adr} €`,
      icon: TrendingUp,
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-50 dark:bg-slate-800/50",
      desc: "ADR — 30 derniers jours",
    },
    {
      label: "Prochaines arrivées",
      value: data.upcomingBookings.length,
      icon: BarChart3,
      color: "text-slate-900 dark:text-white",
      bg: "bg-slate-200 dark:bg-slate-700",
      desc: "Réservations confirmées",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Performances
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Indicateurs clés de performance de vos biens immobiliers.
        </p>
      </header>

      {/* KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div
              className={`w-10 h-10 ${k.bg} ${k.color} rounded-lg flex items-center justify-center mb-4`}
            >
              <k.icon className="w-5 h-5" />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              {k.label}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {k.value}
            </p>
            <p className="text-slate-400 text-[10px] font-medium mt-2">
              {k.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Occupancy breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">
          Benchmark d'occupation
        </h2>
        <div className="space-y-6 max-w-lg">
          <StatBar
            label="Votre bien"
            value={data.occupancyRate}
            max={100}
            color="text-welqo-terracotta"
          />
          <StatBar
            label="Moyenne marché"
            value={72}
            max={100}
            color="text-slate-400"
          />
          <StatBar
            label="Top performers"
            value={91}
            max={100}
            color="text-slate-900 dark:text-white"
          />
        </div>
        <p className="text-slate-400 text-xs font-medium mt-6">
          Données marché à titre indicatif. Mis à jour mensuellement.
        </p>
      </div>
    </div>
  );
}
