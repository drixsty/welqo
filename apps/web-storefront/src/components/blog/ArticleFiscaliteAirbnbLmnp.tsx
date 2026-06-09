import React from "react";

interface Props {
  locale: string;
}

export function ArticleFiscaliteAirbnbLmnp({ locale }: Props) {
  const fr = locale !== "en";

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      {fr ? (
        <>
          <p className="lead">
            Vous louez votre bien sur Airbnb dans les Hauts-de-France et vous ne
            savez pas comment déclarer ces revenus ? LMNP, micro-BIC, régime
            réel… la fiscalité de la location meublée courte durée est souvent
            mal comprise — et sous-optimisée. Ce guide vous explique comment
            choisir le bon régime en 2025 pour payer le moins d'impôts
            légalement possible.
          </p>

          <h2 id="statut-lmnp">Le statut LMNP : la base</h2>
          <p>
            Dès que vous louez un bien meublé (Airbnb en fait partie par
            définition), vous êtes de plein droit{" "}
            <strong>Loueur Meublé Non Professionnel (LMNP)</strong> si vos
            revenus locatifs bruts n'excèdent pas 23 000 € par an OU
            représentent moins de 50 % de vos revenus totaux du foyer fiscal.
          </p>
          <p>
            Au-dessus de ces seuils, vous devenez{" "}
            <strong>LMP (Loueur Meublé Professionnel)</strong>, un statut avec
            d'autres règles (notamment la possibilité d'imputer les déficits sur
            le revenu global). La grande majorité des propriétaires Airbnb
            individuels restent en LMNP.
          </p>
          <p>
            Pour déclarer votre activité LMNP, vous devez vous immatriculer
            auprès de l'INPI (anciennement CFE) via le guichet unique des
            formalités. Cette démarche gratuite vous attribue un numéro SIRET.
            Welqo vous accompagne dans cette démarche lors de l'onboarding.
          </p>

          <h2 id="micro-bic">Le régime micro-BIC : simple mais limité</h2>
          <p>
            Le micro-BIC s'applique automatiquement si vos revenus bruts de
            location meublée sont inférieurs à 77 700 € par an (plafond 2025).
            Il fonctionne avec un abattement forfaitaire sur les revenus bruts :
          </p>
          <ul>
            <li>
              <strong>50 % d'abattement</strong> pour les meublés classiques
              (Airbnb standard)
            </li>
            <li>
              <strong>71 % d'abattement</strong> si votre bien est classé
              "meublé de tourisme" par la préfecture
            </li>
          </ul>
          <p>
            Exemple : 15 000 € de revenus bruts Airbnb en micro-BIC standard →
            base imposable = 7 500 € → impôt ≈ 1 500 à 2 250 € selon votre
            tranche (20 à 30 %). C'est simple, mais vous ne pouvez déduire
            aucune charge réelle.
          </p>
          <p>
            <strong>Quand choisir le micro-BIC ?</strong> Si votre bien est
            remboursé (pas d'emprunt) et que vos charges réelles sont
            inférieures à 50 % des revenus bruts. Pour la plupart des
            propriétaires avec un crédit en cours, le régime réel est nettement
            plus avantageux.
          </p>
          <p>
            <strong>Important :</strong> La loi de finances 2025 a modifié
            l'abattement pour les meublés classés, le ramenant temporairement à
            50 % dans certains cas selon la zone. Vérifiez la situation exacte
            de votre bien avec votre expert-comptable.
          </p>

          <h2 id="regime-reel">
            Le régime réel LMNP : la puissance de l'amortissement
          </h2>
          <p>
            Le régime réel est le saint Graal de la fiscalité LMNP. Il vous
            permet de déduire <strong>toutes les charges réelles</strong> et
            surtout d'amortir le bien immobilier, le mobilier et les travaux sur
            plusieurs années.
          </p>

          <h3>Les charges déductibles en régime réel</h3>
          <ul>
            <li>Intérêts d'emprunt et frais bancaires</li>
            <li>Taxe foncière</li>
            <li>Charges de copropriété (hors travaux en capital)</li>
            <li>Assurance PNO (propriétaire non occupant)</li>
            <li>Frais de comptabilité (expert-comptable)</li>
            <li>Commission de conciergerie Welqo (20 %)</li>
            <li>Frais de plateforme Airbnb (3 %)</li>
            <li>Électricité, internet si en charge du propriétaire</li>
            <li>Frais de ménage, linge, petites réparations</li>
          </ul>

          <h3>L'amortissement : l'arme secrète du LMNP</h3>
          <p>
            C'est là que le régime réel devient très puissant. Vous pouvez
            amortir :
          </p>
          <ul>
            <li>
              <strong>Le bien immobilier</strong> (hors terrain) : sur 25 à 40
              ans selon les composantes. Un bien acheté 200 000 € (dont 50 000 €
              de terrain non amortissable) génère 6 000 €/an d'amortissement sur
              25 ans.
            </li>
            <li>
              <strong>Le mobilier et équipements</strong> : sur 5 à 10 ans. Un
              T2 entièrement équipé pour Airbnb (~8 000 €) génère 1 600 €/an
              d'amortissement sur 5 ans.
            </li>
            <li>
              <strong>Les travaux</strong> : selon leur nature (entretien =
              charges, amélioration = amortissement sur 10-15 ans)
            </li>
          </ul>
          <p>
            Concrètement : un T2 à Lille acheté 220 000 €, loué 18 000 €/an
            bruts sur Airbnb, avec 6 000 € de charges réelles et 6 000 €
            d'amortissement annuel → résultat fiscal = 18 000 - 6 000 - 6 000 =
            6 000 € → impôt ≈ 1 200 à 1 800 €. Sans l'amortissement en
            micro-BIC, l'impôt serait de 1 800 à 2 700 €. Et pendant les
            premières années si le crédit est important, le résultat peut être
            déficitaire (déficit reportable sur les exercices suivants, sans
            limite dans le temps).
          </p>

          <h2 id="comparaison">Tableau comparatif micro-BIC vs régime réel</h2>
          <p>
            Sur la base d'un bien générant 18 000 € bruts/an avec 7 000 € de
            charges réelles + 5 000 € d'amortissement :
          </p>
          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="text-left p-3 font-bold border border-slate-200 dark:border-slate-700">
                    Critère
                  </th>
                  <th className="text-left p-3 font-bold border border-slate-200 dark:border-slate-700">
                    Micro-BIC (50 %)
                  </th>
                  <th className="text-left p-3 font-bold border border-slate-200 dark:border-slate-700">
                    Régime réel LMNP
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    Revenus bruts
                  </td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    18 000 €
                  </td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    18 000 €
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    Abattement / charges déductibles
                  </td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    - 9 000 € (50 %)
                  </td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    - 7 000 € charges + 5 000 € amortissement
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    Base imposable
                  </td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    9 000 €
                  </td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">
                    6 000 €
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    Impôt estimé (tranche 30 %)
                  </td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700">
                    ~2 700 €
                  </td>
                  <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">
                    ~1 800 €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="optimiser-fiscalite">
            Comment optimiser sa fiscalité Airbnb en pratique
          </h2>

          <h3>
            1. Faites faire le calcul par un expert-comptable spécialisé LMNP
          </h3>
          <p>
            La décision micro-BIC vs régime réel dépend de votre situation
            personnelle : tranche d'imposition, montant du crédit, charges
            réelles, projets de travaux. Un expert-comptable spécialisé LMNP
            coûte entre 500 et 1 000 €/an — et l'économie fiscale qu'il génère
            est systématiquement supérieure à ses honoraires. Ces honoraires
            sont eux-mêmes déductibles en régime réel.
          </p>

          <h3>2. Classez votre meublé en "meublé de tourisme"</h3>
          <p>
            Le classement officiel (1 à 5 étoiles, délivré par un organisme
            accrédité) vous permet de bénéficier de l'abattement de 71 % en
            micro-BIC au lieu de 50 %. La procédure coûte entre 150 et 300 € et
            est valable 5 ans. Welqo peut vous orienter vers un organisme agréé.
          </p>

          <h3>3. Passez au régime réel dès que votre crédit est important</h3>
          <p>
            Si vous avez contracté un emprunt immobilier de 150 000 € ou plus
            avec des mensualités significatives, le régime réel est presque
            toujours plus avantageux. Les intérêts d'emprunt seuls peuvent
            représenter 3 000 à 6 000 €/an de charges déductibles.
          </p>

          <h3>4. Gérez vos amortissements sur le long terme</h3>
          <p>
            L'amortissement LMNP n'est pas perdu en cas de vente. La plus-value
            en cas de revente est calculée sur le prix d'achat initial (non sur
            la valeur nette comptable après amortissement). C'est un avantage
            unique du LMNP par rapport à d'autres statuts.
          </p>

          <div className="not-prose mt-10 p-6 bg-welqo-terracotta/5 border border-welqo-terracotta/20 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Welqo gère votre Airbnb, vous optimisez votre fiscalité
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Notre commission de 20 % est intégralement déductible en régime
              réel LMNP. Maximisez vos revenus et minimisez vos impôts.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/proprietaires"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-welqo-terracotta text-white rounded-lg text-sm font-bold hover:bg-welqo-terracotta/90 transition-colors"
              >
                Confier mon Airbnb à Welqo →
              </a>
              <a
                href="/tarifs"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Voir nos tarifs →
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="lead">
            You rent your property on Airbnb in Hauts-de-France and don't know
            how to declare this income? LMNP, Micro-BIC, real income regime…
            furnished short-term rental taxation is often misunderstood — and
            under-optimised. This guide explains how to choose the right regime
            in 2025 to pay the least tax legally possible.
          </p>

          <h2 id="statut-lmnp">LMNP status: the basics</h2>
          <p>
            As soon as you rent a furnished property (Airbnb qualifies by
            definition), you automatically fall under{" "}
            <strong>LMNP (non-professional furnished lessor)</strong> status if
            your gross rental income doesn't exceed €23,000/year OR represents
            less than 50% of your household's total income. Above these
            thresholds you become LMP (professional furnished lessor).
          </p>

          <h2 id="micro-bic">Micro-BIC regime: simple but limited</h2>
          <p>
            Micro-BIC applies automatically if gross furnished rental income is
            below €77,700/year. It provides a flat 50% deduction (or 71% for
            officially classified tourist rentals). Simple, but no actual
            expenses can be deducted — making it suboptimal for properties with
            significant mortgage interest.
          </p>

          <h2 id="regime-reel">
            Real income LMNP regime: the power of depreciation
          </h2>
          <p>
            The real income regime allows you to deduct all actual expenses AND
            depreciate the building (over 25–40 years), furniture (5–10 years),
            and renovation works. A property bought at €200,000 generates
            ~€6,000/year in depreciation alone — often bringing taxable income
            to zero for many years.
          </p>

          <h2 id="comparaison">Comparison: Micro-BIC vs real income LMNP</h2>
          <p>
            On €18,000 gross annual revenue with €7,000 real expenses + €5,000
            depreciation: Micro-BIC base = €9,000 (tax ~€2,700 at 30%). Real
            income base = €6,000 (tax ~€1,800). Real income wins clearly once
            mortgage and depreciation are factored in.
          </p>

          <h2 id="optimiser-fiscalite">
            How to optimise your Airbnb tax position
          </h2>
          <p>
            Work with a LMNP-specialist accountant (fees €500–€1,000/year, fully
            deductible under real income), obtain official tourist rental
            classification for the 71% Micro-BIC deduction, and switch to the
            real income regime as soon as your mortgage interest is significant.
            Welqo's 20% commission is fully deductible under the real income
            regime.
          </p>

          <div className="not-prose mt-10 p-6 bg-welqo-terracotta/5 border border-welqo-terracotta/20 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Welqo manages your Airbnb, you optimise your tax position
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Our 20% commission is fully deductible under the real LMNP regime.
              Maximise your income and minimise your taxes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/en/proprietaires"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-welqo-terracotta text-white rounded-lg text-sm font-bold hover:bg-welqo-terracotta/90 transition-colors"
              >
                Hand over my Airbnb to Welqo →
              </a>
              <a
                href="/en/tarifs"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                View our pricing →
              </a>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
