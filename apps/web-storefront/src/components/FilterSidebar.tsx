"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  MapPin,
  Euro,
  Users,
  Wifi,
  Car,
  ChefHat,
  Tv,
  Wind,
  Check,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSidebarProps {
  locale: string;
  distribution?: number[];
}

const CITIES = ["Lille", "Lens", "Arras", "Valenciennes", "Douai"];
const AMENITY_IDS = [
  { id: "wifi", key: "amenity_wifi", icon: Wifi },
  { id: "parking", key: "amenity_parking", icon: Car },
  { id: "kitchen", key: "amenity_kitchen", icon: ChefHat },
  { id: "tv", key: "amenity_tv", icon: Tv },
  { id: "ac", key: "amenity_ac", icon: Wind },
];

const MIN_LIMIT = 0;
const MAX_LIMIT = 500;

export const FilterSidebar = ({ locale }: FilterSidebarProps) => {
  const t = useTranslations("FilterSidebar");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [minPrice, setMinPrice] = useState(MIN_LIMIT);
  const [maxPrice, setMaxPrice] = useState(MAX_LIMIT);
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [isCityOpen, setIsCityOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  const isFr = locale === "fr";

  useEffect(() => {
    setMinPrice(Number(searchParams.get("minPrice")) || MIN_LIMIT);
    setMaxPrice(Number(searchParams.get("maxPrice")) || MAX_LIMIT);
    setCity(searchParams.get("city") || "");
    setGuests(searchParams.get("guests") || "");
    const amenities = searchParams.get("amenities");
    setSelectedAmenities(amenities ? amenities.split(",") : []);
  }, [searchParams]);

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
    if (minPrice > MIN_LIMIT) params.set("minPrice", minPrice.toString());
    else params.delete("minPrice");
    if (maxPrice < MAX_LIMIT) params.set("maxPrice", maxPrice.toString());
    else params.delete("maxPrice");
    if (city) params.set("city", city);
    else params.delete("city");
    if (guests) params.set("guests", guests);
    else params.delete("guests");
    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join(","));
    } else {
      params.delete("amenities");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    router.push(pathname);
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 10);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 10);
    setMaxPrice(value);
  };

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-white/5 p-4 space-y-6 h-full lg:h-auto overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-50 dark:border-white/[0.03]">
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-welqo-terracotta" />
          <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-widest">
            {t("filters")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {searchParams.toString() !== "" && (
            <button
              onClick={handleClear}
              className="text-[10px] font-bold text-slate-400 hover:text-welqo-terracotta transition-colors tracking-tighter"
            >
              {t("reset")}
            </button>
          )}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* City Filter */}
      <div className="space-y-2" ref={cityRef}>
        <label className="text-[10px] font-black text-slate-400 tracking-widest flex items-center gap-2">
          <MapPin className="w-3 h-3 text-welqo-terracotta" />
          {t("location")}
        </label>
        <div className="relative">
          <button
            onClick={() => setIsCityOpen(!isCityOpen)}
            className="w-full flex items-center justify-between bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold text-slate-700 dark:text-slate-200 transition-all hover:border-welqo-terracotta/30"
          >
            <span className="truncate">
              {city || t("anywhere")}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 transition-transform ${isCityOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isCityOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute top-full left-0 mt-1.5 w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden p-1.5"
              >
                <button
                  onClick={() => {
                    setCity("");
                    setIsCityOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500"
                >
                  {t("anywhere")}
                  {!city && (
                    <Check className="w-3.5 h-3.5 text-welqo-terracotta" />
                  )}
                </button>
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCity(c);
                      setIsCityOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold rounded-lg ${
                      city === c
                        ? "bg-welqo-terracotta/5 text-welqo-terracotta"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
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
      </div>

      {/* Price Slider */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-400 tracking-widest flex items-center gap-2">
          <Euro className="w-3 h-3 text-welqo-terracotta" />
          {t("pricePerNight")}
        </label>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-xl px-3 py-2.5 text-center">
            <p className="text-[9px] font-black text-slate-400 leading-none mb-1">
              Min
            </p>
            <p className="text-xs font-black text-slate-900 dark:text-white leading-none">
              {minPrice}€
            </p>
          </div>
          <div className="w-2 h-[2px] bg-slate-200 dark:bg-slate-700" />
          <div className="flex-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-xl px-3 py-2.5 text-center">
            <p className="text-[9px] font-black text-slate-400 leading-none mb-1">
              Max
            </p>
            <p className="text-xs font-black text-slate-900 dark:text-white leading-none">
              {maxPrice}€
            </p>
          </div>
        </div>

        <div className="relative h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mx-1">
          <div
            className="absolute h-1.5 bg-welqo-terracotta rounded-full"
            style={{
              left: `${(minPrice / MAX_LIMIT) * 100}%`,
              right: `${100 - (maxPrice / MAX_LIMIT) * 100}%`,
            }}
          />
          <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            value={minPrice}
            onChange={handleMinChange}
            className="absolute w-full appearance-none bg-transparent pointer-events-none top-1/2 -translate-y-1/2 z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-welqo-terracotta [&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:active:scale-125"
          />
          <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            value={maxPrice}
            onChange={handleMaxChange}
            className="absolute w-full appearance-none bg-transparent pointer-events-none top-1/2 -translate-y-1/2 z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-welqo-terracotta [&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:active:scale-125"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 tracking-widest flex items-center gap-2">
          <Users className="w-3 h-3 text-welqo-terracotta" />
          {t("guests")}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {[1, 2, 3, 4, "5+"].map((n) => (
            <button
              key={n}
              onClick={() => setGuests(n.toString())}
              className={`py-2 rounded-lg text-[11px] font-black transition-all ${
                guests === n.toString()
                  ? "bg-welqo-terracotta text-white shadow-lg shadow-welqo-terracotta/20"
                  : "bg-slate-50 dark:bg-white/[0.03] text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 tracking-widest">
          {t("amenities")}
        </label>
        <div className="space-y-2">
          {AMENITY_IDS.map((a) => (
            <button
              key={a.id}
              onClick={() => toggleAmenity(a.id)}
              className="w-full flex items-center gap-3 group text-left"
            >
              <div
                className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${
                  selectedAmenities.includes(a.id)
                    ? "bg-welqo-terracotta border-welqo-terracotta"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 group-hover:border-welqo-terracotta/30"
                }`}
              >
                {selectedAmenities.includes(a.id) && (
                  <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                )}
              </div>
              <span
                className={`text-xs font-bold transition-colors ${
                  selectedAmenities.includes(a.id)
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {t(a.key as any)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          handleApply();
          setIsMobileOpen(false);
        }}
        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black tracking-[0.1em] shadow-2xl transition-all active:scale-95"
      >
        {t("apply")}
      </button>
    </div>
  );

  return (
    <>
      {/* 💻 DESKTOP VIEW */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">{sidebarContent}</div>
      </div>

      {/* 📱 MOBILE FLOATING TRIGGER */}
      <div className="lg:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-3 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] shadow-2xl font-black text-xs tracking-widest active:scale-95 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4 text-welqo-terracotta" />
          {t("filters")}
          {searchParams.toString() !== "" && (
            <span className="w-5 h-5 rounded-full bg-welqo-terracotta text-white flex items-center justify-center text-[10px]">
              !
            </span>
          )}
        </button>
      </div>

      {/* 🎬 MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-slate-950/60 backdrop-blur-md lg:hidden p-4 flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-h-[85vh] overflow-hidden"
            >
              {sidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
