import React from "react";

const DATA_QUARTIERS = [
  {
    name: "Vieux-Lille",
    revenuMensuel: 2100,
    tauxOccupation: 82,
    prixNuit: 135,
  },
  { name: "Wazemmes", revenuMensuel: 1650, tauxOccupation: 74, prixNuit: 105 },
  {
    name: "Euralille / Centre",
    revenuMensuel: 1900,
    tauxOccupation: 79,
    prixNuit: 120,
  },
  { name: "Moulins", revenuMensuel: 1350, tauxOccupation: 68, prixNuit: 88 },
  { name: "Vauban", revenuMensuel: 1480, tauxOccupation: 70, prixNuit: 95 },
];

const LEAD_STATS = [
  {
    val: "1 200 – 2 200 €",
    label: "Revenus bruts / mois",
    color: "text-blue-600",
  },
  {
    val: "+50–80 %",
    label: "vs location longue durée",
    color: "text-emerald-600",
  },
  { val: "4,9 / 5", label: "Note moyenne Welqo", color: "text-amber-500" },
];

export function ArticleCombienRapporteAirbnbLille({
  locale,
}: {
  locale: string;
}) {
  const base = `/${locale}`;

  return (
    <article className="space-y-0">
      {/* Lead stat cards */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {LEAD_STATS.map(({ val, label, color }) => (
          <div
            key={label}
            className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center"
          >
            <p
              className={`text-lg md:text-2xl font-black tracking-tight ${color}`}
            >
              {val}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Section 1 */}
      <h2
        id="revenus-moyens"
        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-10 mb-4 scroll-mt-28"
      >
        Les revenus moyens d'un Airbnb à Lille
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Un appartement bien situé et correctement optimisé à Lille génère en
        moyenne entre{" "}
        <strong className="text-slate-900 dark:text-white font-bold">
          1 200 € et 2 200 € de revenus bruts par mois
        </strong>
        , selon le quartier, la surface et la qualité de l'annonce. À titre de
        comparaison, une location longue durée du même bien rapporterait 700 à
        900 € / mois — soit un différentiel de{" "}
        <strong className="text-slate-900 dark:text-white font-bold">
          +50 à +80 %
        </strong>{" "}
        en faveur de la courte durée.
      </p>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        Ces chiffres s'entendent hors charges de gestion. Avec une conciergerie
        comme Welqo (commission de 15 à 20 %), le revenu net propriétaire reste
        significativement supérieur à celui d'une location meublée classique.
      </p>

      {/* Section 2 */}
      <h2
        id="par-quartier"
        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-12 mb-4 scroll-mt-28"
      >
        Revenus par quartier à Lille (données 2025)
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
        Les performances varient fortement selon la localisation. Le Vieux-Lille
        reste le quartier le plus rentable grâce à son attractivité touristique,
        tandis que des quartiers comme Wazemmes ou Vauban offrent un excellent
        rapport qualité/prix d'acquisition.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 dark:bg-slate-800 text-white">
              <th className="text-left px-5 py-3.5 font-black rounded-tl-2xl">
                Quartier
              </th>
              <th className="text-right px-5 py-3.5 font-black">
                Revenu brut / mois
              </th>
              <th className="text-right px-5 py-3.5 font-black hidden sm:table-cell">
                Taux d'occupation
              </th>
              <th className="text-right px-5 py-3.5 font-black rounded-tr-2xl">
                Prix / nuit
              </th>
            </tr>
          </thead>
          <tbody>
            {DATA_QUARTIERS.map((row, i) => (
              <tr
                key={row.name}
                className={`border-b border-slate-100 dark:border-slate-800 last:border-0 ${
                  i % 2 === 0
                    ? "bg-white dark:bg-slate-900"
                    : "bg-slate-50/50 dark:bg-slate-800/50"
                }`}
              >
                <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                  {row.name}
                </td>
                <td className="px-5 py-3.5 text-right font-black text-blue-600">
                  {row.revenuMensuel.toLocaleString("fr-FR")} €
                </td>
                <td className="px-5 py-3.5 text-right text-slate-500 hidden sm:table-cell">
                  {row.tauxOccupation} %
                </td>
                <td className="px-5 py-3.5 text-right text-slate-500">
                  {row.prixNuit} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-5 py-2.5 text-[11px] text-slate-400 italic bg-slate-50 dark:bg-slate-900 rounded-b-2xl">
          Source : Welqo / AirDNA — données moyennes T1 2025, appartements 2
          pièces.
        </p>
      </div>

      {/* Section 3 */}
      <h2
        id="facteurs"
        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-12 mb-4 scroll-mt-28"
      >
        Les facteurs qui influencent la rentabilité
      </h2>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
        1. La saisonnalité lilloise
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Contrairement à des villes balnéaires, Lille bénéficie d'un{" "}
        <strong className="text-slate-900 dark:text-white font-bold">
          flux de voyageurs d'affaires constant
        </strong>{" "}
        toute l'année grâce à Euratechnologies, la MEL et les grands comptes
        nordistes. Les pics de demande sont concentrés sur :
      </p>

      <ul className="space-y-3 mb-6">
        {[
          {
            event: "La Braderie de Lille",
            detail:
              "premier week-end de septembre — multiplie par 3 à 4 le prix de la nuit",
          },
          {
            event: "Les matchs du LOSC à domicile",
            detail: "pic de +40 % sur les nuits du vendredi et samedi",
          },
          {
            event: "Les salons de Lille Grand Palais",
            detail: "taux d'occupation proche de 95 %",
          },
          {
            event: "Les vacances scolaires Zone B",
            detail: "idéal pour les familles en transit vers la côte belge",
          },
        ].map(({ event, detail }) => (
          <li
            key={event}
            className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
            <span>
              <strong className="text-slate-900 dark:text-white font-bold">
                {event}
              </strong>{" "}
              — {detail}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
        2. La qualité de l'annonce
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
        Les annonces Airbnb avec des photos professionnelles et un titre
        optimisé obtiennent en moyenne{" "}
        <strong className="text-slate-900 dark:text-white font-bold">
          35 % de revenus supplémentaires
        </strong>{" "}
        par rapport aux annonces amateures, toutes choses égales par ailleurs.
        C'est l'un des premiers leviers d'optimisation que Welqo active lors de
        la prise en charge d'un nouveau bien.
      </p>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
        3. La réactivité et la note voyageurs
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        L'algorithme Airbnb favorise les hôtes avec un taux de réponse supérieur
        à 90 % et une note globale supérieure à 4,8/5. Les biens gérés par Welqo
        maintiennent une moyenne de{" "}
        <strong className="text-slate-900 dark:text-white font-bold">
          4,9/5
        </strong>{" "}
        grâce à notre protocole d'accueil et notre suivi qualité post-séjour.
      </p>

      {/* Callout */}
      <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">💡</span>
          <div>
            <p className="font-black text-emerald-800 dark:text-emerald-400 mb-1">
              Bon à savoir
            </p>
            <p className="text-emerald-700 dark:text-emerald-500 text-sm leading-relaxed">
              Les propriétaires qui confient leur bien à Welqo gagnent en
              moyenne <strong>38 % de revenus supplémentaires</strong> grâce à
              l'optimisation des annonces et la tarification dynamique.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <h2
        id="conciergerie"
        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-12 mb-4 scroll-mt-28"
      >
        Faut-il confier son bien à une conciergerie ?
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        La gestion en solo d'un Airbnb représente en moyenne{" "}
        <strong className="text-slate-900 dark:text-white font-bold">
          8 à 12 heures de travail par semaine
        </strong>{" "}
        : messages voyageurs, coordination ménage, check-in, suivi des avis,
        mise à jour des calendriers… Pour la majorité des propriétaires actifs,
        cette charge est incompatible avec une vie professionnelle normale.
      </p>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
        Une conciergerie comme Welqo prend en charge l'intégralité de ces tâches
        moyennant une commission de 15 à 20 % sur les revenus bruts. Compte tenu
        de l'optimisation des annonces et de la tarification dynamique, les
        propriétaires qui nous confient leur bien gagnent en moyenne{" "}
        <strong className="text-slate-900 dark:text-white font-bold">
          38 % de revenus supplémentaires
        </strong>{" "}
        — tout en récupérant leur temps libre.
      </p>

      {/* Section 5 */}
      <h2
        id="reglementation"
        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-12 mb-4 scroll-mt-28"
      >
        La réglementation Airbnb à Lille en 2025
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
        Avant de vous lancer, quelques points réglementaires à connaître pour
        Lille :
      </p>

      <ul className="space-y-4 mb-8">
        {[
          {
            title: "Déclaration en mairie obligatoire",
            desc: "Tout meublé de tourisme doit être déclaré auprès de la Ville de Lille (formulaire CERFA n°14004). Welqo prend en charge cette démarche pour vous.",
          },
          {
            title: "Taxe de séjour",
            desc: "Collectée et reversée automatiquement par Airbnb pour Lille. Aucune démarche supplémentaire pour le propriétaire.",
          },
          {
            title: "Changement d'usage",
            desc: "Si votre résidence principale représente moins de 120 jours de location annuelle, aucune autorisation n'est requise. Au-delà, une demande de changement d'usage est nécessaire.",
          },
          {
            title: "Copropriété",
            desc: "Vérifiez votre règlement de copropriété — certains immeubles lillois interdisent explicitement la location meublée touristique.",
          },
        ].map(({ title, desc }) => (
          <li
            key={title}
            className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800"
          >
            <div className="w-5 h-5 mt-0.5 rounded-full bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">
                {title}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Conclusion */}
      <h2
        id="conclusion"
        className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-12 mb-4 scroll-mt-28"
      >
        Conclusion : est-ce rentable de louer sur Airbnb à Lille ?
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        Oui — à condition d'optimiser votre annonce, votre tarification et votre
        gestion. Un appartement 2 pièces bien situé (Vieux-Lille, Euralille,
        Wazemmes) peut générer entre{" "}
        <strong className="text-slate-900 dark:text-white font-bold">
          15 000 € et 25 000 € de revenus bruts annuels
        </strong>
        , contre 8 000 à 10 000 € en location longue durée.
      </p>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        La clé pour maximiser ce potentiel sans y consacrer vos week-ends ?
        Déléguer la gestion à une conciergerie locale qui connaît le marché
        lillois.{" "}
        <a
          href={`${base}/proprietaires`}
          className="text-blue-600 font-bold hover:underline"
        >
          Découvrez comment Welqo gère votre bien à Lille →
        </a>
      </p>
    </article>
  );
}
