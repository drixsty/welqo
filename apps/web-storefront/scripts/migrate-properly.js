const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const srcBlogDir = path.join(__dirname, "../src/components/blog");
const destDir = path.join(__dirname, "../content/posts");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Manually specify blog posts mapping (with slugs and components)
const blogPosts = [
  {
    slug: "combien-rapporte-airbnb-lille-2026",
    titleFr: "Combien rapporte un Airbnb à Lille en 2026 ? (Étude de marché)",
    titleEn: "How Much Does an Airbnb in Lille Earn in 2026? (Market Study)",
    descriptionFr: "Revenus moyens, taux d'occupation, saisonnalité, quartiers les plus rentables… Tout ce que vous devez savoir avant de louer votre appartement à Lille sur Airbnb.",
    descriptionEn: "Average revenue, occupancy rates, seasonality, most profitable neighbourhoods — everything you need to know before listing your Lille property on Airbnb.",
    publishedAt: "2026-02-15",
    updatedAt: "2026-06-16",
    readingMinutes: 8,
    category: "Rentabilité",
    keywordsFr: ["combien rapporte airbnb lille", "revenus airbnb lille", "rentabilité airbnb lille", "taux occupation airbnb lille 2026"],
    keywordsEn: ["airbnb income lille", "airbnb revenue lille 2026"],
    coverImageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Appartement Airbnb à Lille — Welqo Conciergerie",
    coverImageAltEn: "Airbnb apartment in Lille — Welqo Concierge",
    component: "ArticleCombienRapporteAirbnbLille.tsx",
  },
  {
    slug: "checklist-lancer-airbnb-lille",
    titleFr: "La checklist complète pour lancer son Airbnb à Lille en 2026",
    titleEn: "The Complete Checklist to Launch Your Airbnb in Lille in 2026",
    descriptionFr: "Réglementation, équipements obligatoires, photos, prix d'entrée… Le guide pas-à-pas pour mettre votre bien en location courte durée à Lille sans stress.",
    descriptionEn: "Regulations, required equipment, photos, pricing — the step-by-step guide to list your Lille property on short-term rental platforms, stress-free.",
    publishedAt: "2026-03-10",
    updatedAt: "2026-06-16",
    readingMinutes: 6,
    category: "Guide",
    keywordsFr: ["lancer airbnb lille", "ouvrir location courte durée lille", "réglementation airbnb lille"],
    keywordsEn: ["start airbnb lille", "airbnb regulations lille"],
    coverImageUrl: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Checklist pour lancer un Airbnb à Lille",
    coverImageAltEn: "Checklist to launch an Airbnb in Lille",
    component: "ArticleChecklistLancerAirbnb.tsx",
  },
  {
    slug: "meilleurs-quartiers-airbnb-lille",
    titleFr: "Les 5 meilleurs quartiers pour louer sur Airbnb à Lille",
    titleEn: "The 5 Best Neighbourhoods for Airbnb in Lille",
    descriptionFr: "Vieux-Lille, Wazemmes, Euralille, Moulins… Quel quartier offre le meilleur retour sur investissement pour une location courte durée ? Analyse et comparatif.",
    descriptionEn: "Vieux-Lille, Wazemmes, Euralille, Moulins — which neighbourhood delivers the best ROI for short-term rental? Analysis and comparison.",
    publishedAt: "2026-04-02",
    updatedAt: "2026-06-16",
    readingMinutes: 5,
    category: "Stratégie",
    keywordsFr: ["meilleur quartier airbnb lille", "où louer airbnb lille", "vieux-lille airbnb rentabilité"],
    keywordsEn: ["best neighbourhood airbnb lille", "where to airbnb in lille"],
    coverImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Vue sur Lille — meilleurs quartiers Airbnb",
    coverImageAltEn: "View of Lille — best Airbnb neighbourhoods",
    component: "ArticleMeilleursQuartiers.tsx",
  },
  {
    slug: "conciergerie-airbnb-lens-arras-bassin-minier",
    titleFr: "Conciergerie Airbnb à Lens & Arras : Pourquoi le Hauts-de-France explose en 2026 ?",
    titleEn: "Airbnb Concierge in Lens & Arras: Why the Mining Basin is Booming in 2026?",
    descriptionFr: "L'effet Louvre-Lens, les matches du RC Lens et le patrimoine de l'UNESCO transforment le Hauts-de-France en eldorado pour la location courte durée. Guide complet.",
    descriptionEn: "The Louvre-Lens effect, RC Lens matches and UNESCO heritage are turning the Mining Basin into an eldorado for short-term rentals. Complete guide.",
    publishedAt: "2026-05-10",
    updatedAt: "2026-06-16",
    readingMinutes: 7,
    category: "Stratégie",
    keywordsFr: ["conciergerie airbnb lens", "conciergerie airbnb arras", "gestion locative lens", "investir Hauts-de-France airbnb"],
    keywordsEn: ["airbnb concierge lens", "airbnb management arras"],
    coverImageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Lens et Arras — opportunités Airbnb Hauts-de-France",
    coverImageAltEn: "Lens and Arras — Airbnb opportunities in Northern France",
    component: "ArticleConciergerieLensArras.tsx",
  },
  {
    slug: "combien-rapporte-airbnb-lens-2026",
    titleFr: "Combien rapporte un Airbnb à Lens en 2026 ? (Étude de marché)",
    titleEn: "How Much Does an Airbnb in Lens Earn in 2026? (Market Study)",
    descriptionFr: "Revenus moyens, taux d'occupation, pics de match RC Lens, effet Louvre-Lens… Tout ce que vous devez savoir avant de louer votre bien à Lens sur Airbnb.",
    descriptionEn: "Average revenue, occupancy rates, RC Lens match peaks, Louvre-Lens effect — everything you need to know before listing your Lens property on Airbnb.",
    publishedAt: "2026-02-10",
    updatedAt: "2026-06-16",
    readingMinutes: 8,
    category: "Rentabilité",
    keywordsFr: ["combien rapporte airbnb lens", "revenus airbnb lens", "rentabilité airbnb lens", "taux occupation airbnb lens 2026"],
    keywordsEn: ["airbnb income lens", "airbnb revenue lens 2026"],
    coverImageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Appartement Airbnb à Lens — Welqo Conciergerie",
    coverImageAltEn: "Airbnb apartment in Lens — Welqo Concierge",
    component: "ArticleCombienRapporteAirbnbLens.tsx",
  },
  {
    slug: "combien-rapporte-airbnb-arras-2026",
    titleFr: "Combien rapporte un Airbnb à Arras en 2026 ? (Étude de marché)",
    titleEn: "How Much Does an Airbnb in Arras Earn in 2026? (Market Study)",
    descriptionFr: "Revenus moyens, taux d'occupation, tourisme mémoriel, Grand-Place UNESCO… Tout ce que vous devez savoir avant de louer votre bien à Arras sur Airbnb.",
    descriptionEn: "Average revenue, occupancy rates, memorial tourism, UNESCO Grand-Place — everything you need to know before listing your Arras property on Airbnb.",
    publishedAt: "2026-02-24",
    updatedAt: "2026-06-16",
    readingMinutes: 7,
    category: "Rentabilité",
    keywordsFr: ["combien rapporte airbnb arras", "revenus airbnb arras", "rentabilité airbnb arras", "taux occupation airbnb arras 2026"],
    keywordsEn: ["airbnb income arras", "airbnb revenue arras 2026"],
    coverImageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Appartement Airbnb à Arras — Welqo Conciergerie",
    coverImageAltEn: "Airbnb apartment in Arras — Welqo Concierge",
    component: "ArticleCombienRapporteAirbnbArras.tsx",
  },
  {
    slug: "gestion-deleguee-airbnb-guide-complet",
    titleFr: "Gestion déléguée Airbnb : guide complet 2026",
    titleEn: "Delegated Airbnb Management: Complete Guide 2026",
    descriptionFr: "Conciergerie, agence ou gestionnaire indépendant ? Comprenez les différences, les coûts et comment choisir le bon partenaire pour déléguer votre gestion Airbnb.",
    descriptionEn: "Concierge, agency or independent manager? Understand the differences, costs and how to choose the right partner to delegate your Airbnb management.",
    publishedAt: "2026-03-05",
    updatedAt: "2026-06-16",
    readingMinutes: 9,
    category: "Guide",
    keywordsFr: ["gestion déléguée airbnb", "déléguer gestion airbnb", "conciergerie airbnb hauts-de-france", "gestionnaire airbnb"],
    keywordsEn: ["delegated airbnb management", "airbnb property manager", "airbnb concierge northern france"],
    coverImageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Gestion déléguée Airbnb — Welqo Conciergerie Hauts-de-France",
    coverImageAltEn: "Delegated Airbnb management — Welqo Concierge",
    component: "ArticleGestionDelegueeAirbnb.tsx",
  },
  {
    slug: "conciergerie-airbnb-bethune-guide",
    titleFr: "Conciergerie Airbnb Béthune : tout savoir sur la gestion locative en 2026",
    titleEn: "Béthune Airbnb Concierge: Everything About Property Management in 2026",
    descriptionFr: "Béthune, au carrefour de Lille, Lens et Arras : pourquoi c'est un marché porteur pour la location courte durée. Guide complet sur la conciergerie Airbnb à Béthune.",
    descriptionEn: "Béthune, at the crossroads of Lille, Lens and Arras: why it's a growing short-term rental market. Complete guide to Airbnb concierge in Béthune.",
    publishedAt: "2026-03-20",
    updatedAt: "2026-06-16",
    readingMinutes: 7,
    category: "Stratégie",
    keywordsFr: ["conciergerie airbnb béthune", "gestion airbnb béthune", "location courte durée béthune", "airbnb béthune artois"],
    keywordsEn: ["airbnb concierge bethune", "property management bethune", "short term rental bethune"],
    coverImageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Béthune Beffroi UNESCO — Airbnb Welqo Conciergerie",
    coverImageAltEn: "Béthune UNESCO Belfry — Airbnb Welqo Concierge",
    component: "ArticleConciergerieBethune.tsx",
  },
  {
    slug: "meilleurs-quartiers-airbnb-lens",
    titleFr: "Les 5 meilleurs quartiers pour louer sur Airbnb à Lens",
    titleEn: "The 5 Best Neighbourhoods for Airbnb in Lens",
    descriptionFr: "Centre-Ville, Avion, Liévin, Loos-en-Gohelle… Quel secteur du Bassin Minier offre le meilleur rendement Airbnb ? Analyse et comparatif détaillé.",
    descriptionEn: "City Centre, Avion, Liévin, Loos-en-Gohelle — which Bassin Minier area delivers the best Airbnb return? Detailed analysis and comparison.",
    publishedAt: "2026-04-07",
    updatedAt: "2026-06-16",
    readingMinutes: 6,
    category: "Stratégie",
    keywordsFr: ["meilleur quartier airbnb lens", "où louer airbnb lens", "airbnb avion rc lens", "airbnb liévin bassin minier"],
    keywordsEn: ["best neighbourhood airbnb lens", "where to airbnb in lens"],
    coverImageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Lens Bassin Minier — meilleurs quartiers Airbnb",
    coverImageAltEn: "Lens Mining Basin — best Airbnb neighbourhoods",
    component: "ArticleMeilleursQuartiersLens.tsx",
  },
  {
    slug: "investir-lcd-bassin-minier-hauts-de-france",
    titleFr: "Investir en location courte durée dans le Bassin Minier en 2026",
    titleEn: "Investing in Short-Term Rentals in the Bassin Minier in 2026",
    descriptionFr: "Prix d'acquisition bas, demande touristique croissante, faible concurrence Airbnb… Le Bassin Minier (Lens, Arras) est-il le bon investissement locatif en 2026 ?",
    descriptionEn: "Low acquisition prices, growing tourist demand, low Airbnb competition… Is the Bassin Minier (Lens, Arras) the right rental investment in 2026?",
    publishedAt: "2026-04-22",
    updatedAt: "2026-06-16",
    readingMinutes: 8,
    category: "Stratégie",
    keywordsFr: ["investir airbnb lens", "investissement locatif bassin minier", "rendement locatif lens arras", "location courte durée hauts-de-france investissement"],
    keywordsEn: ["invest airbnb lens", "short term rental investment bassin minier", "rental yield lens arras"],
    coverImageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Investissement locatif Bassin Minier — Lens Arras",
    coverImageAltEn: "Rental investment in Mining Basin — Lens Arras",
    component: "ArticleInvestirBassinMinier.tsx",
  },
  {
    slug: "commission-airbnb-booking-vrbo-comparatif",
    titleFr: "Airbnb vs Booking vs VRBO : quelle commission choisir en 2026 ?",
    titleEn: "Airbnb vs Booking vs VRBO: Which Commission to Choose in 2026?",
    descriptionFr: "Comparatif des frais de plateforme, de la visibilité et des conditions pour les propriétaires. Comment maximiser vos revenus en choisissant les bonnes plateformes.",
    descriptionEn: "Comparison of platform fees, visibility and conditions for owners. How to maximise your revenue by choosing the right platforms.",
    publishedAt: "2026-05-05",
    updatedAt: "2026-06-16",
    readingMinutes: 7,
    category: "Guide",
    keywordsFr: ["commission airbnb booking vrbo", "frais plateforme location courte durée", "airbnb vs booking propriétaire", "multi-plateforme airbnb"],
    keywordsEn: ["airbnb vs booking fees", "vrbo commission comparison", "short term rental platforms fees"],
    coverImageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Comparatif plateformes Airbnb Booking VRBO — Welqo",
    coverImageAltEn: "Comparison of platforms Airbnb Booking VRBO — Welqo",
    component: "ArticleCommissionAirbnbBookingVrbo.tsx",
  },
  {
    slug: "calculer-rendement-locatif-airbnb",
    titleFr: "Comment calculer le rendement locatif de son Airbnb en 2026",
    titleEn: "How to Calculate Your Airbnb Rental Yield in 2026",
    descriptionFr: "Rendement brut, rendement net, cash-flow… Apprenez à calculer la vraie rentabilité de votre Airbnb avec notre méthode et notre simulateur.",
    descriptionEn: "Gross yield, net yield, cash flow — learn to calculate your Airbnb's true profitability with our method and simulator.",
    publishedAt: "2026-05-15",
    updatedAt: "2026-06-16",
    readingMinutes: 8,
    category: "Guide",
    keywordsFr: ["calculer rendement airbnb", "rentabilité airbnb calcul", "rendement locatif courte durée", "simulateur rentabilité airbnb"],
    keywordsEn: ["calculate airbnb yield", "airbnb rental return calculation", "short term rental profitability"],
    coverImageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Calcul rendement locatif Airbnb — Welqo Hauts-de-France",
    coverImageAltEn: "Calculate rental yield Airbnb — Welqo Northern France",
    component: "ArticleCalculerRendementAirbnb.tsx",
  },
  {
    slug: "lcd-vs-longue-duree-hauts-de-france",
    titleFr: "Location Courte Durée vs Longue Durée : Quel Choix pour Votre Bien en 2026 ?",
    titleEn: "Short-Term vs Long-Term Rental: Which Is Right for Your Property in 2026?",
    descriptionFr: "Revenus, fiscalité, flexibilité, risques… Comparatif complet entre Airbnb (location courte durée) et bail classique pour les propriétaires des Hauts-de-France.",
    descriptionEn: "Revenue, taxation, flexibility, risks — a full comparison between Airbnb (short-term) and traditional lease (long-term) for Hauts-de-France property owners.",
    publishedAt: "2026-06-09",
    updatedAt: "2026-06-16",
    readingMinutes: 9,
    category: "Guide",
    keywordsFr: ["location courte durée vs longue durée", "airbnb vs location classique", "meublé tourisme vs bail", "rentabilité airbnb vs loyer"],
    keywordsEn: ["short term vs long term rental", "airbnb vs traditional lease", "furnished rental vs standard lease"],
    coverImageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Comparatif location courte durée vs longue durée — Welqo Hauts-de-France",
    coverImageAltEn: "Comparison short term vs long term rental — Welqo Northern France",
    component: "ArticleLcdVsLongueDuree.tsx",
  },
  {
    slug: "fiscalite-airbnb-lmnp-micro-bic-guide",
    titleFr: "Fiscalité Airbnb en 2026 : LMNP, Micro-BIC ou Régime Réel ?",
    titleEn: "Airbnb Tax in 2026: LMNP, Micro-BIC or Real Income Regime?",
    descriptionFr: "Tout comprendre sur la fiscalité de la location meublée courte durée : statut LMNP, micro-BIC (50 % ou 71 %), régime réel et amortissement. Guide pratique 2026.",
    descriptionEn: "Everything about furnished short-term rental taxation: LMNP status, Micro-BIC (50% or 71%), real income regime and depreciation. Practical 2026 guide.",
    publishedAt: "2026-06-09",
    updatedAt: "2026-06-16",
    readingMinutes: 10,
    category: "Guide",
    keywordsFr: ["fiscalité airbnb lmnp", "micro-bic location meublée", "régime réel lmnp airbnb", "amortissement lmnp airbnb"],
    keywordsEn: ["airbnb tax france lmnp", "micro-bic furnished rental", "lmnp real income depreciation"],
    coverImageUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Fiscalité LMNP Airbnb 2026 — Welqo Hauts-de-France",
    coverImageAltEn: "Taxation LMNP Airbnb 2026 — Welqo Northern France",
    component: "ArticleFiscaliteAirbnbLmnp.tsx",
  },
  {
    slug: "conciergerie-airbnb-douai-guide",
    titleFr: "Conciergerie Airbnb Douai : Tout Savoir sur la Gestion Locative en 2026",
    titleEn: "Douai Airbnb Concierge: Everything About Property Management in 2026",
    descriptionFr: "Beffroi UNESCO, festival de Gayant, proximité du Louvre-Lens… Découvrez pourquoi Douai est un marché Airbnb sous-estimé en Hauts-de-France et comment en tirer le meilleur parti.",
    descriptionEn: "UNESCO belfry, Gayant festival, proximity to Louvre-Lens — discover why Douai is an underrated Airbnb market in northern France and how to make the most of it.",
    publishedAt: "2026-06-09",
    updatedAt: "2026-06-16",
    readingMinutes: 8,
    category: "Stratégie",
    keywordsFr: ["conciergerie airbnb douai", "gestion airbnb douai", "location courte durée douai", "airbnb douai nord"],
    keywordsEn: ["airbnb concierge douai", "property management douai", "short term rental douai"],
    coverImageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Douai Beffroi UNESCO — Airbnb Welqo Conciergerie",
    coverImageAltEn: "Douai UNESCO Belfry — Airbnb Welqo Concierge",
    component: "ArticleConciergerieDDouai.tsx",
  },
  {
    slug: "reglementation-airbnb-lille-hauts-de-france",
    titleFr: "Réglementation Airbnb à Lille & Hauts-de-France : Le Guide Complet 2026",
    titleEn: "Airbnb Regulations in Lille & Northern France: The Complete 2026 Guide",
    descriptionFr: "Changement d'usage, limite de 120 jours, numéro d'enregistrement obligatoire, taxe de séjour… Tout pour louer votre Airbnb en toute légalité dans le Nord.",
    descriptionEn: "Change of use, 120-day limit, mandatory registration number, tourist tax... Everything to legally rent your Airbnb in Lille & Northern France.",
    publishedAt: "2026-05-24",
    updatedAt: "2026-06-16",
    readingMinutes: 7,
    category: "Guide",
    keywordsFr: ["reglementation airbnb lille 2026", "numero enregistrement airbnb lille", "changement usage location courte duree lille", "taxe de sejour airbnb lille"],
    keywordsEn: ["airbnb regulations lille", "lille airbnb laws 2026", "short term rental rules northern france"],
    coverImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    coverImageAltFr: "Réglementation location saisonnière Lille — Welqo Conciergerie",
    coverImageAltEn: "Season rental regulations Lille — Welqo Concierge",
    component: "ArticleReglementationHautsDeFrance.tsx",
  },
];

