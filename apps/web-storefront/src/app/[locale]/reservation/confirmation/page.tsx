import React from "react";
import Link from "next/link";
import { CheckCircle2, Calendar, MapPin, Mail, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface ConfirmationPageProps {
  params: { locale: string };
  searchParams: { session_id?: string };
}

export default async function ConfirmationPage({
  params: { locale },
  searchParams,
}: ConfirmationPageProps) {
  const isFr = locale === "fr";
  const base = `/${locale}`;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon Animation Container */}
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-20" />
            <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
          {isFr ? "C'est confirmé !" : "It's confirmed!"}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 max-w-lg mx-auto">
          {isFr 
            ? "Votre séjour est réservé. Préparez-vous à vivre une expérience inoubliable en Bassin Minier."
            : "Your stay is booked. Get ready for an unforgettable experience in the Bassin Minier."}
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
          <div className="p-6 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-100 dark:border-white/5">
            <Mail className="w-5 h-5 text-welqo-terracotta mb-3" />
            <h3 className="font-bold text-sm mb-1">{isFr ? "Confirmation par email" : "Email confirmation"}</h3>
            <p className="text-xs text-slate-500">
              {isFr 
                ? "Vous allez recevoir votre récapitulatif et votre facture d'ici quelques instants."
                : "You will receive your summary and invoice in a few moments."}
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-100 dark:border-white/5">
            <Calendar className="w-5 h-5 text-welqo-terracotta mb-3" />
            <h3 className="font-bold text-sm mb-1">{isFr ? "Instructions d'arrivée" : "Check-in instructions"}</h3>
            <p className="text-xs text-slate-500">
              {isFr 
                ? "Elles vous seront envoyées automatiquement 48h avant votre arrivée."
                : "They will be sent to you automatically 48h before your arrival."}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href={base}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold hover:bg-welqo-terracotta hover:text-white transition-all flex items-center justify-center gap-2"
          >
            {isFr ? "Retour à l'accueil" : "Back to home"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
            {isFr ? "Ajouter au calendrier" : "Add to calendar"}
          </button>
        </div>

        <p className="mt-12 text-[10px] font-bold text-slate-400 tracking-[0.2em]">
          Welqo conciergerie · {isFr ? "Gestion professionnelle" : "Professional management"}
        </p>
      </div>
    </main>
  );
}
