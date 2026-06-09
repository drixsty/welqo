import React from "react";

export function ArticleConciergerieLensArras({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const base = `/${locale}`;

  const villes = isEn
    ? [
        {
          name: "Lens",
          prixMoyen: "85 €",
          tauxOcc: "71 %",
          revenuMois: "1,100 €",
          accentBg: "bg-yellow-500",
          profil: "RC Lens supporters, Louvre-Lens visitors, families",
          atout: "Extreme demand peaks on home match weekends (+300%)",
          investissement: "1,400–2,200 €/sqm",
        },
        {
          name: "Arras",
          prixMoyen: "92 €",
          tauxOcc: "68 %",
          revenuMois: "1,050 €",
          accentBg: "bg-orange-500",
          profil:
            "Cultural tourists, business travelers, war remembrance tourism",
          atout: "Listed Grand-Place + very stable WWI remembrance tourism",
          investissement: "1,600–2,600 €/sqm",
        },
      ]
    : [
        {
          name: "Lens",
          prixMoyen: "85 €",
          tauxOcc: "71 %",
          revenuMois: "1 100 €",
          accentBg: "bg-yellow-500",
          profil: "Supporters RC Lens, visiteurs Louvre-Lens, familles",
          atout: "Pics de demande extrêmes les week-ends de match (+300%)",
          investissement: "1 400–2 200 €/m²",
        },
        {
          name: "Arras",
          prixMoyen: "92 €",
          tauxOcc: "68 %",
          revenuMois: "1 050 €",
          accentBg: "bg-orange-500",
          profil:
            "Touristes culturels, voyageurs d'affaires, tourisme mémoriel",
          atout:
            "Grand-Place classée + tourisme de la Grande Guerre très stable",
          investissement: "1 600–2 600 €/m²",
        },
      ];

  const calendrierLens = isEn
    ? [
        {
          mois: "August–May",
          evenement: "RC Lens Season (Ligue 1)",
          impact: "Very High",
          couleur: "text-red-500",
        },
        {
          mois: "Year-round",
          evenement: "Louvre-Lens (900,000 visitors/year)",
          impact: "High",
          couleur: "text-orange-500",
        },
        {
          mois: "July–August",
          evenement: "Summer / Mining Basin Braderie",
          impact: "Medium",
          couleur: "text-yellow-500",
        },
        {
          mois: "Nov.–Jan.",
          evenement: "Christmas Markets & Holidays",
          impact: "Medium",
          couleur: "text-yellow-500",
        },
      ]
    : [
        {
          mois: "Août–Mai",
          evenement: "Saison RC Lens (Ligue 1)",
          impact: "Très fort",
          couleur: "text-red-500",
        },
        {
          mois: "Permanent",
          evenement: "Louvre-Lens (900 000 vis./an)",
          impact: "Fort",
          couleur: "text-orange-500",
        },
        {
          mois: "Juil.–Août",
          evenement: "Été / Braderie du Bassin Minier",
          impact: "Moyen",
          couleur: "text-yellow-500",
        },
        {
          mois: "Nov.–Jan.",
          evenement: "Marchés de Noël & fêtes",
          impact: "Moyen",
          couleur: "text-yellow-500",
        },
      ];

  const simRows = isEn
    ? [
        { label: "Average nightly price (non-event)", val: "78 €" },
        { label: "Average nightly price (match or exhibition)", val: "185 €" },
        { label: "Non-event nights / month", val: "14" },
        { label: "Event nights / month (avg.)", val: "4" },
        {
          label: "Estimated gross monthly revenue",
          val: "1,832 €",
          highlight: true,
        },
        { label: "Welqo commission (20%)", val: "−366 €" },
        {
          label: "Net owner income",
          val: "1,466 €",
          highlight: true,
        },
      ]
    : [
        { label: "Prix moyen / nuit (hors événement)", val: "78 €" },
        { label: "Prix moyen / nuit (match ou expo)", val: "185 €" },
        { label: "Nuits hors événement / mois", val: "14" },
        { label: "Nuits événement / mois (moy.)", val: "4" },
        {
          label: "Revenu brut mensuel estimé",
          val: "1 832 €",
          highlight: true,
        },
        { label: "Commission Welqo (20%)", val: "−366 €" },
        {
          label: "Revenu net propriétaire",
          val: "1 466 €",
          highlight: true,
        },
      ];

  return (
    <div>
      {/* ── INTRO ── */}
      {isEn ? (
        <>
          <p>
            Lens and Arras don't usually make the front pages of major travel
            guides. And that is precisely why they represent a golden
            opportunity for Airbnb owners in 2025. While the Lille market
            becomes crowded, the Mining Basin attracts more visitors every year
            — thanks to the Louvre-Lens, RC Lens matches in Ligue 1, and WWI
            remembrance tourism.
          </p>
          <p>
            Result: strong seasonal rental demand, acquisition prices that are
            still highly accessible, and limited Airbnb competition. An ideal
            cocktail for high net yields — provided you optimize your listing
            correctly.
          </p>
        </>
      ) : (
        <>
          <p>
            Lens et Arras ne font pas la une des grands guides touristiques. Et
            c'est précisément pour ça qu'elles représentent une opportunité en
            or pour les propriétaires Airbnb en 2025. Pendant que le marché
            lillois se sature, le Bassin Minier attire chaque année davantage de
            visiteurs — grâce au Louvre-Lens, aux matchs du RC Lens en Ligue 1
            et au tourisme de mémoire de la Grande Guerre.
          </p>
          <p>
            Résultat : une demande locative saisonnière forte, des prix
            d'acquisition encore accessibles et une concurrence Airbnb encore
            limitée. Un cocktail idéal pour des rendements nets élevés — à
            condition de bien gérer son annonce.
          </p>
        </>
      )}

      {/* ── LOUVRE-LENS ── */}
      <h2 id="louvre-lens">
        {isEn
          ? "The Louvre-Lens effect: 900,000 visitors per year"
          : "L'effet Louvre-Lens : 900 000 visiteurs par an"}
      </h2>
      {isEn ? (
        <>
          <p>
            Since opening in 2012, the Louvre-Lens has completely transformed
            the city's image. In 2024, the museum welcomed more than{" "}
            <strong>900,000 visitors</strong>, a majority of whom come from
            Belgium, the Netherlands, and Germany. These international travelers
            look for accommodation nearby — and Airbnb is their first reflex.
          </p>
          <p>
            The museum regularly schedules blockbuster temporary exhibitions
            that generate highly predictable demand peaks. For a well-advised
            owner, these dates represent an opportunity to multiply their rates
            by 2 to 3.
          </p>
        </>
      ) : (
        <>
          <p>
            Depuis son ouverture en 2012, le Louvre-Lens a complètement
            transformé l'image de la ville. En 2024, le musée a accueilli plus
            de <strong>900 000 visiteurs</strong>, dont une majorité vient de
            Belgique, des Pays-Bas et d'Allemagne. Ces voyageurs étrangers
            cherchent un hébergement à proximité — et Airbnb est leur premier
            réflexe.
          </p>
          <p>
            Le musée programme régulièrement des expositions temporaires
            blockbusters qui génèrent des pics de demande prévisibles. Pour un
            propriétaire bien conseillé, ces dates sont une opportunité de
            multiplier les tarifs par 2 à 3.
          </p>
        </>
      )}

      {/* Calendrier */}
      <div className="my-6 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden not-prose">
        <div className="bg-slate-50 dark:bg-slate-900 px-5 py-3 border-b border-slate-200 dark:border-white/10">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider">
            {isEn ? "Demand Calendar — Lens" : "Calendrier de demande — Lens"}
          </p>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {calendrierLens.map((row) => (
            <div
              key={row.evenement}
              className="flex items-center justify-between px-5 py-3"
            >
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {row.evenement}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {row.mois}
                </p>
              </div>
              <span className={`text-xs font-bold ${row.couleur}`}>
                {row.impact}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RC LENS MATCHS ── */}
      <h2 id="rc-lens-matchs">
        {isEn
          ? "RC Lens: match nights, a gold mine"
          : "RC Lens : les nuits de match, une mine d'or"}
      </h2>
      {isEn ? (
        <>
          <p>
            RC Lens plays in Ligue 1 in a Bollaert-Delelis stadium that is
            regularly sold out (38,000 capacity). Every home match weekend
            generates colossal accommodation demand — hotels in Lens are fully
            booked weeks in advance.
          </p>
          <p>
            Airbnb owners who employ <strong>dynamic pricing</strong> on these
            nights charge between €150 and €250 per night for a standard
            apartment, compared to €70–90 on non-event nights. Over a season (19
            home matches), this represents thousands of euros in additional
            income.
          </p>
          <blockquote>
            <strong>Welqo Tip:</strong> never block your dates manually around
            match days. Let your dynamic pricing tool automatically adjust rates
            — prices rise as soon as the official calendar is announced,
            sometimes 4 to 6 weeks in advance.
          </blockquote>
        </>
      ) : (
        <>
          <p>
            Le RC Lens joue en Ligue 1 devant un stade Bollaert-Delelis
            régulièrement à guichet fermé (38 000 places). Chaque week-end de
            match à domicile génère une demande d'hébergement colossale — les
            hôtels de Lens affichent complet des semaines à l'avance.
          </p>
          <p>
            Les propriétaires Airbnb qui pratiquent la{" "}
            <strong>tarification dynamique</strong> lors de ces nuits facturent
            entre 150 € et 250 € la nuit pour un appartement standard, contre
            70–90 € hors événement. Sur une saison (19 matchs à domicile), cela
            représente plusieurs milliers d'euros de revenus supplémentaires.
          </p>
          <blockquote>
            <strong>Conseil Welqo :</strong> ne bloquez jamais vos dates
            manuellement autour des matchs. Laissez votre outil de tarification
            dynamique ajuster automatiquement — les prix montent dès l'annonce
            du calendrier officiel, parfois 4 à 6 semaines à l'avance.
          </blockquote>
        </>
      )}

      {/* ── LENS VS ARRAS ── */}
      <h2 id="lens-vs-arras">
        {isEn
          ? "Lens vs Arras: which city to choose for investment?"
          : "Lens vs Arras : quelle ville choisir pour investir ?"}
      </h2>
      {isEn ? (
        <p>
          Both cities have complementary profiles. Lens offers steeper demand
          peaks (matches, exhibitions) but a more volatile baseline demand.
          Arras is more stable, supported by mature cultural tourism (baroque
          Grand-Place, underground passages, WWI remembrance sites) and
          professional corporate clientele linked to regional institutions.
        </p>
      ) : (
        <p>
          Les deux villes ont des profils complémentaires. Lens offre des pics
          de demande plus violents (matchs, expos) mais une demande de fond plus
          volatile. Arras est plus stable, portée par un tourisme culturel
          mature (Grand-Place baroque, Cité souterraine, tourisme de la Grande
          Guerre) et une clientèle professionnelle liée aux institutions
          régionales.
        </p>
      )}

      {/* Tableau comparatif */}
      <div className="my-6 not-prose space-y-4">
        {villes.map((v) => (
          <div
            key={v.name}
            className="rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className={`${v.accentBg} px-5 py-3`}>
              <p className="text-sm font-bold text-white">{v.name}</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-white/5 bg-white dark:bg-slate-900/50">
              <div className="px-4 py-3 text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {v.prixMoyen}
                </p>
                <p className="text-[10px] text-slate-500 font-bold tracking-wider">
                  {isEn ? "Price / night" : "Prix / nuit"}
                </p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {v.tauxOcc}
                </p>
                <p className="text-[10px] text-slate-500 font-bold tracking-wider">
                  {isEn ? "Occup. rate" : "Taux occ."}
                </p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {v.revenuMois}
                </p>
                <p className="text-[10px] text-slate-500 font-bold tracking-wider">
                  {isEn ? "Revenue / month" : "Revenu / mois"}
                </p>
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/30 space-y-1">
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">
                  {isEn ? "Traveler profile:" : "Profil voyageur :"}
                </span>{" "}
                {v.profil}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">
                  {isEn ? "Key asset:" : "Atout principal :"}
                </span>{" "}
                {v.atout}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">
                  {isEn ? "Acquisition cost:" : "Prix acquisition :"}
                </span>{" "}
                {v.investissement}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── RENTABILITE ── */}
      <h2 id="rentabilite">
        {isEn ? "2025 Estimated Profitability" : "Rentabilité estimée 2025"}
      </h2>
      <p>
        {isEn
          ? "For a well-located 40sqm apartment in Lens (10 min from Louvre-Lens and Bollaert), here is a realistic simulation based on local market data:"
          : "Pour un appartement de 40 m² bien placé à Lens (à 10 min du Louvre-Lens et de Bollaert), voici une simulation réaliste basée sur les données du marché :"}
      </p>

      <div className="my-6 not-prose rounded-xl bg-slate-950 text-white p-6 border border-white/10">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 mb-4">
          {isEn
            ? "Simulation — 1-bed 40sqm in Lens (Welqo managed)"
            : "Simulation — T2 40m² à Lens (gestion Welqo)"}
        </p>
        <div className="space-y-3">
          {simRows.map(({ label, val, highlight }) => (
            <div
              key={label}
              className={`flex justify-between items-center py-2 border-b border-white/5 last:border-0 ${
                highlight ? "text-white font-bold" : "text-slate-400 text-sm"
              }`}
            >
              <span>{label}</span>
              <span
                className={highlight ? "text-welqo-terracotta text-lg" : ""}
              >
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p>
        {isEn ? (
          <>
            By comparison, a similar apartment rented under a traditional
            long-term lease in Lens generates about €500–600/month. The net
            income difference with professional Airbnb management is therefore
            around <strong>+140% to +160%</strong>.
          </>
        ) : (
          <>
            À titre de comparaison, un appartement similaire loué en location
            longue durée à Lens génère environ 500–600 €/mois. La différence de
            revenu net avec une gestion Airbnb professionnelle est donc de
            l'ordre de <strong>+140 % à +160 %</strong>.
          </>
        )}
      </p>

      {/* ── CONCIERGERIE ── */}
      <h2 id="conciergerie">
        {isEn
          ? "Why a concierge service is essential in Lens and Arras?"
          : "Pourquoi une conciergerie est indispensable à Lens et Arras ?"}
      </h2>
      {isEn ? (
        <>
          <p>
            The Lens and Arras markets have a characteristic that complicates
            solo management: <strong>late arrivals and early departures</strong>{" "}
            on match nights. A supporter who arrives after the final whistle
            (11pm) and leaves the next morning at 8am requires a level of
            responsiveness that most remote owners cannot provide.
          </p>
          <p>
            Welqo concierge has local teams on the ground in Lens and Arras to
            handle these off-peak hours, ensure professional cleaning between
            successive stays, and maintain our properties' average rating above
            4.8/5 — the critical threshold to rank at the top of Airbnb search
            results.
          </p>
        </>
      ) : (
        <>
          <p>
            Les marchés de Lens et Arras ont une caractéristique qui complique
            la gestion en solo : les{" "}
            <strong>arrivées tardives et les départs matinaux</strong> lors des
            matchs du soir. Un supporter qui arrive après le coup de sifflet
            final (23h) et repart le lendemain à 8h demande une réactivité que
            la plupart des propriétaires ne peuvent pas offrir à distance.
          </p>
          <p>
            La conciergerie Welqo dispose d'équipes locales à Lens et Arras pour
            gérer ces créneaux atypiques, assurer le ménage entre deux séjours
            successifs et maintenir la note moyenne de nos biens au-dessus de
            4,8/5 — le seuil critique pour apparaître en tête des résultats
            Airbnb.
          </p>
        </>
      )}

      <h3>
        {isEn
          ? "What Welqo manages for you"
          : "Ce que Welqo gère à votre place"}
      </h3>
      <ul>
        {isEn ? (
          <>
            <li>Flexible 7d/7 check-in/out, including late match nights</li>
            <li>
              Guaranteed professional cleaning between each stay (even with
              tight turnovers)
            </li>
            <li>
              Dynamic pricing integrated with the RC Lens calendar and
              Louvre-Lens exhibitions
            </li>
            <li>Optimized listings on Airbnb, Booking.com, Vrbo and Expedia</li>
            <li>24/7 guest communication in French, English and Dutch</li>
            <li>Real-time owner dashboard with detailed monthly reports</li>
          </>
        ) : (
          <>
            <li>
              Check-in/check-out flexible 7j/7, y compris nuits de match
              tardives
            </li>
            <li>
              Ménage professionnel garanti entre chaque séjour (délais serrés
              inclus)
            </li>
            <li>
              Tarification dynamique intégrant le calendrier RC Lens et les
              expos du Louvre-Lens
            </li>
            <li>
              Annonces optimisées sur Airbnb, Booking.com, Vrbo et Expedia
            </li>
            <li>
              Communication voyageurs 24/7 en français, anglais et néerlandais
            </li>
            <li>
              Dashboard propriétaire en temps réel avec rapport mensuel détaillé
            </li>
          </>
        )}
      </ul>

      {/* ── CONCLUSION ── */}
      <h2 id="conclusion">{isEn ? "Conclusion" : "Conclusion"}</h2>
      <p>
        {isEn ? (
          <>
            In 2025, Lens and Arras represent one of the best short-term rental
            opportunities in northern France. Still-low acquisition costs,
            powerful demand drivers (sport, culture, heritage) and limited
            Airbnb competition — the perfect recipe for solid net yields.
          </>
        ) : (
          <>
            Lens et Arras représentent en 2025 l'une des meilleures opportunités
            de location courte durée dans le nord de la France. Des prix
            d'acquisition encore bas, des moteurs de demande puissants (sport,
            culture, patrimoine) et une concurrence Airbnb limitée — les
            ingrédients d'une rentabilité nette solide.
          </>
        )}
      </p>
      <p>
        {isEn ? (
          <>
            The key: professional management that intelligently capitalizes on
            event peaks and maintains flawless welcoming quality. That is
            exactly what Welqo provides with its local team in the Mining Basin.
          </>
        ) : (
          <>
            La clé : une gestion professionnelle qui exploite intelligemment les
            pics d'événements et maintient une qualité d'accueil irréprochable.
            C'est exactement ce que propose Welqo avec son équipe locale dans le
            Bassin Minier.
          </>
        )}
      </p>

      {/* ── CTA MAILLAGE INTERNE ── */}
      <div className="not-prose mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={
            locale === "en"
              ? "/en/conciergerie-airbnb-lens"
              : "/conciergerie-airbnb-lens"
          }
          className="flex flex-col gap-2 p-5 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
        >
          <span className="text-xs font-bold text-welqo-terracotta tracking-wider">
            {isEn ? "Our Lens service" : "Notre service à Lens"}
          </span>
          <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors">
            {isEn ? "Airbnb Concierge Lens →" : "Conciergerie Airbnb Lens →"}
          </span>
          <span className="text-xs text-slate-400">
            {isEn
              ? "Discover our Lens management offer"
              : "Découvrez notre offre de gestion à Lens"}
          </span>
        </a>
        <a
          href={
            locale === "en"
              ? "/en/conciergerie-airbnb-arras"
              : "/conciergerie-airbnb-arras"
          }
          className="flex flex-col gap-2 p-5 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
        >
          <span className="text-xs font-bold text-welqo-terracotta tracking-wider">
            {isEn ? "Our Arras service" : "Notre service à Arras"}
          </span>
          <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors">
            {isEn ? "Airbnb Concierge Arras →" : "Conciergerie Airbnb Arras →"}
          </span>
          <span className="text-xs text-slate-400">
            {isEn
              ? "Discover our Arras management offer"
              : "Découvrez notre offre de gestion à Arras"}
          </span>
        </a>
      </div>
    </div>
  );
}
