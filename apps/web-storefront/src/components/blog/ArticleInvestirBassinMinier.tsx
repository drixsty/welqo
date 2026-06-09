import React from "react";

export function ArticleInvestirBassinMinier({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <div>
      {isEn ? (
        <p>
          In 2025, many investors are turning away from saturated markets like
          Paris or Lyon and looking for emerging opportunities. The Bassin Minier
          — and particularly Lens and Arras — ticks all the boxes: low acquisition
          prices, growing tourist demand and still-limited Airbnb competition.
          Here is a complete analysis.
        </p>
      ) : (
        <p>
          En 2025, de nombreux investisseurs se détournent des marchés saturés
          comme Paris ou Lyon et cherchent des opportunités émergentes. Le Bassin
          Minier — et notamment Lens et Arras — coche toutes les cases : prix
          d'acquisition bas, demande touristique croissante et concurrence Airbnb
          encore limitée. Voici une analyse complète.
        </p>
      )}

      <h2 id="pourquoi-bassin-minier">
        {isEn
          ? "Why Invest in the Bassin Minier in 2025?"
          : "Pourquoi investir dans le Bassin Minier en 2025 ?"}
      </h2>
      {isEn ? (
        <ul>
          <li>
            <strong>Low acquisition prices:</strong> €1,400–2,600/sqm (vs
            €3,000–5,000 in Lille and €8,000+ in Paris)
          </li>
          <li>
            <strong>Booming tourism:</strong> +700,000 visitors/year at
            Louvre-Lens, 400,000 at Vimy Memorial, 600,000 at the Ring of
            Remembrance
          </li>
          <li>
            <strong>RC Lens effect:</strong> 19 home matches/season generating
            accommodation peaks of 150–200% above standard rates
          </li>
          <li>
            <strong>Low Airbnb competition:</strong> 5–8× fewer active listings
            than in Lille for a comparable tourist flow
          </li>
          <li>
            <strong>Good transport links:</strong> TGV Paris–Lens in 1h10, direct
            connection to Brussels in 1h30
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <strong>Prix d'acquisition bas :</strong> 1 400 à 2 600 €/m²
            (contre 3 000 à 5 000 € à Lille et 8 000 €+ à Paris)
          </li>
          <li>
            <strong>Tourisme en plein essor :</strong> +700 000 visiteurs/an
            au Louvre-Lens, 400 000 au Mémorial de Vimy, 600 000 à l'Anneau de
            la Mémoire
          </li>
          <li>
            <strong>Effet RC Lens :</strong> 19 matchs à domicile/saison
            générant des pics d'hébergement à 150–200 % du tarif standard
          </li>
          <li>
            <strong>Faible concurrence Airbnb :</strong> 5 à 8 fois moins
            d'annonces actives qu'à Lille pour un flux touristique comparable
          </li>
          <li>
            <strong>Bonne desserte :</strong> TGV Paris–Lens en 1h10, connexion
            directe Bruxelles en 1h30
          </li>
        </ul>
      )}

      <h2 id="rendement-calcul">
        {isEn
          ? "Estimated Yield Calculation"
          : "Calcul de rendement estimé"}
      </h2>
      {isEn ? (
        <>
          <p>
            Example for a 35 sqm apartment in central Lens, purchased for
            €65,000 (€1,860/sqm):
          </p>
          <ul>
            <li>Gross monthly revenue: €950</li>
            <li>Annual gross revenue: €11,400</li>
            <li>Annual costs (charges, insurance, Welqo commission): ~€3,200</li>
            <li>Annual net revenue: ~€8,200</li>
            <li>
              <strong>Estimated net yield: 12.6%</strong>
            </li>
          </ul>
          <p>
            For comparison, the same amount invested in a long-term rental in
            Lens would yield approximately 5–6% net, and in a Lille Airbnb
            approximately 7–9% net.
          </p>
        </>
      ) : (
        <>
          <p>
            Exemple pour un appartement de 35 m² en centre de Lens, acheté
            65 000 € (1 860 €/m²) :
          </p>
          <ul>
            <li>Revenu brut mensuel : 950 €</li>
            <li>Revenu brut annuel : 11 400 €</li>
            <li>
              Charges annuelles (charges, assurance, commission Welqo) :
              ~3 200 €
            </li>
            <li>Revenu net annuel : ~8 200 €</li>
            <li>
              <strong>Rendement net estimé : 12,6 %</strong>
            </li>
          </ul>
          <p>
            À titre de comparaison, la même somme investie en location longue
            durée à Lens générerait environ 5 à 6 % net, et en Airbnb à Lille
            environ 7 à 9 % net.
          </p>
        </>
      )}

      <h2 id="risques">
        {isEn ? "Risks to Watch Out For" : "Les risques à surveiller"}
      </h2>
      {isEn ? (
        <ul>
          <li>
            <strong>Regulatory risk:</strong> Municipalities may implement
            short-term rental restrictions. Béthune and Lens have not yet done
            so, but monitor local council decisions.
          </li>
          <li>
            <strong>Football season dependency:</strong> Without RC Lens, Lens
            Airbnb revenue would fall by 15–20%. Diversify your marketing towards
            cultural and business visitors.
          </li>
          <li>
            <strong>Property condition:</strong> Bassin Minier housing stock is
            often old. Budget €5,000–15,000 for renovation to meet the quality
            expectations of modern Airbnb guests.
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <strong>Risque réglementaire :</strong> Les communes pourraient
            implémenter des restrictions à la location courte durée. Béthune et
            Lens ne l'ont pas encore fait, mais surveillez les décisions
            municipales.
          </li>
          <li>
            <strong>Dépendance à la saison football :</strong> Sans le RC Lens,
            les revenus Airbnb lensois baisseraient de 15 à 20 %. Diversifiez
            votre marketing vers les visiteurs culturels et professionnels.
          </li>
          <li>
            <strong>État du parc immobilier :</strong> Le bâti du Bassin Minier
            est souvent ancien. Prévoyez 5 000 à 15 000 € de rénovation pour
            répondre aux attentes de qualité des voyageurs Airbnb modernes.
          </li>
        </ul>
      )}

      {/* ── CTA ── */}
      <div className="not-prose mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={isEn ? "/en/conciergerie-airbnb-lens" : "/conciergerie-airbnb-lens"}
          className="flex flex-col gap-2 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
        >
          <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors text-sm">
            {isEn ? "Airbnb Concierge Lens →" : "Conciergerie Airbnb Lens →"}
          </span>
        </a>
        <a
          href={isEn ? "/en/conciergerie-airbnb-arras" : "/conciergerie-airbnb-arras"}
          className="flex flex-col gap-2 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
        >
          <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors text-sm">
            {isEn ? "Airbnb Concierge Arras →" : "Conciergerie Airbnb Arras →"}
          </span>
        </a>
      </div>
    </div>
  );
}
