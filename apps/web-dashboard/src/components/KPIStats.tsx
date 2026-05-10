"use client";

import React from "react";
import { motion } from "framer-motion";
import { Euro, CalendarCheck, TrendingUp, BarChart3 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LuxuryCard } from "@welqo/ui";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendType?: "positive" | "negative";
  colorClass: string;
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  trendType,
  colorClass,
}: StatCardProps) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <LuxuryCard className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700",
            colorClass.includes("terracotta")
              ? "text-welqo-terracotta"
              : "text-slate-600 dark:text-slate-400",
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        {trend && (
          <div
            className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1",
              trendType === "positive"
                ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10"
                : "text-welqo-terracotta bg-welqo-terracotta/5 dark:bg-welqo-terracotta/10",
            )}
          >
            {trendType === "positive" ? "↑" : "↓"} {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {value}
        </p>
      </div>
    </LuxuryCard>
  </motion.div>
);

export const KPIStats = ({ stats }: { stats: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard
        label="Revenu Total"
        value={`${stats.totalRevenue.toLocaleString()}€`}
        icon={Euro}
        trend="+12.4%"
        trendType="positive"
        colorClass="bg-welqo-terracotta text-welqo-terracotta"
      />
      <StatCard
        label="Taux d'Occupation"
        value={`${stats.occupancyRate}%`}
        icon={CalendarCheck}
        trend="+5.2%"
        trendType="positive"
        colorClass="bg-welqo-anthracite text-welqo-anthracite dark:text-welqo-cream"
      />
      <StatCard
        label="Prix Moyen (ADR)"
        value={`${stats.adr}€`}
        icon={TrendingUp}
        trend="-2.1%"
        trendType="negative"
        colorClass="bg-welqo-terracotta text-welqo-terracotta"
      />
      <StatCard
        label="Performance Marché"
        value="Top 5%"
        icon={BarChart3}
        colorClass="bg-emerald-500 text-emerald-500"
      />
    </div>
  );
};
