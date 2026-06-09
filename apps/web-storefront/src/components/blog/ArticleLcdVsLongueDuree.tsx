import React from "react";

interface Props {
  locale: string;
}

export function ArticleLcdVsLongueDuree({ locale }: Props) {
  const fr = locale !== "en";

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      {fr ? (
        <>
          <p className="lead">
            Vous possédez un bien dans les Hauts-de-France et vous hésitez entre le louer sur Airbnb ou signer un bail longue durée classique ? C'est l'une des questions les plus fréquentes que nous recevons chez Welqo. La réponse dépend de votre profil, de l'emplacement et de votre appétit pour la gestion. Ce guide vous donne les clés pour choisir en connaissance de cause.
          </p>

          <h2 id="lcd-avantages">Les avantages de la location courte durée (Airbnb)</h2>

          <h3>Des revenus significativement plus élevés</h3>
          <p>
            C'est l'argument numéro un. Dans les Hauts-de-France, un bien bien géré en courte durée génère en moyenne 40 à 80 % de revenus supplémentaires par rapport à une location nue classique. À Lille, un T2 de 45 m² loué 700 € en longue durée peut rapporter 1 400 à 1 800 € bruts en courte durée sur Airbnb, selon la localisation et la saison.
          </p>
          <p>
            Cette différence s'explique par la tarification à la nuit : 60 à 95 € par nuit × 20 nuits d'occupation = 1 200 à 1 900 € bruts mensuels, contre un loyer plafonné par le marché local.
          </p>

          <h3>La flexibilité d'utilisation</h3>
          <p>
            En courte durée, vous restez maître de votre calendrier. Vous pouvez bloquer des dates pour y séjourner vous-même, laisser le logement à un proche, ou suspendre l'activité pendant des travaux. Cette flexibilité est impossible avec un locataire en place et un bail de 3 ans.
          </p>

          <h3>Zéro risque d'impayé structurel</h3>
          <p>
            Sur Airbnb, le paiement est systématiquement encaissé avant l'arrivée du voyageur. Vous n'êtes jamais en attente d'un loyer. Contrairement à la longue durée où les procédures d'expulsion pour impayé peuvent durer 18 à 24 mois, le risque financier en courte durée est nul sur ce point.
          </p>

          <h3>La valorisation du bien</h3>
          <p>
            Un logement géré en courte durée est régulièrement entretenu, nettoyé après chaque séjour et réparé rapidement en cas de problème. À long terme, l'état général du bien se maintient mieux qu'avec un locataire longue durée qui l'occupe de façon intensive pendant 5 ou 10 ans.
          </p>

          <h2 id="ld-avantages">Les avantages de la location longue durée</h2>

          <h3>La simplicité de gestion</h3>
          <p>
            Un locataire, un bail, un virement mensuel. La location longue durée demande très peu d'implication au quotidien : pas de rotation de voyageurs, pas de ménage à organiser, pas d'annonces à optimiser. Pour un propriétaire qui ne veut pas s'impliquer, c'est un modèle attractif.
          </p>

          <h3>Des revenus garantis et prévisibles</h3>
          <p>
            Le loyer tombe chaque mois. En courte durée, les revenus fluctuent selon la saison, les événements et le taux d'occupation. Si vous avez besoin d'un revenu régulier et certain pour rembourser un prêt immobilier, la longue durée offre plus de visibilité.
          </p>

          <h3>Moins de charges opérationnelles</h3>
          <p>
            Pas de frais de ménage, pas de linge de maison à renouveler, pas de kit d'accueil. Les charges en longue durée sont principalement les charges de copropriété, la taxe foncière et l'assurance PNO. En courte durée, il faut ajouter les frais de conciergerie (20 % chez Welqo), le ménage, le linge et les petites réparations.
          </p>

          <h3>Moins de contraintes réglementaires</h3>
          <p>
            La location longue durée ne nécessite pas de numéro d'enregistrement, pas de déclaration spécifique en mairie (pour une résidence secondaire), et ne tombe pas sous la limite des 120 jours annuels pour une résidence principale. C'est un modèle plus simple sur le plan administratif.
          </p>

          <h2 id="comparaison-fiscale">Comparaison fiscale : LMNP vs location nue</h2>
          <p>
            La fiscalité est un point crucial souvent mal compris. En location courte durée meublée, vous bénéficiez du statut <strong>LMNP (Loueur Meublé Non Professionnel)</strong>, qui offre des avantages considérables :
          </p>
          <ul>
            <li><strong>Micro-BIC :</strong> abattement forfaitaire de 50 % sur les revenus bruts (ou 71 % si vous êtes classé "meublé de tourisme")</li>
            <li><strong>Régime réel :</strong> déduction de toutes les charges réelles + amortissement du bien sur 20 à 30 ans, ce qui peut ramener l'imposition à zéro ou quasi-zéro pendant plusieurs années</li>
          </ul>
          <p>
            En location nue longue durée, les revenus fonciers sont imposés au barème progressif de l'IR après déduction des charges réelles (régime réel) ou avec un abattement de 30 % (micro-foncier). Le régime réel LMNP est généralement plus favorable pour un bien amorti.
          </p>
          <p>
            Exemple concret : un bien acheté 180 000 € génère 18 000 € bruts/an en courte durée. Après amortissement en régime réel LMNP, le résultat imposable peut être nul pendant 15 à 20 ans.
          </p>

          <h2 id="cas-pratiques">Cas pratiques dans les Hauts-de-France</h2>

          <h3>Cas 1 — T2 centre-ville Lille</h3>
          <p>
            Loyer longue durée : 700 €/mois = 8 400 €/an bruts.<br />
            Revenu Airbnb (taux 78 %, 95 €/nuit) : ~1 820 €/mois = 21 840 €/an bruts.<br />
            Après commission Welqo (20 %) : 17 472 €/an nets de gestion.<br />
            <strong>Gain net vs longue durée : +109 %</strong>
          </p>

          <h3>Cas 2 — Studio secteur gare Arras</h3>
          <p>
            Loyer longue durée : 450 €/mois = 5 400 €/an.<br />
            Revenu Airbnb (taux 65 %, 70 €/nuit) : ~1 365 €/mois = 16 380 €/an bruts.<br />
            Après commission Welqo (20 %) : 13 104 €/an nets de gestion.<br />
            <strong>Gain net vs longue durée : +143 %</strong>
          </p>

          <h3>Cas 3 — Appartement résidence secondaire Lens (jours de match)</h3>
          <p>
            La saisonnalité forte (RC Lens = 17 matchs à domicile/saison, Louvre-Lens, etc.) justifie pleinement la courte durée. Même à Lens où les loyers longue durée restent modestes (500–600 €/mois pour un T2), la courte durée multiplie les revenus par 1,5 à 2.
          </p>

          <h2 id="notre-recommandation">Notre recommandation</h2>
          <p>
            La courte durée est le bon choix si votre bien est situé dans une zone touristique ou d'affaires, si vous pouvez déléguer la gestion à un professionnel, et si vous êtes en régime LMNP réel. Le gain est systématiquement supérieur de 40 à 100 % par rapport à la longue durée.
          </p>
          <p>
            La longue durée reste pertinente si votre bien est dans une zone peu touristique, si vous souhaitez zéro implication, ou si vous êtes dans une copropriété dont le règlement interdit la location touristique.
          </p>
          <p>
            Chez Welqo, nous pouvons simuler vos revenus potentiels en courte durée avant tout engagement. Si la simulation montre que la courte durée n'est pas pertinente pour votre bien, nous vous le dirons franchement.
          </p>

          <div className="not-prose mt-10 p-6 bg-welqo-terracotta/5 border border-welqo-terracotta/20 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Simulez vos revenus avec Welqo
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Entrez l'adresse de votre bien et obtenez une estimation gratuite de vos revenus Airbnb potentiels dans les Hauts-de-France.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/calculateur-rentabilite-airbnb"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-welqo-terracotta text-white rounded-lg text-sm font-bold hover:bg-welqo-terracotta/90 transition-colors"
              >
                Simulateur de revenus →
              </a>
              <a
                href="/proprietaires"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Devis gratuit →
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="lead">
            You own a property in Hauts-de-France and are torn between listing it on Airbnb or signing a traditional long-term lease? This is one of the most common questions we receive at Welqo. The answer depends on your profile, location and appetite for management. This guide gives you the tools to make an informed choice.
          </p>

          <h2 id="lcd-avantages">Advantages of short-term rental (Airbnb)</h2>
          <p>
            A well-managed short-term rental in Hauts-de-France generates on average 40–80% more revenue than a traditional unfurnished long-term lease. In Lille, a 45 m² one-bedroom rented at €700/month long-term can earn €1,400–€1,800 gross per month on Airbnb. Flexibility, no payment risk, and better property upkeep are additional advantages.
          </p>

          <h2 id="ld-avantages">Advantages of long-term rental</h2>
          <p>
            One tenant, one lease, one monthly transfer. Long-term rental requires minimal day-to-day involvement, offers predictable income for loan repayments, lower operating costs, and fewer administrative constraints.
          </p>

          <h2 id="comparaison-fiscale">Tax comparison: LMNP vs unfurnished rental</h2>
          <p>
            Short-term furnished rental qualifies for LMNP status (non-professional furnished lessor), offering either a 50% flat-rate deduction (Micro-BIC) or full cost deduction plus property depreciation over 20–30 years under the real income regime — potentially reducing taxable income to zero for many years.
          </p>

          <h2 id="cas-pratiques">Practical examples in Hauts-de-France</h2>
          <p>
            A central Lille one-bedroom generating €8,400/year long-term can earn €17,472/year net of Welqo's commission via Airbnb — a <strong>+109% gain</strong>. An Arras studio shows a <strong>+143% gain</strong> on comparable numbers.
          </p>

          <h2 id="notre-recommandation">Our recommendation</h2>
          <p>
            Short-term rental is the right choice if your property is in a tourist or business area, you can delegate management to a professional, and you are under the real LMNP regime. Welqo can simulate your potential short-term revenues before any commitment — if the numbers don't stack up, we'll tell you honestly.
          </p>

          <div className="not-prose mt-10 p-6 bg-welqo-terracotta/5 border border-welqo-terracotta/20 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Simulate your revenue with Welqo
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Enter your property address and get a free estimate of your potential Airbnb revenue in Hauts-de-France.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/en/calculateur-rentabilite-airbnb"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-welqo-terracotta text-white rounded-lg text-sm font-bold hover:bg-welqo-terracotta/90 transition-colors"
              >
                Revenue simulator →
              </a>
              <a
                href="/en/proprietaires"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Free quote →
              </a>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
