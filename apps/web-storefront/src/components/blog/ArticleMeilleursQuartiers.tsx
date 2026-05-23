import React from "react";

const QUARTIERS = [
  {
    rank: "01",
    name: "Vieux-Lille",
    score: 95,
    prixMoyen: "135 €",
    tauxOcc: "82 %",
    revenuMois: "2 100 €",
    profil: "Touristes, couples, weekends culturels",
    atout: "Charme historique, restaurants étoilés, commerces de luxe",
    limite: "Prix d'acquisition élevé (5 500–7 000 €/m²)",
    accentBg: "bg-blue-600",
  },
  {
    rank: "02",
    name: "Euralille / Centre",
    score: 88,
    prixMoyen: "120 €",
    tauxOcc: "79 %",
    revenuMois: "1 900 €",
    profil: "Voyageurs d'affaires, courts séjours",
    atout: "Gare Lille-Europe à pied, Eurostar, accès direct Bruxelles/Londres",
    limite: "Environnement moins pittoresque que le Vieux-Lille",
    accentBg: "bg-indigo-600",
  },
  {
    rank: "03",
    name: "Wazemmes",
    score: 80,
    prixMoyen: "105 €",
    tauxOcc: "74 %",
    revenuMois: "1 650 €",
    profil: "Jeunes actifs, familles, séjours alternatifs",
    atout:
      "Ambiance unique, marché du dimanche, prix d'acquisition accessibles",
    limite: "Demande moins premium que le Vieux-Lille",
    accentBg: "bg-violet-600",
  },
  {
    rank: "04",
    name: "Vauban",
    score: 74,
    prixMoyen: "95 €",
    tauxOcc: "70 %",
    revenuMois: "1 480 €",
    profil: "Étudiants, familles, longues durées",
    atout: "Quartier résidentiel calme, proximité Université de Lille",
    limite: "Pics de vacance en été (départs étudiants)",
    accentBg: "bg-purple-600",
  },
  {
    rank: "05",
    name: "Moulins",
    score: 66,
    prixMoyen: "88 €",
    tauxOcc: "68 %",
    revenuMois: "1 350 €",
    profil: "Petits budgets, séjours utilitaires",
    atout: "Prix d'acquisition très accessibles, fort potentiel de plus-value",
    limite: "Taux d'occupation plus faible, image moins premium",
    accentBg: "bg-slate-700",
  },
];

export function ArticleMeilleursQuartiers({ locale }: { locale: string }) {
  const base = `/${locale}`;

  return (
    <article className="relative">
      {/* Section 1 */}
      <h2
        id="classement"
        className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter mt-16 mb-8 scroll-mt-28"
      >
        Classement des quartiers les plus rentables
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-[15px]">
        Analyse basée sur les données AirDNA et les performances réelles des
        biens gérés par Welqo à Lille (T1 2025).
      </p>

      <div className="space-y-6 mb-16">
        {QUARTIERS.map((q) => (
          <div
            key={q.name}
            className="rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden bg-white dark:bg-slate-900 shadow-sm"
          >
            {/* Top bar */}
            <div className="px-3 py-1.5 bg-slate-900 dark:bg-slate-800 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-welqo-terracotta text-[11px] font-bold">
                  #{q.rank}
                </span>
                <h3 className="font-bold text-white text-sm tracking-tight">
                  {q.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-[10px] font-bold">
                  Score : {q.score}/100
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-white/5 border-b border-slate-100 dark:border-white/5">
              {[
                { label: "Prix moyen / nuit", val: q.prixMoyen },
                { label: "Taux d'occupation", val: q.tauxOcc },
                { label: "Revenu brut / mois", val: q.revenuMois },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="px-2 py-1 text-center bg-slate-50/50 dark:bg-white/5"
                >
                  <p className="text-[12px] font-bold text-welqo-terracotta">
                    {val}
                  </p>
                  <p className="text-[8px] text-slate-400 font-medium mt-0">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="text-[12px] leading-relaxed flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {q.atout}
                </span>
              </div>
              <div className="text-[12px] leading-relaxed flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {q.limite}
                </span>
              </div>
              <div className="sm:col-span-2 text-[10px] text-slate-400 italic pt-1 border-t border-slate-50 dark:border-white/5">
                Profil cible : {q.profil}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section 2 */}
      <h2
        id="choisir"
        className="text-xl font-bold text-slate-900 dark:text-white tracking-tighter mt-12 mb-6 scroll-mt-28"
      >
        Choisir selon votre profil d'investisseur
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
        {[
          {
            title: "Rendement maximum",
            icon: "🏆",
            rec: "Vieux-Lille / Euralille",
            detail: "Prix élevé, mais revenus records.",
          },
          {
            title: "Budget limité",
            icon: "💡",
            rec: "Wazemmes / Vauban",
            detail: "Meilleurs rapports prix d'achat / revenus.",
          },
        ].map(({ title, icon, rec, detail }) => (
          <div
            key={title}
            className="p-4 rounded-lg border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{icon}</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                {title}
              </p>
            </div>
            <p className="text-welqo-terracotta font-bold text-[12px] mb-1">
              → {rec}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">
              {detail}
            </p>
          </div>
        ))}
      </div>

      {/* Section 3 */}
      <h2
        id="gestion-pro"
        className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mt-20 mb-8 scroll-mt-28"
      >
        L'impact de la gestion professionnelle
      </h2>

      <div className="my-10 p-5 bg-slate-900 dark:bg-slate-950/50 rounded-lg border border-white/5">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "Amateur", val: "-25 %", color: "text-slate-400" },
            { label: "Welqo", val: "+38 %", color: "text-welqo-terracotta" },
          ].map(({ label, val, color }) => (
            <div
              key={label}
              className="text-center p-3 bg-white/5 border border-white/5 rounded-md"
            >
              <p className={`text-2xl font-bold tracking-tighter ${color}`}>
                {val}
              </p>
              <p className="text-slate-400 text-[9px] mt-0.5 font-bold">
                {label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-[11px] leading-relaxed text-center italic">
          Gain moyen constaté lors d'une reprise de gestion.
        </p>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-[14px] leading-relaxed mt-10">
        Quel que soit le quartier choisi, Welqo optimise chaque détail pour
        transformer votre investissement en succès.{" "}
        <a
          href={`${base}/proprietaires`}
          className="text-welqo-terracotta font-bold hover:underline"
        >
          Optimisez vos revenus à Lille dès maintenant →
        </a>
      </p>
    </article>
  );
}
