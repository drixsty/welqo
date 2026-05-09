"use client";

import React from "react";
import { motion } from "framer-motion";
import { Euro, CalendarCheck, TrendingUp, BarChart3 } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendType?: "positive" | "negative";
  color: string;
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  trendType,
  color,
}: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
  >
    <div className="flex justify-between items-start mb-6">
      <div
        className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.split("-")[1]}-600 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span
          className={`text-xs font-black px-3 py-1 rounded-full ${
            trendType === "positive"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-1">
      {label}
    </h3>
    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
      {value}
    </p>
  </motion.div>
);

export const KPIStats = ({ stats }: { stats: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <StatCard
        label="Revenu Total"
        value={`${stats.totalRevenue.toLocaleString()}€`}
        icon={Euro}
        trend="+12.4%"
        trendType="positive"
        color="bg-blue-500"
      />
      <StatCard
        label="Taux d'Occupation"
        value={`${stats.occupancyRate}%`}
        icon={CalendarCheck}
        trend="+5.2%"
        trendType="positive"
        color="bg-purple-500"
      />
      <StatCard
        label="Prix Moyen (ADR)"
        value={`${stats.adr}€`}
        icon={TrendingUp}
        trend="-2.1%"
        trendType="negative"
        color="bg-emerald-500"
      />
      <StatCard
        label="Performance"
        value="Top 5%"
        icon={BarChart3}
        color="bg-orange-500"
      />
    </div>
  );
};
