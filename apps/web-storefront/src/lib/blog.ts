export interface BlogPost {
  slug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  category: string;
  keywordsFr: string[];
  keywordsEn: string[];
  coverImage: string;
  coverImageAlt: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "combien-rapporte-airbnb-lille-2025",
    titleFr: "Combien rapporte un Airbnb à Lille en 2025 ? (Étude de marché)",
    titleEn: "How Much Does an Airbnb in Lille Earn in 2025? (Market Study)",
    descriptionFr:
      "Revenus moyens, taux d'occupation, saisonnalité, quartiers les plus rentables… Tout ce que vous devez savoir avant de louer votre appartement à Lille sur Airbnb.",
    descriptionEn:
      "Average revenue, occupancy rates, seasonality, most profitable neighbourhoods — everything you need to know before listing your Lille property on Airbnb.",
    publishedAt: "2025-02-15",
    updatedAt: "2025-05-08",
    readingMinutes: 8,
    category: "Rentabilité",
    keywordsFr: [
      "combien rapporte airbnb lille",
      "revenus airbnb lille",
      "rentabilité airbnb lille",
      "taux occupation airbnb lille 2025",
    ],
    keywordsEn: ["airbnb income lille", "airbnb revenue lille 2025"],
    coverImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Appartement Airbnb à Lille — Welqo Conciergerie",
  },
  {
    slug: "checklist-lancer-airbnb-lille",
    titleFr: "La checklist complète pour lancer son Airbnb à Lille en 2025",
    titleEn: "The Complete Checklist to Launch Your Airbnb in Lille in 2025",
    descriptionFr:
      "Réglementation, équipements obligatoires, photos, prix d'entrée… Le guide pas-à-pas pour mettre votre bien en location courte durée à Lille sans stress.",
    descriptionEn:
      "Regulations, required equipment, photos, pricing — the step-by-step guide to list your Lille property on short-term rental platforms, stress-free.",
    publishedAt: "2025-03-10",
    readingMinutes: 6,
    category: "Guide",
    keywordsFr: [
      "lancer airbnb lille",
      "ouvrir location courte durée lille",
      "réglementation airbnb lille",
    ],
    keywordsEn: ["start airbnb lille", "airbnb regulations lille"],
    coverImage:
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Checklist pour lancer un Airbnb à Lille",
  },
  {
    slug: "meilleurs-quartiers-airbnb-lille",
    titleFr: "Les 5 meilleurs quartiers pour louer sur Airbnb à Lille",
    titleEn: "The 5 Best Neighbourhoods for Airbnb in Lille",
    descriptionFr:
      "Vieux-Lille, Wazemmes, Euralille, Moulins… Quel quartier offre le meilleur retour sur investissement pour une location courte durée ? Analyse et comparatif.",
    descriptionEn:
      "Vieux-Lille, Wazemmes, Euralille, Moulins — which neighbourhood delivers the best ROI for short-term rental? Analysis and comparison.",
    publishedAt: "2025-04-02",
    readingMinutes: 5,
    category: "Stratégie",
    keywordsFr: [
      "meilleur quartier airbnb lille",
      "où louer airbnb lille",
      "vieux-lille airbnb rentabilité",
    ],
    keywordsEn: ["best neighbourhood airbnb lille", "where to airbnb in lille"],
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Vue sur Lille — meilleurs quartiers Airbnb",
  },
  {
    slug: "conciergerie-airbnb-lens-arras-bassin-minier",
    titleFr:
      "Conciergerie Airbnb à Lens & Arras : Pourquoi le Hauts-de-France explose en 2025 ?",
    titleEn:
      "Airbnb Concierge in Lens & Arras: Why the Mining Basin is Booming in 2025?",
    descriptionFr:
      "L'effet Louvre-Lens, les matches du RC Lens et le patrimoine de l'UNESCO transforment le Hauts-de-France en eldorado pour la location courte durée. Guide complet.",
    descriptionEn:
      "The Louvre-Lens effect, RC Lens matches and UNESCO heritage are turning the Mining Basin into an eldorado for short-term rentals. Complete guide.",
    publishedAt: "2025-05-10",
    readingMinutes: 7,
    category: "Stratégie",
    keywordsFr: [
      "conciergerie airbnb lens",
      "conciergerie airbnb arras",
      "gestion locative lens",
      "investir Hauts-de-France airbnb",
    ],
    keywordsEn: ["airbnb concierge lens", "airbnb management arras"],
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Lens et Arras — opportunités Airbnb Hauts-de-France",
  },
  {
    slug: "combien-rapporte-airbnb-lens-2025",
    titleFr: "Combien rapporte un Airbnb à Lens en 2025 ? (Étude de marché)",
    titleEn: "How Much Does an Airbnb in Lens Earn in 2025? (Market Study)",
    descriptionFr:
      "Revenus moyens, taux d'occupation, pics de match RC Lens, effet Louvre-Lens… Tout ce que vous devez savoir avant de louer votre bien à Lens sur Airbnb.",
    descriptionEn:
      "Average revenue, occupancy rates, RC Lens match peaks, Louvre-Lens effect — everything you need to know before listing your Lens property on Airbnb.",
    publishedAt: "2026-02-10",
    readingMinutes: 8,
    category: "Rentabilité",
    keywordsFr: [
      "combien rapporte airbnb lens",
      "revenus airbnb lens",
      "rentabilité airbnb lens",
      "taux occupation airbnb lens 2025",
    ],
    keywordsEn: ["airbnb income lens", "airbnb revenue lens 2025"],
    coverImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Appartement Airbnb à Lens — Welqo Conciergerie",
  },
  {
    slug: "combien-rapporte-airbnb-arras-2025",
    titleFr: "Combien rapporte un Airbnb à Arras en 2025 ? (Étude de marché)",
    titleEn: "How Much Does an Airbnb in Arras Earn in 2025? (Market Study)",
    descriptionFr:
      "Revenus moyens, taux d'occupation, tourisme mémoriel, Grand-Place UNESCO… Tout ce que vous devez savoir avant de louer votre bien à Arras sur Airbnb.",
    descriptionEn:
      "Average revenue, occupancy rates, memorial tourism, UNESCO Grand-Place — everything you need to know before listing your Arras property on Airbnb.",
    publishedAt: "2026-02-24",
    readingMinutes: 7,
    category: "Rentabilité",
    keywordsFr: [
      "combien rapporte airbnb arras",
      "revenus airbnb arras",
      "rentabilité airbnb arras",
      "taux occupation airbnb arras 2025",
    ],
    keywordsEn: ["airbnb income arras", "airbnb revenue arras 2025"],
    coverImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Appartement Airbnb à Arras — Welqo Conciergerie",
  },
  {
    slug: "gestion-deleguee-airbnb-guide-complet",
    titleFr: "Gestion déléguée Airbnb : guide complet 2025",
    titleEn: "Delegated Airbnb Management: Complete Guide 2025",
    descriptionFr:
      "Conciergerie, agence ou gestionnaire indépendant ? Comprenez les différences, les coûts et comment choisir le bon partenaire pour déléguer votre gestion Airbnb.",
    descriptionEn:
      "Concierge, agency or independent manager? Understand the differences, costs and how to choose the right partner to delegate your Airbnb management.",
    publishedAt: "2026-03-05",
    readingMinutes: 9,
    category: "Guide",
    keywordsFr: [
      "gestion déléguée airbnb",
      "déléguer gestion airbnb",
      "conciergerie airbnb hauts-de-france",
      "gestionnaire airbnb",
    ],
    keywordsEn: [
      "delegated airbnb management",
      "airbnb property manager",
      "airbnb concierge northern france",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Gestion déléguée Airbnb — Welqo Conciergerie Hauts-de-France",
  },
  {
    slug: "conciergerie-airbnb-bethune-guide",
    titleFr: "Conciergerie Airbnb Béthune : tout savoir sur la gestion locative",
    titleEn: "Béthune Airbnb Concierge: Everything About Property Management",
    descriptionFr:
      "Béthune, au carrefour de Lille, Lens et Arras : pourquoi c'est un marché porteur pour la location courte durée. Guide complet sur la conciergerie Airbnb à Béthune.",
    descriptionEn:
      "Béthune, at the crossroads of Lille, Lens and Arras: why it's a growing short-term rental market. Complete guide to Airbnb concierge in Béthune.",
    publishedAt: "2026-03-20",
    readingMinutes: 7,
    category: "Stratégie",
    keywordsFr: [
      "conciergerie airbnb béthune",
      "gestion airbnb béthune",
      "location courte durée béthune",
      "airbnb béthune artois",
    ],
    keywordsEn: [
      "airbnb concierge bethune",
      "property management bethune",
      "short term rental bethune",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Béthune Beffroi UNESCO — Airbnb Welqo Conciergerie",
  },
  {
    slug: "meilleurs-quartiers-airbnb-lens",
    titleFr: "Les 5 meilleurs quartiers pour louer sur Airbnb à Lens",
    titleEn: "The 5 Best Neighbourhoods for Airbnb in Lens",
    descriptionFr:
      "Centre-Ville, Avion, Liévin, Loos-en-Gohelle… Quel secteur du Bassin Minier offre le meilleur rendement Airbnb ? Analyse et comparatif détaillé.",
    descriptionEn:
      "City Centre, Avion, Liévin, Loos-en-Gohelle — which Bassin Minier area delivers the best Airbnb return? Detailed analysis and comparison.",
    publishedAt: "2026-04-07",
    readingMinutes: 6,
    category: "Stratégie",
    keywordsFr: [
      "meilleur quartier airbnb lens",
      "où louer airbnb lens",
      "airbnb avion rc lens",
      "airbnb liévin bassin minier",
    ],
    keywordsEn: ["best neighbourhood airbnb lens", "where to airbnb in lens"],
    coverImage:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Lens Bassin Minier — meilleurs quartiers Airbnb",
  },
  {
    slug: "investir-lcd-bassin-minier-hauts-de-france",
    titleFr: "Investir en location courte durée dans le Bassin Minier en 2025",
    titleEn: "Investing in Short-Term Rentals in the Bassin Minier in 2025",
    descriptionFr:
      "Prix d'acquisition bas, demande touristique croissante, faible concurrence Airbnb… Le Bassin Minier (Lens, Arras) est-il le bon investissement locatif en 2025 ?",
    descriptionEn:
      "Low acquisition prices, growing tourist demand, low Airbnb competition… Is the Bassin Minier (Lens, Arras) the right rental investment in 2025?",
    publishedAt: "2026-04-22",
    readingMinutes: 8,
    category: "Stratégie",
    keywordsFr: [
      "investir airbnb lens",
      "investissement locatif bassin minier",
      "rendement locatif lens arras",
      "location courte durée hauts-de-france investissement",
    ],
    keywordsEn: [
      "invest airbnb lens",
      "short term rental investment bassin minier",
      "rental yield lens arras",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Investissement locatif Bassin Minier — Lens Arras",
  },
  {
    slug: "commission-airbnb-booking-vrbo-comparatif",
    titleFr: "Airbnb vs Booking vs VRBO : quelle commission choisir en 2025 ?",
    titleEn: "Airbnb vs Booking vs VRBO: Which Commission to Choose in 2025?",
    descriptionFr:
      "Comparatif des frais de plateforme, de la visibilité et des conditions pour les propriétaires. Comment maximiser vos revenus en choisissant les bonnes plateformes.",
    descriptionEn:
      "Comparison of platform fees, visibility and conditions for owners. How to maximise your revenue by choosing the right platforms.",
    publishedAt: "2026-05-05",
    readingMinutes: 7,
    category: "Guide",
    keywordsFr: [
      "commission airbnb booking vrbo",
      "frais plateforme location courte durée",
      "airbnb vs booking propriétaire",
      "multi-plateforme airbnb",
    ],
    keywordsEn: [
      "airbnb vs booking fees",
      "vrbo commission comparison",
      "short term rental platforms fees",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Comparatif plateformes Airbnb Booking VRBO — Welqo",
  },
  {
    slug: "calculer-rendement-locatif-airbnb",
    titleFr: "Comment calculer le rendement locatif de son Airbnb en 2025",
    titleEn: "How to Calculate Your Airbnb Rental Yield in 2025",
    descriptionFr:
      "Rendement brut, rendement net, cash-flow… Apprenez à calculer la vraie rentabilité de votre Airbnb avec notre méthode et notre simulateur.",
    descriptionEn:
      "Gross yield, net yield, cash flow — learn to calculate your Airbnb's true profitability with our method and simulator.",
    publishedAt: "2026-05-15",
    readingMinutes: 8,
    category: "Guide",
    keywordsFr: [
      "calculer rendement airbnb",
      "rentabilité airbnb calcul",
      "rendement locatif courte durée",
      "simulateur rentabilité airbnb",
    ],
    keywordsEn: [
      "calculate airbnb yield",
      "airbnb rental return calculation",
      "short term rental profitability",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Calcul rendement locatif Airbnb — Welqo Hauts-de-France",
  },
  {
    slug: "lcd-vs-longue-duree-hauts-de-france",
    titleFr: "Location Courte Durée vs Longue Durée : Quel Choix pour Votre Bien en 2025 ?",
    titleEn: "Short-Term vs Long-Term Rental: Which Is Right for Your Property in 2025?",
    descriptionFr:
      "Revenus, fiscalité, flexibilité, risques… Comparatif complet entre Airbnb (location courte durée) et bail classique pour les propriétaires des Hauts-de-France.",
    descriptionEn:
      "Revenue, taxation, flexibility, risks — a full comparison between Airbnb (short-term) and traditional lease (long-term) for Hauts-de-France property owners.",
    publishedAt: "2026-06-09",
    readingMinutes: 9,
    category: "Guide",
    keywordsFr: [
      "location courte durée vs longue durée",
      "airbnb vs location classique",
      "meublé tourisme vs bail",
      "rentabilité airbnb vs loyer",
    ],
    keywordsEn: [
      "short term vs long term rental",
      "airbnb vs traditional lease",
      "furnished rental vs standard lease",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Comparatif location courte durée vs longue durée — Welqo Hauts-de-France",
  },
  {
    slug: "fiscalite-airbnb-lmnp-micro-bic-guide",
    titleFr: "Fiscalité Airbnb en 2025 : LMNP, Micro-BIC ou Régime Réel ?",
    titleEn: "Airbnb Tax in 2025: LMNP, Micro-BIC or Real Income Regime?",
    descriptionFr:
      "Tout comprendre sur la fiscalité de la location meublée courte durée : statut LMNP, micro-BIC (50 % ou 71 %), régime réel et amortissement. Guide pratique 2025.",
    descriptionEn:
      "Everything about furnished short-term rental taxation: LMNP status, Micro-BIC (50% or 71%), real income regime and depreciation. Practical 2025 guide.",
    publishedAt: "2026-06-09",
    readingMinutes: 10,
    category: "Guide",
    keywordsFr: [
      "fiscalité airbnb lmnp",
      "micro-bic location meublée",
      "régime réel lmnp airbnb",
      "amortissement lmnp airbnb",
    ],
    keywordsEn: [
      "airbnb tax france lmnp",
      "micro-bic furnished rental",
      "lmnp real income depreciation",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Fiscalité LMNP Airbnb 2025 — Welqo Hauts-de-France",
  },
  {
    slug: "conciergerie-airbnb-douai-guide",
    titleFr: "Conciergerie Airbnb Douai : Tout Savoir sur la Gestion Locative en 2025",
    titleEn: "Douai Airbnb Concierge: Everything About Property Management in 2025",
    descriptionFr:
      "Beffroi UNESCO, festival de Gayant, proximité du Louvre-Lens… Découvrez pourquoi Douai est un marché Airbnb sous-estimé en Hauts-de-France et comment en tirer le meilleur parti.",
    descriptionEn:
      "UNESCO belfry, Gayant festival, proximity to Louvre-Lens — discover why Douai is an underrated Airbnb market in northern France and how to make the most of it.",
    publishedAt: "2026-06-09",
    readingMinutes: 8,
    category: "Stratégie",
    keywordsFr: [
      "conciergerie airbnb douai",
      "gestion airbnb douai",
      "location courte durée douai",
      "airbnb douai nord",
    ],
    keywordsEn: [
      "airbnb concierge douai",
      "property management douai",
      "short term rental douai",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Douai Beffroi UNESCO — Airbnb Welqo Conciergerie",
  },
  {
    slug: "reglementation-airbnb-lille-hauts-de-france",
    titleFr:
      "Réglementation Airbnb à Lille & Hauts-de-France : Le Guide Complet 2026",
    titleEn:
      "Airbnb Regulations in Lille & Northern France: The Complete 2026 Guide",
    descriptionFr:
      "Changement d'usage, limite de 120 jours, numéro d'enregistrement obligatoire, taxe de séjour… Tout pour louer votre Airbnb en toute légalité dans le Nord.",
    descriptionEn:
      "Change of use, 120-day limit, mandatory registration number, tourist tax... Everything to legally rent your Airbnb in Lille & Northern France.",
    publishedAt: "2026-05-24",
    readingMinutes: 7,
    category: "Guide",
    keywordsFr: [
      "reglementation airbnb lille 2026",
      "numero enregistrement airbnb lille",
      "changement usage location courte duree lille",
      "taxe de sejour airbnb lille",
    ],
    keywordsEn: [
      "airbnb regulations lille",
      "lille airbnb laws 2026",
      "short term rental rules northern france",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt:
      "Réglementation location saisonnière Lille — Welqo Conciergerie",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
