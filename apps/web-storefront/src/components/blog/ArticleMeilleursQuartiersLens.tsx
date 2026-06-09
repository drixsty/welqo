import React from "react";

const QUARTIERS_FR = [
  {
    rank: "01",
    name: "Avion",
    revenue: "1 050 €",
    occ: "75 %",
    prix: "75 €",
    desc: "Mitoyenne du Stade Bollaert, Avion est le meilleur secteur les nuits de match. En dehors des matchs, la demande reste correcte grâce à sa proximité immédiate avec Lens.",
    tips: "Privilégiez les T2 proches du stade. Les week-ends de Ligue 1, les tarifs peuvent tripler.",
  },
  {
    rank: "02",
    name: "Centre-Ville Lens",
    revenue: "980 €",
    occ: "73 %",
    prix: "68 €",
    desc: "Le centre-ville de Lens offre la meilleure performance annuelle : à pied du Louvre-Lens, de la gare et des restaurants. Idéal pour les visiteurs culturels et professionnels.",
    tips: "Les T2 bien rénovés avec une cuisine équipée surperforment. Misez sur la modernité.",
  },
  {
    rank: "03",
    name: "Liévin",
    revenue: "890 €",
    occ: "70 %",
    prix: "62 €",
    desc: "Commune dynamique à 5 minutes de Lens, Liévin offre des prix d'acquisition plus bas et une demande stable. La présence d'une salle de concerts (Stade Couvert) génère des pics ponctuels.",
    tips: "Excellent rapport qualité/prix pour un premier investissement. Prix au m² 10-15 % moins cher qu'à Lens.",
  },
  {
    rank: "04",
    name: "Loos-en-Gohelle",
    revenue: "820 €",
    occ: "66 %",
    prix: "58 €",
    desc: "Les terrils jumeaux classés UNESCO font de Loos un site touristique singulier. La clientèle éco-tourisme et mémoire est en croissance, notamment la clientèle belge et néerlandaise.",
    tips: "Nichez-vous sur le créneau patrimoine industriel avec une déco thématique. Différenciation garantie.",
  },
  {
    rank: "05",
    name: "Harnes",
    revenue: "750 €",
    occ: "63 %",
    prix: "54 €",
    desc: "Secteur résidentiel plus calme, Harnes attire surtout les travailleurs en déplacement et les familles cherchant un logement fonctionnel. Bonnes bases pour un rendement stable.",
    tips: "Ciblez les séjours d'une semaine ou plus. Les contrats professionnels long-séjour sont un filon.",
  },
];

const QUARTIERS_EN = [
  {
    rank: "01",
    name: "Avion",
    revenue: "€1,050",
    occ: "75%",
    prix: "€75",
    desc: "Adjacent to Stade Bollaert, Avion is the top area on match nights. Outside matches, demand remains solid thanks to its immediate proximity to Lens.",
    tips: "Focus on 1-bedroom apartments close to the stadium. On Ligue 1 weekends, rates can triple.",
  },
  {
    rank: "02",
    name: "Lens City Centre",
    revenue: "€980",
    occ: "73%",
    prix: "€68",
    desc: "Lens city centre offers the best year-round performance: walkable to Louvre-Lens, the train station and restaurants. Ideal for cultural visitors and business travellers.",
    tips: "Well-renovated 1-bedroom apartments with equipped kitchens outperform. Focus on modern aesthetics.",
  },
  {
    rank: "03",
    name: "Liévin",
    revenue: "€890",
    occ: "70%",
    prix: "€62",
    desc: "A dynamic town 5 minutes from Lens, Liévin offers lower acquisition prices and stable demand. The indoor athletics arena generates occasional peaks.",
    tips: "Excellent value for a first investment. Price per sqm 10–15% lower than central Lens.",
  },
  {
    rank: "04",
    name: "Loos-en-Gohelle",
    revenue: "€820",
    occ: "66%",
    prix: "€58",
    desc: "The twin UNESCO slag heaps make Loos a distinctive tourist site. Eco-tourism and heritage visitors are growing, particularly Belgian and Dutch guests.",
    tips: "Lean into industrial heritage with a themed décor. Guaranteed differentiation.",
  },
  {
    rank: "05",
    name: "Harnes",
    revenue: "€750",
    occ: "63%",
    prix: "€54",
    desc: "A quieter residential area, Harnes mainly attracts business travellers and families looking for practical accommodation. Good foundation for stable returns.",
    tips: "Target weekly and longer stays. Professional long-stay contracts are a goldmine.",
  },
];

