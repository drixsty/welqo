"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Users, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  locale: string;
}

const CITIES = ["Lille", "Lens", "Arras", "Béthune", "Douai"];
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
      if (
        guestsRef.current &&
        !guestsRef.current.contains(event.target as Node)
      ) {
        setIsGuestsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const checkPosition = (
    ref: React.RefObject<HTMLDivElement>,
    setUp: (v: boolean) => void,
  ) => {
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

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  return (
    <>
      {/* 📱 MOBILE SEARCH TRIGGER */}
      <div className="md:hidden w-full px-4">
        <button
          onClick={() => setIsMobileModalOpen(true)}
          className="w-full flex items-center gap-4 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full shadow-xl shadow-slate-900/5 transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-full bg-welqo-terracotta flex items-center justify-center text-white shrink-0">
            <Search className="w-5 h-5 stroke-[2.5px]" />
          </div>
          <div className="flex flex-col items-start overflow-hidden">
            <span className="text-[11px] font-black text-slate-900 dark:text-white truncate">
              {city || (isFr ? "Où allez-vous ?" : "Where to?")}
            </span>
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 tracking-widest">
              <span>
                {guests} {isFr ? "voyageurs" : "guests"}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{isFr ? "Toute la région" : "Whole region"}</span>
            </div>
          </div>
        </button>
      </div>

      {/* 💻 DESKTOP SEARCH BAR */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-2 rounded-2xl flex-row items-stretch gap-2 shadow-2xl relative z-50"
      >
        {/* Destination Selector */}
        <div className="flex-1 relative" ref={cityRef}>
          <button
            type="button"
            onClick={toggleCity}
            className={`w-full flex items-center gap-3 pl-12 pr-10 py-4 bg-slate-50 dark:bg-slate-950 border rounded-xl text-sm font-bold transition-all text-left ${
              isCityOpen
                ? "border-welqo-terracotta ring-1 ring-welqo-terracotta/20 bg-white dark:bg-slate-900 shadow-sm"
                : "border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
            }`}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-welqo-terracotta">
              <MapPin className="w-5 h-5" />
            </div>
            <span
              className={
                !city ? "text-slate-500" : "text-slate-900 dark:text-white"
              }
            >
              {city || (isFr ? "Destination" : "Location")}
            </span>
            <div
              className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 ${isCityOpen ? "rotate-180" : ""}`}
            >
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
                } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-[100] p-2`}
              >
                {CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCity(c);
                      setIsCityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                      city === c
                        ? "bg-welqo-terracotta text-white shadow-md shadow-welqo-terracotta/20"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guests Selector */}
        <div className="flex-1 relative" ref={guestsRef}>
          <button
            type="button"
            onClick={toggleGuests}
            className={`w-full flex items-center gap-3 pl-12 pr-10 py-4 bg-slate-50 dark:bg-slate-950 border rounded-xl text-sm font-bold transition-all text-left ${
              isGuestsOpen
                ? "border-welqo-terracotta ring-1 ring-welqo-terracotta/20 bg-white dark:bg-slate-900 shadow-sm"
                : "border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
            }`}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-welqo-terracotta">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-slate-900 dark:text-white">
              {guests}{" "}
              {isFr
                ? guests > 1
                  ? "Voyageurs"
                  : "Voyageur"
                : guests > 1
                  ? "Guests"
                  : "Guest"}
            </span>
            <div
              className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 ${isGuestsOpen ? "rotate-180" : ""}`}
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          </button>

          <AnimatePresence mode="wait">
            {isGuestsOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: guestsOpenUp ? -10 : 10,
                  scale: 0.98,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: guestsOpenUp ? -10 : 10, scale: 0.98 }}
                className={`absolute left-0 right-0 min-w-[200px] ${
                  guestsOpenUp ? "bottom-full mb-3" : "top-full mt-3"
                } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-[100] p-2 grid grid-cols-2 gap-2`}
              >
                {GUESTS_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setGuests(n);
                      setIsGuestsOpen(false);
                    }}
                    className={`flex items-center justify-center h-10 rounded-lg text-sm font-bold transition-all ${
                      guests === n
                        ? "bg-welqo-terracotta text-white shadow-md shadow-welqo-terracotta/20"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="px-10 py-4 bg-welqo-terracotta hover:bg-welqo-terracotta/90 text-white rounded-xl font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-welqo-terracotta/20 shrink-0"
        >
          <Search className="w-5 h-5 stroke-[2.5px]" />
          <span>{isFr ? "Rechercher" : "Search"}</span>
        </button>
      </form>

      {/* 🎬 MOBILE FULL-SCREEN MODAL */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[1000] bg-slate-50 dark:bg-slate-950 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center"
              >
                <ChevronDown className="w-6 h-6 rotate-90" />
              </button>
              <h2 className="text-sm font-black text-slate-900 dark:text-white tracking-widest">
                {isFr ? "Votre recherche" : "Your search"}
              </h2>
              <button
                onClick={() => {
                  setCity("");
                  setGuests(2);
                }}
                className="text-[10px] font-bold text-slate-500 underline"
              >
                {isFr ? "Effacer" : "Clear"}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Destination Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                  {isFr ? "Où voulez-vous aller ?" : "Where do you want to go?"}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all text-center ${
                        city === c
                          ? "border-welqo-terracotta bg-welqo-terracotta/5 text-welqo-terracotta shadow-lg shadow-welqo-terracotta/5"
                          : "border-white dark:border-slate-900 bg-white dark:bg-slate-900 text-slate-500"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                  {isFr ? "Combien de voyageurs ?" : "How many guests?"}
                </h3>
                <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {isFr ? "Voyageurs" : "Guests"}
                  </span>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white active:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="text-xl font-black text-slate-900 dark:text-white w-4 text-center">
                      {guests}
                    </span>
                    <button
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white active:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / Submit */}
            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 pb-10">
              <button
                onClick={(e) => {
                  handleSearch(e as any);
                  setIsMobileModalOpen(false);
                }}
                className="w-full py-5 bg-welqo-terracotta text-white rounded-[2rem] font-black text-base shadow-2xl shadow-welqo-terracotta/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <Search className="w-5 h-5 stroke-[3px]" />
                {isFr ? "Rechercher" : "Search"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-white/30 font-bold tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {isFr
          ? "Disponibilités et prix mis à jour en temps réel"
          : "Real-time availability and pricing updated"}
      </div>
    </>
  );
};
