"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Zap,
  ArrowRight,
  Users,
  Calendar as CalendarIcon,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker, DateRange } from "react-day-picker";
import { format, differenceInDays, addDays, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";

import "react-day-picker/dist/style.css";

interface BookingWidgetProps {
  propertyId: string;
  basePrice: number;
  cleaningFee: number;
  touristTax: number;
  maxGuests: number;
  onBook?: (data: { range: DateRange | undefined; guests: number }) => void;
}

// Mocked blocked dates for demonstration
const BLOCKED_DATES = [
  addDays(new Date(), 5),
  addDays(new Date(), 6),
  addDays(new Date(), 12),
  addDays(new Date(), 13),
  addDays(new Date(), 14),
];

export const BookingWidget = ({
  propertyId,
  basePrice,
  cleaningFee,
  touristTax,
  maxGuests,
  onBook,
}: BookingWidgetProps) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const [guests, setGuests] = useState(1);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const guestRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const nights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;

  const totalNights = basePrice * nights;
  const totalTax = touristTax * nights;
  const total = totalNights + cleaningFee + totalTax;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        guestRef.current &&
        !guestRef.current.contains(event.target as Node)
      ) {
        setIsGuestOpen(false);
      }
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-100 dark:border-white/5 shadow-sm transition-all">
      <div className="flex justify-between items-baseline mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            €{basePrice}
          </span>
          <span className="text-[10px] text-slate-400 font-bold">/ nuit</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-500 text-[9px] font-bold">
          <Zap className="w-2.5 h-2.5 fill-current" />
          Meilleur prix garanti
        </div>
      </div>

      <div className="space-y-2 mb-5">
        {/* Date Selector */}
        <div className="relative" ref={calendarRef}>
          <div className="grid grid-cols-2 bg-slate-50 dark:bg-white/[0.03] rounded-lg border border-slate-100 dark:border-white/5 overflow-hidden divide-x divide-slate-100 dark:divide-white/5">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="p-2.5 text-left hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
            >
              <span className="text-[8px] font-bold text-slate-400 block mb-0.5">
                Arrivée
              </span>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                {range?.from
                  ? format(range.from, "dd MMM yyyy", { locale: fr })
                  : "Choisir"}
              </span>
            </button>
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="p-2.5 text-left hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
            >
              <span className="text-[8px] font-bold text-slate-400 block mb-0.5">
                Départ
              </span>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                {range?.to
                  ? format(range.to, "dd MMM yyyy", { locale: fr })
                  : "Choisir"}
              </span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isCalendarOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                className="absolute top-full right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-lg shadow-2xl z-50 p-2 origin-top-right"
              >
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={(r) => {
                    setRange(r);
                    if (r?.from && r?.to) setIsCalendarOpen(false);
                  }}
                  locale={fr}
                  disabled={[{ before: new Date() }, ...BLOCKED_DATES]}
                  className="!m-0"
                  classNames={{
                    months: "flex flex-col space-y-2",
                    month: "space-y-2",
                    month_caption:
                      "flex justify-between pt-1 relative items-center mb-1 px-1",
                    caption_label:
                      "text-[11px] font-bold text-slate-900 dark:text-white capitalize",
                    nav: "flex items-center gap-0.5",
                    button_previous:
                      "h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-white/5",
                    button_next:
                      "h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-white/5",
                    month_grid: "w-full border-collapse",
                    weeks: "flex flex-col",
                    weekday:
                      "text-slate-400 rounded-md w-7 font-bold text-[9px]",
                    week: "flex w-full mt-0.5",
                    day: "h-7 w-7 p-0 text-[10px] font-medium flex items-center justify-center aria-selected:opacity-100 hover:bg-slate-100 dark:hover:bg-white/5 rounded-md transition-all relative",
                    selected:
                      "bg-primary text-white hover:bg-primary focus:bg-primary",
                    range_middle: "bg-primary/10 text-primary !rounded-none",
                    range_start: "bg-primary text-white rounded-l-md",
                    range_end: "bg-primary text-white rounded-r-md",
                    today:
                      "text-primary font-bold after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full",
                    outside: "text-slate-300 opacity-30",
                    disabled:
                      "text-slate-200 dark:text-slate-700 opacity-50 cursor-not-allowed line-through",
                    hidden: "invisible",
                  }}
                  components={{
                    Chevron: (props) =>
                      props.orientation === "left" ? (
                        <ChevronLeft className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      ),
                  }}
                />
                <div className="mt-2 pt-2 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setRange(undefined)}
                    className="text-[9px] font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <X className="w-2.5 h-2.5" />
                    Effacer
                  </button>
                  <span className="text-[9px] font-medium text-slate-400 italic">
                    {nights > 0
                      ? `${nights} nuits sélectionnées`
                      : "Sélectionnez vos dates"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guest Selector */}
        <div className="relative" ref={guestRef}>
          <button
            onClick={() => setIsGuestOpen(!isGuestOpen)}
            className="w-full p-2.5 bg-slate-50 dark:bg-white/[0.03] rounded-lg border border-slate-100 dark:border-white/5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
          >
            <div className="text-left">
              <span className="text-[8px] font-bold text-slate-400 block mb-0.5">
                Voyageurs
              </span>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">
                {guests} {guests > 1 ? "voyageurs" : "voyageur"}
              </span>
            </div>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 transition-transform ${isGuestOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isGuestOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                className="absolute top-full left-0 mt-1.5 w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-lg shadow-xl z-50 p-3 origin-top"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Adultes
                    </p>
                    <p className="text-[9px] text-slate-400 font-medium">
                      Max {maxGuests} voyageurs
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={guests <= 1}
                      onClick={() => setGuests(guests - 1)}
                      className="w-6 h-6 rounded-md border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 transition-all hover:border-primary hover:text-primary"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-3 text-center">
                      {guests}
                    </span>
                    <button
                      disabled={guests >= maxGuests}
                      onClick={() => setGuests(guests + 1)}
                      className="w-6 h-6 rounded-md border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 transition-all hover:border-primary hover:text-primary"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-2 mb-5 text-[11px]">
        <div className="flex justify-between">
          <span className="text-slate-500 font-medium">
            €{basePrice} x {nights} nuits
          </span>
          <span className="font-bold text-slate-900 dark:text-white">
            €{totalNights.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-medium">Frais de ménage</span>
          <span className="font-bold text-slate-900 dark:text-white">
            €{cleaningFee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-medium">Taxes de séjour</span>
          <span className="font-bold text-slate-900 dark:text-white">
            €{totalTax.toFixed(2)}
          </span>
        </div>
        <div className="pt-2 border-t border-slate-50 dark:border-white/5 flex justify-between items-baseline">
          <span className="font-bold text-slate-900 dark:text-white">
            Total
          </span>
          <span className="text-lg font-bold text-primary">
            €{total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={() => onBook?.({ range, guests })}
        className="group w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-xs hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
      >
        Réserver maintenant
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="mt-3 text-center text-[9px] font-bold text-slate-400">
        Paiement sécurisé par Stripe
      </p>

      <style jsx global>{`
        .rdp {
          --rdp-accent-color: rgb(var(--primary-rgb, 212 85 55));
          --rdp-background-color: transparent;
          margin: 0;
        }
      `}</style>
    </div>
  );
};
