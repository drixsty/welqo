"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookingQuote } from "@welqo/types";
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  User,
  ClipboardList,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "../lib/tracking";

const bookingSchema = z.object({
  firstName: z.string().min(2, "Le prénom est trop court"),
  lastName: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface ReservationTunnelProps {
  quote: BookingQuote;
  locale: string;
}

export const ReservationTunnel = ({
  quote,
  locale,
}: ReservationTunnelProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const isFr = locale === "fr";

  React.useEffect(() => {
    trackEvent("begin_checkout", {
      currency: "EUR",
      value: quote.priceBreakdown.totalGross,
      items: [
        {
          item_id: quote.propertyId,
          price: quote.priceBreakdown.nightlyRate,
          quantity: quote.nightsCount,
        },
      ],
    });
  }, [quote]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
  });

  const nextStep = async () => {
    if (step === 2) {
      const result = await trigger();
      if (!result) return;
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyId: quote.propertyId,
            checkIn: quote.checkIn,
            checkOut: quote.checkOut,
            guestCount: quote.guests,
            guestFirstName: data.firstName,
            guestLastName: data.lastName,
            guestEmail: data.email,
            guestPhone: data.phone,
            nightsCount: quote.nightsCount,
          }),
        },
      );

      const result = await res.json();
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* 🟢 NEW PROGRESS BAR */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {[
            {
              id: 1,
              label: isFr ? "Récapitulatif" : "Summary",
              icon: ClipboardList,
            },
            { id: 2, label: isFr ? "Informations" : "Info", icon: User },
            { id: 3, label: isFr ? "Paiement" : "Payment", icon: CreditCard },
          ].map((s) => (
            <div
              key={s.id}
              className={cn(
                "flex flex-col items-center gap-2 transition-opacity duration-300",
                step < s.id ? "opacity-30" : "opacity-100",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                  step >= s.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "bg-slate-100 text-slate-400",
                )}
              >
                <s.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black tracking-widest">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-welqo-terracotta"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter">
                    {isFr ? "Vérifiez votre séjour" : "Check your stay"}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    {isFr
                      ? "Un moment d'exception se prépare."
                      : "An exceptional moment is coming."}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 p-8 rounded-3xl space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black tracking-widest text-slate-400">
                        {isFr ? "Arrivée" : "Check-in"}
                      </span>
                      <p className="font-bold text-lg">
                        {new Date(quote.checkIn).toLocaleDateString(locale, {
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black tracking-widest text-slate-400">
                        {isFr ? "Départ" : "Check-out"}
                      </span>
                      <p className="font-bold text-lg">
                        {new Date(quote.checkOut).toLocaleDateString(locale, {
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-200/50 dark:border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white dark:bg-white/5 rounded-full flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="font-bold">
                        {quote.guests} {isFr ? "voyageurs" : "guests"}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                      {isFr ? "Annulation flexible" : "Flexible cancellation"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="group w-full py-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-bold hover:bg-welqo-terracotta hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 dark:shadow-none"
                >
                  {isFr ? "Continuer vers mes infos" : "Continue to my info"}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter">
                    {isFr ? "Vos informations" : "Your information"}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    {isFr
                      ? "Sécurisons votre réservation ensemble."
                      : "Let's secure your booking together."}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 ml-1">
                        {isFr ? "Prénom" : "First Name"}
                      </label>
                      <input
                        {...register("firstName")}
                        className={cn(
                          "w-full bg-slate-50 dark:bg-white/[0.03] border rounded-2xl px-5 py-4 text-sm outline-none transition-all focus:ring-4 focus:ring-welqo-terracotta/5",
                          errors.firstName
                            ? "border-red-500"
                            : "border-slate-100 dark:border-white/10 focus:border-welqo-terracotta",
                        )}
                        placeholder="Jean"
                      />
                      {errors.firstName && (
                        <p className="text-[10px] text-red-500 font-bold ml-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black tracking-widest text-slate-400 ml-1">
                        {isFr ? "Nom" : "Last Name"}
                      </label>
                      <input
                        {...register("lastName")}
                        className={cn(
                          "w-full bg-slate-50 dark:bg-white/[0.03] border rounded-2xl px-5 py-4 text-sm outline-none transition-all focus:ring-4 focus:ring-welqo-terracotta/5",
                          errors.lastName
                            ? "border-red-500"
                            : "border-slate-100 dark:border-white/10 focus:border-welqo-terracotta",
                        )}
                        placeholder="Dupont"
                      />
                      {errors.lastName && (
                        <p className="text-[10px] text-red-500 font-bold ml-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black tracking-widest text-slate-400 ml-1">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={cn(
                        "w-full bg-slate-50 dark:bg-white/[0.03] border rounded-2xl px-5 py-4 text-sm outline-none transition-all focus:ring-4 focus:ring-welqo-terracotta/5",
                        errors.email
                          ? "border-red-500"
                          : "border-slate-100 dark:border-white/10 focus:border-welqo-terracotta",
                      )}
                      placeholder="jean.dupont@email.com"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-500 font-bold ml-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black tracking-widest text-slate-400 ml-1">
                      {isFr ? "Téléphone" : "Phone"}
                    </label>
                    <input
                      {...register("phone")}
                      className={cn(
                        "w-full bg-slate-50 dark:bg-white/[0.03] border rounded-2xl px-5 py-4 text-sm outline-none transition-all focus:ring-4 focus:ring-welqo-terracotta/5",
                        errors.phone
                          ? "border-red-500"
                          : "border-slate-100 dark:border-white/10 focus:border-welqo-terracotta",
                      )}
                      placeholder="+33 6 12 34 56 78"
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-500 font-bold ml-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="p-5 bg-slate-100 dark:bg-white/5 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 py-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-bold hover:bg-welqo-terracotta hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:text-white"
                  >
                    {isFr
                      ? "Continuer vers le paiement"
                      : "Continue to payment"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter">
                    {isFr ? "Paiement sécurisé" : "Secure payment"}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    {isFr
                      ? "Dernière étape avant votre séjour d'exception."
                      : "Final step before your exceptional stay."}
                  </p>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-3xl flex items-start gap-5">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-base">
                      {isFr
                        ? "Garantie Tranquillité"
                        : "Peace of Mind Guarantee"}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {isFr
                        ? `Une caution de ${quote.securityDeposit}€ sera simplement pré-autorisée. Aucun débit ne sera effectué sans constatation de dommages.`
                        : `A security deposit of ${quote.securityDeposit}€ will be pre-authorized. No charge will be made unless damage is reported.`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="p-5 bg-slate-100 dark:bg-white/5 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleSubmit(onSubmit)}
                    className="flex-1 py-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/10"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        {isFr
                          ? `Payer ${quote.priceBreakdown.totalGross}€`
                          : `Pay ${quote.priceBreakdown.totalGross}€`}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 md:top-24 space-y-6">
            <div className="bg-slate-950 text-white rounded-[2rem] p-8 space-y-8 shadow-2xl">
              <h3 className="font-bold text-lg flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                {isFr ? "Détails du prix" : "Price details"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">
                    {quote.nightsCount} {isFr ? "nuits" : "nights"} x{" "}
                    {quote.priceBreakdown.nightlyRate}€
                  </span>
                  <span className="font-bold">
                    {quote.priceBreakdown.totalNights}€
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">
                    {isFr ? "Frais de ménage" : "Cleaning fee"}
                  </span>
                  <span className="font-bold">
                    {quote.priceBreakdown.cleaningFee}€
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium">
                    {isFr ? "Taxe de séjour" : "Tourist tax"}
                  </span>
                  <span className="font-bold">
                    {quote.priceBreakdown.touristTax}€
                  </span>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                  <span className="text-slate-400 font-medium">
                    {isFr ? "Total" : "Total"}
                  </span>
                  <span className="text-3xl font-bold text-primary tracking-tighter">
                    {quote.priceBreakdown.totalGross}€
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3 text-[9px] font-black tracking-[0.2em] text-white/30 border-t border-white/5">
                <ShieldCheck className="w-3 h-3" />
                Paiement sécurisé Stripe
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-3xl">
              <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic">
                {isFr
                  ? "« Une gestion irréprochable pour un séjour sans compromis. Welqo garantit la qualité de chaque demeure. »"
                  : "« Impeccable management for an uncompromising stay. Welqo guarantees the quality of every home. »"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
