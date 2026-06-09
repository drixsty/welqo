import React from "react";

export function ArticleConciergerieBethune({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <div>
      {isEn ? (
        <p>
          Béthune is not the first city that comes to mind for Airbnb investment
          in the Hauts-de-France. Yet its strategic position at the crossroads of
          Lille (30 min), Lens (20 min) and Arras (40 min), combined with a still
          underdeveloped Airbnb offer, makes it one of the region's most
          interesting emerging markets.
        </p>
      ) : (
        <p>
          Béthune n'est pas la première ville qui vient à l'esprit pour
          l'investissement Airbnb en Hauts-de-France. Pourtant, sa position
          stratégique au carrefour de Lille (30 min), Lens (20 min) et Arras
          (40 min), combinée à une offre Airbnb encore peu développée, en fait
          l'un des marchés émergents les plus intéressants de la région.
        </p>
      )}

      <h2 id="marche-bethune">
        {isEn
          ? "The Béthune Short-Term Rental Market"
          : "Le marché de la location courte durée à Béthune"}
      </h2>
      {isEn ? (
        <>
          <p>Current market figures for Béthune (2024-2025):</p>
          <ul>
            <li>
              <strong>Average gross monthly revenue:</strong> €800 (2-room
              apartment, city centre)
            </li>
            <li>
              <strong>Average occupancy rate:</strong> 65%
            </li>
            <li>
              <strong>Average nightly rate:</strong> €58 off-peak / €85–110 on
              RC Lens match weekends
            </li>
            <li>
              <strong>Acquisition prices:</strong> €1,200–2,000/sqm (50–60% less
              than Lille)
            </li>
            <li>
              <strong>Estimated gross yield:</strong> 8–12% for well-placed
              properties
            </li>
          </ul>
        </>
      ) : (
        <>
          <p>Chiffres actuels du marché béthunois (2024-2025) :</p>
          <ul>
            <li>
              <strong>Revenu brut mensuel moyen :</strong> 800 € (T2 centre-ville)
            </li>
            <li>
              <strong>Taux d'occupation moyen :</strong> 65 %
            </li>
            <li>
              <strong>Tarif moyen par nuit :</strong> 58 € hors événement /
              85 à 110 € les week-ends de match du RC Lens
            </li>
            <li>
              <strong>Prix d'acquisition :</strong> 1 200 à 2 000 €/m²
              (50 à 60 % moins qu'à Lille)
            </li>
            <li>
              <strong>Rendement brut estimé :</strong> 8 à 12 % pour les biens
              bien placés
            </li>
          </ul>
        </>
      )}

      <h2 id="moteurs-demande">
        {isEn ? "Demand Drivers in Béthune" : "Les moteurs de demande à Béthune"}
      </h2>
      {isEn ? (
        <ul>
          <li>
            <strong>UNESCO belfry:</strong> Historic centre attracting day
            trippers and weekend visitors.
          </li>
          <li>
            <strong>Professional travellers:</strong> Major construction and
            industrial projects in the Artois area generate long-term stays by
            teams on multi-week assignments.
          </li>
          <li>
            <strong>RC Lens overflow:</strong> When Stade Bollaert is full and
            accommodation in Lens is saturated, visitors look at Béthune (20 min
            away).
          </li>
          <li>
            <strong>Medical and healthcare staff:</strong> The Béthune hospital
            is one of the region's largest — care professionals on rotation
            generate year-round demand.
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <strong>Beffroi UNESCO :</strong> Centre historique attractif pour les
            excursionnistes et les visiteurs du week-end.
          </li>
          <li>
            <strong>Clientèle professionnelle :</strong> Grands chantiers BTP
            et projets industriels dans l'Artois génèrent des séjours prolongés
            d'équipes en mission plusieurs semaines.
          </li>
          <li>
            <strong>Débordement RC Lens :</strong> Quand le Stade Bollaert est
            complet et que l'hébergement lensois est saturé, les visiteurs se
            tournent vers Béthune (20 min).
          </li>
          <li>
            <strong>Personnel médical et soignant :</strong> Le Centre
            Hospitalier de Béthune est l'un des plus grands de la région — les
            professionnels de santé en rotation génèrent une demande annuelle
            constante.
          </li>
        </ul>
      )}

      <h2 id="secteurs-recommandes">
        {isEn
          ? "Best Areas to Invest in Béthune"
          : "Les meilleurs secteurs où investir à Béthune"}
      </h2>
      {isEn ? (
        <ul>
          <li>
            <strong>Historic city centre (Grand-Place):</strong> Highest tourist
            demand, best nightly rates. Target: 1 or 2-bedroom apartments with
            character.
          </li>
          <li>
            <strong>Bruay-la-Buissière:</strong> Strong professional demand
            (mining heritage + industrial zone). Lower acquisition prices,
            stable occupancy year-round.
          </li>
          <li>
            <strong>Noeux-les-Mines:</strong> Active town with its stadium,
            attracts sports fans and transient workers.
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <strong>Centre historique (Grand-Place) :</strong> Demande
            touristique la plus forte, meilleurs tarifs par nuit. Cible : T2/T3
            avec cachet.
          </li>
          <li>
            <strong>Bruay-la-Buissière :</strong> Forte demande professionnelle
            (patrimoine minier + zone industrielle). Prix d'acquisition plus bas,
            occupation stable toute l'année.
          </li>
          <li>
            <strong>Noeux-les-Mines :</strong> Commune active avec son stade,
            attire sportifs et travailleurs de passage.
          </li>
        </ul>
      )}

      <h2 id="reglementation">
        {isEn
          ? "Regulations for Short-Term Rental in Béthune"
          : "Réglementation de la location courte durée à Béthune"}
      </h2>
      {isEn ? (
        <p>
          Béthune does not currently apply the 120-day limit reserved for primary
          residences in the same way as Lille. However, you must:{" "}
          <strong>
            declare your activity to the town hall and collect tourist tax from
            guests
          </strong>{" "}
          (€0.80–1.50/night/person depending on property category). Welqo handles
          all administrative formalities for you.
        </p>
      ) : (
        <p>
          Béthune n'applique pas actuellement la limite de 120 jours réservée aux
          résidences principales de la même façon que Lille. En revanche, vous
          devez{" "}
          <strong>
            déclarer votre activité en mairie et collecter la taxe de séjour
            auprès de vos voyageurs
          </strong>{" "}
          (0,80 à 1,50 €/nuit/personne selon la catégorie du bien). Welqo gère
          toutes les formalités administratives à votre place.
        </p>
      )}

      {/* ── CTA ── */}
      <div className="not-prose mt-8">
        <a
          href={
            isEn
              ? "/en/conciergerie-airbnb-bethune"
              : "/conciergerie-airbnb-bethune"
          }
          className="flex flex-col gap-2 p-5 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
        >
          <span className="text-xs font-bold text-welqo-terracotta tracking-wider">
            {isEn
              ? "Ready to get started in Béthune?"
              : "Prêt à vous lancer à Béthune ?"}
          </span>
          <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors">
            {isEn
              ? "Discover our Airbnb Concierge Béthune service →"
              : "Découvrez notre service Conciergerie Airbnb Béthune →"}
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
