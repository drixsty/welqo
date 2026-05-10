"use client";

import React, { useState, useRef, useEffect } from "react";
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
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSidebarProps {
  locale: string;
  distribution?: number[];
}

const CITIES = ["Lille", "Lens", "Arras", "Valenciennes", "Douai"];
const AMENITIES = [
  { id: "wifi", label: "Wifi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "kitchen", label: "Cuisine", icon: ChefHat },
  { id: "tv", label: "TV", icon: Tv },
  { id: "ac", label: "Climatisation", icon: Wind },
];

const MIN_LIMIT = 0;
const MAX_LIMIT = 500;

export const FilterSidebar = ({ locale }: FilterSidebarProps) => {
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
    if (minPrice > MIN_LIMIT) params.set("minPrice", minPrice.toString()); else params.delete("minPrice");
    if (maxPrice < MAX_LIMIT) params.set("maxPrice", maxPrice.toString()); else params.delete("maxPrice");
    if (city) params.set("city", city); else params.delete("city");
    if (guests) params.set("guests", guests); else params.delete("guests");
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
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
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

  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24 bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-white/5 p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-50 dark:border-white/[0.03]">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold text-slate-900 dark:text-white">
              {isFr ? "Filtres" : "Filters"}
            </span>
          </div>
          {(searchParams.toString() !== "") && (
            <button 
              onClick={handleClear}
              className="text-[10px] font-medium text-slate-400 hover:text-primary transition-colors"
            >
              {isFr ? "Réinitialiser" : "Reset"}
            </button>
          )}
        </div>

        {/* City Filter */}
        <div className="space-y-2" ref={cityRef}>
          <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            {isFr ? "Localisation" : "Location"}
          </label>
          <div className="relative">
            <button
              onClick={() => setIsCityOpen(!isCityOpen)}
              className="w-full flex items-center justify-between bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-[11px] font-semibold text-slate-700 dark:text-slate-200"
            >
              <span className="truncate">{city || (isFr ? "Partout" : "Anywhere")}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isCityOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isCityOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute top-full left-0 mt-1.5 w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-lg shadow-xl z-50 overflow-hidden p-1"
                >
                  <button
                    onClick={() => { setCity(""); setIsCityOpen(false); }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-medium rounded-md hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500"
                  >
                    {isFr ? "Partout" : "Anywhere"}
                    {!city && <Check className="w-3 h-3 text-primary" />}
                  </button>
                  {CITIES.map(c => (
                    <button
                      key={c}
                      onClick={() => { setCity(c); setIsCityOpen(false); }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-medium rounded-md ${
                        city === c ? "bg-primary/5 text-primary" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                      }`}
                    >
                      {c}
                      {city === c && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-4">
          <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5">
            <Euro className="w-3 h-3" />
            {isFr ? "Prix par nuit" : "Price per night"}
          </label>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-md px-2 py-1.5 text-center">
              <p className="text-[8px] font-bold text-slate-400 leading-none mb-0.5">Min</p>
              <p className="text-[10px] font-bold text-slate-900 dark:text-white leading-none">{minPrice}€</p>
            </div>
            <div className="w-2 h-[1px] bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-md px-2 py-1.5 text-center">
              <p className="text-[8px] font-bold text-slate-400 leading-none mb-0.5">Max</p>
              <p className="text-[10px] font-bold text-slate-900 dark:text-white leading-none">{maxPrice}€</p>
            </div>
          </div>
          
          <div className="relative h-1 bg-slate-100 dark:bg-slate-800 rounded-full mx-1">
            <div 
              className="absolute h-1 bg-primary rounded-full"
              style={{ 
                left: `${(minPrice / MAX_LIMIT) * 100}%`, 
                right: `${100 - (maxPrice / MAX_LIMIT) * 100}%` 
              }}
            />
            <input
              type="range" min={MIN_LIMIT} max={MAX_LIMIT} value={minPrice} onChange={handleMinChange}
              className="absolute w-full appearance-none bg-transparent pointer-events-none top-1/2 -translate-y-1/2 z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:ring-4 [&::-webkit-slider-thumb]:hover:ring-primary/10"
            />
            <input
              type="range" min={MIN_LIMIT} max={MAX_LIMIT} value={maxPrice} onChange={handleMaxChange}
              className="absolute w-full appearance-none bg-transparent pointer-events-none top-1/2 -translate-y-1/2 z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:ring-4 [&::-webkit-slider-thumb]:hover:ring-primary/10"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5">
            <Users className="w-3 h-3" />
            {isFr ? "Voyageurs" : "Guests"}
          </label>
          <div className="grid grid-cols-5 gap-1">
            {[1, 2, 3, 4, "5+"].map(n => (
              <button
                key={n}
                onClick={() => setGuests(n.toString())}
                className={`py-1.5 rounded-md text-[10px] font-bold transition-all ${
                  guests === n.toString()
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 dark:bg-white/[0.03] text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-medium text-slate-400">
            {isFr ? "Équipements" : "Amenities"}
          </label>
          <div className="space-y-1.5">
            {AMENITIES.map(a => (
              <button
                key={a.id}
                onClick={() => toggleAmenity(a.id)}
                className="w-full flex items-center gap-2 group text-left"
              >
                <div className={`w-4 h-4 rounded-md border transition-all flex items-center justify-center ${
                  selectedAmenities.includes(a.id)
                    ? "bg-primary border-primary"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 group-hover:border-primary/30"
                }`}>
                  {selectedAmenities.includes(a.id) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-[11px] font-medium transition-colors ${
                  selectedAmenities.includes(a.id) ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                }`}>
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-[11px] font-bold hover:bg-primary hover:text-white transition-all active:scale-[0.98]"
        >
          {isFr ? "Appliquer" : "Apply"}
        </button>
      </div>
    </div>
  );
};