export function ArticleMeilleursQuartiersLens({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const data = isEn ? QUARTIERS_EN : QUARTIERS_FR;

  return (
    <div>
      {isEn ? (
        <p>
          The Bassin Minier is not a uniform market. Between Avion (the Bollaert
          stadium neighbours), central Lens (Louvre-Lens visitors) and Liévin
          (first-time investors), each area has its own profile, demand drivers
          and return potential. Here is our detailed ranking.
        </p>
      ) : (
        <p>
          Le Bassin Minier n'est pas un marché homogène. Entre Avion (le voisin
          du Stade Bollaert), le centre de Lens (les visiteurs du Louvre-Lens) et
          Liévin (les primo-investisseurs), chaque secteur a son propre profil,
          ses moteurs de demande et son potentiel de rendement. Voici notre
          classement détaillé.
        </p>
      )}

      <h2 id="classement">
        {isEn
          ? "Ranking of Airbnb Neighbourhoods in Lens"
          : "Classement des quartiers Airbnb à Lens"}
      </h2>

      {data.map((q) => (
        <div key={q.rank} className="not-prose mb-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5">
          <div className="flex items-start gap-4">
            <span className="text-3xl font-black text-slate-200 dark:text-slate-700 leading-none shrink-0">
              {q.rank}
            </span>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                {q.name}
              </h3>
              <div className="flex flex-wrap gap-3 mb-3">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {q.revenue}
                  {isEn ? "/mo" : "/mois"}
                </span>
                <span className="text-xs font-bold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded">
                  {q.occ} {isEn ? "occ." : "occ."}
                </span>
                <span className="text-xs font-bold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded">
                  {q.prix}
                  {isEn ? "/night" : "/nuit"}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{q.desc}</p>
              <p className="text-xs font-bold text-welqo-terracotta">
                💡 {isEn ? "Expert tip:" : "Conseil expert :"} {q.tips}
              </p>
            </div>
          </div>
        </div>
      ))}

      <h2 id="choisir">
        {isEn
          ? "How to Choose Your Sector in Lens"
          : "Comment choisir votre secteur à Lens"}
      </h2>
      {isEn ? (
        <ul>
          <li>
            <strong>First investment, limited budget:</strong> Liévin or Harnes.
            Lower prices, stable returns, lower risk.
          </li>
          <li>
            <strong>Maximise revenue peaks:</strong> Avion. The highest match
            night rates but lower off-season occupancy.
          </li>
          <li>
            <strong>Best year-round balance:</strong> Lens city centre. Consistent
            performance across all seasons and visitor types.
          </li>
          <li>
            <strong>Differentiation and niche:</strong> Loos-en-Gohelle. Higher
            risk but potential for strong brand story around UNESCO heritage.
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <strong>Premier investissement, budget limité :</strong> Liévin ou
            Harnes. Prix plus bas, rendements stables, risque moindre.
          </li>
          <li>
            <strong>Maximiser les pics de revenus :</strong> Avion. Les tarifs
            les plus élevés les nuits de match mais occupation plus faible hors
            saison.
          </li>
          <li>
            <strong>Meilleur équilibre annuel :</strong> Centre-Ville Lens.
            Performance constante toutes saisons et tous profils de visiteurs.
          </li>
          <li>
            <strong>Différenciation et niche :</strong> Loos-en-Gohelle. Risque
            plus élevé mais potentiel de forte identité de marque autour du
            patrimoine UNESCO.
          </li>
        </ul>
      )}

      {/* ── CTA ── */}
      <div className="not-prose mt-8">
        <a
          href={isEn ? "/en/conciergerie-airbnb-lens" : "/conciergerie-airbnb-lens"}
          className="flex flex-col gap-2 p-5 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
        >
          <span className="text-xs font-bold text-welqo-terracotta tracking-wider">
            {isEn ? "Delegate your Lens Airbnb" : "Déléguez votre Airbnb à Lens"}
          </span>
          <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors">
            {isEn
              ? "Airbnb Concierge Lens — Welqo →"
              : "Conciergerie Airbnb Lens — Welqo →"}
          </span>
        </a>
      </div>
    </div>
  );
}
