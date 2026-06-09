import React from "react";

const PLATFORMS_FR = [
  {
    name: "Airbnb",
    commission: "3 %",
    voyageur: "14–17 %",
    total: "17–20 %",
    avantages: [
      "Notoriété mondiale numéro 1",
      "Assurance hôte AirCover (jusqu'à 3 M€)",
      "Tarification dynamique intégrée",
      "Programme Superhost valorisant",
    ],
    inconvenients: [
      "Frais voyageur élevés → prix perçu gonflé",
      "Politique d'annulation moins flexible",
    ],
    note: "9/10",
  },
  {
    name: "Booking.com",
    commission: "15 %",
    voyageur: "0 %",
    total: "15 %",
    avantages: [
      "Pas de frais voyageur → prix affiché = prix payé",
      "Clientèle professionnelle et internationale forte",
      "Option paiement direct propriétaire",
    ],
    inconvenients: [
      "Protections hôte inférieures à Airbnb",
      "Système d'avis moins strict (manipulation possible)",
    ],
    note: "8/10",
  },
  {
    name: "Vrbo",
    commission: "8 %",
    voyageur: "6–12 %",
    total: "14–20 %",
    avantages: [
      "Clientèle familiale premium",
      "Taux de commission hôte plus bas qu'Airbnb",
      "Séjours moyens plus longs",
    ],
    inconvenients: [
      "Notoriété moindre en France",
      "Moins adapté aux petits appartements",
    ],
    note: "7/10",
  },
];

const PLATFORMS_EN = [
  {
    name: "Airbnb",
    commission: "3%",
    voyageur: "14–17%",
    total: "17–20%",
    avantages: [
      "World's #1 brand recognition",
      "Host insurance AirCover (up to €3M)",
      "Built-in dynamic pricing",
      "Superhost programme adds credibility",
    ],
    inconvenients: [
      "High guest fees → inflated perceived price",
      "Less flexible cancellation policies",
    ],
    note: "9/10",
  },
  {
    name: "Booking.com",
    commission: "15%",
    voyageur: "0%",
    total: "15%",
    avantages: [
      "No guest fees → displayed price = paid price",
      "Strong professional and international audience",
      "Direct payment to host option",
    ],
    inconvenients: [
      "Lower host protections than Airbnb",
      "Review system less strict (manipulation risk)",
    ],
    note: "8/10",
  },
  {
    name: "Vrbo",
    commission: "8%",
    voyageur: "6–12%",
    total: "14–20%",
    avantages: [
      "Premium family audience",
      "Lower host commission than Airbnb",
      "Longer average stays",
    ],
    inconvenients: [
      "Lower brand awareness in France",
      "Less suitable for small apartments",
    ],
    note: "7/10",
  },
];

