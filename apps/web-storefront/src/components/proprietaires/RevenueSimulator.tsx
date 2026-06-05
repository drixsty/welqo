"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, MapPin, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../../lib/tracking";
import { useTranslations } from "next-intl";

const VILLES_FR = [
  { label: "Hauts-de-France (Lille / Métropole)", base: 2150 },
  { label: "Arras (Centre / Grand-Place)", base: 1650 },
  { label: "Lens (Stade Bollaert / Louvre)", base: 1480 },
  { label: "Béthune (Centre-Ville)", base: 1350 },
  { label: "Douai (Beffroi)", base: 1250 },
];

const VILLES_EN = [
  { label: "Hauts-de-France (Lille / Metropole)", base: 2150 },
  { label: "Arras (City Center / Grand-Place)", base: 1650 },
  { label: "Lens (Bollaert Stadium / Louvre)", base: 1480 },
  { label: "Béthune (City Center)", base: 1350 },
  { label: "Douai (Belfry)", base: 1250 },
];

const PIECES_OPTIONS_FR = [
  { label: "Studio", value: 0, mult: 0.75 },
  { label: "T2", value: 1, mult: 1.0 },
  { label: "T3", value: 2, mult: 1.4 },
  { label: "T4+", value: 3, mult: 1.75 },
];

const PIECES_OPTIONS_EN = [
  { label: "Studio", value: 0, mult: 0.75 },
  { label: "1 Bed (T2)", value: 1, mult: 1.0 },
  { label: "2 Beds (T3)", value: 2, mult: 1.4 },
  { label: "3+ Beds (T4+)", value: 3, mult: 1.75 },
];

function fmt(n: number, isEn: boolean) {
  return n.toLocaleString(isEn ? "en-US" : "fr-FR");
}

function AnimatedNumber({
  value,
  isEn = false,
}: {
  value: number;
  isEn?: boolean;
}) {
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

  return <>{fmt(displayValue, isEn)}</>;
}

