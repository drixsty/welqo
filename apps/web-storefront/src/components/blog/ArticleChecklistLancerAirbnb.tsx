import React from "react";

const CHECKLIST = [
  {
    step: "01",
    icon: "🏛️",
    title: "Déclarez votre meublé de tourisme",
    desc: "Remplissez le formulaire CERFA n°14004 sur le site de la Ville de Lille. Gratuit, obligatoire sous 15 jours après la mise en ligne.",
    tag: "Administratif",
    tagColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  {
    step: "02",
    icon: "📸",
    title: "Obtenez des photos professionnelles",
    desc: "Les annonces avec photos pro génèrent 35 % de revenus supplémentaires. Budget : 150–300 €. Retour sur investissement : dès la première semaine.",
    tag: "Marketing",
    tagColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    step: "03",
    icon: "🛋️",
    title: "Équipez votre bien aux standards Airbnb",
    desc: "Wi-Fi haut débit, literie qualité hôtelière, cuisine équipée, produits d'accueil (savon, shampoing, café). Ce sont les équipements les plus mentionnés dans les avis 5 étoiles.",
    tag: "Équipement",
    tagColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    step: "04",
    icon: "✍️",
    title: "Rédigez une annonce optimisée",
    desc: "Titre : incluez le quartier et un atout distinctif (ex. : 'Vieux-Lille — Duplex avec terrasse'). Description : 300 mots minimum, répondez aux questions des voyageurs.",
    tag: "SEO Airbnb",
    tagColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    step: "05",
    icon: "📊",
    title: "Définissez votre stratégie tarifaire",
    desc: "Activez la tarification intelligente d'Airbnb, puis ajustez manuellement pour la Braderie, les matchs du LOSC et les salons de Lille Grand Palais.",
    tag: "Pricing",
    tagColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
  {
    step: "06",
    icon: "🔑",
    title: "Mettez en place un système de check-in",
    desc: "Boîte à clés sécurisée ou serrure connectée. Rédigez un livret d'accueil numérique (codes Wi-Fi, conseils de quartier, contacts urgence).",
    tag: "Opérationnel",
    tagColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  },
];

const ERRORS = [
  {
    title: "Sous-évaluer le prix",
    desc: 'Par peur des avis négatifs, beaucoup de nouveaux hôtes fixent des prix trop bas. Résultat : le bien est perçu comme "bas de gamme" par l\'algorithme Airbnb.',
  },
  {
    title: "Négliger les avis",
    desc: "Les 5 premiers avis sont déterminants pour votre positionnement dans les résultats de recherche Airbnb. Soignez particulièrement les premiers séjours.",
  },
  {
    title: "Oublier la saisonnalité lilloise",
    desc: "Ne pas bloquer les prix pendant la Braderie ou les grands matchs du LOSC représente une perte de 500 à 1 500 € par événement.",
  },
];

export function ArticleChecklistLancerAirbnb({ locale }: { locale: string }) {
  const base = `/${locale}`;

  return (
    <article className="relative">
      {/* Section 1 */}
      <h2
        id="etapes"
        className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter mt-16 mb-8 scroll-mt-28"
      >
        Les 6 étapes incontournables avant de publier
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-[15px]">
        Chaque étape est indispensable pour garantir des avis 5 étoiles et des
        revenus optimisés dès le premier mois.
      </p>

      <div className="space-y-4 mb-16">
        {CHECKLIST.map((item) => (
          <div
            key={item.step}
            className="flex gap-5 p-5 bg-slate-50/50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 hover:border-welqo-terracotta/20 transition-all duration-300 group"
          >
            {/* Icon circle */}
            <div className="shrink-0">
              <div className="w-11 h-11 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform">
                <span className="text-xl">{item.icon}</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight">
                  {item.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {item.tag}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Timing callout */}
      <div className="my-16 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl">
        <div className="flex items-start gap-5">
          <span className="text-3xl shrink-0">⏱️</span>
          <div className="space-y-2">
            <p className="font-bold text-lg text-emerald-800 dark:text-emerald-400 tracking-tight">
              Temps estimé pour lancer votre Airbnb
            </p>
            <p className="text-emerald-700 dark:text-emerald-500 text-[14px] leading-relaxed">
              En solo : <strong>2 à 4 semaines</strong>. Avec Welqo :{" "}
              <strong>72h</strong> après signature du contrat. Nous gérons tout
              de A à Z.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <h2
        id="erreurs"
        className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mt-20 mb-8 scroll-mt-28"
      >
        Les erreurs les plus fréquentes
      </h2>

      <div className="space-y-5 mb-16">
        {ERRORS.map(({ title, desc }) => (
          <div key={title} className="group">
            <p className="font-bold text-slate-900 dark:text-white text-base mb-1.5 flex items-center gap-2">
              <span className="text-red-500 text-xs">✕</span> {title}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Section 3 */}
      <h2
        id="solo-vs-conciergerie"
        className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-20 mb-8 scroll-mt-28"
      >
        Gérer soi-même ou confier à Welqo ?
      </h2>

      <div className="overflow-x-auto my-6 rounded-xl border border-slate-100 dark:border-slate-800">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 dark:bg-slate-800 text-white">
              <th className="text-left px-4 py-2.5 font-bold rounded-tl-xl text-[10px] uppercase tracking-wider">
                Critère
              </th>
              <th className="text-center px-4 py-2.5 font-bold text-[10px] uppercase tracking-wider">
                Gestion solo
              </th>
              <th className="text-center px-4 py-2.5 font-bold rounded-tr-xl text-[10px] uppercase tracking-wider text-welqo-terracotta">
                Avec Welqo
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Same rows with updated styling */}
            {[
              {
                label: "Temps / semaine",
                solo: "8–12h",
                welqo: "0h",
                ok: true,
              },
              {
                label: "Revenus optimisés",
                solo: "Moyens",
                welqo: "+38 %",
                ok: true,
              },
              {
                label: "Gestion des urgences",
                solo: "À vous",
                welqo: "7j/7",
                ok: true,
              },
              {
                label: "Photos professionnelles",
                solo: "En option",
                welqo: "Incluses",
                ok: true,
              },
              {
                label: "Tarification dynamique",
                solo: "Manuelle",
                welqo: "Auto",
                ok: true,
              },
              { label: "Commission", solo: "0 %", welqo: "20 %", ok: false },
            ].map(({ label, solo, welqo, ok }, i) => (
              <tr
                key={label}
                className={`border-b border-slate-100 dark:border-slate-800 last:border-0 ${
                  i % 2 === 0
                    ? "bg-white dark:bg-slate-900"
                    : "bg-slate-50/50 dark:bg-slate-800/50"
                }`}
              >
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300 text-[13px]">
                  {label}
                </td>
                <td className="px-4 py-2.5 text-center text-slate-500 text-[13px]">
                  {solo}
                </td>
                <td
                  className={`px-4 py-2.5 text-center font-bold text-[13px] ${ok ? "text-welqo-terracotta" : "text-slate-500"}`}
                >
                  {welqo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-[14px] leading-relaxed mt-10">
        Si vous avez le temps et l'envie de vous impliquer, la gestion en solo
        est tout à fait possible. Mais si vous souhaitez maximiser vos revenus
        sans y consacrer vos soirées et week-ends, Welqo s'avère rapidement
        rentable.{" "}
        <a
          href={`${base}/proprietaires`}
          className="text-welqo-terracotta font-bold hover:underline"
        >
          Découvrez nos services à Lille →
        </a>
      </p>
    </article>
  );
}
