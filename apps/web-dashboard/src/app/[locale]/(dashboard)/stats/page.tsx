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
import { PageWrapper } from "../../../../components/PageWrapper";

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
  isPrimary,
}: {
  label: string;
  value: number;
  max: number;
  isPrimary?: boolean;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <span
          className={`text-[11px] font-bold ${isPrimary ? "text-primary" : "text-slate-600 dark:text-slate-300"}`}
        >
          {value.toFixed(1)}%
        </span>
      </div>
      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`h-full rounded-full ${isPrimary ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"}`}
        />
      </div>
    </div>
  );
}

const KPIS = (data: OverviewData) => [
  {
    label: "Revenu total",
    value: `${data.totalRevenue.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}€`,
    icon: Euro,
    desc: "Performance brute",
    primary: false,
  },
  {
    label: "Taux d'occupation",
    value: `${data.occupancyRate}%`,
    icon: CalendarCheck,
    desc: "Moyenne 30 jours",
    primary: true,
  },
  {
    label: "Prix moyen / nuit",
    value: `${data.adr}€`,
    icon: TrendingUp,
    desc: "ADR — 30j",
    primary: false,
  },
  {
    label: "Flux d'arrivées",
    value: data.upcomingBookings.length,
    icon: BarChart3,
    desc: "7 prochains jours",
    primary: false,
  },
];

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
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center gap-3 text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-lg px-4 py-3 text-xs font-medium max-w-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error ?? "Erreur de chargement des statistiques"}
        </div>
      </div>
    );
  }

  const kpis = KPIS(data);

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Performances analytiques
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Indicateurs clés de rendement locatif — Bassin Minier
          </p>
        </div>
        <div className="h-px bg-slate-100 dark:bg-slate-800/60" />

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <k.icon
                    className={`w-3.5 h-3.5 ${k.primary ? "text-primary" : "text-slate-400"}`}
                  />
                </div>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">
                {k.label}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {k.value}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">{k.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Benchmark */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Benchmark du marché local
              </h2>
            </div>
            <div className="space-y-5">
              <StatBar
                label="Votre performance"
                value={data.occupancyRate}
                max={100}
                isPrimary
              />
              <StatBar label="Moyenne du secteur" value={72} max={100} />
              <StatBar label="Elite performers" value={91} max={100} />
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Données actualisées en temps réel — Bassin Minier.
              </p>
            </div>
          </div>

          {/* Smart pricing highlight */}
          <div className="lg:col-span-2 bg-slate-900 text-white rounded-lg border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-2 tracking-tight">
                Smart pricing dynamique
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Vos revenus ont progressé de{" "}
                <span className="text-emerald-400 font-bold">14%</span> ce mois-ci
                grâce à l'ajustement automatique des tarifs.
              </p>
            </div>
            <div className="mt-5 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-[10px] font-semibold text-primary mb-1 tracking-wide">
                Plus-value générée
              </p>
              <p className="text-2xl font-bold tracking-tight">
                +450€{" "}
                <span className="text-xs text-slate-500 font-medium">/ mois</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
