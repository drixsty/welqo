"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  Calendar,
  BadgeCheck,
  Check,
  Send,
  X,
  ArrowRight,
} from "lucide-react";

interface OwnerPropertyShowcaseSidebarProps {
  locale: string;
  title: string;
  city: string;
  address?: string;
  basePrice: number;
  cleaningFee: number;
}

export function OwnerPropertyShowcaseSidebar({
  locale: _locale,
  title,
  city,
  basePrice,
  cleaningFee,
}: OwnerPropertyShowcaseSidebarProps) {
  const t = useTranslations("OwnerSidebar");
  const [occupancyDays, setOccupancyDays] = useState(25); // Default 82% (25 days)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { monthlyRevenue, yearlyRevenue } = useMemo(() => {
    const monthly = Math.round(basePrice * occupancyDays);
    return {
      monthlyRevenue: monthly,
      yearlyRevenue: monthly * 12,
    };
  }, [basePrice, occupancyDays]);

  const occupancyRate = Math.round((occupancyDays / 30) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setIsSuccess(true);
    }, 600);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Reset state after transition
    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setEmail("");
      setPhone("");
    }, 300);
  };

  return (
    <>
      <div className="bg-slate-900 text-white rounded-3xl border border-white/10 p-6 md:p-8 shadow-xl relative overflow-hidden">
        {/* Decorative Blur */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-welqo-terracotta/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 space-y-6">
          <div>
            <span className="px-2.5 py-1 bg-primary/20 border border-primary/30 text-primary text-[9px] font-black rounded-full tracking-widest inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-primary" />
              {t("ownerPerformance")}
            </span>
            <h3 className="text-xl font-bold tracking-tight mt-4">
              {t("yieldSimulator")}
            </h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed font-medium">
              {t("yieldSimulatorDesc")}
            </p>
          </div>

          {/* Interactive Slider Box */}
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[9px] font-black text-slate-500 tracking-widest">
                {t("occupancyRate")}
              </span>
              <span className="text-xs font-bold text-primary">
                {occupancyRate}% ({occupancyDays} {t("nights")})
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="30"
              step="1"
              value={occupancyDays}
              onChange={(e) => setOccupancyDays(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Revenue Display Box */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest leading-none">
                {t("estimatedRentalRevenue")}
              </p>
              <div className="flex items-baseline gap-2 mt-2 leading-none">
                <span className="text-4xl font-extrabold text-white tracking-tighter">
                  {monthlyRevenue.toLocaleString("fr-FR")} €
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  / {t("month")}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">
                {t("annualPotential")}
              </span>
              <span className="font-bold text-primary text-sm">
                {yearlyRevenue.toLocaleString("fr-FR")} €
              </span>
            </div>
          </div>

          {/* Simulation Breakdown Details */}
          <div className="space-y-2.5 pt-2">
            {[
              { label: t("avgNightlyRate"), value: `${basePrice} €` },
              { label: t("cleaningFees"), value: `${cleaningFee} €` },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2 font-bold tracking-wider"
              >
                <span className="text-slate-500">{item.label}</span>
                <span className="text-slate-300">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Welqo Added Value Checklist */}
          <div className="space-y-2.5 pt-2">
            <p className="text-[9px] font-black text-slate-500 tracking-widest mb-1.5">
              {t("welqoHandles")}
            </p>
            {[t("benefit0"), t("benefit1"), t("benefit2")].map(
              (benefit, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-start text-[10px] text-slate-300 font-medium"
                >
                  <span className="text-primary font-bold">✓</span>
                  <span>{benefit}</span>
                </div>
              ),
            )}
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-welqo-terracotta/20 flex items-center justify-center gap-2 active:scale-98"
            >
              {t("auditCta")}
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-2.5 text-[8px] text-slate-400 text-center italic opacity-60 leading-tight">
              {t("auditDisclaimer")}
            </p>
          </div>
        </div>
      </div>

      {/* Glassmorphic Modal for Lead Capture */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Dark Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 text-white"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-[8px] font-black text-primary tracking-[0.25em]">
                        {t("freeAudit")}
                      </span>
                      <h4 className="text-xl font-bold tracking-tight mt-1">
                        {t("requestEstimate")}
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed font-medium">
                        {t("modalDesc", { title, city })}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black text-slate-500 tracking-widest">
                          {t("fullName")}
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jean Dupont"
                          className="w-full bg-white/[0.03] border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-xs outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black text-slate-500 tracking-widest">
                          {t("emailAddress")}
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jean.dupont@gmail.com"
                          className="w-full bg-white/[0.03] border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-xs outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black text-slate-500 tracking-widest">
                          {t("phoneNumber")}
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="06 12 34 56 78"
                          className="w-full bg-white/[0.03] border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-xs outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-welqo-terracotta hover:bg-welqo-terracotta-dark rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
                      >
                        {t("submitAudit")}
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3px]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold tracking-tight">
                        {t("requestReceived")}
                      </h4>
                      <p className="text-slate-400 text-xs mt-2 max-w-xs mx-auto leading-relaxed">
                        {t("requestReceivedDesc", { name, city })}
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors"
                    >
                      {t("close")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
