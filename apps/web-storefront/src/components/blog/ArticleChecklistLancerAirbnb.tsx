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
    desc: "Par peur des avis négatifs, beaucoup de nouveaux hôtes fixent des prix trop bas. Résultat : le bien est perçu comme \"bas de gamme\" par l'algorithme Airbnb.",
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
    <article className="space-y-0">

      {/* Section 1 */}
      <h2 id="etapes" className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-4 mb-4 scroll-mt-28">
        Les 6 étapes incontournables avant de publier votre annonce
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        Chaque étape est indispensable. En sauter une, c'est s'exposer à des avis négatifs,
        des sanctions Airbnb ou simplement des revenus sous-optimisés.
      </p>

      <div className="space-y-4 mb-12">
        {CHECKLIST.map((item) => (
          <div
            key={item.step}
            className="flex gap-5 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors shadow-sm"
          >
            {/* Step badge */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="w-11 h-11 bg-slate-950 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                <span className="text-xl">{item.icon}</span>
              </div>
              <span className="text-[10px] font-black text-slate-400">{item.step}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h3 className="font-black text-slate-900 dark:text-white text-base">{item.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Timing callout */}
      <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">⏱️</span>
          <div>
            <p className="font-black text-blue-800 dark:text-blue-400 mb-1">Temps estimé pour lancer votre Airbnb à Lille</p>
            <p className="text-blue-700 dark:text-blue-500 text-sm leading-relaxed">
              En gérant tout vous-même : <strong>2 à 4 semaines</strong>.
              Avec Welqo : <strong>72h après votre premier contact</strong> — nous nous occupons de tout, de la déclaration en mairie à la mise en ligne.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <h2 id="erreurs" className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-12 mb-4 scroll-mt-28">
        Les erreurs les plus fréquentes des nouveaux hôtes lillois
      </h2>

      <div className="space-y-3 mb-10">
        {ERRORS.map(({ title, desc }) => (
          <div
            key={title}
            className="flex gap-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/30"
          >
            <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-red-500 text-xs font-black">✕</span>
            </div>
            <div>
              <p className="font-bold text-red-800 dark:text-red-400 text-sm mb-0.5">{title}</p>
              <p className="text-red-700 dark:text-red-500/80 text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section 3 */}
      <h2 id="solo-vs-conciergerie" className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-12 mb-4 scroll-mt-28">
        Gérer soi-même ou confier à une conciergerie ?
      </h2>

      <div className="overflow-x-auto my-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 dark:bg-slate-800 text-white">
              <th className="text-left px-5 py-3.5 font-black rounded-tl-2xl">Critère</th>
              <th className="text-center px-5 py-3.5 font-black">Gestion solo</th>
              <th className="text-center px-5 py-3.5 font-black rounded-tr-2xl text-blue-400">Avec Welqo</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Temps / semaine",       solo: "8–12h",    welqo: "0h",       ok: true },
              { label: "Revenus optimisés",      solo: "Moyens",   welqo: "+38 %",    ok: true },
              { label: "Gestion des urgences",   solo: "À vous",   welqo: "7j/7",     ok: true },
              { label: "Photos professionnelles",solo: "En option",welqo: "Incluses", ok: true },
              { label: "Tarification dynamique", solo: "Manuelle", welqo: "Auto",     ok: true },
              { label: "Commission",             solo: "0 %",      welqo: "15–20 %",  ok: false },
            ].map(({ label, solo, welqo, ok }, i) => (
              <tr
                key={label}
                className={`border-b border-slate-100 dark:border-slate-800 last:border-0 ${
                  i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/50 dark:bg-slate-800/50"
                }`}
              >
                <td className="px-5 py-3 font-medium text-slate-700 dark:text-slate-300">{label}</td>
                <td className="px-5 py-3 text-center text-slate-500">{solo}</td>
                <td className={`px-5 py-3 text-center font-bold ${ok ? "text-blue-600" : "text-slate-500"}`}>{welqo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-6">
        Si vous avez le temps et l'envie de vous impliquer, la gestion en solo est tout à fait possible.
        Mais si vous souhaitez maximiser vos revenus sans y consacrer vos soirées et week-ends,
        une conciergerie comme Welqo s'avère rapidement rentable.{" "}
        <a href={`${base}/proprietaires`} className="text-blue-600 font-bold hover:underline">
          En savoir plus sur nos services de gestion Airbnb à Lille →
        </a>
      </p>
    </article>
  );
}