export function RevenueSimulator({
  locale: _locale = "fr",
}: {
  locale?: string;
}) {
  const t = useTranslations("RevenueSimulator");
  const isEn = _locale === "en";
  const villes = isEn ? VILLES_EN : VILLES_FR;
  const piecesOptions = isEn ? PIECES_OPTIONS_EN : PIECES_OPTIONS_FR;

  const [villeIdx, setVilleIdx] = useState(0);
  const [piecesIdx, setPiecesIdx] = useState(1);
  const [surface, setSurface] = useState(45);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<1 | 2 | 3>(3);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [leadError, setLeadError] = useState("");
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
    const base = villes[villeIdx].base;
    const piecesMult = piecesOptions[piecesIdx].mult;
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
              {isEn ? "Simulation tool" : "Outil de simulation"}
            </p>
            <h3 className="text-white text-lg font-bold tracking-tight">
              {isEn ? "Revenue estimation " : "Estimation de revenus "}{" "}
              <span className="text-primary">Hauts-de-France</span>
            </h3>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-slate-500 text-[10px] font-medium italic">
              {isEn ? "Updated: April 2026" : "Mise à jour : Avril 2026"}
            </span>
          </div>
        </div>
      </div>

      {/* Stepper progress indicator */}
      <div className="bg-slate-900 border-b border-slate-800 px-5 py-3.5 flex justify-between items-center text-[10px] md:text-xs font-bold text-slate-400">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 1
                ? "bg-primary text-white font-bold"
                : "bg-slate-800 text-slate-500"
            }`}
          >
            {step > 1 ? "✓" : "1"}
          </div>
          <span className={step === 1 ? "text-white" : "text-slate-500"}>
            {t("step1")}
          </span>
        </div>
        <div className="flex-grow h-px bg-slate-800 mx-2 md:mx-4" />
        <div className="flex items-center gap-1.5 md:gap-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 2
                ? "bg-primary text-white font-bold"
                : "bg-slate-800 text-slate-500"
            }`}
          >
            {step > 2 ? "✓" : "2"}
          </div>
          <span className={step === 2 ? "text-white" : "text-slate-500"}>
            {t("step2")}
          </span>
        </div>
        <div className="flex-grow h-px bg-slate-800 mx-2 md:mx-4" />
        <div className="flex items-center gap-1.5 md:gap-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 3
                ? "bg-primary text-white font-bold"
                : "bg-slate-850 text-slate-500"
            }`}
          >
            3
          </div>
          <span className={step === 3 ? "text-white" : "text-slate-500"}>
            {t("step3")}
          </span>
        </div>
      </div>

      <div className="p-5 lg:p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr,1.1fr] gap-6 lg:gap-10"
            >
              {/* Left Side: Inputs */}
              <div className="space-y-5">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                    {isEn ? "Location" : "Localisation"}
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
                      <span className="truncate">{villes[villeIdx].label}</span>
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
                          exit={{
                            opacity: 0,
                            y: openUp ? -10 : 10,
                            scale: 0.95,
                          }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className={`absolute left-0 right-0 ${
                            openUp ? "bottom-full mb-2" : "top-full mt-2"
                          } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl overflow-hidden z-[60]`}
                        >
                          <div className="p-1">
                            {villes.map((v, i) => (
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
                    {isEn ? "Property type" : "Typologie du bien"}
                  </label>
                  <div className="grid grid-cols-4 gap-1 bg-slate-50 dark:bg-slate-950 rounded-md p-1 border border-slate-200 dark:border-slate-800">
                    {piecesOptions.map((p, i) => (
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
                        {isEn ? "Estimated size" : "Surface estimée"}
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
                      aria-label={isEn ? "Estimated size" : "Surface estimée"}
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
                        {isEn ? "Solo management" : "Gestion en solo"}
                      </p>
                      <p className="text-xl font-bold text-slate-500 tracking-tighter">
                        <AnimatedNumber value={revenuSolo} isEn={isEn} />€{" "}
                        <span className="text-[10px] font-medium">
                          {isEn ? "/ month" : "/ mois"}
                        </span>
                      </p>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      {isEn ? "Standard" : "Standard"}
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
                        <AnimatedNumber value={revenuWelqo} isEn={isEn} />€{" "}
                        <span className="text-xs text-slate-400 font-medium">
                          {isEn ? "/ month" : "/ mois"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Interactive SVG Projection Card */}
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-lg border border-slate-100 dark:border-slate-800 flex flex-col gap-2 relative overflow-hidden backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                        {isEn
                          ? "Cumulative projection"
                          : "Projection cumulative"}
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
                            {isEn ? `Yr ${y}` : `An ${y}`}
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
                          <linearGradient
                            id="soloGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
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
                                onMouseEnter={() =>
                                  setHoveredYear(y as 1 | 2 | 3)
                                }
                              />
                            </g>
                          );
                        })}
                      </svg>

                      {/* X Axis Labels */}
                      <div className="absolute bottom-[-10px] left-0 right-0 flex justify-between px-6 text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        <span>{t("year1")}</span>
                        <span>{t("year2")}</span>
                        <span>{t("year3")}</span>
                      </div>
                    </div>

                    {/* Tooltip detail values */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-center">
                        <p className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider">
                          {t("soloManagement")}
                        </p>
                        <p className="text-xs font-bold text-slate-500 mt-0.5">
                          <AnimatedNumber
                            value={revenuSolo * 12 * hoveredYear}
                            isEn={isEn}
                          />{" "}
                          €
                        </p>
                      </div>
                      <div className="text-center border-x border-slate-100 dark:border-slate-800">
                        <p className="text-[7.5px] font-black text-primary uppercase tracking-wider">
                          {t("welqoManagement")}
                        </p>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">
                          <AnimatedNumber
                            value={revenuWelqo * 12 * hoveredYear}
                            isEn={isEn}
                          />{" "}
                          €
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[7.5px] font-bold text-emerald-500 uppercase tracking-wider">
                          {t("welqoNetGain")}
                        </p>
                        <p className="text-xs font-extrabold text-emerald-500 mt-0.5">
                          +
                          <AnimatedNumber
                            value={
                              (revenuWelqo - revenuSolo) * 12 * hoveredYear
                            }
                            isEn={isEn}
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
                        +<AnimatedNumber value={gain} isEn={isEn} />€
                      </p>
                      <p className="text-[8px] text-slate-500 font-bold tracking-tighter">
                        {t("monthlyNetGain")}
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg text-center">
                      <p className="text-sm font-bold text-primary">
                        <AnimatedNumber value={annual} isEn={isEn} />€
                      </p>
                      <p className="text-[8px] text-slate-500 font-bold tracking-tighter">
                        {t("annualPotential")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      trackEvent("owner_simulator_complete", {
                        city: villes[villeIdx].label,
                        revenue: revenuWelqo,
                        property_type: piecesOptions[piecesIdx].label,
                      });
                      setStep(2);
                    }}
                    className="w-full py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-welqo-terracotta hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {t("secureRevenue", { amount: fmt(revenuWelqo, isEn) })}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="mt-2.5 text-[8px] text-slate-400 text-center italic opacity-70 leading-tight">
                    {t("disclaimer")}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr,1.1fr] gap-6 lg:gap-10 text-slate-900 dark:text-white"
            >
              {/* Left Side: Simulation Summary */}
              <div className="space-y-4 bg-slate-905 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <span className="text-[9px] font-bold text-primary tracking-widest uppercase block mb-1">
                    {t("simulationSummary")}
                  </span>
                  <h4 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                    {villes[villeIdx].label.split(" (")[0]}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {piecesOptions[piecesIdx].label} · {surface} m²
                  </p>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold tracking-wider block">
                      {t("estimatedNetRevenue")}
                    </span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mt-1">
                      {fmt(revenuWelqo, isEn)}€{" "}
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {isEn ? "/ month" : "/ mois"}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold tracking-wider block">
                        {t("monthlyGain")}
                      </span>
                      <p className="text-sm font-bold text-emerald-500 mt-0.5">
                        +{fmt(gain, isEn)}€
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold tracking-wider block">
                        {t("annualIncomePotential")}
                      </span>
                      <p className="text-sm font-bold text-primary mt-0.5">
                        {fmt(annual, isEn)}€
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-2">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic opacity-85">
                    {t("reassuringText")}
                  </p>
                </div>
              </div>

              {/* Right Side: Lead Form */}
              <div className="flex flex-col justify-center text-left">
                <div className="mb-4">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    {t("step2Title")}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1">
                    {t("step2Subtitle")}
                  </p>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!leadName || !leadPhone || !leadEmail) {
                      setLeadError(t("fillAllFields"));
                      return;
                    }
                    setLeadStatus("loading");
                    setLeadError("");
                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: leadName,
                          phone: leadPhone,
                          city: villes[villeIdx].label,
                          message: `Simulation: ${piecesOptions[piecesIdx].label}, ${surface}m², Estimé: ${revenuWelqo}€/mois (Email: ${leadEmail})`,
                        }),
                      });
                      if (!res.ok) throw new Error();
                      setSubmittedName(leadName);
                      setSubmittedEmail(leadEmail);
                      setLeadStatus("success");
                      setStep(3);
                    } catch {
                      setLeadStatus("error");
                      setLeadError(t("submitError"));
                    }
                  }}
                  className="space-y-4 text-left"
                >
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder={t("namePlaceholder")}
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-xs font-semibold placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="tel"
                        placeholder={t("phonePlaceholder")}
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-xs font-semibold placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-colors"
                      />
                      <input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-xs font-semibold placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-colors"
                      />
                    </div>
                  </div>

                  {leadError && (
                    <p className="text-[10px] text-red-500 dark:text-red-400 font-bold bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg text-center">
                      {leadError}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full sm:w-auto px-4 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-all cursor-pointer text-center"
                    >
                      {t("backToSimulation")}
                    </button>
                    <button
                      type="submit"
                      disabled={leadStatus === "loading"}
                      className="flex-grow py-3.5 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                    >
                      {leadStatus === "loading"
                        ? isEn
                          ? "Sending..."
                          : "Envoi..."
                        : isEn
                          ? "Get my report →"
                          : "Valider mon estimation →"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr,1.4fr] gap-6 lg:gap-8"
            >
              {/* Left Side: Success Message */}
              <div className="flex flex-col justify-center text-center lg:text-left bg-slate-905 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 shrink-0">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h4 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight mb-2">
                  {t("estimationSecured")}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed max-w-sm">
                  {t("successMessage")}
                </p>

                <p className="text-slate-600 dark:text-slate-300 text-xs font-bold leading-relaxed mt-4 border-t border-slate-200 dark:border-slate-800 pt-4">
                  {t("bookCallSubtitle")}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setLeadStatus("idle");
                      setLeadName("");
                      setLeadPhone("");
                      setLeadEmail("");
                      setSubmittedName("");
                      setSubmittedEmail("");
                    }}
                    className="px-5 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white rounded-lg font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    🔄 {t("startOver")}
                  </button>
                </div>
              </div>

              {/* Right Side: Calendly Iframe */}
              <div className="w-full h-[580px] rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative shadow-inner">
                <iframe
                  src={`${process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/welqo/15min"}?hide_landing_page_details=1&hide_gdpr_banner=1&name=${encodeURIComponent(submittedName)}&email=${encodeURIComponent(submittedEmail)}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full bg-slate-50 dark:bg-slate-950"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
