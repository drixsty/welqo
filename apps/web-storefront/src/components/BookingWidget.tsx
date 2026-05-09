"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { DayPicker, DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { differenceInCalendarDays, format, addDays } from "date-fns";
import { Users, X, ArrowRight, Minus, Plus } from "lucide-react";
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
  const [range, setRange]             = useState<DateRange | undefined>();
  const [showPicker, setShowPicker]   = useState(false);
  const pickerRef                     = useRef<HTMLDivElement>(null);

  // Guests
  const [guests, setGuests]           = useState(2);

  // Form / flow
  const [step, setStep]               = useState<Step>("dates");
  const [guestForm, setGuestForm]     = useState<GuestForm>({ firstName: "", lastName: "", email: "", phone: "" });
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  // Derived
  const nights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;
  const subtotal    = price * nights;
  const taxTotal    = touristTax * nights;
  const total       = subtotal + cleaningFee + taxTotal;
  const today       = new Date();
  const isRangeSet  = !!range?.from && !!range?.to && nights > 0;

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

  const handleDateFieldClick = () => setShowPicker((v) => !v);

  const handleRangeSelect = (r: DateRange | undefined) => {
    setRange(r);
    if (r?.from && r?.to) setShowPicker(false);
  };

  const handleReserveClick = () => {
    if (!isRangeSet) { setShowPicker(true); return; }
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

  const inputCls =
    "w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all text-sm font-medium placeholder:text-slate-400";

  // ── Guest Form Step ──────────────────────────────────────────
  if (step === "form") {
    return (
      <div className="sticky top-24 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setStep("dates")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <p className="font-black text-slate-900 dark:text-white">Vos coordonnées</p>
            <p className="text-xs text-slate-400 font-medium">
              {fmtDate(range?.from)} → {fmtDate(range?.to)} · {nights} nuit{nights > 1 ? "s" : ""} · {guests} voyageur{guests > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Summary mini */}
        <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex justify-between items-center">
          <span className="text-slate-500 text-sm font-medium">{t("total")}</span>
          <span className="text-xl font-black text-slate-900 dark:text-white">{total.toFixed(2)} €</span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Prénom</label>
              <input
                type="text"
                required
                placeholder="Jean"
                value={guestForm.firstName}
                onChange={(e) => setGuestForm((f) => ({ ...f, firstName: e.currentTarget.value }))}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Nom</label>
              <input
                type="text"
                required
                placeholder="Dupont"
                value={guestForm.lastName}
                onChange={(e) => setGuestForm((f) => ({ ...f, lastName: e.currentTarget.value }))}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Email</label>
            <input
              type="email"
              required
              placeholder="jean.dupont@exemple.fr"
              value={guestForm.email}
              onChange={(e) => setGuestForm((f) => ({ ...f, email: e.currentTarget.value }))}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">
              Téléphone <span className="text-slate-300 normal-case font-medium">(optionnel)</span>
            </label>
            <input
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={guestForm.phone}
              onChange={(e) => setGuestForm((f) => ({ ...f, phone: e.currentTarget.value }))}
              className={inputCls}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 text-xs font-bold rounded-xl border border-red-100 dark:border-red-900">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Redirection…
              </span>
            ) : (
              "Payer en sécurité →"
            )}
          </button>

          <p className="text-center text-xs text-slate-400 font-medium">
            Paiement sécurisé via Stripe · Aucun frais caché
          </p>
        </form>
      </div>
    );
  }

  // ── Dates / Default Step ──────────────────────────────────────
  return (
    <div className="sticky top-24 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
      {/* Price header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-3xl font-black text-slate-900 dark:text-white">{price}€</span>
          <span className="text-slate-500 font-bold text-sm ml-1 uppercase">/ {t("night")}</span>
        </div>
        <div className="text-sm font-bold text-blue-600 underline cursor-pointer">
          Tarifs dégressifs
        </div>
      </div>

      {/* Date picker trigger */}
      <div ref={pickerRef} className="relative mb-4">
        <div
          onClick={handleDateFieldClick}
          className="grid grid-cols-2 gap-px bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
        >
          <div className="bg-white dark:bg-slate-900 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Arrivée</p>
            <p className={`font-bold text-sm ${range?.from ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
              {range?.from ? fmtDate(range.from) : "Sélectionner"}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Départ</p>
            <p className={`font-bold text-sm ${range?.to ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
              {range?.to ? fmtDate(range.to) : "Sélectionner"}
            </p>
          </div>
        </div>

        {range?.from && (
          <button
            onClick={(e) => { e.stopPropagation(); setRange(undefined); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-3 h-3 text-slate-500" />
          </button>
        )}

        {/* Date picker dropdown */}
        {showPicker && (
          <div className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl shadow-slate-900/20 overflow-hidden">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleRangeSelect}
              locale={fr}
              numberOfMonths={1}
              disabled={{ before: addDays(today, 1) }}
              classNames={{
                root: "p-4",
                month_caption: "font-black text-slate-900 dark:text-white mb-4 capitalize",
                weekday: "text-[11px] font-black uppercase text-slate-400 w-9 text-center",
                day: "w-9 h-9 text-sm font-medium rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors",
                selected: "bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700",
                range_start: "bg-blue-600 text-white font-black rounded-xl",
                range_end: "bg-blue-600 text-white font-black rounded-xl",
                range_middle: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-none",
                today: "font-black text-blue-600",
                disabled: "opacity-30 cursor-not-allowed hover:bg-transparent",
                outside: "opacity-30",
                nav: "flex items-center gap-2",
                button_previous: "w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                button_next: "w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
              }}
            />
          </div>
        )}
      </div>

      {/* Guests selector */}
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-2xl mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400">Voyageurs</p>
            <p className="font-bold text-sm text-slate-900 dark:text-white">
              {guests} voyageur{guests > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
            disabled={guests <= 1}
          >
            <Minus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          </button>
          <span className="w-5 text-center font-black text-slate-900 dark:text-white">{guests}</span>
          <button
            onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
            disabled={guests >= maxGuests}
          >
            <Plus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleReserveClick}
        className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95 mb-6"
      >
        {isRangeSet ? t("bookNow") : "Choisir les dates"}
      </button>

      <p className="text-center text-xs text-slate-400 font-medium mb-6">
        Aucun frais avant confirmation
      </p>

      {/* Price breakdown */}
      {isRangeSet && (
        <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
            <span className="underline">{price}€ × {nights} nuit{nights > 1 ? "s" : ""}</span>
            <span>{subtotal}€</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
            <span className="underline">Frais de ménage</span>
            <span>{cleaningFee}€</span>
          </div>
          {taxTotal > 0 && (
            <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
              <span className="underline">Taxe de séjour</span>
              <span>{taxTotal.toFixed(2)}€</span>
            </div>
          )}
          <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xl font-black text-slate-900 dark:text-white">
            <span>{t("total")}</span>
            <span>{total.toFixed(2)}€</span>
          </div>
        </div>
      )}
    </div>
  );
};
