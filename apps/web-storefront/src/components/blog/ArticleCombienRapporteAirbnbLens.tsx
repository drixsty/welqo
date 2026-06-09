import React from "react";

export function ArticleCombienRapporteAirbnbLens({
  locale,
}: {
  locale: string;
}) {
  const isEn = locale === "en";

  return (
    <div>
      {/* ── INTRO ── */}
      {isEn ? (
        <p>
          Lens is no longer just the city of the RC Lens football club. Since
          the opening of the Louvre-Lens in 2012, the city has transformed into
          a genuine tourist destination attracting over 700,000 visitors a year.
          For Airbnb property owners, this creates a unique revenue opportunity
          — especially since local hotel capacity remains limited and Airbnb
          competition is still low.
        </p>
      ) : (
        <p>
          Lens n'est plus seulement la ville du Racing Club de Lens. Depuis
          l'ouverture du Louvre-Lens en 2012, la ville s'est transformée en une
          véritable destination touristique attirant plus de 700 000 visiteurs
          par an. Pour les propriétaires Airbnb, cela crée une opportunité de
          revenus unique — d'autant plus que la capacité hôtelière locale reste
          limitée et que la concurrence Airbnb est encore faible.
        </p>
      )}

      <h2 id="revenus-moyens">
        {isEn
          ? "Average Airbnb Revenue in Lens"
          : "Revenus Airbnb moyens à Lens"}
      </h2>
      {isEn ? (
        <>
          <p>
            Based on 2024-2025 market data, here are the average performance
            indicators for an Airbnb in Lens:
          </p>
          <ul>
            <li>
              <strong>Average monthly gross revenue:</strong> €950 (for a
              standard 2-room apartment)
            </li>
            <li>
              <strong>Average occupancy rate:</strong> 72% (vs 78% in Lille)
            </li>
            <li>
              <strong>Average nightly rate:</strong> €65 off-peak / €150–200 on
              match weekends
            </li>
            <li>
              <strong>Best-performing months:</strong> September–May (football
              season + exhibitions)
            </li>
          </ul>
          <p>
            These figures can vary significantly depending on the property
            location, quality of listing and management approach. Properties
            within walking distance of Stade Bollaert or the Louvre-Lens
            systematically outperform the market average.
          </p>
        </>
      ) : (
        <>
          <p>
            Sur la base des données de marché 2024-2025, voici les indicateurs
            de performance moyens pour un Airbnb à Lens :
          </p>
          <ul>
            <li>
              <strong>Revenu brut mensuel moyen :</strong> 950 € (pour un
              appartement standard T2)
            </li>
            <li>
              <strong>Taux d'occupation moyen :</strong> 72 % (contre 78 % à
              Lille)
            </li>
            <li>
              <strong>Tarif moyen par nuit :</strong> 65 € hors événement / 150
              à 200 € les week-ends de match
            </li>
            <li>
              <strong>Mois les plus performants :</strong> septembre à mai
              (saison de football + expositions)
            </li>
          </ul>
          <p>
            Ces chiffres peuvent varier significativement selon la localisation
            du bien, la qualité de l'annonce et l'approche de gestion. Les biens
            situés à distance de marche du Stade Bollaert ou du Louvre-Lens
            surperforment systématiquement la moyenne du marché.
          </p>
        </>
      )}

      <h2 id="effet-rc-lens">
        {isEn
          ? "The RC Lens Effect: Match Weekends"
          : "L'effet RC Lens : les week-ends de match"}
      </h2>
      {isEn ? (
        <>
          <p>
            RC Lens plays approximately 19 home matches per Ligue 1 season,
            mostly on weekends. Each match weekend creates a peak demand that
            multiplies nightly rates by 2 to 3 times:
          </p>
          <ul>
            <li>Standard nightly rate: €60–80</li>
            <li>Match weekend rate: €150–200</li>
            <li>Potential additional revenue per match: €90–120</li>
            <li>
              Annual impact of the football season: +€1,700–2,280 in additional
              revenue
            </li>
          </ul>
          <p>
            Properties near Stade Bollaert (Avion, central Lens) are fully
            booked weeks in advance for big matches. Dynamic pricing optimised
            around the RC Lens calendar is therefore essential to maximise this
            revenue.
          </p>
        </>
      ) : (
        <>
          <p>
            Le RC Lens dispute environ 19 matchs à domicile par saison de Ligue
            1, principalement le week-end. Chaque week-end de match crée un pic
            de demande qui multiplie les tarifs par nuit par 2 à 3 fois :
          </p>
          <ul>
            <li>Tarif standard par nuit : 60–80 €</li>
            <li>Tarif week-end de match : 150–200 €</li>
            <li>Revenu supplémentaire par match : 90–120 €</li>
            <li>
              Impact annuel de la saison football : +1 700 à 2 280 € de revenus
              additionnels
            </li>
          </ul>
          <p>
            Les biens proches du Stade Bollaert (Avion, centre de Lens)
            affichent complet des semaines à l'avance pour les grands matchs.
            Une tarification dynamique optimisée autour du calendrier RC Lens
            est donc indispensable pour maximiser ces revenus.
          </p>
        </>
      )}

      <h2 id="effet-louvre-lens">
        {isEn
          ? "The Louvre-Lens Effect: Year-Round Visitors"
          : "L'effet Louvre-Lens : des visiteurs toute l'année"}
      </h2>
      {isEn ? (
        <>
          <p>
            With 700,000 visitors per year, the Louvre-Lens is the second
            most-visited museum in France outside Paris. It attracts a diverse
            international audience (France, Belgium, Netherlands, UK) who need
            accommodation — and hotels are often full or overpriced for this
            type of stay.
          </p>
          <p>
            Key Louvre-Lens events that generate accommodation demand peaks:
          </p>
          <ul>
            <li>Major temporary exhibitions (3–4 per year, each 3–6 months)</li>
            <li>School holidays (French + Belgian)</li>
            <li>Long weekends and bank holidays</li>
            <li>
              Evening events: concerts, nocturnal visits, private openings
            </li>
          </ul>
        </>
      ) : (
        <>
          <p>
            Avec 700 000 visiteurs par an, le Louvre-Lens est le deuxième musée
            le plus visité de France hors Paris. Il attire un public varié et
            international (France, Belgique, Pays-Bas, Royaume-Uni) qui a besoin
            de logement — et les hôtels sont souvent complets ou surdimensionnés
            pour ce type de séjour.
          </p>
          <p>
            Les événements clés du Louvre-Lens qui génèrent des pics de demande
            d'hébergement :
          </p>
          <ul>
            <li>
              Grandes expositions temporaires (3 à 4 par an, durée 3 à 6 mois)
            </li>
            <li>Vacances scolaires (françaises + belges)</li>
            <li>Ponts et jours fériés</li>
            <li>
              Événements nocturnes : concerts, visites nocturnes, soirées
              privées
            </li>
          </ul>
        </>
      )}

      <h2 id="secteurs-performants">
        {isEn
          ? "Best Performing Areas in Lens"
          : "Les secteurs les plus performants à Lens"}
      </h2>
      {isEn ? (
        <ul>
          <li>
            <strong>Avion:</strong> Immediately adjacent to Stade Bollaert —
            highest match-day rates. Average €1,050/month gross.
          </li>
          <li>
            <strong>Lens city centre:</strong> Walking distance from
            Louvre-Lens, stations, restaurants. Best all-year performance.
          </li>
          <li>
            <strong>Liévin:</strong> 5 minutes from Lens, lower acquisition
            prices, slightly lower rates but strong occupancy.
          </li>
          <li>
            <strong>Loos-en-Gohelle:</strong> UNESCO slag heaps, niche but
            growing eco-tourism segment.
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <strong>Avion :</strong> Mitoyenne du Stade Bollaert — tarifs les
            plus élevés les jours de match. Revenu moyen 1 050 €/mois brut.
          </li>
          <li>
            <strong>Centre-Ville Lens :</strong> À pied du Louvre-Lens, des
            gares, des restaurants. Meilleure performance annuelle.
          </li>
          <li>
            <strong>Liévin :</strong> À 5 minutes de Lens, prix d'acquisition
            plus bas, tarifs légèrement inférieurs mais fort taux d'occupation.
          </li>
          <li>
            <strong>Loos-en-Gohelle :</strong> Terrils UNESCO, segment
            éco-tourisme de niche mais en croissance.
          </li>
        </ul>
      )}

      <h2 id="maximiser-revenus">
        {isEn
          ? "How to Maximise Your Airbnb Revenue in Lens"
          : "Comment maximiser vos revenus Airbnb à Lens"}
      </h2>
      {isEn ? (
        <>
          <p>Three key levers to outperform the Lens average:</p>
          <ol>
            <li>
              <strong>Dynamic pricing:</strong> Adjust your rates for every RC
              Lens home match and every Louvre-Lens exhibition launch.
            </li>
            <li>
              <strong>Multi-platform listing:</strong> Airbnb captures sports
              tourists well, but Booking.com reaches the business and cultural
              visitor segments better.
            </li>
            <li>
              <strong>Professional photography:</strong> The average Lens
              listing quality is lower than Lille — a professional shoot alone
              can increase your booking rate by 30–40%.
            </li>
          </ol>
        </>
      ) : (
        <>
          <p>
            Trois leviers clés pour surpasser la moyenne du marché lensois :
          </p>
          <ol>
            <li>
              <strong>Tarification dynamique :</strong> Ajustez vos prix pour
              chaque match à domicile du RC Lens et chaque ouverture
              d'exposition du Louvre-Lens.
            </li>
            <li>
              <strong>Multi-plateformes :</strong> Airbnb capte bien les
              touristes sportifs, mais Booking.com touche mieux les segments
              voyageurs d'affaires et culturels.
            </li>
            <li>
              <strong>Photos professionnelles :</strong> Le niveau moyen des
              annonces lensoises est inférieur à Lille — une séance photo pro
              peut à elle seule augmenter votre taux de réservation de 30 à 40
              %.
            </li>
          </ol>
        </>
      )}

      {/* ── CTA MAILLAGE INTERNE ── */}
      <div className="not-prose mt-8">
        <a
          href={
            isEn ? "/en/conciergerie-airbnb-lens" : "/conciergerie-airbnb-lens"
          }
          className="flex flex-col gap-2 p-5 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
        >
          <span className="text-xs font-bold text-welqo-terracotta tracking-wider">
            {isEn
              ? "Ready to get started in Lens?"
              : "Prêt à vous lancer à Lens ?"}
          </span>
          <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors">
            {isEn
              ? "Discover our Airbnb Concierge Lens service →"
              : "Découvrez notre service Conciergerie Airbnb Lens →"}
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
