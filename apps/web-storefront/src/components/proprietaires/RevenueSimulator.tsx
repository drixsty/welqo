"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    const surfMult = surface < 30 ? 0.75 : surface < 55 ? 1 : surface < 80 ? 1.22 : 1.5;
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
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 px-6 py-6 border-b border-slate-800">
        <p className="text-primary text-xs font-bold mb-1 uppercase tracking-widest">
          Outil de simulation
        </p>
        <h3 className="text-white text-xl font-bold tracking-tight">
          Estimation de revenus <span className="text-primary">Bassin Minier</span>
        </h3>
      </div>

      <div className="p-6 space-y-8">
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Localisation</label>
            <div className="relative" ref={cityRef}>
              <button
                type="button"
                onClick={toggleCity}
                className={`w-full flex items-center gap-3 pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-950 border rounded-md text-sm font-bold text-left transition-all ${
                  isCityOpen 
                    ? "border-primary ring-1 ring-primary/20 bg-white dark:bg-slate-900" 
                    : "border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="truncate">{VILLES[villeIdx].label}</span>
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 ${isCityOpen ? "rotate-180" : ""}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence>
                {isCityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: openUp ? -10 : 10, scale: 0.95 }}
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
                          className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-bold transition-colors ${
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

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Typologie du bien</label>
            <div className="grid grid-cols-4 gap-1 bg-slate-50 dark:bg-slate-950 rounded-md p-1 border border-slate-200 dark:border-slate-800">
              {PIECES_OPTIONS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setPiecesIdx(i)}
                  className={`py-1.5 rounded text-[11px] font-bold transition-all ${
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
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1">Gestion autonome</p>
              <p className="text-2xl font-bold text-slate-500 tracking-tighter">{fmt(revenuSolo)}€ <span className="text-xs font-medium">/ mois</span></p>
            </div>
            <div className="h-12 w-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-lg border border-primary/30 flex justify-between items-center relative overflow-hidden shadow-lg shadow-primary/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-sm font-bold text-primary">Welqo Management</p>
                <span className="text-[10px] font-black bg-primary text-white px-2 py-0.5 rounded shadow-sm">+{gainPct}%</span>
              </div>
              <p className="text-4xl font-bold tracking-tighter">{fmt(revenuWelqo)}€ <span className="text-sm text-slate-400 font-medium">/ mois</span></p>
            </div>
            <div className="h-14 w-1.5 bg-primary rounded-full relative z-10 shadow-[0_0_12px_rgba(230,126,34,0.5)]" />
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-3 gap-2 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <div>
            <p className="text-2xl font-bold text-primary tracking-tighter">+{fmt(gain)}€</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Gain mensuel</p>
          </div>
          <div className="border-x border-slate-100 dark:border-slate-800">
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter">{fmt(annual)}€</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Revenus annuels</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-500 tracking-tighter">+{gainPct}%</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
