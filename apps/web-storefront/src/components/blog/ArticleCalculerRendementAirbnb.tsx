import React from "react";

export function ArticleCalculerRendementAirbnb({
  locale,
}: {
  locale: string;
}) {
  const isEn = locale === "en";

  return (
    <div>
      {isEn ? (
        <p>
          Before investing in a short-term rental property, one question matters
          above all others: how much will it actually earn? The answer lies in
          three calculations — gross yield, net yield and cash flow — that most
          investors confuse or skip. This guide explains each one with concrete
          examples from the Hauts-de-France market.
        </p>
      ) : (
        <p>
          Avant d'investir dans un logement en location courte durée, une
          question prime sur toutes les autres : combien va-t-il vraiment
          rapporter ? La réponse tient en trois calculs — rendement brut,
          rendement net et cash-flow — que la plupart des investisseurs
          confondent ou ignorent. Ce guide vous explique chacun avec des exemples
          concrets sur le marché des Hauts-de-France.
        </p>
      )}

      <h2 id="rendement-brut">
        {isEn ? "Step 1: Gross Yield" : "Étape 1 : Le rendement brut"}
      </h2>
      {isEn ? (
        <>
          <p>
            <strong>Formula:</strong> (Annual gross revenue ÷ Total acquisition
            cost) × 100
          </p>
          <p>
            <strong>Example — Lens (35 sqm, purchased for €65,000):</strong>
          </p>
          <ul>
            <li>Monthly gross revenue: €950</li>
            <li>Annual gross revenue: €11,400</li>
            <li>Total acquisition cost: €65,000 + €6,000 notary fees = €71,000</li>
            <li>
              <strong>Gross yield: 11,400 ÷ 71,000 × 100 = 16.1%</strong>
            </li>
          </ul>
          <p>
            Gross yield is a quick filter to compare properties. Aim for 8%+
            in Hauts-de-France. Anything below 6% warrants serious scrutiny.
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>Formule :</strong> (Revenus bruts annuels ÷ Coût total
            d'acquisition) × 100
          </p>
          <p>
            <strong>Exemple — Lens (35 m², acheté 65 000 €) :</strong>
          </p>
          <ul>
            <li>Revenu brut mensuel : 950 €</li>
            <li>Revenu brut annuel : 11 400 €</li>
            <li>
              Coût total d'acquisition : 65 000 € + 6 000 € de frais de notaire
              = 71 000 €
            </li>
            <li>
              <strong>Rendement brut : 11 400 ÷ 71 000 × 100 = 16,1 %</strong>
            </li>
          </ul>
          <p>
            Le rendement brut est un filtre rapide pour comparer les biens.
            Visez 8 %+ en Hauts-de-France. En dessous de 6 %, l'investissement
            mérite un examen sérieux.
          </p>
        </>
      )}

      <h2 id="rendement-net">
        {isEn ? "Step 2: Net Yield" : "Étape 2 : Le rendement net"}
      </h2>
      {isEn ? (
        <>
          <p>
            <strong>Formula:</strong> ((Annual gross revenue − Annual costs) ÷
            Total acquisition cost) × 100
          </p>
          <p>Annual costs to include:</p>
          <ul>
            <li>
              <strong>Welqo management commission (20%):</strong> €2,280/year
            </li>
            <li>
              <strong>Property tax (taxe foncière):</strong> ~€600/year (Lens
              estimate)
            </li>
            <li>
              <strong>Co-ownership charges:</strong> ~€600/year
            </li>
            <li>
              <strong>PNO insurance (non-owner occupancy):</strong> ~€200/year
            </li>
            <li>
              <strong>Maintenance reserve (1% of value/year):</strong> ~€650/year
            </li>
            <li>
              <strong>Total annual costs:</strong> ~€4,330
            </li>
          </ul>
          <p>
            <strong>
              Net yield: (11,400 − 4,330) ÷ 71,000 × 100 = 9.9%
            </strong>
          </p>
          <p>
            A net yield above 7% in the Hauts-de-France market is excellent.
            For reference, long-term rental in the same area averages 4–5%
            net.
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>Formule :</strong> ((Revenus bruts annuels − Charges
            annuelles) ÷ Coût total d'acquisition) × 100
          </p>
          <p>Charges annuelles à inclure :</p>
          <ul>
            <li>
              <strong>Commission de gestion Welqo (20 %) :</strong> 2 280 €/an
            </li>
            <li>
              <strong>Taxe foncière :</strong> ~600 €/an (estimation Lens)
            </li>
            <li>
              <strong>Charges de copropriété :</strong> ~600 €/an
            </li>
            <li>
              <strong>Assurance PNO (propriétaire non-occupant) :</strong>{" "}
              ~200 €/an
            </li>
            <li>
              <strong>Provision maintenance (1 % de la valeur/an) :</strong>{" "}
              ~650 €/an
            </li>
            <li>
              <strong>Total charges annuelles :</strong> ~4 330 €
            </li>
          </ul>
          <p>
            <strong>
              Rendement net : (11 400 − 4 330) ÷ 71 000 × 100 = 9,9 %
            </strong>
          </p>
          <p>
            Un rendement net supérieur à 7 % sur le marché des Hauts-de-France
            est excellent. À titre de comparaison, la location longue durée sur
            le même secteur affiche en moyenne 4 à 5 % net.
          </p>
        </>
      )}

      <h2 id="cash-flow">
        {isEn ? "Step 3: Monthly Cash Flow" : "Étape 3 : Le cash-flow mensuel"}
      </h2>
      {isEn ? (
        <>
          <p>
            If you finance the purchase with a mortgage, cash flow is the
            indicator that matters most day-to-day.
          </p>
          <p>
            <strong>Formula:</strong> Monthly gross revenue − Monthly costs −
            Monthly loan repayment
          </p>
          <p>
            <strong>Example (€71,000 financed at 3.5% over 20 years):</strong>
          </p>
          <ul>
            <li>Monthly gross revenue: €950</li>
            <li>Monthly costs: €4,330 ÷ 12 = €361</li>
            <li>Monthly loan repayment: ~€410</li>
            <li>
              <strong>Monthly cash flow: 950 − 361 − 410 = +€179</strong>
            </li>
          </ul>
          <p>
            A positive cash flow from day one is achievable in Hauts-de-France
            with the right property and professional management.
          </p>
        </>
      ) : (
        <>
          <p>
            Si vous financez l'achat à crédit, le cash-flow est l'indicateur
            qui compte le plus au quotidien.
          </p>
          <p>
            <strong>Formule :</strong> Revenus bruts mensuels − Charges
            mensuelles − Mensualité de crédit
          </p>
          <p>
            <strong>
              Exemple (71 000 € financés à 3,5 % sur 20 ans) :
            </strong>
          </p>
          <ul>
            <li>Revenu brut mensuel : 950 €</li>
            <li>Charges mensuelles : 4 330 € ÷ 12 = 361 €</li>
            <li>Mensualité de crédit : ~410 €</li>
            <li>
              <strong>Cash-flow mensuel : 950 − 361 − 410 = +179 €</strong>
            </li>
          </ul>
          <p>
            Un cash-flow positif dès la première année est atteignable en
            Hauts-de-France avec le bon bien et une gestion professionnelle.
          </p>
        </>
      )}

      <h2 id="erreurs-courantes">
        {isEn
          ? "3 Errors to Avoid in Your Calculations"
          : "3 erreurs à éviter dans vos calculs"}
      </h2>
      {isEn ? (
        <ol>
          <li>
            <strong>Using best-case revenue projections:</strong> Base your
            estimate on an occupancy rate of 65–70%, not 90%. Use low-season
            nightly rates, not event peaks.
          </li>
          <li>
            <strong>Forgetting income tax:</strong> Airbnb revenue is taxable.
            Under the micro-BIC regime (recommended for revenues below
            €77,700/year), 50% of gross revenue is tax-exempt. Factor in your
            marginal rate on the remaining 50%.
          </li>
          <li>
            <strong>Excluding refurbishment costs from the yield:</strong> If
            you spend €10,000 renovating the property, add that to your
            acquisition cost before calculating the yield.
          </li>
        </ol>
      ) : (
        <ol>
          <li>
            <strong>Utiliser des projections de revenus optimistes :</strong>{" "}
            Basez votre estimation sur un taux d'occupation de 65 à 70 %, pas
            90 %. Utilisez les tarifs hors événement, pas les pics.
          </li>
          <li>
            <strong>Oublier la fiscalité :</strong> Les revenus Airbnb sont
            imposables. Sous le régime micro-BIC (recommandé pour des revenus
            inférieurs à 77 700 €/an), 50 % du revenu brut est exonéré. Tenez
            compte de votre taux marginal sur les 50 % restants.
          </li>
          <li>
            <strong>
              Exclure les travaux de rénovation du calcul de rendement :
            </strong>{" "}
            Si vous dépensez 10 000 € en rénovation, ajoutez-les à votre coût
            d'acquisition avant de calculer le rendement.
          </li>
        </ol>
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
