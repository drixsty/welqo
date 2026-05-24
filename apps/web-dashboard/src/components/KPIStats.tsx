"use client";

import React from "react";
import { motion } from "framer-motion";
import { Euro, CalendarCheck, TrendingUp, BarChart3 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendType?: "positive" | "negative";
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  trendType,
}: StatCardProps) => (
  <motion.div variants={item}>
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="p-1.5 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700">
          <Icon className="w-3.5 h-3.5" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-lg flex items-center gap-0.5",
              trendType === "positive"
                ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10"
                : "text-primary bg-primary/5 dark:bg-primary/10",
            )}
          >
            {trendType === "positive" ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">
        {label}
      </p>
      <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
        {value}
      </p>
    </div>
  </motion.div>
);

export const KPIStats = ({ stats }: { stats: any }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
    >
      <StatCard
        label="Revenu total"
        value={`${stats.totalRevenue.toLocaleString()}€`}
        icon={Euro}
        trend="+12.4%"
        trendType="positive"
      />
      <StatCard
        label="Taux d'occupation"
        value={`${stats.occupancyRate}%`}
        icon={CalendarCheck}
        trend="+5.2%"
        trendType="positive"
      />
      <StatCard
        label="Prix moyen / nuit"
        value={`${stats.adr}€`}
        icon={TrendingUp}
        trend="-2.1%"
        trendType="negative"
      />
      <StatCard label="Performance marché" value="Top 5%" icon={BarChart3} />
    </motion.div>
  );
};
