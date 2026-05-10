"use client";

import React, { useState, useMemo } from "react";

const VILLES = [
  { label: "Arras (Centre / Grand-Place)", base: 1650 },
  { label: "Lens (Stade Bollaert / Louvre)", base: 1480 },
  { label: "Béthune (Centre-Ville)", base: 1350 },
  { label: "Douai (Beffroi)", base: 1250 },
];

const PIECES_OPTIONS = [
  { label: "Studio", value: 0, mult: 0.75 },
  { label: "T2", value: 1, mult: 1.0 },
  { label: "T3", value: 2, mult: 1.4 },
  { label: "T4+", value: 3, mult: 1.75 },
];

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

export function RevenueSimulator() {
  const [villeIdx, setVilleIdx] = useState(0);
  const [piecesIdx, setPiecesIdx] = useState(1);
  const [surface, setSurface] = useState(45);

  const { revenuSolo, revenuWelqo, gain, annual } = useMemo(() => {
    const base = VILLES[villeIdx].base;
    const piecesMult = PIECES_OPTIONS[piecesIdx].mult;
    const surfMult =
      surface < 30 ? 0.75 : surface < 55 ? 1 : surface < 80 ? 1.22 : 1.5;
    const raw = base * piecesMult * surfMult;
    const solo = Math.round(raw * 0.68);
    const welqo = Math.round(raw * 0.83);
    return {
      revenuSolo: solo,
      revenuWelqo: welqo,
      gain: welqo - solo,
      annual: welqo * 12,
    };
  }, [villeIdx, piecesIdx, surface]);

  const gainPct = Math.round(((revenuWelqo - revenuSolo) / revenuSolo) * 100);
  const welqoBarPct = 100;
  const soloBarPct = Math.round((revenuSolo / revenuWelqo) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-950 px-6 md:px-10 py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,85,55,0.1),transparent_70%)]" />
        <div className="relative z-10">
          <p className="text-welqo-terracotta text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">
            Estimation de potentiel
          </p>
          <h3 className="text-white text-xl md:text-2xl font-bold tracking-tighter">
            Simulateur de revenus{" "}
            <span className="text-welqo-terracotta">Bassin Minier.</span>
          </h3>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quartier */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Ville
            </label>
            <div className="relative group">
              <select
                value={villeIdx}
                onChange={(e) => setVilleIdx(Number(e.currentTarget.value))}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-welqo-terracotta/50 transition-all cursor-pointer"
              >
                {VILLES.map((v, i) => (
                  <option key={v.label} value={i}>
                    {v.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-welqo-terracotta transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Pièces */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Type de bien
            </label>
            <div className="grid grid-cols-4 gap-1 bg-slate-50 dark:bg-slate-800 rounded-lg p-1 border border-slate-100 dark:border-slate-800">
              {PIECES_OPTIONS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setPiecesIdx(i)}
                  className={`py-2 rounded-lg text-[11px] font-bold transition-all ${
                    piecesIdx === i
                      ? "bg-white dark:bg-slate-700 text-welqo-terracotta shadow-sm border border-slate-100 dark:border-slate-600"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Surface */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex justify-between">
              Surface <span>{surface} m²</span>
            </label>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="range"
                min={18}
                max={150}
                step={5}
                value={surface}
                onChange={(e) => setSurface(Number(e.currentTarget.value))}
                className="flex-1 accent-welqo-terracotta cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
              <span>18 m²</span>
              <span>150 m²</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Solo */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Gestion en solo
              </p>
            </div>
            <p className="text-3xl font-bold text-slate-700 dark:text-slate-200 tracking-tighter">
              {fmt(revenuSolo)} €
              <span className="text-xs font-medium text-slate-400 ml-1.5 uppercase tracking-wide">
                / mois
              </span>
            </p>
            <div className="mt-4 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${soloBarPct}%` }}
              />
            </div>
          </div>

          {/* Welqo */}
          <div className="p-6 bg-slate-950 rounded-lg border border-welqo-terracotta/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,85,55,0.1),transparent_70%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-welqo-terracotta rounded-full shadow-[0_0_8px_rgba(212,85,55,0.5)]" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-welqo-terracotta">
                    Avec Welqo
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-welqo-terracotta text-white rounded-full text-[10px] font-bold">
                  +{gainPct}%
                </span>
              </div>
              <p className="text-3xl font-bold text-white tracking-tighter">
                {fmt(revenuWelqo)} €
                <span className="text-xs font-medium text-slate-400 ml-1.5 uppercase tracking-wide">
                  / mois
                </span>
              </p>
              <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-welqo-terracotta rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${welqoBarPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-welqo-terracotta tracking-tighter">
              +{fmt(gain)} €
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              gain mensuel
            </p>
          </div>
          <div className="text-center border-x border-slate-100 dark:border-slate-800">
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tighter">
              {fmt(annual)} €
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              revenus annuels
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-emerald-500 tracking-tighter">
              +{gainPct}%
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              vs gestion solo
            </p>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed">
          Estimation basée sur les données marché Welqo / AirDNA T1 2025
          <br />
          Résultats nets après commission de conciergerie.
        </p>
      </div>
    </div>
  );
}
