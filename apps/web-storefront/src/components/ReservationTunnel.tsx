"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookingQuote } from "@welqo/types";
import { useTranslations } from "next-intl";
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  User,
  ClipboardList,
  ShieldCheck,
  Loader2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "../lib/tracking";

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

interface ReservationTunnelProps {
  quote: BookingQuote;
  locale: string;
}

export const ReservationTunnel = ({
  quote,
  locale,
}: ReservationTunnelProps) => {
  const t = useTranslations("ReservationTunnel");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const bookingSchema = z.object({
    firstName: z.string().min(2, t("errorFirstName")),
    lastName: z.string().min(2, t("errorLastName")),
    email: z.string().email(t("errorEmail")),
    phone: z.string().min(10, t("errorPhone")),
  });

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
    formState: { errors },
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

  // Framer motion variants for Card Deck stack effect
  const cardVariants = {
    initial: { opacity: 0, scale: 0.94, y: 30, rotateX: -5 },
    animate: { opacity: 1, scale: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, scale: 0.94, y: -30, rotateX: 5 },
  };

  const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 26,
  } as const;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* 🟢 PROGRESS BAR */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {[
            { id: 1, label: t("stepSummary"), icon: ClipboardList },
            { id: 2, label: t("stepInfo"), icon: User },
            { id: 3, label: t("stepPayment"), icon: CreditCard },
          ].map((s) => (
            <div
              key={s.id}
              className={cn(
                "flex flex-col items-center gap-2 transition-opacity duration-300",
                step < s.id ? "opacity-35" : "opacity-100",
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm",
                  step >= s.id
                    ? "bg-welqo-terracotta text-white shadow-lg shadow-welqo-terracotta/20 scale-105"
                    : "bg-slate-100 dark:bg-white/5 text-slate-400",
                )}
              >
                <s.icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-[9px] font-black tracking-[0.15em] uppercase text-slate-500 dark:text-slate-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-welqo-terracotta to-orange-400"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={springTransition}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr,1fr] gap-8 items-start">
        {/* Left Interactive deck area */}
        <div className="relative" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={springTransition}
                className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-none space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-primary uppercase tracking-[0.25em]">
                    {t("step1Label")}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {t("checkStay")}
                  </h2>
                  <p className="text-slate-500 text-xs font-medium">
                    {t("checkStaySubtitle")}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 p-6 rounded-2xl space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[8px] font-black tracking-widest text-slate-400 uppercase">
                        {t("checkIn")}
                      </span>
                      <p className="font-bold text-base">
                        {new Date(quote.checkIn).toLocaleDateString(locale, {
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] font-black tracking-widest text-slate-400 uppercase">
                        {t("checkOut")}
                      </span>
                      <p className="font-bold text-base">
                        {new Date(quote.checkOut).toLocaleDateString(locale, {
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200/50 dark:border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="font-bold text-sm">
                        {quote.guests}{" "}
                        {quote.guests > 1 ? t("guestPlural") : t("guest")}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                      {t("flexibleCancel")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="group w-full py-4.5 bg-slate-950 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-welqo-terracotta hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]"
                >
                  {t("continueToInfo")}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={springTransition}
                className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-none space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-primary uppercase tracking-[0.25em]">
                    {t("step2Label")}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {t("yourInfo")}
                  </h2>
                  <p className="text-slate-500 text-xs font-medium">
                    {t("yourInfoSubtitle")}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[8px] font-black tracking-widest text-slate-500 uppercase ml-1">
                        {t("firstName")}
                      </label>
                      <input
                        {...register("firstName")}
                        className={cn(
                          "w-full bg-slate-50 dark:bg-white/[0.02] border rounded-xl px-4 py-3.5 text-xs outline-none transition-all focus:ring-4 focus:ring-welqo-terracotta/5",
                          errors.firstName
                            ? "border-red-500"
                            : "border-slate-100 dark:border-white/10 focus:border-welqo-terracotta",
                        )}
                        placeholder="Jean"
                      />
                      {errors.firstName && (
                        <p className="text-[9px] text-red-500 font-bold ml-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black tracking-widest text-slate-500 uppercase ml-1">
                        {t("lastName")}
                      </label>
                      <input
                        {...register("lastName")}
                        className={cn(
                          "w-full bg-slate-50 dark:bg-white/[0.02] border rounded-xl px-4 py-3.5 text-xs outline-none transition-all focus:ring-4 focus:ring-welqo-terracotta/5",
                          errors.lastName
                            ? "border-red-500"
                            : "border-slate-100 dark:border-white/10 focus:border-welqo-terracotta",
                        )}
                        placeholder="Dupont"
                      />
                      {errors.lastName && (
                        <p className="text-[9px] text-red-500 font-bold ml-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-black tracking-widest text-slate-500 uppercase ml-1">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={cn(
                        "w-full bg-slate-50 dark:bg-white/[0.02] border rounded-xl px-4 py-3.5 text-xs outline-none transition-all focus:ring-4 focus:ring-welqo-terracotta/5",
                        errors.email
                          ? "border-red-500"
                          : "border-slate-100 dark:border-white/10 focus:border-welqo-terracotta",
                      )}
                      placeholder="jean.dupont@email.com"
                    />
                    {errors.email && (
                      <p className="text-[9px] text-red-500 font-bold ml-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-black tracking-widest text-slate-500 uppercase ml-1">
                      {t("phone")}
                    </label>
                    <input
                      {...register("phone")}
                      className={cn(
                        "w-full bg-slate-50 dark:bg-white/[0.02] border rounded-xl px-4 py-3.5 text-xs outline-none transition-all focus:ring-4 focus:ring-welqo-terracotta/5",
                        errors.phone
                          ? "border-red-500"
                          : "border-slate-100 dark:border-white/10 focus:border-welqo-terracotta",
                      )}
                      placeholder="+33 6 12 34 56 78"
                    />
                    {errors.phone && (
                      <p className="text-[9px] text-red-500 font-bold ml-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={prevStep}
                    className="p-4 bg-slate-100 dark:bg-white/5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 py-4 bg-slate-950 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-sm hover:bg-welqo-terracotta hover:text-white transition-all active:scale-[0.98]"
                  >
                    {t("continueToPay")}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={springTransition}
                className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-none space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-primary uppercase tracking-[0.25em]">
                    {t("step3Label")}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {t("securePayment")}
                  </h2>
                  <p className="text-slate-500 text-xs font-medium">
                    {t("securePaymentSubtitle")}
                  </p>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm">{t("guarantee")}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {t("guaranteeText", {
                        amount: quote.securityDeposit,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={prevStep}
                    className="p-4 bg-slate-100 dark:bg-white/5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleSubmit(onSubmit)}
                    className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/10"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        {t("payAmount", {
                          amount: quote.priceBreakdown.totalGross,
                        })}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side Summary panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-slate-950 text-white rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-20 h-20 bg-welqo-terracotta/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="font-bold text-base flex items-center gap-2.5">
                <div className="w-1.5 h-5 bg-primary rounded-full" />
                {t("priceDetails")}
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    {quote.nightsCount} {t("nights")} x{" "}
                    {quote.priceBreakdown.nightlyRate} €
                  </span>
                  <span className="font-bold text-slate-200">
                    {quote.priceBreakdown.totalNights} €
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    {t("cleaningFee")}
                  </span>
                  <span className="font-bold text-slate-200">
                    {quote.priceBreakdown.cleaningFee} €
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    {t("touristTax")}
                  </span>
                  <span className="font-bold text-slate-200">
                    {quote.priceBreakdown.touristTax} €
                  </span>
                </div>

                <div className="pt-5 border-t border-white/10 flex justify-between items-end">
                  <span className="text-slate-400 font-medium">
                    {t("total")}
                  </span>
                  <motion.span
                    key={quote.priceBreakdown.totalGross}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-black text-primary tracking-tighter"
                  >
                    {quote.priceBreakdown.totalGross} €
                  </motion.span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-2 text-[8px] font-black tracking-[0.15em] text-white/30 border-t border-white/5 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
                {t("securedStripe")}
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl flex items-start gap-3">
              <span className="text-primary text-base font-bold shrink-0">
                “
              </span>
              <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic">
                {t("testimonyQuote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
