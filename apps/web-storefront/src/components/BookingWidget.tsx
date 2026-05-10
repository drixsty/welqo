"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { DayPicker, DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { differenceInCalendarDays, format, addDays } from "date-fns";
import { X, ArrowRight, Minus, Plus, ShieldCheck } from "lucide-react";
import { fetchApi } from "../lib/api";
import "react-day-picker/style.css";

interface BookingWidgetProps {
  propertyId: string;
  price: number;
  cleaningFee: number;
  touristTax: number;
  maxGuests?: number;
}

interface GuestForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

type Step = "dates" | "form";

export const BookingWidget = ({
  propertyId,
  price,
  cleaningFee,
  touristTax,
  maxGuests = 8,
}: BookingWidgetProps) => {
  const t = useTranslations("PropertyPage");

  // Date range
  const [range, setRange] = useState<DateRange | undefined>();
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Guests
  const [guests, setGuests] = useState(2);

  // Form / flow
  const [step, setStep] = useState<Step>("dates");
  const [guestForm, setGuestForm] = useState<GuestForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derived
  const nights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;
  const subtotal = price * nights;
  const taxTotal = touristTax * nights;
  const total = subtotal + cleaningFee + taxTotal;
  const today = new Date();
  const isRangeSet = !!range?.from && !!range?.to && nights > 0;

  // Close picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleRangeSelect = (r: DateRange | undefined) => {
    setRange(r);
    if (r?.from && r?.to) setShowPicker(false);
  };

  const handleReserveClick = () => {
    if (!isRangeSet) {
      setShowPicker(true);
      return;
    }
    setError(null);
    setStep("form");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetchApi("/bookings/checkout", {
        method: "POST",
        body: JSON.stringify({
          propertyId,
          guestFirstName: guestForm.firstName,
          guestLastName: guestForm.lastName,
          guestEmail: guestForm.email,
          guestPhone: guestForm.phone || undefined,
          guestCount: guests,
          checkIn: format(range!.from!, "yyyy-MM-dd"),
          checkOut: format(range!.to!, "yyyy-MM-dd"),
          nightsCount: nights,
        }),
      });
      if (response && (response as any).url) {
        window.location.href = (response as any).url;
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fmtDate = (d?: Date) =>
    d ? format(d, "dd MMM yyyy", { locale: fr }) : "";

  // ── Guest Form Step ──────────────────────────────────────────
  if (step === "form") {
    return (
      <div className="sticky top-24 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-white/5 shadow-card max-h-[calc(100vh-100px)] overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setStep("dates")}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180 text-slate-400" />
            </button>
            <div>
              <p className="font-bold text-welqo-anthracite dark:text-white uppercase tracking-widest text-[9px] mb-0.5">
                Finalisation
              </p>
              <p className="text-xs text-slate-400 font-mono font-bold">
                {fmtDate(range?.from)} — {fmtDate(range?.to)}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl mb-6 flex justify-between items-center">
            <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">
              Total
            </span>
            <span className="text-xl font-mono font-bold text-welqo-anthracite dark:text-white">
              {total.toFixed(2)} €
            </span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase text-slate-400 tracking-widest ml-1">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jean"
                  value={guestForm.firstName}
                  onChange={(e) =>
                    setGuestForm((f) => ({
                      ...f,
                      firstName: e.currentTarget.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl focus:outline-none focus:border-welqo-terracotta transition-all text-sm font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase text-slate-400 tracking-widest ml-1">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dupont"
                  value={guestForm.lastName}
                  onChange={(e) =>
                    setGuestForm((f) => ({
                      ...f,
                      lastName: e.currentTarget.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl focus:outline-none focus:border-welqo-terracotta transition-all text-sm font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase text-slate-400 tracking-widest ml-1">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="jean.dupont@exemple.fr"
                value={guestForm.email}
                onChange={(e) =>
                  setGuestForm((f) => ({ ...f, email: e.currentTarget.value }))
                }
                className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl focus:outline-none focus:border-welqo-terracotta transition-all text-sm font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase text-slate-400 tracking-widest ml-1">
                Téléphone
              </label>
              <input
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={guestForm.phone}
                onChange={(e) =>
                  setGuestForm((f) => ({ ...f, phone: e.currentTarget.value }))
                }
                className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl focus:outline-none focus:border-welqo-terracotta transition-all text-sm font-bold"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 text-[10px] font-bold rounded-lg border border-red-100 dark:border-red-900/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-welqo-anthracite hover:bg-welqo-terracotta disabled:opacity-50 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-welqo-anthracite/10 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Traitement...
                </span>
              ) : (
                "Confirmer"
              )}
            </button>

            <p className="text-center text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Paiement Stripe sécurisé
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ── Dates / Default Step ──────────────────────────────────────
  return (
    <div className="sticky top-24 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-white/5 shadow-card max-h-[calc(100vh-100px)] overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="p-6">
        {/* Price header — Brand Style */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-mono font-bold text-welqo-anthracite dark:text-white tracking-tighter">
                {price}€
              </span>
              <span className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                / {t("night")}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
              <div className="w-1 h-1 bg-emerald-500 rounded-full" />
              Prix Garanti
            </div>
          </div>
          <div className="w-10 h-10 bg-welqo-terracotta/10 rounded-xl flex items-center justify-center text-welqo-terracotta">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Unified Date Bar — Brand Minimalist */}
        <div ref={pickerRef} className="relative mb-4">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl hover:border-welqo-terracotta/30 transition-all group"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Séjour
              </span>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-mono font-bold ${range?.from ? "text-welqo-anthracite dark:text-white" : "text-slate-300"}`}
                >
                  {range?.from
                    ? format(range.from, "dd MMM yyyy", { locale: fr })
                    : "Arrivée"}
                </span>
                <ArrowRight className="w-2.5 h-2.5 text-slate-300 group-hover:text-welqo-terracotta transition-colors" />
                <span
                  className={`text-xs font-mono font-bold ${range?.to ? "text-welqo-anthracite dark:text-white" : "text-slate-300"}`}
                >
                  {range?.to
                    ? format(range.to, "dd MMM yyyy", { locale: fr })
                    : "Départ"}
                </span>
              </div>
            </div>
            {isRangeSet && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setRange(undefined);
                }}
                className="w-7 h-7 flex items-center justify-center bg-white dark:bg-white/10 rounded-full shadow-sm text-slate-300 hover:text-welqo-terracotta transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </div>
            )}
          </button>

          {/* Date picker dropdown — Brand Style */}
          {showPicker && (
            <div className="absolute z-50 left-0 right-0 mt-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-xl shadow-card-hover p-5 animate-fade-up">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 px-2">
                  Disponibilités
                </span>
                <button
                  onClick={() => setShowPicker(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleRangeSelect}
                locale={fr}
                numberOfMonths={1}
                disabled={{ before: addDays(today, 1) }}
                classNames={{
                  root: "p-0",
                  months: "relative",
                  month: "space-y-4",
                  month_caption:
                    "flex justify-center items-center h-8 mb-6 relative",
                  caption_label:
                    "text-sm font-black text-welqo-anthracite dark:text-white capitalize",
                  nav: "flex items-center justify-between absolute w-full z-10",
                  button_previous:
                    "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                  button_next:
                    "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                  weekday:
                    "text-[10px] font-black uppercase text-slate-400 w-8 text-center",
                  day: "w-8 h-8 text-[10px] font-bold rounded-lg cursor-pointer hover:bg-welqo-terracotta/5 dark:hover:bg-welqo-terracotta/10 transition-colors",
                  selected: "bg-welqo-terracotta text-white font-bold",
                  range_start:
                    "bg-welqo-terracotta text-white font-bold rounded-l-lg",
                  range_end:
                    "bg-welqo-terracotta text-white font-bold rounded-r-lg",
                  range_middle:
                    "bg-welqo-terracotta/10 text-welqo-terracotta rounded-none",
                  today:
                    "font-bold text-welqo-terracotta underline decoration-2 underline-offset-4",
                  disabled:
                    "opacity-20 cursor-not-allowed hover:bg-transparent",
                  outside: "opacity-20",
                }}
              />
            </div>
          )}
        </div>

        {/* Guest Selector — Brand Minimalist */}
        <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl mb-6">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
              Voyageurs
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-mono font-bold text-welqo-anthracite dark:text-white">
                {guests}
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                personnes
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-1 bg-white dark:bg-white/5 rounded-lg shadow-sm border border-slate-100 dark:border-white/5">
            <button
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-welqo-terracotta hover:bg-slate-50 dark:hover:bg-white/10 rounded-md transition-all disabled:opacity-20"
              disabled={guests <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-welqo-terracotta hover:bg-slate-50 dark:hover:bg-white/10 rounded-md transition-all disabled:opacity-20"
              disabled={guests >= maxGuests}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleReserveClick}
          className="w-full bg-welqo-anthracite hover:bg-welqo-terracotta text-white font-bold py-4 rounded-xl text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-welqo-anthracite/10 active:scale-[0.98] mb-4"
        >
          {isRangeSet ? "Réserver" : "Disponibilités"}
        </button>

        <p className="text-center text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center justify-center gap-2">
          <div className="w-1 h-1 bg-emerald-500 rounded-full" />
          Paiement sécurisé
        </p>

        {/* Price breakdown — Brand Lean */}
        {isRangeSet && (
          <div className="space-y-4 animate-fade-up">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                  Séjour
                </span>
                <span className="text-xs font-medium text-welqo-anthracite dark:text-slate-300">
                  {price}€ × {nights} nuits
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-welqo-anthracite dark:text-white">
                {subtotal}€
              </span>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Services
              </span>
              <span className="text-sm font-mono font-bold text-welqo-anthracite dark:text-white">
                {cleaningFee}€
              </span>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/5">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    Total
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Taxes incluses
                  </span>
                </div>
                <span className="text-3xl font-mono font-bold text-welqo-anthracite dark:text-white tracking-tighter">
                  {total.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