export function ArticleCommissionAirbnbBookingVrbo({
  locale,
}: {
  locale: string;
}) {
  const isEn = locale === "en";
  const data = isEn ? PLATFORMS_EN : PLATFORMS_FR;

  return (
    <div>
      {isEn ? (
        <p>
          When you list your property on Airbnb, Booking.com or Vrbo, the
          platform takes a cut. But these commissions are far from equal — and
          the "cheapest" platform for you is not necessarily the one that
          generates the most revenue. Here is an objective comparison to help
          you decide which platform(s) to use.
        </p>
      ) : (
        <p>
          Quand vous publiez votre logement sur Airbnb, Booking.com ou Vrbo, la
          plateforme prélève une commission. Mais ces commissions sont loin
          d'être égales — et la plateforme "la moins chère" pour vous n'est pas
          nécessairement celle qui génère le plus de revenus. Voici un comparatif
          objectif pour vous aider à décider quelle(s) plateforme(s) utiliser.
        </p>
      )}

      <h2 id="comprendre-commissions">
        {isEn
          ? "Understanding Platform Commission Structures"
          : "Comprendre les structures de commission des plateformes"}
      </h2>
      {isEn ? (
        <p>
          There are two distinct fees on every short-term rental platform: the{" "}
          <strong>host commission</strong> (deducted from your payout) and the{" "}
          <strong>guest service fee</strong> (added on top of your nightly rate
          when the guest books). Understanding both is critical, because high
          guest fees reduce your listing's competitiveness even if your host fee
          appears low.
        </p>
      ) : (
        <p>
          Il existe deux frais distincts sur chaque plateforme de location
          courte durée : la <strong>commission hôte</strong> (déduite de votre
          paiement) et les <strong>frais de service voyageur</strong> (ajoutés
          par-dessus votre tarif de base au moment de la réservation).
          Comprendre les deux est essentiel, car des frais voyageur élevés
          réduisent la compétitivité de votre annonce même si votre commission
          apparaît faible.
        </p>
      )}

      <h2 id="comparatif">
        {isEn
          ? "Full Comparison: Airbnb vs Booking.com vs Vrbo"
          : "Comparatif complet : Airbnb vs Booking.com vs Vrbo"}
      </h2>

      {data.map((p) => (
        <div
          key={p.name}
          className="not-prose mb-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {p.name}
            </h3>
            <span className="text-xs font-bold text-welqo-terracotta bg-welqo-terracotta/10 px-2 py-0.5 rounded">
              {p.note}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
              {isEn ? "Host fee:" : "Commission hôte :"} {p.commission}
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded">
              {isEn ? "Guest fee:" : "Frais voyageur :"} {p.voyageur}
            </span>
            <span className="text-xs font-bold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded">
              {isEn ? "Total:" : "Total :"} {p.total}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-bold text-emerald-600 mb-1">
                {isEn ? "Advantages" : "Avantages"}
              </p>
              <ul className="space-y-0.5">
                {p.avantages.map((a, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400">
                    ✓ {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-red-500 mb-1">
                {isEn ? "Disadvantages" : "Inconvénients"}
              </p>
              <ul className="space-y-0.5">
                {p.inconvenients.map((i, idx) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-400">
                    ✗ {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <h2 id="multi-plateforme">
        {isEn
          ? "The Multi-Platform Strategy: The Optimal Approach"
          : "La stratégie multi-plateforme : l'approche optimale"}
      </h2>
      {isEn ? (
        <>
          <p>
            Rather than choosing a single platform, the most effective approach
            is to list on <strong>Airbnb + Booking.com simultaneously</strong>,
            with a channel manager to synchronise your calendar and avoid double
            bookings. Results observed with Welqo-managed properties:
          </p>
          <ul>
            <li>
              <strong>+18% additional revenue</strong> on average compared to
              Airbnb-only listings
            </li>
            <li>
              <strong>+8 percentage points</strong> in occupancy rate
            </li>
            <li>Better seasonal smoothing (Booking.com fills low-season gaps)</li>
          </ul>
          <p>
            Add Vrbo if your property is a 2-bedroom or larger and targets
            families — the platform's audience is specifically suited to these
            property types.
          </p>
        </>
      ) : (
        <>
          <p>
            Plutôt que de choisir une seule plateforme, l'approche la plus
            efficace consiste à publier sur{" "}
            <strong>Airbnb + Booking.com simultanément</strong>, avec un channel
            manager pour synchroniser votre calendrier et éviter les
            doublons. Résultats observés sur les biens gérés par Welqo :
          </p>
          <ul>
            <li>
              <strong>+18 % de revenus supplémentaires</strong> en moyenne par
              rapport aux annonces Airbnb-only
            </li>
            <li>
              <strong>+8 points de taux d'occupation</strong>
            </li>
            <li>
              Meilleur lissage saisonnier (Booking.com comble les creux
              hors-saison)
            </li>
          </ul>
          <p>
            Ajoutez Vrbo si votre bien est un T3 ou plus et cible les familles
            — l'audience de la plateforme est spécifiquement adaptée à ces
            typologies.
          </p>
        </>
      )}

      <h2 id="welqo-gestion">
        {isEn
          ? "How Welqo Manages Multi-Platform Distribution"
          : "Comment Welqo gère la diffusion multi-plateforme"}
      </h2>
      {isEn ? (
        <p>
          Welqo handles listing creation, calendar synchronisation, dynamic
          pricing and review management across all platforms for every property
          it manages. You get maximum exposure without any additional work on
          your end — and our commission is calculated on total gross revenue,
          regardless of the booking source.
        </p>
      ) : (
        <p>
          Welqo gère la création des annonces, la synchronisation des
          calendriers, la tarification dynamique et la gestion des avis sur
          toutes les plateformes pour chaque bien confié. Vous bénéficiez d'une
          visibilité maximale sans aucun travail supplémentaire de votre côté —
          et notre commission est calculée sur le revenu brut total, quelle que
          soit la plateforme de réservation.
        </p>
      )}

      {/* ── CTA ── */}
      <div className="not-prose mt-8">
        <a
          href={isEn ? "/en/proprietaires" : "/proprietaires"}
          className="flex flex-col gap-2 p-5 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
        >
          <span className="text-xs font-bold text-welqo-terracotta tracking-wider">
            {isEn
              ? "Delegate your multi-platform management"
              : "Déléguez votre gestion multi-plateforme"}
          </span>
          <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors">
            {isEn
              ? "Confide your Airbnb to Welqo →"
              : "Confier votre Airbnb à Welqo →"}
          </span>
          <span className="text-xs text-slate-400">
            {isEn
              ? "Free quote within 24h, no commitment"
              : "Devis gratuit sous 24h, sans engagement"}
          </span>
        </a>
      </div>
    </div>
  );
}
