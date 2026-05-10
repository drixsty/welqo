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
    <article className="space-y-0">
      {/* Section 1 */}
      <h2
        id="classement"
        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-4 mb-4 scroll-mt-28"
      >
        Notre classement des quartiers les plus rentables pour Airbnb à Lille
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        Classement basé sur les données du marché AirDNA, croisées avec nos
        performances internes sur les biens Welqo — taux d'occupation, revenu
        brut moyen T1 2025.
      </p>

      <div className="space-y-5 mb-12">
        {QUARTIERS.map((q) => (
          <div
            key={q.name}
            className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-card transition-shadow"
          >
            {/* Top bar */}
            <div
              className={`${q.accentBg} px-5 py-3 flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-xs font-black">
                  {q.rank}
                </span>
                <h3 className="font-black text-white text-base tracking-tight">
                  {q.name}
                </h3>
              </div>
              {/* Score bar */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-1.5 rounded-full ${
                        i < Math.round(q.score / 20)
                          ? "bg-white"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white text-xs font-black">
                  {q.score}/100
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 bg-slate-50 dark:bg-slate-900">
              {[
                { label: "Prix / nuit", val: q.prixMoyen },
                { label: "Occupation", val: q.tauxOcc },
                { label: "Rev. / mois", val: q.revenuMois },
              ].map(({ label, val }) => (
                <div key={label} className="px-4 py-3 text-center">
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {val}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="p-5 bg-white dark:bg-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0">
                  <span className="text-emerald-600 text-[9px] font-black">
                    ✓
                  </span>
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  {q.atout}
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center justify-center shrink-0">
                  <span className="text-red-500 text-[9px] font-black">✕</span>
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  {q.limite}
                </span>
              </div>
            </div>
            <div className="px-5 pb-4 bg-white dark:bg-slate-900">
              <p className="text-xs text-slate-400 italic">
                Profil voyageur : {q.profil}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Section 2 */}
      <h2
        id="choisir"
        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-12 mb-6 scroll-mt-28"
      >
        Comment choisir son quartier selon son profil d'investisseur ?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[
          {
            title: "Vous visez le rendement maximum",
            icon: "🏆",
            rec: "Vieux-Lille ou Euralille",
            detail:
              "Prix d'acquisition élevé, mais le revenu locatif compense largement. Vieux-Lille excelle sur les week-ends touristiques ; Euralille sur les déplacements d'affaires en semaine.",
            color:
              "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20",
          },
          {
            title: "Vous avez un budget d'acquisition limité",
            icon: "💡",
            rec: "Wazemmes ou Vauban",
            detail:
              "Meilleurs rapports prix d'achat / revenu locatif. Avec un appartement à 3 500 €/m², vous pouvez atteindre une rentabilité brute de 8 à 10 %.",
            color:
              "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20",
          },
        ].map(({ title, icon, rec, detail, color }) => (
          <div key={title} className={`p-5 rounded-2xl border ${color}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{icon}</span>
              <p className="font-black text-slate-900 dark:text-white text-sm">
                {title}
              </p>
            </div>
            <p className="text-blue-600 font-black text-sm mb-2">→ {rec}</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {detail}
            </p>
          </div>
        ))}
      </div>

      {/* Section 3 */}
      <h2
        id="gestion-pro"
        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-12 mb-4 scroll-mt-28"
      >
        L'impact de la gestion professionnelle sur ces chiffres
      </h2>

      <div className="my-6 p-6 bg-slate-950 dark:bg-slate-900 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />
        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              {
                label: "Gestion amateur",
                val: "-20 à -30 %",
                sub: "de performances",
                color: "text-red-400",
              },
              {
                label: "Gestion Welqo",
                val: "+38 %",
                sub: "de revenus",
                color: "text-emerald-400",
              },
            ].map(({ label, val, sub, color }) => (
              <div
                key={label}
                className="text-center p-4 bg-white/5 rounded-xl"
              >
                <p className={`text-2xl font-black tracking-tight ${color}`}>
                  {val}
                </p>
                <p className="text-slate-400 text-xs mt-1">{sub}</p>
                <p className="text-slate-500 text-[10px] mt-0.5 font-black uppercase tracking-wide">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Ces données correspondent à des biens gérés de manière optimale. En
            gestion amateur, attendez-vous à des performances 20 à 30 %
            inférieures : annonces sous-optimisées, tarification statique,
            communication lente.
          </p>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-6">
        Quel que soit le quartier que vous choisissez, une gestion
        professionnelle peut faire la différence entre un bien rentable et un
        bien qui performe véritablement.{" "}
        <a
          href={`${base}/proprietaires`}
          className="text-blue-600 font-bold hover:underline"
        >
          Découvrez comment Welqo optimise votre bien dans ces quartiers →
        </a>
      </p>
    </article>
  );
}
