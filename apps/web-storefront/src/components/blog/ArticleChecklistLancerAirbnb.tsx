import React from "react";

const CHECKLIST_FR = [
  {
    step: "01",
    icon: "🏛️",
    title: "Déclarez votre meublé de tourisme",
    desc: "Remplissez le formulaire CERFA n°14004 sur le site de la Ville de Lille. Gratuit, obligatoire sous 15 jours après la mise en ligne.",
    tag: "Administratif",
  },
  {
    step: "02",
    icon: "📸",
    title: "Obtenez des photos professionnelles",
    desc: "Les annonces avec photos pro génèrent 35 % de revenus supplémentaires. Budget : 150–300 €. Retour sur investissement : dès la première semaine.",
    tag: "Marketing",
  },
  {
    step: "03",
    icon: "🛋️",
    title: "Équipez votre bien aux standards Airbnb",
    desc: "Wi-Fi haut débit, literie qualité hôtelière, cuisine équipée, produits d'accueil (savon, shampoing, café). Ce sont les équipements les plus mentionnés dans les avis 5 étoiles.",
    tag: "Équipement",
  },
  {
    step: "04",
    icon: "✍️",
    title: "Rédigez une annonce optimisée",
    desc: "Titre : incluez le quartier et un atout distinctif (ex. : 'Vieux-Lille — Duplex avec terrasse'). Description : 300 mots minimum, répondez aux questions des voyageurs.",
    tag: "SEO Airbnb",
  },
  {
    step: "05",
    icon: "📊",
    title: "Définissez votre stratégie tarifaire",
    desc: "Activez la tarification intelligente d'Airbnb, puis ajustez manuellement pour la Braderie, les matchs du LOSC et les salons de Lille Grand Palais.",
    tag: "Pricing",
  },
  {
    step: "06",
    icon: "🔑",
    title: "Mettez en place un système de check-in",
    desc: "Boîte à clés sécurisée ou serrure connectée. Rédigez un livret d'accueil numérique (codes Wi-Fi, conseils de quartier, contacts urgence).",
    tag: "Opérationnel",
  },
];

const CHECKLIST_EN = [
  {
    step: "01",
    icon: "🏛️",
    title: "Declare your holiday rental",
    desc: "Fill out the CERFA form n°14004 on the City of Lille website. Free, mandatory within 15 days of going live.",
    tag: "Administrative",
  },
  {
    step: "02",
    icon: "📸",
    title: "Get professional photos",
    desc: "Listings with professional photos generate 35% more revenue. Budget: €150–300. ROI: from the very first week.",
    tag: "Marketing",
  },
  {
    step: "03",
    icon: "🛋️",
    title: "Equip your property to Airbnb standards",
    desc: "High-speed Wi-Fi, hotel-quality bedding, fully equipped kitchen, welcome amenities (soap, shampoo, coffee). These are the most mentioned amenities in 5-star reviews.",
    tag: "Amenities",
  },
  {
    step: "04",
    icon: "✍️",
    title: "Write an optimized listing",
    desc: "Title: include the district and a distinctive asset (e.g. 'Vieux-Lille — Duplex with terrace'). Description: 300 words minimum, answer travelers' questions.",
    tag: "Airbnb SEO",
  },
  {
    step: "05",
    icon: "📊",
    title: "Set your pricing strategy",
    desc: "Activate Airbnb's smart pricing, then manually adjust for the Braderie, major LOSC matches, and Lille Grand Palais exhibitions.",
    tag: "Pricing",
  },
  {
    step: "06",
    icon: "🔑",
    title: "Set up a check-in system",
    desc: "Secure key lockbox or smart lock. Write a digital welcome guide (Wi-Fi codes, neighborhood tips, emergency contacts).",
    tag: "Operations",
  },
];

