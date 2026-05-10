import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Réservation confirmée — Welqo",
};

export default function ConfirmationPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const base = `/${locale}`;
  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">
          Réservation <span className="text-green-600">confirmée</span>
        </h1>

        <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed">
          Votre paiement a bien été reçu. Un email de confirmation vous a été
          envoyé avec tous les détails de votre séjour.
        </p>

        {/* Info card */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 mb-10 text-left space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white">
                Email de confirmation
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Vérifiez votre boîte mail (et vos spams) pour retrouver votre
                récapitulatif de séjour.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-600/10 text-purple-600 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white">
                Coordonnées d'accès
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Votre conciergerie vous contactera 48h avant votre arrivée pour
                les modalités d'accès.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={base}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20 hover:scale-105"
          >
            Retour à l'accueil
          </Link>
          <Link
            href={`${base}/logements/appartement-bordelais`}
            className="px-8 py-4 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-lg transition-all"
          >
            Voir le logement
          </Link>
        </div>
      </div>
    </main>
  );
}
