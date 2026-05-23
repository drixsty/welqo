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
import { useTranslations } from "next-intl";
import { DayPicker, DateRange } from "react-day-picker";
import { format, differenceInDays, addDays } from "date-fns";
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

  const t = useTranslations("Booking");
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

  const formatVal = (val: number) => {
    return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const springTransition = {
    type: "spring",
    stiffness: 350,
    damping: 28,
  } as const;

  return (
    <motion.div
      whileHover={{
        y: -2,
        boxShadow: "0 20px 40px -15px rgba(230, 126, 34, 0.15)",
      }}
      className="sticky top-20 md:top-24 bg-white dark:bg-slate-900 rounded-[2rem] p-5 sm:p-6 border border-slate-100 dark:border-white/5 shadow-xl transition-all duration-500"
    >
      <div className="flex justify-between items-baseline mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
            €{basePrice}
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {t("perNight")}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-500 text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          <Zap className="w-2.5 h-2.5 fill-current" />
          {t("bestPrice")}
        </div>
      </div>

      <div className="space-y-2 mb-5">
        {/* Date Selector */}
        <div className="relative" ref={calendarRef}>
          <div className="grid grid-cols-2 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden divide-x divide-slate-100 dark:divide-white/5 shadow-sm">
            <button
              onClick={() => {
                setIsCalendarOpen(!isCalendarOpen);
                setIsGuestOpen(false);
              }}
              className="p-3 text-left hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group focus:outline-none"
            >
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                {t("checkIn")}
              </span>
              <span className="text-[11px] font-bold text-slate-800 dark:text-white truncate block">
                {range?.from
                  ? format(range.from, "dd MMM yyyy", { locale: fr })
                  : t("choose")}
              </span>
            </button>
            <button
              onClick={() => {
                setIsCalendarOpen(!isCalendarOpen);
                setIsGuestOpen(false);
              }}
              className="p-3 text-left hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group focus:outline-none"
            >
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                {t("checkOut")}
              </span>
              <span className="text-[11px] font-bold text-slate-800 dark:text-white truncate block">
                {range?.to
                  ? format(range.to, "dd MMM yyyy", { locale: fr })
                  : t("choose")}
              </span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isCalendarOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10, rotateX: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10, rotateX: 5 }}
                transition={springTransition}
                className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 p-3 origin-top-right w-[290px] sm:w-[320px]"
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
                  className="!m-0 flex justify-center"
                  classNames={{
                    months: "flex flex-col space-y-2",
                    month: "space-y-2",
                    month_caption:
                      "flex justify-between pt-1 relative items-center mb-1 px-1",
                    caption_label:
                      "text-xs font-black text-slate-800 dark:text-white capitalize",
                    nav: "flex items-center gap-0.5",
                    button_previous:
                      "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5",
                    button_next:
                      "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5",
                    month_grid: "w-full border-collapse",
                    weeks: "flex flex-col",
                    weekday:
                      "text-slate-400 rounded-md w-7 font-black text-[9px] uppercase tracking-wider text-center py-1",
                    week: "flex w-full mt-0.5",
                    day: "h-7 w-7 sm:h-8 sm:w-8 p-0 text-[10px] font-bold flex items-center justify-center aria-selected:opacity-100 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all relative",
                    selected:
                      "bg-welqo-terracotta text-white hover:bg-welqo-terracotta focus:bg-welqo-terracotta",
                    range_middle: "bg-primary/10 text-primary !rounded-none",
                    range_start: "bg-welqo-terracotta text-white rounded-l-lg",
                    range_end: "bg-welqo-terracotta text-white rounded-r-lg",
                    today:
                      "text-primary font-black after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full",
                    outside: "text-slate-300 opacity-20",
                    disabled:
                      "text-slate-200 dark:text-slate-700 opacity-30 cursor-not-allowed line-through",
                    hidden: "invisible",
                  }}
                  components={{
                    Chevron: (props) =>
                      props.orientation === "left" ? (
                        <ChevronLeft className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ),
                  }}
                />
                <div className="mt-3 pt-2.5 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setRange(undefined)}
                    className="text-[9px] font-black uppercase tracking-wider text-slate-400 hover:text-primary transition-colors flex items-center gap-1 focus:outline-none"
                  >
                    <X className="w-2.5 h-2.5" />
                    {t("clear")}
                  </button>
                  <span className="text-[9px] font-bold text-slate-400 italic">
                    {nights > 0
                      ? t("nightsSelected", { nights })
                      : t("selectDates")}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guest Selector */}
        <div className="relative" ref={guestRef}>
          <button
            onClick={() => {
              setIsGuestOpen(!isGuestOpen);
              setIsCalendarOpen(false);
            }}
            className="w-full p-3 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group focus:outline-none shadow-sm"
          >
            <div className="text-left">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                {t("guests")}
              </span>
              <span className="text-[11px] font-bold text-slate-800 dark:text-white">
                {guests} {guests > 1 ? t("guestPlural") : t("guest")}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isGuestOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isGuestOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={springTransition}
                className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 p-4 origin-top"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">
                      {t("adults")}
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      {t("maxGuests", { max: maxGuests })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={guests <= 1}
                      onClick={() => setGuests(guests - 1)}
                      className="w-7 h-7 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 transition-all hover:border-primary hover:text-primary focus:outline-none"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black w-4 text-center">
                      {guests}
                    </span>
                    <button
                      disabled={guests >= maxGuests}
                      onClick={() => setGuests(guests + 1)}
                      className="w-7 h-7 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 transition-all hover:border-primary hover:text-primary focus:outline-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pricing list with CountUp metrics */}
      <div className="space-y-3 mb-5 text-[11px] font-bold">
        <div className="flex justify-between">
          <span className="text-slate-400 font-medium">
            €{basePrice} x {nights} {t("nights", { nights })}
          </span>
          <span className="text-slate-800 dark:text-slate-200">
            €{formatVal(totalNights)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 font-medium">{t("cleaningFee")}</span>
          <span className="text-slate-800 dark:text-slate-200">
            €{formatVal(cleaningFee)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 font-medium">{t("touristTax")}</span>
          <span className="text-slate-800 dark:text-slate-200">
            €{formatVal(totalTax)}
          </span>
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex justify-between items-baseline">
          <span className="text-slate-500 uppercase tracking-widest text-[9px] font-black">
            {t("total")}
          </span>
          <motion.span
            key={total}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-black text-welqo-terracotta tracking-tighter"
          >
            €{formatVal(total)}
          </motion.span>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onBook?.({ range, guests })}
        className="group w-full py-4 bg-slate-950 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-xs hover:bg-welqo-terracotta hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-950/10 active:scale-97 border border-white/5"
      >
        {t("bookNow")}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <p className="mt-3.5 text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-emerald-500" />
        {t("securePayment")}
      </p>

      <style jsx global>{`
        .rdp {
          --rdp-accent-color: rgb(var(--primary-rgb, 212 85 55));
          --rdp-background-color: transparent;
          margin: 0;
        }
      `}</style>
    </motion.div>
  );
};
