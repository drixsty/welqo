"use client";

import React, { useState, useMemo } from "react";

const QUARTIERS = [
  { label: "Vieux-Lille",        base: 2100 },
  { label: "Euralille / Centre", base: 1900 },
  { label: "Wazemmes",           base: 1650 },
  { label: "Vauban",             base: 1480 },
  { label: "Moulins",            base: 1350 },
];

const PIECES_OPTIONS = [
  { label: "Studio",   value: 0, mult: 0.70 },
  { label: "T2",       value: 1, mult: 1.00 },
  { label: "T3",       value: 2, mult: 1.35 },
  { label: "T4+",      value: 3, mult: 1.65 },
];

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

export function RevenueSimulator() {
  const [quartierIdx, setQuartierIdx] = useState(0);
  const [piecesIdx,   setPiecesIdx]   = useState(1);
  const [surface,     setSurface]     = useState(45);

  const { revenuSolo, revenuWelqo, gain, annual } = useMemo(() => {
    const base     = QUARTIERS[quartierIdx].base;
    const piecesMult = PIECES_OPTIONS[piecesIdx].mult;
    const surfMult = surface < 30 ? 0.75 : surface < 55 ? 1 : surface < 80 ? 1.22 : 1.5;
    const raw      = base * piecesMult * surfMult;
    const solo     = Math.round(raw * 0.68);
    const welqo    = Math.round(raw * 0.83);
    return {
      revenuSolo:  solo,
      revenuWelqo: welqo,
      gain:        welqo - solo,
      annual:      welqo * 12,
    };
  }, [quartierIdx, piecesIdx, surface]);

  const gainPct = Math.round(((revenuWelqo - revenuSolo) / revenuSolo) * 100);
  const welqoBarPct = 100;
  const soloBarPct  = Math.round((revenuSolo / revenuWelqo) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 md:px-10 py-6">
        <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-1">Simulateur de revenus</p>
        <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
          Estimez votre potentiel locatif à Lille
        </h3>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quartier */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">
              Quartier
            </label>
            <div className="relative">
              <select
                value={quartierIdx}
                onChange={(e) => setQuartierIdx(Number(e.currentTarget.value))}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {QUARTIERS.map((q, i) => (
                  <option key={q.label} value={i}>{q.label}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Pièces */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">
              Type de bien
            </label>
            <div className="grid grid-cols-4 gap-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
              {PIECES_OPTIONS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setPiecesIdx(i)}
                  className={`py-2 rounded-lg text-xs font-black transition-all ${
                    piecesIdx === i
                      ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Surface */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">
              Surface — <span className="text-blue-600">{surface} m²</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={18}
                max={150}
                step={5}
                value={surface}
                onChange={(e) => setSurface(Number(e.currentTarget.value))}
                className="flex-1 accent-blue-600 cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>18 m²</span><span>150 m²</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Solo */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-slate-400 rounded-full" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Gestion en solo</p>
            </div>
            <p className="text-3xl font-black text-slate-600 dark:text-slate-300 tracking-tighter">
              {fmt(revenuSolo)} €
              <span className="text-sm font-medium text-slate-400 ml-1">/ mois</span>
            </p>
            <div className="mt-3 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-400 rounded-full transition-all duration-700"
                style={{ width: `${soloBarPct}%` }}
              />
            </div>
          </div>

          {/* Welqo */}
          <div className="p-5 bg-blue-600 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <p className="text-xs font-black uppercase tracking-widest text-blue-100">Avec Welqo</p>
                </div>
                <span className="px-2 py-0.5 bg-white/20 text-white rounded-full text-[10px] font-black">
                  +{gainPct}%
                </span>
              </div>
              <p className="text-3xl font-black text-white tracking-tighter">
                {fmt(revenuWelqo)} €
                <span className="text-sm font-medium text-blue-200 ml-1">/ mois</span>
              </p>
              <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700"
                  style={{ width: `${welqoBarPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter">+{fmt(gain)} €</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">gain mensuel</p>
          </div>
          <div className="text-center border-x border-slate-100 dark:border-slate-800">
            <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{fmt(annual)} €</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">revenus annuels</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-black text-emerald-600 tracking-tighter">+{gainPct}%</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">vs gestion solo</p>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 text-center">
          Estimation basée sur les données marché Welqo / AirDNA T1 2025 · Résultats nets après commission.
        </p>
      </div>
    </div>
  );
}
