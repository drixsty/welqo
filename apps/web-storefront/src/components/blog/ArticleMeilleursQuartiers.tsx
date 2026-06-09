import React from "react";

const QUARTIERS_FR = [
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

const QUARTIERS_EN = [
  {
    rank: "01",
    name: "Vieux-Lille",
    score: 95,
    prixMoyen: "135 €",
    tauxOcc: "82 %",
    revenuMois: "2,100 €",
    profil: "Tourists, couples, cultural weekends",
    atout: "Historic charm, Michelin-starred restaurants, luxury boutiques",
    limite: "High acquisition price (€5,500–7,000/sqm)",
    accentBg: "bg-blue-600",
  },
  {
    rank: "02",
    name: "Euralille / Centre",
    score: 88,
    prixMoyen: "120 €",
    tauxOcc: "79 %",
    revenuMois: "1,900 €",
    profil: "Business travelers, short stays",
    atout:
      "Walking distance to Lille-Europe station, Eurostar, direct access Brussels/London",
    limite: "Less picturesque environment than Vieux-Lille",
    accentBg: "bg-indigo-600",
  },
  {
    rank: "03",
    name: "Wazemmes",
    score: 80,
    prixMoyen: "105 €",
    tauxOcc: "74 %",
    revenuMois: "1,650 €",
    profil: "Young professionals, families, alternative stays",
    atout: "Unique atmosphere, Sunday market, affordable acquisition prices",
    limite: "Less premium demand than Vieux-Lille",
    accentBg: "bg-violet-600",
  },
  {
    rank: "04",
    name: "Vauban",
    score: 74,
    prixMoyen: "95 €",
    tauxOcc: "70 %",
    revenuMois: "1,480 €",
    profil: "Students, families, long term stays",
    atout: "Quiet residential neighborhood, close to Lille University",
    limite: "Vacancy peaks in summer (student departures)",
    accentBg: "bg-purple-600",
  },
  {
    rank: "05",
    name: "Moulins",
    score: 66,
    prixMoyen: "88 €",
    tauxOcc: "68 %",
    revenuMois: "1,350 €",
    profil: "Low budgets, utility stays",
    atout:
      "Very affordable acquisition prices, high potential for appreciation",
    limite: "Lower occupancy rate, less premium image",
    accentBg: "bg-slate-700",
  },
];

export function ArticleMeilleursQuartiers({ locale }: { locale: string }) {
  const base = `/${locale}`;
  const isEn = locale === "en";

  const quartiers = isEn ? QUARTIERS_EN : QUARTIERS_FR;

  const recCards = isEn
    ? [
        {
          title: "Maximum yield",
          icon: "🏆",
          rec: "Vieux-Lille / Euralille",
          detail: "High acquisition price, but record rental income.",
        },
        {
          title: "Limited budget",
          icon: "💡",
          rec: "Wazemmes / Vauban",
          detail: "Best purchase price / rental revenue ratio.",
        },
      ]
    : [
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
      ];

  return (
    <article className="relative">
      {/* Section 1 */}
      <h2
        id="classement"
        className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter mt-16 mb-8 scroll-mt-28"
      >
        {isEn
          ? "Ranking of the most profitable neighborhoods"
          : "Classement des quartiers les plus rentables"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-[15px]">
        {isEn
          ? "Analysis based on AirDNA data and actual performance of properties managed by Welqo in Lille (Q1 2025)."
          : "Analyse basée sur les données AirDNA et les performances réelles des biens gérés par Welqo à Lille (T1 2025)."}
      </p>

      <div className="space-y-6 mb-16">
        {quartiers.map((q) => (
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
                {
                  label: isEn ? "Avg. price / night" : "Prix moyen / nuit",
                  val: q.prixMoyen,
                },
                {
                  label: isEn ? "Occupancy rate" : "Taux d'occupation",
                  val: q.tauxOcc,
                },
                {
                  label: isEn ? "Gross revenue / month" : "Revenu brut / mois",
                  val: q.revenuMois,
                },
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
                {isEn ? "Target profile" : "Profil cible"} : {q.profil}
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
        {isEn
          ? "Choose according to your investor profile"
          : "Choisir selon votre profil d'investisseur"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
        {recCards.map(({ title, icon, rec, detail }) => (
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
        {isEn
          ? "The impact of professional management"
          : "L'impact de la gestion professionnelle"}
      </h2>

      <div className="my-10 p-5 bg-slate-900 dark:bg-slate-950/50 rounded-lg border border-white/5">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            {
              label: isEn ? "Self-managed" : "Amateur",
              val: "-25 %",
              color: "text-slate-400",
            },
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
          {isEn
            ? "Average gain observed when transferring management to Welqo."
            : "Gain moyen constaté lors d'une reprise de gestion."}
        </p>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-[14px] leading-relaxed mt-10">
        {isEn ? (
          <>
            Whichever district you choose, Welqo optimizes every detail to
            transform your investment into a success.{" "}
            <a
              href={`${base}/proprietaires`}
              className="text-welqo-terracotta font-bold hover:underline"
            >
              Optimize your Northern France income now →
            </a>
          </>
        ) : (
          <>
            Quel que soit le quartier choisi, Welqo optimise chaque détail pour
            transformer votre investissement en succès.{" "}
            <a
              href={`${base}/proprietaires`}
              className="text-welqo-terracotta font-bold hover:underline"
            >
              Optimisez vos revenus en Hauts-de-France dès maintenant →
            </a>
          </>
        )}
      </p>
      <p>
        {locale === "en" ? (
          <>
            Want the full picture on Airbnb management in Lille?{" "}
            <a
              href={`/en/conciergerie-airbnb-lille`}
              className="text-welqo-terracotta font-bold hover:underline"
            >
              View our dedicated Lille concierge page →
            </a>
          </>
        ) : (
          <>
            Envie d'en savoir plus sur la gestion Airbnb à Lille ?{" "}
            <a
              href={`/conciergerie-airbnb-lille`}
              className="text-welqo-terracotta font-bold hover:underline"
            >
              Consultez notre page dédiée conciergerie Airbnb Lille →
            </a>
          </>
        )}
      </p>

      {/* Liens quartiers spécifiques */}
      <div className="not-prose mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={
            locale === "en"
              ? "/en/conciergerie-airbnb-vieux-lille"
              : "/conciergerie-airbnb-vieux-lille"
          }
          className="flex flex-col gap-1 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 hover:border-welqo-terracotta/30 transition-colors group"
        >
          <span className="text-xs font-bold text-welqo-terracotta tracking-wider">
            {locale === "en" ? "Neighbourhood guide" : "Guide quartier"}
          </span>
          <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-welqo-terracotta transition-colors">
            {locale === "en"
              ? "Airbnb Concierge Vieux-Lille →"
              : "Conciergerie Airbnb Vieux-Lille →"}
          </span>
        </a>
        <a
          href={
            locale === "en"
              ? "/en/conciergerie-airbnb-wazemmes"
              : "/conciergerie-airbnb-wazemmes"
          }
          className="flex flex-col gap-1 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 hover:border-welqo-terracotta/30 transition-colors group"
        >
          <span className="text-xs font-bold text-welqo-terracotta tracking-wider">
            {locale === "en" ? "Neighbourhood guide" : "Guide quartier"}
          </span>
          <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-welqo-terracotta transition-colors">
            {locale === "en"
              ? "Airbnb Concierge Wazemmes →"
              : "Conciergerie Airbnb Wazemmes →"}
          </span>
        </a>
      </div>
    </article>
  );
}
