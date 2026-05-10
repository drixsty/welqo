"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Users, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  locale: string;
}

const CITIES = ["Lens", "Arras", "Béthune", "Douai"];
const GUESTS_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

export const SearchBar = ({ locale }: SearchBarProps) => {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState(2);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [cityOpenUp, setCityOpenUp] = useState(false);
  const [guestsOpenUp, setGuestsOpenUp] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  const isFr = locale === "fr";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setIsGuestsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const checkPosition = (ref: React.RefObject<HTMLDivElement>, setUp: (v: boolean) => void) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 300; 
      setUp(spaceBelow < dropdownHeight && rect.top > dropdownHeight);
    }
  };

  const toggleCity = () => {
    if (!isCityOpen) checkPosition(cityRef, setCityOpenUp);
    setIsCityOpen(!isCityOpen);
    setIsGuestsOpen(false);
  };

  const toggleGuests = () => {
    if (!isGuestsOpen) checkPosition(guestsRef, setGuestsOpenUp);
    setIsGuestsOpen(!isGuestsOpen);
    setIsCityOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.append("city", city);
    if (guests) params.append("guests", guests.toString());
    
    router.push(`/${locale}/logements?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-2 rounded-lg flex flex-col md:flex-row items-stretch gap-2 shadow-2xl relative z-50"
    >
      {/* Destination Selector */}
      <div className="flex-1 relative" ref={cityRef}>
        <button
          type="button"
          onClick={toggleCity}
          className={`w-full flex items-center gap-3 pl-12 pr-10 py-3.5 bg-slate-50 dark:bg-slate-950 border rounded-md text-sm font-bold transition-all text-left ${
            isCityOpen 
              ? "border-primary ring-1 ring-primary/20 bg-white dark:bg-slate-900 shadow-sm" 
              : "border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
            <MapPin className="w-5 h-5" />
          </div>
          <span className={!city ? "text-slate-500" : "text-slate-900 dark:text-white"}>
            {city || (isFr ? "Destination" : "Location")}
          </span>
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 ${isCityOpen ? "rotate-180" : ""}`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        <AnimatePresence mode="wait">
          {isCityOpen && (
            <motion.div
              initial={{ opacity: 0, y: cityOpenUp ? -10 : 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: cityOpenUp ? -10 : 10, scale: 0.98 }}
              className={`absolute left-0 right-0 min-w-[240px] ${
                cityOpenUp ? "bottom-full mb-3" : "top-full mt-3"
              } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl overflow-hidden z-[100]`}
            >
              <div className="p-1.5">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCity(c);
                      setIsCityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-md text-sm font-bold transition-all ${
                      city === c 
                        ? "bg-primary text-white shadow-md shadow-primary/20" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guests Selector */}
      <div className="flex-1 relative" ref={guestsRef}>
        <button
          type="button"
          onClick={toggleGuests}
          className={`w-full flex items-center gap-3 pl-12 pr-10 py-3.5 bg-slate-50 dark:bg-slate-950 border rounded-md text-sm font-bold transition-all text-left ${
            isGuestsOpen 
              ? "border-primary ring-1 ring-primary/20 bg-white dark:bg-slate-900 shadow-sm" 
              : "border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-slate-900 dark:text-white">
            {guests} {isFr ? (guests > 1 ? "Voyageurs" : "Voyageur") : (guests > 1 ? "Guests" : "Guest")}
          </span>
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 ${isGuestsOpen ? "rotate-180" : ""}`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        <AnimatePresence mode="wait">
          {isGuestsOpen && (
            <motion.div
              initial={{ opacity: 0, y: guestsOpenUp ? -10 : 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: guestsOpenUp ? -10 : 10, scale: 0.98 }}
              className={`absolute left-0 right-0 min-w-[200px] ${
                guestsOpenUp ? "bottom-full mb-3" : "top-full mt-3"
              } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl overflow-hidden z-[100]`}
            >
              <div className="p-1.5 grid grid-cols-2 gap-1.5">
                {GUESTS_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setGuests(n);
                      setIsGuestsOpen(false);
                    }}
                    className={`flex items-center justify-center h-10 rounded-md text-sm font-bold transition-all ${
                      guests === n 
                        ? "bg-primary text-white shadow-md shadow-primary/20" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="px-10 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-md font-bold text-sm flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary/20 shrink-0"
      >
        <Search className="w-4 h-4 stroke-[3px]" />
        <span>{isFr ? "Rechercher" : "Search"}</span>
      </button>
    </form>
  );
};
