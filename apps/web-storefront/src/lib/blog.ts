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
    titleFr: "Conciergerie Airbnb à Lens & Arras : Pourquoi le Bassin Minier explose en 2025 ?",
    titleEn: "Airbnb Concierge in Lens & Arras: Why the Mining Basin is Booming in 2025?",
    descriptionFr:
      "L'effet Louvre-Lens, les matches du RC Lens et le patrimoine de l'UNESCO transforment le Bassin Minier en eldorado pour la location courte durée. Guide complet.",
    descriptionEn:
      "The Louvre-Lens effect, RC Lens matches and UNESCO heritage are turning the Mining Basin into an eldorado for short-term rentals. Complete guide.",
    publishedAt: "2025-05-10",
    readingMinutes: 7,
    category: "Stratégie",
    keywordsFr: [
      "conciergerie airbnb lens",
      "conciergerie airbnb arras",
      "gestion locative lens",
      "investir bassin minier airbnb",
    ],
    keywordsEn: ["airbnb concierge lens", "airbnb management arras"],
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    coverImageAlt: "Lens et Arras — opportunités Airbnb Bassin Minier",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
