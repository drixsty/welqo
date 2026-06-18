"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Home, Star, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

const VILLES = [
  { label: "Lille", base: 2150, occupancy: 84, note: 4.9 },
  { label: "Arras", base: 1650, occupancy: 78, note: 4.8 },
  { label: "Lens", base: 1480, occupancy: 76, note: 4.8 },
  { label: "Béthune", base: 1350, occupancy: 74, note: 4.7 },
];

const PIECES_OPTIONS = [
  { label: "Studio", mult: 0.72 },
  { label: "T2 / Loft", mult: 1.0 },
  { label: "T3 / Maison", mult: 1.45 },
];

const PIECES_OPTIONS_EN = [
  { label: "Studio", mult: 0.72 },
  { label: "T2 / Loft", mult: 1.0 },
  { label: "T3 / House", mult: 1.45 },
];

const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const InteractiveHeroDashboard = ({
  locale: _locale = "fr",
}: {
  locale?: string;
}) => {
  const t = useTranslations("HeroDashboard");
  const [villeIdx, setVilleIdx] = useState(0);
  const [piecesIdx, setPiecesIdx] = useState(1);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number | null>(null);

  const isEn = _locale === "en";
  const monthsName = isEn ? MONTHS_EN : MONTHS_FR;
  const piecesOptions = isEn ? PIECES_OPTIONS_EN : PIECES_OPTIONS;

  // Computations
  const { revenue, occupancy, note, monthlyData } = useMemo(() => {
    const v = VILLES[villeIdx];
    const p = piecesOptions[piecesIdx];
    const baseRevenue = Math.round(v.base * p.mult);

    // Generate 12 months simulated seasonal data
    const monthlyData = [
      Math.round(baseRevenue * 0.85), // Jan
      Math.round(baseRevenue * 0.9), // Feb
      Math.round(baseRevenue * 0.95), // Mar
      Math.round(baseRevenue * 1.05), // Apr
      Math.round(baseRevenue * 1.15), // May
      Math.round(baseRevenue * 1.25), // Jun
      Math.round(baseRevenue * 1.3), // Jul
      Math.round(baseRevenue * 1.28), // Aug
      Math.round(baseRevenue * 1.1), // Sep
      Math.round(baseRevenue * 1.0), // Oct
      Math.round(baseRevenue * 0.9), // Nov
      Math.round(baseRevenue * 1.05), // Dec
    ];

    return {
      revenue: baseRevenue,
      occupancy: v.occupancy,
      note: v.note,
      monthlyData,
    };
  }, [villeIdx, piecesIdx]);

  const maxVal = Math.max(...monthlyData);

  // Computed displayed revenue (overall average vs selected month)
  const displayedRevenue = useMemo(() => {
    if (selectedMonthIdx !== null) {
      return monthlyData[selectedMonthIdx];
    }
    return revenue;
  }, [revenue, monthlyData, selectedMonthIdx]);

  // Simple formatter
  const formatVal = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Selector Controls just above the dashboard — Compact and Overflow-proof design */}
      <div className="flex items-center justify-between gap-2 mb-4 bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-md text-[8.5px] w-full">
        {/* Ville Select — Compact layout on a single row */}
        <div className="flex-1 flex items-center justify-between gap-0.5">
          {VILLES.map((v, i) => (
            <button
              key={v.label}
              onClick={() => {
                setVilleIdx(i);
                setSelectedMonthIdx(null); // Reset month select when city changes
              }}
              className={`flex-grow py-1.5 px-2 rounded-lg font-black tracking-wider transition-all duration-300 text-center ${
                villeIdx === i
                  ? "bg-welqo-terracotta text-white shadow-lg shadow-welqo-terracotta/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Type Select — Compact layout matching left side, separated by thin vertical line */}
        <div className="flex items-center justify-between gap-0.5 border-l border-white/10 pl-2 shrink-0">
          {piecesOptions.map((p, i) => (
            <button
              key={p.label}
              onClick={() => {
                setPiecesIdx(i);
                setSelectedMonthIdx(null); // Reset month select when pieces changes
              }}
              className={`py-1.5 px-2 rounded-lg font-black tracking-wider transition-all duration-300 text-center ${
                piecesIdx === i
                  ? "bg-white text-slate-950 shadow-lg shadow-white/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {p.label.split(" / ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Glass Dashboard Card */}
      <div className="relative overflow-hidden bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/80">
        {/* Glowing Halos inside the card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-welqo-terracotta/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Metric */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedMonthIdx ?? "avg"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-slate-500 text-[9px] font-black tracking-[0.2em]"
                >
                  {selectedMonthIdx !== null
                    ? `${t("estimatedRevenue")} — ${monthsName[selectedMonthIdx]}`
                    : t("avgMonthlyRevenue")}
                </motion.p>
              </AnimatePresence>
              <div className="flex items-baseline gap-2 leading-none">
                <motion.span
                  key={displayedRevenue}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-4xl font-extrabold tracking-tighter"
                >
                  {formatVal(displayedRevenue)} €
                </motion.span>
                <span className="text-emerald-400 text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded shrink-0">
                  +35% vs solo
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedMonthIdx(null)}
              className={`w-10 h-10 border rounded-xl flex items-center justify-center transition-all ${
                selectedMonthIdx !== null
                  ? "bg-welqo-terracotta text-white border-welqo-terracotta shadow-lg shadow-welqo-terracotta/25 scale-105"
                  : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              }`}
              title={t("resetAverage")}
            >
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>

          {/* 12-Month Interactive Sparkline/Bar Chart */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[8px] font-black text-slate-500 tracking-widest">
              <span>{t("seasonality")}</span>
              <span className="text-primary tracking-[0.15em]">
                Hauts-de-France / Métropole
              </span>
            </div>

            <div className="h-24 w-full flex items-end justify-between gap-1.5 pt-4">
              {monthlyData.map((val, idx) => {
                const heightPct = Math.max(
                  15,
                  Math.round((val / maxVal) * 100),
                );
                const months = [
                  "J",
                  "F",
                  "M",
                  "A",
                  "M",
                  "J",
                  "J",
                  "A",
                  "S",
                  "O",
                  "N",
                  "D",
                ];
                const isSelected = selectedMonthIdx === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedMonthIdx(isSelected ? null : idx);
                    }}
                    className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group focus:outline-none"
                  >
                    <div className="w-full relative h-full flex items-end">
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-slate-900 border border-white/10 px-2 py-0.5 rounded text-[8px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-20">
                        {formatVal(val)} €
                      </div>

                      {/* Animated Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          delay: idx * 0.02,
                        }}
                        className={`w-full rounded-sm transition-all duration-300 ${
                          isSelected
                            ? "bg-welqo-terracotta shadow-lg shadow-welqo-terracotta/40 scale-x-110"
                            : idx === 6
                              ? "bg-primary/80 group-hover:bg-primary"
                              : "bg-white/15 group-hover:bg-white/30"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[8px] font-black transition-colors ${
                        isSelected
                          ? "text-welqo-terracotta"
                          : "text-slate-500 group-hover:text-white"
                      }`}
                    >
                      {months[idx]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Metrices Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-slate-500 text-[8px] font-black tracking-widest leading-none">
                  {t("clientRating")}
                </p>
                <p className="text-white text-sm font-bold mt-1 leading-none">
                  {note} ⭐
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-500 text-[8px] font-black tracking-widest leading-none">
                  {t("occupancyRate")}
                </p>
                <p className="text-white text-sm font-bold mt-1 leading-none">
                  {occupancy} %
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Badge indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-lg text-[7px] font-black tracking-widest animate-pulse-soft">
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          {t("interactiveSimulator")}
        </div>
      </div>
    </div>
  );
};
