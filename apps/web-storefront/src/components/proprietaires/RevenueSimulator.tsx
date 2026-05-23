"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, MapPin, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../../lib/tracking";

const VILLES = [
  { label: "Hauts-de-France (Lille / Métropole)", base: 2150 },
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

export function RevenueSimulator({ locale = "fr" }: { locale?: string }) {
  const isFr = locale === "fr";
  const [villeIdx, setVilleIdx] = useState(0);
  const [piecesIdx, setPiecesIdx] = useState(1);
  const [surface, setSurface] = useState(45);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const checkPosition = () => {
    if (cityRef.current) {
      const rect = cityRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 200; // Estimated height
      setOpenUp(spaceBelow < dropdownHeight && rect.top > dropdownHeight);
    }
  };

  const toggleCity = () => {
    if (!isCityOpen) checkPosition();
    setIsCityOpen(!isCityOpen);
  };

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

  return (
    <div
      id="simulator"
      className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="bg-slate-900 px-5 py-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary text-[10px] font-bold mb-0.5 tracking-widest">
              Outil de simulation
            </p>
            <h3 className="text-white text-lg font-bold tracking-tight">
              Estimation de revenus{" "}
              <span className="text-primary">Hauts-de-France</span>
            </h3>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-slate-500 text-[10px] font-medium italic">
              Mise à jour : Avril 2026
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.1fr] gap-6 lg:gap-10">
          {/* Left Side: Inputs */}
          <div className="space-y-5">
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                Localisation
              </label>
              <div className="relative" ref={cityRef}>
                <button
                  type="button"
                  onClick={toggleCity}
                  className={`w-full flex items-center gap-3 pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border rounded-md text-sm font-bold text-left transition-all ${
                    isCityOpen
                      ? "border-primary ring-1 ring-primary/20 bg-white dark:bg-slate-900"
                      : "border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="truncate">{VILLES[villeIdx].label}</span>
                  <div
                    className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 ${isCityOpen ? "rotate-180" : ""}`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isCityOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: openUp ? -10 : 10,
                        scale: 0.95,
                      }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: openUp ? -10 : 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className={`absolute left-0 right-0 ${
                        openUp ? "bottom-full mb-2" : "top-full mt-2"
                      } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl overflow-hidden z-[60]`}
                    >
                      <div className="p-1">
                        {VILLES.map((v, i) => (
                          <button
                            key={v.label}
                            type="button"
                            onClick={() => {
                              setVilleIdx(i);
                              setIsCityOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                              villeIdx === i
                                ? "bg-primary text-white"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            {v.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                Typologie du bien
              </label>
              <div className="grid grid-cols-4 gap-1 bg-slate-50 dark:bg-slate-950 rounded-md p-1 border border-slate-200 dark:border-slate-800">
                {PIECES_OPTIONS.map((p, i) => (
                  <button
                    key={p.label}
                    onClick={() => setPiecesIdx(i)}
                    className={`py-2 rounded text-[11px] font-bold transition-all ${
                      piecesIdx === i
                        ? "bg-white dark:bg-slate-900 text-primary shadow-sm border border-slate-200 dark:border-slate-800"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800/50">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider">
                    Surface estimée
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {surface} m²
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={surface}
                  onChange={(e) => setSurface(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Results */}
          <div className="flex flex-col h-full">
            <div className="flex-grow space-y-3">
              {/* Solo Card */}
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center opacity-80">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 tracking-wider mb-0.5">
                    Gestion en solo
                  </p>
                  <p className="text-xl font-bold text-slate-500 tracking-tighter">
                    {fmt(revenuSolo)}€{" "}
                    <span className="text-[10px] font-medium">/ mois</span>
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  Standard
                </div>
              </div>

              {/* Welqo Card */}
              <div className="px-5 py-4 bg-slate-900 text-white rounded-lg border border-primary/40 relative overflow-hidden shadow-lg shadow-primary/10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-[10px] font-bold text-primary tracking-widest">
                      Welqo management
                    </p>
                    <span className="text-[9px] font-black bg-primary text-white px-1.5 py-0.5 rounded shadow-sm">
                      +{gainPct}%
                    </span>
                  </div>
                  <p className="text-3xl font-bold tracking-tighter">
                    {fmt(revenuWelqo)}€{" "}
                    <span className="text-xs text-slate-400 font-medium">
                      / mois
                    </span>
                  </p>
                </div>
              </div>

              {/* Totals Grid */}
              <div className="grid grid-cols-2 gap-3 py-1">
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-center">
                  <p className="text-sm font-bold text-emerald-500">
                    +{fmt(gain)}€
                  </p>
                  <p className="text-[8px] text-slate-500 font-bold tracking-tighter">
                    Gain mensuel net
                  </p>
                </div>
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg text-center">
                  <p className="text-sm font-bold text-primary">
                    {fmt(annual)}€
                  </p>
                  <p className="text-[8px] text-slate-500 font-bold tracking-tighter">
                    Potentiel annuel
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => {
                  trackEvent("owner_simulator_complete", {
                    city: VILLES[villeIdx].label,
                    revenue: revenuWelqo,
                    property_type: PIECES_OPTIONS[piecesIdx].label,
                  });
                  window.location.href = `mailto:contact@welqo.fr?subject=Estimation Welqo: ${revenuWelqo}€&body=Bonjour, j'ai simulé un revenu de ${revenuWelqo}€ pour mon bien à ${VILLES[villeIdx].label}.`;
                }}
                className="w-full py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-welqo-terracotta hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                {isFr
                  ? `Sécuriser mes ${fmt(revenuWelqo)}€`
                  : `Secure my ${fmt(revenuWelqo)}€`}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="mt-2.5 text-[8px] text-slate-400 text-center italic opacity-70 leading-tight">
                * Estimation basée sur les données du marché local 2024-2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
