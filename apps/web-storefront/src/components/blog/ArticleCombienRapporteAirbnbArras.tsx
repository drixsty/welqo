import React from "react";

export function ArticleCombienRapporteAirbnbArras({
  locale,
}: {
  locale: string;
}) {
  const isEn = locale === "en";

  return (
    <div>
      {isEn ? (
        <p>
          Arras is one of France's best-kept secrets for short-term rental
          investment. With its UNESCO-listed Grand-Place, its memorial tourism
          (Wellington Quarry, Vimy Memorial) and its famous Christmas market,
          the city attracts a steady, year-round flow of visitors — yet its
          Airbnb supply remains significantly underdeveloped compared to demand.
        </p>
      ) : (
        <p>
          Arras est l'un des secrets les mieux gardés de l'investissement
          locatif courte durée en France. Avec sa Grand-Place classée UNESCO,
          son tourisme mémoriel (Carrière Wellington, Mémorial de Vimy) et son
          célèbre marché de Noël, la ville attire un flux régulier et annuel de
          visiteurs — mais son offre Airbnb reste significativement
          sous-développée par rapport à la demande.
        </p>
      )}

      <h2 id="revenus-moyens">
        {isEn
          ? "Average Airbnb Revenue in Arras"
          : "Revenus Airbnb moyens à Arras"}
      </h2>
      {isEn ? (
        <ul>
          <li>
            <strong>Average monthly gross revenue:</strong> €1,050 (standard
            2-room apartment, city centre)
          </li>
          <li>
            <strong>Average occupancy rate:</strong> 68%
          </li>
          <li>
            <strong>Average nightly rate:</strong> €70 off-peak / €110–160
            during Christmas market and commemorations
          </li>
          <li>
            <strong>Best months:</strong> November (Christmas market), April–May
            (WWI commemorations), July–August (summer tourism)
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <strong>Revenu brut mensuel moyen :</strong> 1 050 € (appartement T2
            standard, centre-ville)
          </li>
          <li>
            <strong>Taux d'occupation moyen :</strong> 68 %
          </li>
          <li>
            <strong>Tarif moyen par nuit :</strong> 70 € hors saison / 110 à 160
            € pendant le marché de Noël et les commémorations
          </li>
          <li>
            <strong>Meilleures périodes :</strong> novembre (marché de Noël),
            avril–mai (commémorations 14-18), juillet–août (tourisme estival)
          </li>
        </ul>
      )}

      <h2 id="tourisme-memoriel">
        {isEn
          ? "Memorial Tourism: A Powerful Demand Driver"
          : "Le tourisme mémoriel : un moteur de demande puissant"}
      </h2>
      {isEn ? (
        <>
          <p>
            Arras sits at the heart of the Western Front and the Great War
            memorial circuit. Three major sites generate continuous visitor
            flows:
          </p>
          <ul>
            <li>
              <strong>Wellington Quarry:</strong> 100,000 visitors/year. This
              underground tunnel used by Allied troops in 1917 attracts school
              groups, families and history enthusiasts year-round.
            </li>
            <li>
              <strong>Vimy Memorial (20 km from Arras):</strong> 400,000
              visitors/year, particularly Canadian tourists paying tribute to
              the Battle of Vimy Ridge. Many stay in Arras.
            </li>
            <li>
              <strong>Ring of Remembrance, Notre-Dame-de-Lorette:</strong> The
              world's largest memorial, attracting 600,000 visitors/year.
            </li>
          </ul>
          <p>
            This memorial tourism is particularly valuable because it is{" "}
            <strong>distributed throughout the year</strong> and generates
            mid-week stays (school groups, guided tours), complementing weekend
            leisure tourism.
          </p>
        </>
      ) : (
        <>
          <p>
            Arras se situe au cœur du Front de l'Ouest et du circuit mémoriel de
            la Grande Guerre. Trois sites majeurs génèrent des flux de visiteurs
            continus :
          </p>
          <ul>
            <li>
              <strong>Carrière Wellington :</strong> 100 000 visiteurs/an. Ces
              galeries souterraines utilisées par les troupes alliées en 1917
              attirent groupes scolaires, familles et passionnés d'histoire
              toute l'année.
            </li>
            <li>
              <strong>Mémorial de Vimy (20 km d'Arras) :</strong> 400 000
              visiteurs/an, notamment des touristes canadiens en pèlerinage sur
              la crête de Vimy. Beaucoup se logent à Arras.
            </li>
            <li>
              <strong>Anneau de la Mémoire, Notre-Dame-de-Lorette :</strong> Le
              plus grand mémorial du monde, 600 000 visiteurs/an.
            </li>
          </ul>
          <p>
            Ce tourisme mémoriel est particulièrement précieux car il est{" "}
            <strong>réparti tout au long de l'année</strong> et génère des
            séjours en semaine (groupes scolaires, circuits guidés),
            complémentaires du tourisme loisir du week-end.
          </p>
        </>
      )}

      <h2 id="marche-noel">
        {isEn
          ? "The Christmas Market: The Revenue Peak of the Year"
          : "Le marché de Noël : le pic de revenus de l'année"}
      </h2>
      {isEn ? (
        <>
          <p>
            The Arras Christmas market is one of the most beautiful in northern
            France, attracting over 200,000 visitors over 5 weeks (late November
            to early January). During this period:
          </p>
          <ul>
            <li>
              Nightly rates on the Grand-Place can reach €130–180 for a
              1-bedroom apartment
            </li>
            <li>Occupancy rates exceed 90% on weekends</li>
            <li>
              An optimised property can generate 3 to 4 months of standard
              revenue in these 5 weeks alone
            </li>
          </ul>
        </>
      ) : (
        <>
          <p>
            Le marché de Noël d'Arras est l'un des plus beaux du nord de la
            France, attirant plus de 200 000 visiteurs sur 5 semaines (fin
            novembre à début janvier). Durant cette période :
          </p>
          <ul>
            <li>
              Les tarifs par nuit sur la Grand-Place peuvent atteindre 130 à 180
              € pour un T2
            </li>
            <li>Les taux d'occupation dépassent 90 % les week-ends</li>
            <li>
              Un bien optimisé peut générer l'équivalent de 3 à 4 mois de
              revenus standards en ces seules 5 semaines
            </li>
          </ul>
        </>
      )}

      <h2 id="comparaison-lille">
        {isEn
          ? "Arras vs Lille: Where to Invest?"
          : "Arras vs Lille : où investir ?"}
      </h2>
      {isEn ? (
        <p>
          Arras offers a key advantage over Lille:{" "}
          <strong>acquisition prices are 40–50% lower</strong> (€1,600–2,600/sqm
          in Arras vs €3,000–5,000/sqm in Lille), while Airbnb revenues are only
          20–25% lower. This translates into a significantly higher gross yield
          in Arras for an equivalent investment.
        </p>
      ) : (
        <p>
          Arras offre un avantage clé par rapport à Lille :{" "}
          <strong>les prix d'acquisition sont 40 à 50 % plus bas</strong> (1 600
          à 2 600 €/m² à Arras contre 3 000 à 5 000 €/m² à Lille), alors que les
          revenus Airbnb ne sont inférieurs que de 20 à 25 %. Cela se traduit
          par un rendement brut significativement plus élevé à Arras pour un
          investissement équivalent.
        </p>
      )}

      {/* ── CTA ── */}
      <div className="not-prose mt-8">
        <a
          href={
            isEn
              ? "/en/conciergerie-airbnb-arras"
              : "/conciergerie-airbnb-arras"
          }
          className="flex flex-col gap-2 p-5 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
        >
          <span className="text-xs font-bold text-welqo-terracotta tracking-wider">
            {isEn
              ? "Ready to get started in Arras?"
              : "Prêt à vous lancer à Arras ?"}
          </span>
          <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors">
            {isEn
              ? "Discover our Airbnb Concierge Arras service →"
              : "Découvrez notre service Conciergerie Airbnb Arras →"}
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
