"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, MapPin, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../../lib/tracking";
import { useTranslations } from "next-intl";

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

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const duration = 400; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing function (easeOutQuad)
      const ease = progress * (2 - progress);
      const current = Math.round(startValue + (value - startValue) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return <>{fmt(displayValue)}</>;
}

export function RevenueSimulator({
  locale: _locale = "fr",
}: {
  locale?: string;
}) {
  const t = useTranslations("RevenueSimulator");
  const [villeIdx, setVilleIdx] = useState(0);
  const [piecesIdx, setPiecesIdx] = useState(1);
  const [surface, setSurface] = useState(45);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<1 | 2 | 3>(3);
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

  const {
    yS1,
    yS2,
    yS3,
    yW1,
    yW2,
    yW3,
    soloLinePath,
    soloAreaPath,
    welqoLinePath,
    welqoAreaPath,
    maxYVal,
  } = useMemo(() => {
    const s1 = revenuSolo * 12 * 1;
    const s2 = revenuSolo * 12 * 2;
    const s3 = revenuSolo * 12 * 3;
    const w1 = revenuWelqo * 12 * 1;
    const w2 = revenuWelqo * 12 * 2;
    const w3 = revenuWelqo * 12 * 3;

    const maxVal = w3;
    const scaleY = (val: number) => {
      if (maxVal === 0) return 100;
      return 110 - (val / maxVal) * 90;
    };

    const yS1_val = scaleY(s1);
    const yS2_val = scaleY(s2);
    const yS3_val = scaleY(s3);
    const yW1_val = scaleY(w1);
    const yW2_val = scaleY(w2);
    const yW3_val = scaleY(w3);

    // Dotted Solo Bezier Path
    const sLine = `M 40 ${yS1_val} C 95 ${yS1_val}, 95 ${yS2_val}, 150 ${yS2_val} C 205 ${yS2_val}, 205 ${yS3_val}, 260 ${yS3_val}`;
    const sArea = `M 40 110 L 40 ${yS1_val} C 95 ${yS1_val}, 95 ${yS2_val}, 150 ${yS2_val} C 205 ${yS2_val}, 205 ${yS3_val}, 260 ${yS3_val} L 260 110 Z`;

    // Solid Welqo Bezier Path
    const wLine = `M 40 ${yW1_val} C 95 ${yW1_val}, 95 ${yW2_val}, 150 ${yW2_val} C 205 ${yW2_val}, 205 ${yW3_val}, 260 ${yW3_val}`;
    const wArea = `M 40 110 L 40 ${yW1_val} C 95 ${yW1_val}, 95 ${yW2_val}, 150 ${yW2_val} C 205 ${yW2_val}, 205 ${yW3_val}, 260 ${yW3_val} L 260 110 Z`;

    return {
      yS1: yS1_val,
      yS2: yS2_val,
      yS3: yS3_val,
      yW1: yW1_val,
      yW2: yW2_val,
      yW3: yW3_val,
      soloLinePath: sLine,
      soloAreaPath: sArea,
      welqoLinePath: wLine,
      welqoAreaPath: wArea,
      maxYVal: maxVal,
    };
  }, [revenuSolo, revenuWelqo]);

  const getY = (val: number) => {
    if (maxYVal === 0) return 100;
    return 110 - (val / maxYVal) * 90;
  };

  return (
    <div
      id="simulator"
      className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm"
    >
      {/* Header */}
      <div className="bg-slate-900 px-5 py-4 border-b border-slate-800 rounded-t-lg">
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
                  className={`w-full flex items-center gap-3 pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border rounded-md text-sm font-bold text-left transition-all cursor-pointer ${
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
                            className={`w-full text-left px-4 py-2 rounded-md text-sm font-bold transition-colors cursor-pointer ${
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
                    className={`py-2 rounded text-[11px] font-bold transition-all cursor-pointer ${
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
                    <AnimatedNumber value={revenuSolo} />€{" "}
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
                    <AnimatedNumber value={revenuWelqo} />€{" "}
                    <span className="text-xs text-slate-400 font-medium">
                      / mois
                    </span>
                  </p>
                </div>
              </div>

              {/* Interactive SVG Projection Card - IMMERSION PAROXYSM */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-lg border border-slate-100 dark:border-slate-800 flex flex-col gap-2 relative overflow-hidden backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    Projection cumulative
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((y) => (
                      <button
                        key={y}
                        type="button"
                        onMouseEnter={() => setHoveredYear(y as 1 | 2 | 3)}
                        onClick={() => setHoveredYear(y as 1 | 2 | 3)}
                        className={`px-2 py-0.5 rounded text-[9px] font-black transition-all cursor-pointer ${
                          hoveredYear === y
                            ? "bg-primary text-white shadow-sm"
                            : "text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        An {y}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart SVG */}
                <div className="relative h-28 w-full mt-1">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 300 120"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="welqoGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#d45537"
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#d45537"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient id="soloGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#64748b"
                          stopOpacity="0.1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#64748b"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    <line
                      x1="40"
                      y1="110"
                      x2="260"
                      y2="110"
                      stroke="#f1f5f9"
                      strokeWidth="1"
                      className="dark:stroke-slate-800/50"
                    />
                    <line
                      x1="40"
                      y1="60"
                      x2="260"
                      y2="60"
                      stroke="#f1f5f9"
                      strokeWidth="1"
                      className="dark:stroke-slate-800/30"
                      strokeDasharray="3"
                    />
                    <line
                      x1="40"
                      y1="10"
                      x2="260"
                      y2="10"
                      stroke="#f1f5f9"
                      strokeWidth="1"
                      className="dark:stroke-slate-800/30"
                      strokeDasharray="3"
                    />

                    {/* Solo Area & Line */}
                    <motion.path
                      d={soloAreaPath}
                      fill="url(#soloGrad)"
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                    />
                    <motion.path
                      d={soloLinePath}
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                    />

                    {/* Welqo Area & Line */}
                    <motion.path
                      d={welqoAreaPath}
                      fill="url(#welqoGrad)"
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                    />
                    <motion.path
                      d={welqoLinePath}
                      fill="none"
                      stroke="#d45537"
                      strokeWidth="2.5"
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                    />

                    {/* Year vertical marker lines */}
                    {[1, 2, 3].map((y) => {
                      const x = y === 1 ? 40 : y === 2 ? 150 : 260;
                      const isActive = hoveredYear === y;
                      return (
                        <g key={y}>
                          {isActive && (
                            <line
                              x1={x}
                              y1="10"
                              x2={x}
                              y2="110"
                              stroke="#d45537"
                              strokeWidth="1"
                              strokeDasharray="2"
                              opacity="0.3"
                            />
                          )}
                          {/* Welqo Point */}
                          <circle
                            cx={x}
                            cy={getY(revenuWelqo * 12 * y)}
                            r={isActive ? "5" : "3.5"}
                            fill="#d45537"
                            stroke="white"
                            strokeWidth="1.5"
                            className="transition-all duration-200"
                          />
                          {/* Solo Point */}
                          <circle
                            cx={x}
                            cy={getY(revenuSolo * 12 * y)}
                            r={isActive ? "4" : "3"}
                            fill="#64748b"
                            stroke="white"
                            strokeWidth="1"
                            className="transition-all duration-200"
                          />
                          {/* Interactive invisible hit areas */}
                          <circle
                            cx={x}
                            cy={isActive ? getY(revenuWelqo * 12 * y) : 60}
                            r="20"
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredYear(y as 1 | 2 | 3)}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* X Axis Labels */}
                  <div className="absolute bottom-[-10px] left-0 right-0 flex justify-between px-6 text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <span>Année 1</span>
                    <span>Année 2</span>
                    <span>Année 3</span>
                  </div>
                </div>

                {/* Tooltip detail values */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-center">
                    <p className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider">
                      Gestion en Solo
                    </p>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">
                      <AnimatedNumber value={revenuSolo * 12 * hoveredYear} /> €
                    </p>
                  </div>
                  <div className="text-center border-x border-slate-100 dark:border-slate-800">
                    <p className="text-[7.5px] font-black text-primary uppercase tracking-wider">
                      Gestion Welqo
                    </p>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">
                      <AnimatedNumber value={revenuWelqo * 12 * hoveredYear} />{" "}
                      €
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[7.5px] font-bold text-emerald-500 uppercase tracking-wider">
                      Gain Net Welqo
                    </p>
                    <p className="text-xs font-extrabold text-emerald-500 mt-0.5">
                      +
                      <AnimatedNumber
                        value={(revenuWelqo - revenuSolo) * 12 * hoveredYear}
                      />{" "}
                      €
                    </p>
                  </div>
                </div>
              </div>

              {/* Totals Grid */}
              <div className="grid grid-cols-2 gap-3 py-1">
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-center">
                  <p className="text-sm font-bold text-emerald-500">
                    +<AnimatedNumber value={gain} />€
                  </p>
                  <p className="text-[8px] text-slate-500 font-bold tracking-tighter">
                    Gain mensuel net
                  </p>
                </div>
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg text-center">
                  <p className="text-sm font-bold text-primary">
                    <AnimatedNumber value={annual} />€
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
                className="w-full py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-welqo-terracotta hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                {t("secureRevenue", { amount: fmt(revenuWelqo) })}
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
