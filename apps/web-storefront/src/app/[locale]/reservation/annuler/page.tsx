"use client";

import React, { useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/v1";

type Step = "confirm" | "loading" | "success" | "error" | "invalid";

export default function AnnulationPage() {
  const searchParams = useSearchParams();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "fr";
  const base = `/${locale}`;
  const token = searchParams.get("token");
  const [step, setStep]         = useState<Step>(token ? "confirm" : "invalid");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCancel = async () => {
    setStep("loading");
    try {
      const res = await fetch(`${API_URL}/bookings/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cancellationToken: token }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as any;
        throw new Error(data.message || "Une erreur est survenue");
      }
      setStep("success");
    } catch (err: any) {
      setErrorMsg(err.message);
      setStep("error");
    }
  };

  if (step === "invalid") {
    return (
      <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-4">Lien invalide</h1>
          <p className="text-slate-500 mb-8">Ce lien d'annulation est invalide ou a déjà été utilisé.</p>
          <Link href={base} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  if (step === "success") {
    return (
      <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-4">Annulation effectuée</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Votre réservation a bien été annulée. Vous recevrez un email de confirmation sous peu.
          </p>
          <Link href={base} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  if (step === "error") {
    return (
      <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-4">Erreur</h1>
          <p className="text-slate-500 mb-2">{errorMsg}</p>
          <p className="text-slate-400 text-sm mb-8">Contactez notre équipe si le problème persiste.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setStep("confirm")} className="px-6 py-3 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl font-bold hover:bg-slate-200 transition-colors">
              Réessayer
            </button>
            <Link href={base} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors">
              Accueil
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-900/5">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-8">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          <h1 className="text-3xl font-black tracking-tighter mb-3">Annuler votre réservation</h1>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            Êtes-vous sûr de vouloir annuler cette réservation ? Cette action est
            irréversible. Consultez nos conditions d'annulation avant de confirmer.
          </p>

          <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 mb-8">
            <p className="text-amber-800 dark:text-amber-400 text-sm font-bold">⚠️ Politique d'annulation</p>
            <p className="text-amber-700 dark:text-amber-500 text-sm mt-1">
              Les remboursements dépendent des conditions convenues lors de la réservation.
              Contactez notre équipe pour toute question.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleCancel}
              disabled={step === "loading"}
              className="w-full py-5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-2xl font-black text-lg transition-all active:scale-95"
            >
              {step === "loading" ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Annulation en cours…
                </span>
              ) : (
                "Confirmer l'annulation"
              )}
            </button>
            <Link
              href={base}
              className="w-full py-5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-lg text-center transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Conserver ma réservation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
