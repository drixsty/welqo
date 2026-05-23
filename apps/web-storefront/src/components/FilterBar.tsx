"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  MapPin,
  Euro,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterBarProps {
  locale: string;
}

const CITIES = ["Lille", "Lens", "Arras", "Valenciennes", "Douai"];

export const FilterBar = ({ locale }: FilterBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [isCityOpen, setIsCityOpen] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("FilterBar");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    if (city) params.set("city", city);
    else params.delete("city");

    router.push(`/${locale}/logements?${params.toString()}`);
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    setCity("");
    router.push(`/${locale}/logements`);
  };

  return (
    <div className="sticky top-16 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Filters Label */}
        <div className="flex items-center gap-2 text-slate-400 mr-2">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {t("filters")}
          </span>
        </div>

        {/* Custom City Selector */}
        <div className="relative" ref={cityRef}>
          <button
            onClick={() => setIsCityOpen(!isCityOpen)}
            className="flex items-center gap-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-lg pl-3.5 pr-10 py-2 text-xs font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-slate-700 dark:text-slate-200 w-full sm:w-auto sm:min-w-[160px] relative group"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
            <span className="truncate">{city || t("allCities")}</span>
            <ChevronDown
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isCityOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isCityOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl shadow-black/10 overflow-hidden z-50 p-1.5"
              >
                <button
                  onClick={() => {
                    setCity("");
                    setIsCityOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400"
                >
                  {t("allCities")}
                  {!city && <Check className="w-3.5 h-3.5 text-primary" />}
                </button>
                <div className="h-px bg-slate-100 dark:bg-white/5 my-1" />
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCity(c);
                      setIsCityOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      city === c
                        ? "bg-primary/10 text-primary"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                    }`}
                  >
                    {c}
                    {city === c && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className="flex items-center bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1 gap-2 w-full sm:w-auto">
          <Euro className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-16 bg-transparent border-none p-1 text-xs font-semibold outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          />
          <span className="text-slate-300 dark:text-slate-700 font-bold">
            —
          </span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-16 bg-transparent border-none p-1 text-xs font-semibold outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="ml-auto flex items-center gap-3">
          {(minPrice || maxPrice || city) && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest px-2"
            >
              <X className="w-3 h-3" />
              {t("clear")}
            </button>
          )}

          <button
            onClick={handleApply}
            className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-lg shadow-black/5 active:scale-95"
          >
            {t("apply")}
          </button>
        </div>
      </div>
    </div>
  );
};
