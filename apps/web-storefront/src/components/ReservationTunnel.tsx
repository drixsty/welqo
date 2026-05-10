"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingQuote } from "@welqo/types";
import { ChevronRight, ChevronLeft, CreditCard, User, ClipboardList, ShieldCheck } from "lucide-react";

interface ReservationTunnelProps {
  quote: BookingQuote;
  locale: string;
}

export const ReservationTunnel = ({ quote, locale }: ReservationTunnelProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const isFr = locale === "fr";

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: quote.propertyId,
          checkIn: quote.checkIn,
          checkOut: quote.checkOut,
          guestCount: quote.guests,
          guestFirstName: formData.firstName,
          guestLastName: formData.lastName,
          guestEmail: formData.email,
          guestPhone: formData.phone,
          nightsCount: quote.nightsCount,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      alert("Erreur: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Steps Indicator */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 dark:bg-white/10 -translate-y-1/2 z-0" />
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
              step >= s ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-50 text-slate-400 dark:bg-slate-900"
            }`}
          >
            {s === 1 && <ClipboardList className="w-5 h-5" />}
            {s === 2 && <User className="w-5 h-5" />}
            {s === 3 && <CreditCard className="w-5 h-5" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">{isFr ? "Récapitulatif de votre séjour" : "Your stay summary"}</h2>
                  <p className="text-slate-500 text-sm">{isFr ? "Vérifiez les détails avant de continuer." : "Check details before continuing."}</p>
                </div>

                <div className="bg-slate-50 dark:bg-white/[0.03] p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{isFr ? "Arrivée" : "Check-in"}</span>
                    <span className="font-bold">{new Date(quote.checkIn).toLocaleDateString(locale)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{isFr ? "Départ" : "Check-out"}</span>
                    <span className="font-bold">{new Date(quote.checkOut).toLocaleDateString(locale)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{isFr ? "Voyageurs" : "Guests"}</span>
                    <span className="font-bold">{quote.guests}</span>
                  </div>
                </div>

                <button 
                  onClick={nextStep}
                  className="w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold hover:bg-welqo-terracotta hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  {isFr ? "Continuer vers mes infos" : "Continue to my info"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">{isFr ? "Vos informations" : "Your information"}</h2>
                  <p className="text-slate-500 text-sm">{isFr ? "Ces informations sont nécessaires pour votre contrat." : "This information is needed for your contract."}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">{isFr ? "Prénom" : "First Name"}</label>
                    <input 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-welqo-terracotta outline-none transition-colors"
                      placeholder="Jean"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">{isFr ? "Nom" : "Last Name"}</label>
                    <input 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-welqo-terracotta outline-none transition-colors"
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-welqo-terracotta outline-none transition-colors"
                    placeholder="jean.dupont@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">{isFr ? "Téléphone" : "Phone"}</label>
                  <input 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-welqo-terracotta outline-none transition-colors"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <div className="flex gap-4">
                  <button onClick={prevStep} className="p-4 bg-slate-100 dark:bg-white/10 rounded-xl"><ChevronLeft className="w-5 h-5" /></button>
                  <button 
                    disabled={!formData.email || !formData.firstName}
                    onClick={nextStep}
                    className="flex-1 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold hover:bg-welqo-terracotta hover:text-white transition-all disabled:opacity-50"
                  >
                    {isFr ? "Continuer vers le paiement" : "Continue to payment"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">{isFr ? "Paiement sécurisé" : "Secure payment"}</h2>
                  <p className="text-slate-500 text-sm">{isFr ? "Vous allez être redirigé vers l'interface de paiement sécurisée." : "You will be redirected to the secure payment interface."}</p>
                </div>

                <div className="border border-emerald-500/20 bg-emerald-500/5 p-6 rounded-2xl flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{isFr ? "Empreinte de caution" : "Security deposit"}</h4>
                    <p className="text-xs text-slate-500">
                      {isFr 
                        ? `Une empreinte de ${quote.securityDeposit}€ sera effectuée mais ne sera pas débitée sauf en cas de dommages.`
                        : `A pre-authorization of ${quote.securityDeposit}€ will be made but not debited unless damage occurs.`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={prevStep} className="p-4 bg-slate-100 dark:bg-white/10 rounded-xl"><ChevronLeft className="w-5 h-5" /></button>
                  <button 
                    disabled={loading}
                    onClick={handleSubmit}
                    className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? "..." : (isFr ? `Payer ${quote.priceBreakdown.totalGross}€` : `Pay ${quote.priceBreakdown.totalGross}€`)}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-slate-50 dark:bg-white/[0.03] rounded-3xl p-6 space-y-6">
            <h3 className="font-bold border-b border-slate-200 dark:border-white/10 pb-4">
              {isFr ? "Détails du prix" : "Price details"}
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{quote.nightsCount} {isFr ? "nuits" : "nights"} x {quote.priceBreakdown.nightlyRate}€</span>
                <span>{quote.priceBreakdown.totalNights}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{isFr ? "Frais de ménage" : "Cleaning fee"}</span>
                <span>{quote.priceBreakdown.cleaningFee}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{isFr ? "Taxe de séjour" : "Tourist tax"}</span>
                <span>{quote.priceBreakdown.touristTax}€</span>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-xl text-welqo-terracotta">{quote.priceBreakdown.totalGross}€</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
              {isFr ? "Paiement 100% sécurisé via Stripe" : "100% secure payment via Stripe"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