const ERRORS_FR = [
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

const ERRORS_EN = [
  {
    title: "Underpricing your property",
    desc: "Out of fear of negative reviews, many new hosts set their prices too low. Result: the property is perceived as 'low-end' by the Airbnb algorithm.",
  },
  {
    title: "Neglecting reviews",
    desc: "The first 5 reviews are critical for your ranking in Airbnb search results. Take extra care of these first guest experiences.",
  },
  {
    title: "Forgetting Lille's seasonality",
    desc: "Not adjusting prices during the Braderie or major Lille LOSC football matches represents a loss of €500 to €1,500 per event.",
  },
];

export function ArticleChecklistLancerAirbnb({ locale }: { locale: string }) {
  const base = `/${locale}`;
  const isEn = locale === "en";

  const checklist = isEn ? CHECKLIST_EN : CHECKLIST_FR;
  const errors = isEn ? ERRORS_EN : ERRORS_FR;

  const compareRows = isEn
    ? [
        { label: "Time / week", solo: "8–12h", welqo: "0h", ok: true },
        {
          label: "Optimized revenue",
          solo: "Average",
          welqo: "+38 %",
          ok: true,
        },
        {
          label: "Emergency management",
          solo: "Up to you",
          welqo: "24/7",
          ok: true,
        },
        {
          label: "Professional photos",
          solo: "Optional",
          welqo: "Included",
          ok: true,
        },
        { label: "Dynamic pricing", solo: "Manual", welqo: "Auto", ok: true },
        { label: "Commission", solo: "0 %", welqo: "20 %", ok: false },
      ]
    : [
        { label: "Temps / semaine", solo: "8–12h", welqo: "0h", ok: true },
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
      ];

  return (
    <article className="relative">
      {/* Section 1 */}
      <h2
        id="etapes"
        className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter mt-16 mb-8 scroll-mt-28"
      >
        {isEn
          ? "The 6 essential steps before publishing"
          : "Les 6 étapes incontournables avant de publier"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-[15px]">
        {isEn
          ? "Each step is vital to ensure 5-star reviews and optimized rental income from the very first month."
          : "Chaque étape est indispensable pour garantir des avis 5 étoiles et des revenus optimisés dès le premier mois."}
      </p>

      <div className="space-y-4 mb-16">
        {checklist.map((item) => (
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
              {isEn
                ? "Estimated time to launch your Airbnb"
                : "Temps estimé pour lancer votre Airbnb"}
            </p>
            <p className="text-emerald-700 dark:text-emerald-500 text-[14px] leading-relaxed">
              {isEn ? (
                <>
                  On your own: <strong>2 to 4 weeks</strong>. With Welqo:{" "}
                  <strong>72h</strong> after signing the contract. We handle
                  everything from A to Z.
                </>
              ) : (
                <>
                  En solo : <strong>2 à 4 semaines</strong>. Avec Welqo :{" "}
                  <strong>72h</strong> après signature du contrat. Nous gérons
                  tout de A à Z.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <h2
        id="erreurs"
        className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mt-20 mb-8 scroll-mt-28"
      >
        {isEn ? "The most common mistakes" : "Les erreurs les plus fréquentes"}
      </h2>

      <div className="space-y-5 mb-16">
        {errors.map(({ title, desc }) => (
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
        {isEn
          ? "Manage on your own or entrust to Welqo?"
          : "Gérer soi-même ou confier à Welqo ?"}
      </h2>

      <div className="overflow-x-auto my-6 rounded-xl border border-slate-100 dark:border-slate-800">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 dark:bg-slate-800 text-white">
              <th className="text-left px-4 py-2.5 font-bold rounded-tl-xl text-[10px] tracking-wider">
                {isEn ? "Criteria" : "Critère"}
              </th>
              <th className="text-center px-4 py-2.5 font-bold text-[10px] tracking-wider">
                {isEn ? "Solo management" : "Gestion solo"}
              </th>
              <th className="text-center px-4 py-2.5 font-bold rounded-tr-xl text-[10px] tracking-wider text-welqo-terracotta">
                {isEn ? "With Welqo" : "Avec Welqo"}
              </th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map(({ label, solo, welqo, ok }, i) => (
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
        {isEn ? (
          <>
            If you have the time and desire to get involved, managing on your
            own is entirely possible. But if you want to maximize your income
            without spending your evenings and weekends, Welqo quickly pays for
            itself.{" "}
            <a
              href={`${base}/proprietaires`}
              className="text-welqo-terracotta font-bold hover:underline"
            >
              Discover our services in Northern France →
            </a>
          </>
        ) : (
          <>
            Si vous avez le temps et l'envie de vous impliquer, la gestion en
            solo est tout à fait possible. Mais si vous souhaitez maximiser vos
            revenus sans y consacrer vos soirées et week-ends, Welqo s'avère
            rapidement rentable.{" "}
            <a
              href={`${base}/proprietaires`}
              className="text-welqo-terracotta font-bold hover:underline"
            >
              Découvrez nos services en Hauts-de-France →
            </a>
          </>
        )}
      </p>
    </article>
  );
}