// Reusable AST-based parser that handles translation conditions natively
function parseTsxFile(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.ES2022, true);

  let jsxRootNode = null;

  // 1. Locate the return statement containing the root JsxElement
  function findJsxRoot(node) {
    if (node.kind === ts.SyntaxKind.ReturnStatement && node.expression) {
      jsxRootNode = node.expression;
      return;
    }
    ts.forEachChild(node, findJsxRoot);
  }
  findJsxRoot(sourceFile);

  if (!jsxRootNode) {
    throw new Error(`Could not find JSX root return in ${filePath}`);
  }

  // If return statement is parenthesized (e.g. return ( <div>... </div> )), extract inner expression
  if (jsxRootNode.kind === ts.SyntaxKind.ParenthesizedExpression) {
    jsxRootNode = jsxRootNode.expression;
  }

  const contentFr = [];
  const contentEn = [];

  // Parse a node list to Slate AST blocks
  function processChildren(children, isEnglishBranch, fallbackToBoth = false) {
    const blocks = [];
    if (!children) return blocks;

    children.forEach(child => {
      const parsedBlocks = nodeToSlateBlocks(child, isEnglishBranch, fallbackToBoth);
      blocks.push(...parsedBlocks);
    });

    return blocks;
  }

  function evaluateCondition(condition, isEnglishBranch) {
    const text = condition.getText().replace(/\s+/g, "").replace(/"/g, "'");
    if (text === "isEn") {
      return isEnglishBranch;
    }
    if (text === "fr") {
      return !isEnglishBranch;
    }
    if (text === "locale==='en'" || text === "locale=='en'") {
      return isEnglishBranch;
    }
    if (text === "locale!=='en'" || text === "locale!='en'") {
      return !isEnglishBranch;
    }
    if (text === "locale==='fr'" || text === "locale=='fr'") {
      return !isEnglishBranch;
    }
    if (text === "locale!=='fr'" || text === "locale!='fr'") {
      return isEnglishBranch;
    }
    // Default to true branch if unsure
    return true;
  }

  // Resolve conditional string or node values based on language branch
  function resolveConditionalText(expr, isEnglishBranch) {
    if (expr.kind === ts.SyntaxKind.ConditionalExpression) {
      const condition = expr.condition;
      const isTrueBranch = evaluateCondition(condition, isEnglishBranch);
      const branch = isTrueBranch ? expr.whenTrue : expr.whenFalse;
      return cleanTextContent(branch.getText());
    }
    return cleanTextContent(expr.getText());
  }

  function cleanTextContent(text) {
    // Strip surrounding quotes and brackets
    let t = text.trim();
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")) || (t.startsWith("`") && t.endsWith("`"))) {
      t = t.slice(1, -1);
    }
    // Replace year 2025 with 2026
    t = t.replace(/2025/g, "2026");
    return t;
  }

  // Get raw text from children recursively
  function getRawText(node, isEnglishBranch) {
    if (node.kind === ts.SyntaxKind.JsxText) {
      return cleanTextContent(node.getText());
    }
    if (node.kind === ts.SyntaxKind.JsxExpression) {
      return resolveConditionalText(node.expression, isEnglishBranch);
    }
    if (node.children) {
      let t = "";
      node.children.forEach(c => {
        t += getRawText(c, isEnglishBranch);
      });
      return t;
    }
    return cleanTextContent(node.getText());
  }

  // Parse text inline children (strong, links, code, etc.)
  function parseInlineChildren(children, isEnglishBranch) {
    const inlineNodes = [];
    if (!children) return inlineNodes;

    children.forEach(child => {
      if (child.kind === ts.SyntaxKind.JsxText) {
        const text = cleanTextContent(child.getText());
        if (text) {
          inlineNodes.push({ text });
        }
      } else if (child.kind === ts.SyntaxKind.JsxExpression) {
        // Handle conditional text directly inline
        const text = resolveConditionalText(child.expression, isEnglishBranch);
        if (text) {
          inlineNodes.push({ text });
        }
      } else if (child.kind === ts.SyntaxKind.JsxElement) {
        const tagName = child.openingElement.tagName.getText();
        if (tagName === "strong") {
          const text = getRawText(child, isEnglishBranch);
          if (text) {
            inlineNodes.push({ text, bold: true });
          }
        } else if (tagName === "a") {
          const text = getRawText(child, isEnglishBranch);
          let href = "";
          child.openingElement.attributes.properties.forEach(prop => {
            if (prop.name && prop.name.getText() === "href") {
              const init = prop.initializer;
              if (init) {
                if (init.kind === ts.SyntaxKind.JsxExpression) {
                  href = resolveConditionalText(init.expression, isEnglishBranch);
                } else {
                  href = cleanTextContent(init.getText());
                }
              }
            }
          });
          // Replace base variables
          href = href.replace(/\{\s*base\s*\}/g, "").replace(/\$base/g, "");
          if (isEnglishBranch && href && !href.startsWith("/en") && href.startsWith("/")) {
            href = `/en${href}`;
          }
          if (text) {
            inlineNodes.push({
              type: "link",
              href: href || "#",
              children: [{ text }]
            });
          }
        } else {
          // Fallback recursive
          const text = getRawText(child, isEnglishBranch);
          if (text) {
            inlineNodes.push({ text });
          }
        }
      }
    });

    if (inlineNodes.length === 0) {
      inlineNodes.push({ text: "" });
    }

    return inlineNodes;
  }

  // Master converter from TS AST Node to Slate AST block array
  function nodeToSlateBlocks(node, isEnglishBranch, fallbackToBoth = false) {
    const blocks = [];

    // 1. Raw JsxText (skip empty spacing)
    if (node.kind === ts.SyntaxKind.JsxText) {
      return [];
    }

    // 2. JsxExpression wrapper (e.g. {isEn ? ... : ...})
    if (node.kind === ts.SyntaxKind.JsxExpression && node.expression) {
      const expr = node.expression;
      if (expr.kind === ts.SyntaxKind.ConditionalExpression) {
        const condition = expr.condition;
        const isTrueBranch = evaluateCondition(condition, isEnglishBranch);
        const activeBranch = isTrueBranch ? expr.whenTrue : expr.whenFalse;
        
        // If branch is wrapped in fragment <> ... </>, parse children of fragment
        if (activeBranch.kind === ts.SyntaxKind.JsxFragment) {
          return processChildren(activeBranch.children, isEnglishBranch, false);
        } else if (activeBranch.kind === ts.SyntaxKind.ParenthesizedExpression) {
          const inner = activeBranch.expression;
          if (inner.kind === ts.SyntaxKind.JsxFragment) {
            return processChildren(inner.children, isEnglishBranch, false);
          }
          return nodeToSlateBlocks(inner, isEnglishBranch, false);
        }
        return nodeToSlateBlocks(activeBranch, isEnglishBranch, false);
      }
      return [];
    }

    // 3. JsxElement or JsxSelfClosingElement
    if (node.openingElement || node.kind === ts.SyntaxKind.JsxSelfClosingElement) {
      const opening = node.openingElement || node;
      const tagName = opening.tagName.getText();

      // Skip root outer wrapper div, cta banners, simulated elements or components
      if (tagName === "div" && (opening.attributes.properties.length > 0 || node === jsxRootNode)) {
        // Parse inner children instead of outputting a block
        return processChildren(node.children, isEnglishBranch, fallbackToBoth);
      }

      // Check for headings
      if (tagName === "h2" || tagName === "h3") {
        const level = tagName === "h2" ? 2 : 3;
        const text = getRawText(node, isEnglishBranch);
        if (text) {
          blocks.push({
            type: "heading",
            level,
            children: [{ text }]
          });
        }
        return blocks;
      }

      // Check for paragraphs
      if (tagName === "p") {
        const inlineNodes = parseInlineChildren(node.children, isEnglishBranch);
        blocks.push({
          type: "paragraph",
          children: inlineNodes
        });
        return blocks;
      }

      // Check for lists
      if (tagName === "ul" || tagName === "ol") {
        const listItems = [];
        if (node.children) {
          node.children.forEach(li => {
            if (li.kind === ts.SyntaxKind.JsxElement && li.openingElement.tagName.getText() === "li") {
              // Extract list item text / inlines
              const inlines = parseInlineChildren(li.children, isEnglishBranch);
              listItems.push({
                type: "list-item",
                children: inlines
              });
            }
          });
        }
        if (listItems.length > 0) {
          blocks.push({
            type: tagName === "ul" ? "unordered-list" : "ordered-list",
            children: listItems
          });
        }
        return blocks;
      }

      // Check for tables
      if (tagName === "table") {
        // Basic table parsing (not strictly required for keystatic documents in standard layouts, but let's parse raw text or paragraphs if simpler, or render actual tables if keys match)
        // Let's create proper Keystatic tables
        const rows = [];
        function walkTable(n) {
          if (n.kind === ts.SyntaxKind.JsxElement) {
            const tag = n.openingElement.tagName.getText();
            if (tag === "tr") {
              const cells = [];
              n.children.forEach(cell => {
                if (cell.kind === ts.SyntaxKind.JsxElement) {
                  const cellTag = cell.openingElement.tagName.getText();
                  if (cellTag === "td" || cellTag === "th") {
                    cells.push({
                      type: cellTag === "td" ? "table-cell" : "table-header-cell",
                      children: parseInlineChildren(cell.children, isEnglishBranch)
                    });
                  }
                }
              });
              if (cells.length > 0) {
                rows.push({
                  type: "table-row",
                  children: cells
                });
              }
            } else if (n.children) {
              n.children.forEach(walkTable);
            }
          }
        }
        if (node.children) {
          node.children.forEach(walkTable);
        }
        if (rows.length > 0) {
          blocks.push({
            type: "table",
            children: rows
          });
        }
        return blocks;
      }

      // Wrap top-level inline tags (a, strong, span) into paragraphs to prevent skipping
      if (tagName === "a" || tagName === "strong" || tagName === "span") {
        const inlineNodes = parseInlineChildren([node], isEnglishBranch);
        blocks.push({
          type: "paragraph",
          children: inlineNodes
        });
        return blocks;
      }
    }

    return blocks;
  }

  // 2. Parse children of root node
  if (jsxRootNode.children) {
    jsxRootNode.children.forEach(child => {
      // Parse FR version
      contentFr.push(...nodeToSlateBlocks(child, false));
      // Parse EN version
      contentEn.push(...nodeToSlateBlocks(child, true));
    });
  }

  // Fallbacks if empty
  if (contentFr.length === 0) {
    contentFr.push({ type: "paragraph", children: [{ text: "Article en cours de rédaction." }] });
  }
  if (contentEn.length === 0) {
    contentEn.push({ type: "paragraph", children: [{ text: "Article content coming soon." }] });
  }

  return { contentFr, contentEn };
}

