import React from "react";

const VILLES = [
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
    profil: "Touristes culturels, voyageurs d'affaires, tourisme mémoriel",
    atout: "Grand-Place classée + tourisme de la Grande Guerre très stable",
    investissement: "1 600–2 600 €/m²",
  },
];

const CALENDRIER_LENS = [
  { mois: "Août–Mai", evenement: "Saison RC Lens (Ligue 1)", impact: "Très fort", couleur: "text-red-500" },
  { mois: "Permanent", evenement: "Louvre-Lens (900 000 vis./an)", impact: "Fort", couleur: "text-orange-500" },
  { mois: "Juil.–Août", evenement: "Été / Braderie du Bassin Minier", impact: "Moyen", couleur: "text-yellow-500" },
  { mois: "Nov.–Jan.", evenement: "Marchés de Noël & fêtes", impact: "Moyen", couleur: "text-yellow-500" },
];

export function ArticleConciergerieLensArras({ locale }: { locale: string }) {
  const isFr = locale !== "en";

  return (
    <div>
      {/* ── INTRO ── */}
      <p>
        Lens et Arras ne font pas la une des grands guides touristiques. Et c'est précisément
        pour ça qu'elles représentent une opportunité en or pour les propriétaires Airbnb en 2025.
        Pendant que le marché lillois se sature, le Bassin Minier attire chaque année davantage
        de visiteurs — grâce au Louvre-Lens, aux matchs du RC Lens en Ligue 1 et au tourisme
        de mémoire de la Grande Guerre.
      </p>
      <p>
        Résultat : une demande locative saisonnière forte, des prix d'acquisition encore accessibles
        et une concurrence Airbnb encore limitée. Un cocktail idéal pour des rendements nets élevés
        — à condition de bien gérer son annonce.
      </p>

      {/* ── LOUVRE-LENS ── */}
      <h2 id="louvre-lens">L'effet Louvre-Lens : 900 000 visiteurs par an</h2>
      <p>
        Depuis son ouverture en 2012, le Louvre-Lens a complètement transformé l'image de la ville.
        En 2024, le musée a accueilli plus de <strong>900 000 visiteurs</strong>, dont une majorité
        vient de Belgique, des Pays-Bas et d'Allemagne. Ces voyageurs étrangers cherchent un
        hébergement à proximité — et Airbnb est leur premier réflexe.
      </p>
      <p>
        Le musée programme régulièrement des expositions temporaires blockbusters qui génèrent des
        pics de demande prévisibles. Pour un propriétaire bien conseillé, ces dates sont une
        opportunité de multiplier les tarifs par 2 à 3.
      </p>

      {/* Calendrier */}
      <div className="my-6 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden not-prose">
        <div className="bg-slate-50 dark:bg-slate-900 px-5 py-3 border-b border-slate-200 dark:border-white/10">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Calendrier de demande — Lens
          </p>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {CALENDRIER_LENS.map((row) => (
            <div key={row.evenement} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{row.evenement}</p>
                <p className="text-[11px] text-slate-500 font-medium">{row.mois}</p>
              </div>
              <span className={`text-xs font-bold ${row.couleur}`}>{row.impact}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RC LENS MATCHS ── */}
      <h2 id="rc-lens-matchs">RC Lens : les nuits de match, une mine d'or</h2>
      <p>
        Le RC Lens joue en Ligue 1 devant un stade Bollaert-Delelis régulièrement à guichet fermé
        (38 000 places). Chaque week-end de match à domicile génère une demande d'hébergement
        colossale — les hôtels de Lens affichent complet des semaines à l'avance.
      </p>
      <p>
        Les propriétaires Airbnb qui pratiquent la <strong>tarification dynamique</strong> lors de
        ces nuits facturent entre 150 € et 250 € la nuit pour un appartement standard, contre
        70–90 € hors événement. Sur une saison (19 matchs à domicile), cela représente plusieurs
        milliers d'euros de revenus supplémentaires.
      </p>

      <blockquote>
        <strong>Conseil Welqo :</strong> ne bloquez jamais vos dates manuellement autour des matchs.
        Laissez votre outil de tarification dynamique ajuster automatiquement — les prix montent
        dès l'annonce du calendrier officiel, parfois 4 à 6 semaines à l'avance.
      </blockquote>

      {/* ── LENS VS ARRAS ── */}
      <h2 id="lens-vs-arras">Lens vs Arras : quelle ville choisir pour investir ?</h2>
      <p>
        Les deux villes ont des profils complémentaires. Lens offre des pics de demande plus
        violents (matchs, expos) mais une demande de fond plus volatile. Arras est plus stable,
        portée par un tourisme culturel mature (Grand-Place baroque, Cité souterraine, tourisme
        de la Grande Guerre) et une clientèle professionnelle liée aux institutions régionales.
      </p>

      {/* Tableau comparatif */}
      <div className="my-6 not-prose space-y-4">
        {VILLES.map((v) => (
          <div
            key={v.name}
            className="rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className={`${v.accentBg} px-5 py-3`}>
              <p className="text-sm font-bold text-white">{v.name}</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-white/5 bg-white dark:bg-slate-900/50">
              <div className="px-4 py-3 text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">{v.prixMoyen}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Prix / nuit</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">{v.tauxOcc}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Taux occ.</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">{v.revenuMois}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Revenu / mois</p>
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/30 space-y-1">
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">Profil voyageur :</span>{" "}
                {v.profil}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">Atout principal :</span>{" "}
                {v.atout}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">Prix acquisition :</span>{" "}
                {v.investissement}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── RENTABILITE ── */}
      <h2 id="rentabilite">Rentabilité estimée 2025</h2>
      <p>
        Pour un appartement de 40 m² bien placé à Lens (à 10 min du Louvre-Lens et de Bollaert),
        voici une simulation réaliste basée sur les données du marché :
      </p>

      <div className="my-6 not-prose rounded-xl bg-slate-950 text-white p-6 border border-white/10">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 mb-4 uppercase">
          Simulation — T2 40m² à Lens (gestion Welqo)
        </p>
        <div className="space-y-3">
          {[
            { label: "Prix moyen / nuit (hors événement)", val: "78 €" },
            { label: "Prix moyen / nuit (match ou expo)", val: "185 €" },
            { label: "Nuits hors événement / mois", val: "14" },
            { label: "Nuits événement / mois (moy.)", val: "4" },
            { label: "Revenu brut mensuel estimé", val: "1 832 €", highlight: true },
            { label: "Commission Welqo (20%)", val: "−366 €" },
            { label: "Revenu net propriétaire", val: "1 466 €", highlight: true },
          ].map(({ label, val, highlight }) => (
            <div
              key={label}
              className={`flex justify-between items-center py-2 border-b border-white/5 last:border-0 ${
                highlight ? "text-white font-bold" : "text-slate-400 text-sm"
              }`}
            >
              <span>{label}</span>
              <span className={highlight ? "text-welqo-terracotta text-lg" : ""}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      <p>
        À titre de comparaison, un appartement similaire loué en location longue durée à Lens
        génère environ 500–600 €/mois. La différence de revenu net avec une gestion Airbnb
        professionnelle est donc de l'ordre de <strong>+140 % à +160 %</strong>.
      </p>

      {/* ── CONCIERGERIE ── */}
      <h2 id="conciergerie">Pourquoi une conciergerie est indispensable à Lens et Arras ?</h2>
      <p>
        Les marchés de Lens et Arras ont une caractéristique qui complique la gestion en solo :
        les <strong>arrivées tardives et les départs matinaux</strong> lors des matchs du soir.
        Un supporter qui arrive après le coup de sifflet final (23h) et repart le lendemain à 8h
        demande une réactivité que la plupart des propriétaires ne peuvent pas offrir à distance.
      </p>
      <p>
        La conciergerie Welqo dispose d'équipes locales à Lens et Arras pour gérer ces créneaux
        atypiques, assurer le ménage entre deux séjours successifs et maintenir la note moyenne
        de nos biens au-dessus de 4,8/5 — le seuil critique pour apparaître en tête des résultats
        Airbnb.
      </p>

      <h3>Ce que Welqo gère à votre place</h3>
      <ul>
        <li>Check-in/check-out flexible 7j/7, y compris nuits de match tardives</li>
        <li>Ménage professionnel garanti entre chaque séjour (délais serrés inclus)</li>
        <li>Tarification dynamique intégrant le calendrier RC Lens et les expos du Louvre-Lens</li>
        <li>Annonces optimisées sur Airbnb, Booking.com, Vrbo et Expedia</li>
        <li>Communication voyageurs 24/7 en français, anglais et néerlandais</li>
        <li>Dashboard propriétaire en temps réel avec rapport mensuel détaillé</li>
      </ul>

      {/* ── CONCLUSION ── */}
      <h2 id="conclusion">Conclusion</h2>
      <p>
        Lens et Arras représentent en 2025 l'une des meilleures opportunités de location courte
        durée dans le nord de la France. Des prix d'acquisition encore bas, des moteurs de demande
        puissants (sport, culture, patrimoine) et une concurrence Airbnb limitée — les ingrédients
        d'une rentabilité nette solide.
      </p>
      <p>
        La clé : une gestion professionnelle qui exploite intelligemment les pics d'événements
        et maintient une qualité d'accueil irréprochable. C'est exactement ce que propose Welqo
        avec son équipe locale dans le Bassin Minier.
      </p>
    </div>
  );
}