// Perform Migration
blogPosts.forEach(post => {
  console.log(`\n--------------------------------------------`);
  console.log(`Processing: ${post.component} -> ${post.slug}.json`);
  const componentPath = path.join(srcBlogDir, post.component);
  
  if (fs.existsSync(componentPath)) {
    try {
      const { contentFr, contentEn } = parseTsxFile(componentPath);
      
      const postData = {
        titleFr: post.titleFr,
        titleEn: post.titleEn,
        descriptionFr: post.descriptionFr,
        descriptionEn: post.descriptionEn,
        category: post.category,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        readingMinutes: post.readingMinutes,
        keywordsFr: post.keywordsFr,
        keywordsEn: post.keywordsEn,
        coverImage: null,
        coverImageUrl: post.coverImageUrl,
        coverImageAltFr: post.coverImageAltFr,
        coverImageAltEn: post.coverImageAltEn,
        contentFr,
        contentEn,
      };

      fs.writeFileSync(
        path.join(destDir, `${post.slug}.json`),
        JSON.stringify(postData, null, 2),
        "utf-8"
      );
      
      console.log(`Successfully migrated content for ${post.slug}`);
      console.log(`FR paragraphs count: ${contentFr.length}`);
      console.log(`EN paragraphs count: ${contentEn.length}`);
    } catch (e) {
      console.error(`Error parsing ${post.component}:`, e);
    }
  } else {
    console.warn(`File ${componentPath} not found!`);
  }
});

console.log("\nMigration completed successfully!");
