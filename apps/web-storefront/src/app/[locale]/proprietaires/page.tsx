import React from "react";
import type { Metadata } from "next";
import { JsonLd } from "../../../components/JsonLd";
import { RevenueSimulator } from "../../../components/proprietaires/RevenueSimulator";

const BASE_URL = "https://welqo.fr";

/* ─── SEO ─────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = locale !== "en";
  return {
    title: isFr
      ? "Conciergerie Airbnb Lille — Gestion Locative Clé en Main | Welqo"
      : "Airbnb Concierge Lille — Hands-Free Property Management | Welqo",
    description: isFr
      ? "Welqo gère votre bien Airbnb à Lille de A à Z : annonces optimisées, check-in/out, ménage professionnel, maintenance et dashboard propriétaire en temps réel. Devis gratuit sous 24h."
      : "Welqo manages your Airbnb property in Lille from A to Z: optimised listings, check-in/out, professional cleaning, maintenance and real-time owner dashboard. Free quote in 24h.",
    keywords: isFr
      ? [
          "conciergerie airbnb lille",
          "gestion airbnb lille",
          "gestion locative courte durée lille",
          "déléguer airbnb lille",
          "gestionnaire airbnb lille",
          "agence conciergerie lille",
          "rentabiliser appartement airbnb lille",
        ]
      : [
          "airbnb concierge lille",
          "property management lille",
          "airbnb manager lille",
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/proprietaires`,
      languages: {
        fr: `${BASE_URL}/fr/proprietaires`,
        en: `${BASE_URL}/en/proprietaires`,
        "x-default": `${BASE_URL}/fr/proprietaires`,
      },
    },
    openGraph: {
      title: isFr
        ? "Conciergerie Airbnb Lille — Gestion Locative Clé en Main | Welqo"
        : "Airbnb Concierge Lille — Hands-Free Property Management | Welqo",
      description: isFr
        ? "Welqo gère votre bien Airbnb à Lille : annonces, check-in/out, ménage, maintenance. Devis gratuit 24h."
        : "Welqo manages your Airbnb in Lille. Free quote 24h.",
      url: `${BASE_URL}/${locale}/proprietaires`,
      siteName: "Welqo",
      type: "website",
    },
  };
}

/* ─── DATA ─────────────────────────────────────────────────────────── */

const PAIN_POINTS = [
  { emoji: "😩", text: "Messages voyageurs à 23h un dimanche soir" },
  { emoji: "🧹", text: "Coordonner le ménage entre deux réservations en 3h" },
  {
    emoji: "📉",
    text: "Sous-estimer son prix et laisser de l'argent sur la table",
  },
  { emoji: "🔧", text: "Gérer une panne de chaudière à distance" },
  {
    emoji: "📸",
    text: "Photos d'annonce floues prises avec un iPhone en 2019",
  },
  {
    emoji: "⭐",
    text: "Un avis 3 étoiles qui torpille votre classement Airbnb",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Visite & audit gratuit",
    desc: "On se déplace chez vous à Lille. On évalue votre bien, votre situation réglementaire et votre potentiel locatif. 0 € et sans engagement.",
    duration: "Dès cette semaine",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    num: "02",
    title: "Mise en ligne en 7 jours",
    desc: "Séance photo professionnelle, rédaction d'annonce optimisée, tarification dynamique configurée, déclaration en mairie et onboarding Airbnb — on gère tout.",
    duration: "J+5 à J+7",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    num: "03",
    title: "Revenus optimisés, vous profitez",
    desc: "Votre bien tourne. On gère voyageurs, ménage, maintenance 24/7. Vous recevez votre virement mensuel avec un rapport détaillé et accédez en temps réel à votre dashboard.",
    duration: "En continu",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
];

const BENTO_SERVICES = [
  {
    size: "lg", // 2 cols
    tag: "Multi-plateformes",
    title: "Annonces qui performent partout",
    desc: "Photos pro, titre SEO, description convertissante. Votre bien visible et optimisé sur Airbnb, Booking.com, Vrbo et Expedia simultanément.",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    stat: "+35% de revenus",
    statLabel: "vs annonce amateur",
    accent: "blue",
  },
  {
    size: "sm",
    tag: "Disponibilité",
    title: "Check-in / Check-out 7j/7",
    desc: "Accueil personnalisé ou serrure connectée. État des lieux rigoureux, kit bienvenue premium.",
    icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    stat: "7j/7",
    statLabel: "disponibilité",
    accent: "indigo",
  },
  {
    size: "sm",
    tag: "Qualité hôtelière",
    title: "Ménage aux standards 5★",
    desc: "Équipe dédiée. Linge hôtelier fourni, produits premium, inspection qualité systématique.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    stat: "4.9★",
    statLabel: "propreté moyenne",
    accent: "emerald",
  },
  {
    size: "sm",
    tag: "Réactivité",
    title: "Maintenance 24/7",
    desc: "Réseau artisans agréés. Intervention sous 4h, devis photo, suivi complet des travaux.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    stat: "< 4h",
    statLabel: "délai intervention",
    accent: "amber",
  },
  {
    size: "lg",
    tag: "Intelligence artificielle",
    title: "Tarification dynamique propulsée par l'IA",
    desc: "Notre algorithme analyse 200+ signaux en temps réel : événements lillois (Braderie, matchs LOSC, salons), météo, demande concurrente. Chaque nuit est vendue au prix optimal.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    stat: "+22%",
    statLabel: "revenue / disponibilité",
    accent: "blue",
  },
  {
    size: "sm",
    tag: "Transparence",
    title: "Dashboard temps réel",
    desc: "Revenus, calendrier, avis voyageurs, état de votre bien. Accessible depuis votre téléphone, 24h/24.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    stat: "24/7",
    statLabel: "accès propriétaire",
    accent: "violet",
  },
];

const TESTIMONIALS = [
  {
    initials: "ML",
    name: "Marie L.",
    quartier: "Vieux-Lille",
    bien: "T3 — 72 m²",
    revenue: "2 280 €",
    period: "/ mois en moyenne",
    quote:
      "J'avais peur de perdre le contrôle de mon appartement. Avec le dashboard Welqo, je vois tout en temps réel. Mes revenus ont augmenté de 41% en 3 mois.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    initials: "TD",
    name: "Thomas D.",
    quartier: "Euralille",
    bien: "T2 — 48 m²",
    revenue: "1 740 €",
    period: "/ mois en moyenne",
    quote:
      "Je suis cadre, je voyage souvent. Impossible de gérer les check-ins moi-même. Welqo prend tout en charge — je reçois mon virement et les rapports chaque mois. Simple.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    initials: "SC",
    name: "Sophie C.",
    quartier: "Wazemmes",
    bien: "T2 — 55 m²",
    revenue: "1 520 €",
    period: "/ mois en moyenne",
    quote:
      "La Braderie 2024 a été ma meilleure semaine : 480 € pour 3 nuits. Welqo avait monté les prix au bon moment. Avant, je sous-cotais par peur des avis.",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const COMPARE_ROWS = [
  { label: "Frais fixes", solo: "0 €", welqo: "0 €", agence: "250–400 €/mois" },
  { label: "Commission", solo: "0 %", welqo: "15–20 %", agence: "25–30 %" },
  {
    label: "Annonces multi-plateformes",
    solo: "Non",
    welqo: "✓ 5 plateformes",
    agence: "Partiel",
  },
  {
    label: "Tarification dynamique",
    solo: "Manuelle",
    welqo: "✓ IA temps réel",
    agence: "Basique",
  },
  {
    label: "Dashboard propriétaire",
    solo: "✗",
    welqo: "✓ Temps réel",
    agence: "Rapport mensuel",
  },
  {
    label: "Photos professionnelles",
    solo: "À vos frais",
    welqo: "✓ Incluses",
    agence: "Option payante",
  },
  {
    label: "Disponibilité",
    solo: "Vos horaires",
    welqo: "✓ 24/7",
    agence: "Heures ouvrées",
  },
  {
    label: "Résiliation",
    solo: "—",
    welqo: "✓ Libre",
    agence: "Préavis 3 mois",
  },
];

const FAQS = [
  {
    q: "Combien coûte la conciergerie Airbnb à Lille avec Welqo ?",
    a: "Welqo fonctionne sur un modèle à la commission uniquement (entre 15 % et 20 % des revenus bruts selon le périmètre de services). Aucun frais fixe, aucune mauvaise surprise. Vous ne payez Welqo que lorsque vous gagnez de l'argent.",
  },
  {
    q: "Puis-je continuer à utiliser mon bien pour moi-même ?",
    a: "Absolument. Vous conservez un accès total à votre calendrier propriétaire via votre dashboard. Bloquez vos dates personnelles en quelques clics, nous gérons le reste sans interruption de service.",
  },
  {
    q: "Combien de temps pour que mon bien soit en ligne ?",
    a: "En moyenne 5 à 7 jours ouvrés entre notre première visite et la mise en ligne de votre annonce. Nous nous chargeons de tout : séance photo, rédaction, onboarding Airbnb, déclaration en mairie.",
  },
  {
    q: "Que se passe-t-il en cas de dégradation par un voyageur ?",
    a: "Votre bien est protégé par notre état des lieux rigoureux + la garantie Airbnb AirCover (jusqu'à 3 M€). Nous gérons l'intégralité du litige à votre place : déclaration, suivi, remboursement.",
  },
  {
    q: "Welqo couvre-t-il uniquement Lille intra-muros ?",
    a: "Non. Nous couvrons toute la métropole lilloise : Lille, Roubaix, Tourcoing, Villeneuve-d'Ascq, Lomme, Lesquin (proximité aéroport) et Marcq-en-Barœul.",
  },
  {
    q: "Suis-je lié par un contrat longue durée ?",
    a: "Notre modèle est sans engagement de durée. Vous êtes libre de résilier à tout moment avec un préavis de 30 jours. Nous misons sur la performance pour vous garder, pas sur les clauses contractuelles.",
  },
];

/* ─── PAGE ─────────────────────────────────────────────────────────── */

export default function ProprietairesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const base = `/${locale}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Conciergerie Airbnb",
    provider: {
      "@type": "LocalBusiness",
      name: "Welqo",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lille",
        addressRegion: "Hauts-de-France",
        postalCode: "59000",
        addressCountry: "FR",
      },
    },
    areaServed: { "@type": "City", name: "Lille" },
    description:
      "Gestion locative courte durée complète pour propriétaires Airbnb à Lille. Commission 15-20%, sans frais fixe.",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      description:
        "Commission entre 15% et 20% des revenus bruts. Sans frais fixe.",
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />

      {/* ══════════════════════════════════════════════════════
          HERO — Cinématique split layout
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] lg:h-screen lg:max-h-[800px] flex flex-col bg-slate-950 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(15,23,42,0.5),transparent)]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 flex-grow flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left column — Copy */}
            <div className="animate-fade-up">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-welqo-terracotta/10 border border-welqo-terracotta/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-welqo-terracotta rounded-full animate-pulse-soft" />
                <span className="text-welqo-terracotta text-[9px] font-bold tracking-[0.15em] uppercase">
                  Conciergerie Airbnb · Lille
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[0.95] mb-4">
                Confiez votre bien.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
                  On gère tout.
                </span>
              </h1>

              <p className="text-[15px] text-slate-400 max-w-md mb-6 leading-relaxed font-medium">
                Welqo est la conciergerie Airbnb de référence à Lille. Gestion{" "}
                <strong className="text-slate-200">100 % déléguée</strong> —
                annonces, accueil, ménage, maintenance — avec dashboard temps
                réel.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href={`${base}#contact`}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-lg font-bold text-sm transition-all duration-200"
                >
                  <span className="relative z-10">
                    Obtenir mon devis gratuit
                  </span>
                  <svg
                    className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <a
                  href={`${base}#comment-ca-marche`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold text-sm transition-all duration-200"
                >
                  Comment ça marche
                </a>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { icon: "⭐", text: "4.9/5" },
                  { icon: "🏠", text: "50+ biens" },
                  { icon: "📍", text: "Lille" },
                  { icon: "🔓", text: "Libre" },
                ].map((c) => (
                  <span
                    key={c.text}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 rounded-full text-[10px] font-bold"
                  >
                    <span>{c.icon}</span> {c.text}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center relative">
              {/* Glow */}
              <div className="absolute w-80 h-80 bg-welqo-terracotta/10 rounded-full blur-3xl" />

              <div className="relative animate-float z-10 w-full max-w-sm">
                {/* Main card */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 shadow-2xl shadow-black/50">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                        Revenus ce mois
                      </p>
                      <p className="text-white text-3xl font-bold tracking-tighter mt-1">
                        2 280 €
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center border border-emerald-500/20">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Mini chart bars */}
                  <div className="flex items-end gap-1.5 h-10 mb-5">
                    {[40, 65, 55, 80, 70, 90, 75, 95, 85, 100, 88, 96].map(
                      (h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${i === 11 ? "bg-welqo-terracotta" : "bg-white/10"}`}
                          style={{ height: `${h}%` }}
                        />
                      ),
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-0.5">
                        Occup.
                      </p>
                      <p className="text-white text-lg font-bold">84 %</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-0.5">
                        Note
                      </p>
                      <p className="text-white text-lg font-bold">4.9 ⭐</p>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2 animate-float-slow">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Réservation +340€
                </div>

                {/* Floating avatar row */}
                <div className="absolute -bottom-3 -left-3 bg-slate-800/90 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 shadow-xl flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {[
                      "bg-welqo-terracotta",
                      "bg-slate-700",
                      "bg-emerald-500",
                    ].map((c, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 ${c} rounded-full border-2 border-slate-800 flex items-center justify-center text-white text-[8px] font-bold`}
                      >
                        {["M", "L", "S"][i]}
                      </div>
                    ))}
                  </div>
                  <span className="text-white text-[10px] font-bold tracking-tight">
                    50+ propriétaires
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platforms Bar — Integrated at bottom */}
        <div className="relative z-10 w-full border-t border-white/5 bg-slate-900/50 backdrop-blur-sm py-4 md:py-6 px-4 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-welqo-terracotta" />
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em]">
                Diffusé sur les leaders mondiaux
              </p>
            </div>
            <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {["Airbnb", "Booking.com", "Vrbo", "Expedia", "Abritel"].map(
                (p) => (
                  <span
                    key={p}
                    className="text-white/80 font-bold text-xs md:text-sm tracking-tight cursor-default"
                  >
                    {p}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PAIN POINTS
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 mb-3 text-[9px] font-bold tracking-[0.15em] uppercase bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full border border-red-100 dark:border-red-900">
              Le problème
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white mb-3">
              Gérer seul est <span className="text-red-500">épuisant.</span>
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto font-medium text-[13px] leading-relaxed">
              Déléguez la charge mentale. Gagnez 10h par semaine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {PAIN_POINTS.map((p) => (
              <div
                key={p.text}
                className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors"
              >
                <span className="text-xl shrink-0">{p.emoji}</span>
                <p className="text-slate-600 dark:text-slate-300 text-[13px] font-medium leading-snug">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS — Comment ça marche
      ══════════════════════════════════════════════════════ */}
      <section
        id="comment-ca-marche"
        className="py-16 px-4 bg-slate-50 dark:bg-slate-950"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-[9px] font-bold tracking-[0.15em] uppercase bg-welqo-terracotta/10 text-welqo-terracotta rounded-full">
              Processus
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Actif en <span className="text-welqo-terracotta">7 jours.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[2px] bg-slate-200 dark:bg-slate-800" />

            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="group relative flex flex-col items-center md:items-start text-center md:text-left"
              >
                {/* Node */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm relative z-10 transition-transform group-hover:scale-110 duration-300 ${i === 1 ? "bg-welqo-terracotta" : "bg-slate-900 dark:bg-slate-800"}`}
                  >
                    {step.num}
                  </div>
                  {/* Pulse effect for active step */}
                  {i === 1 && (
                    <div className="absolute inset-0 bg-welqo-terracotta rounded-lg animate-ping opacity-20" />
                  )}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-welqo-terracotta mb-2">
                  {step.duration}
                </span>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BENTO GRID — Services
      ══════════════════════════════════════════════════════ */}
      <section id="services" className="py-16 px-4 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-[9px] font-bold tracking-[0.15em] uppercase bg-welqo-terracotta/10 text-welqo-terracotta rounded-full">
              Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Plus qu'un service,
              <br />
              <span className="text-welqo-terracotta">
                un partenaire de croissance.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENTO_SERVICES.map((svc) => {
              const accentMap: Record<string, string> = {
                blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
                emerald:
                  "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
              };
              const accentClass = accentMap[svc.accent] ?? accentMap.blue;
              const isLg = svc.size === "lg";

              return (
                <div
                  key={svc.title}
                  className={`group relative rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-all duration-300 hover:border-welqo-terracotta/20 overflow-hidden ${isLg ? "lg:col-span-2" : ""}`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center border ${accentClass}`}
                      >
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={svc.icon}
                          />
                        </svg>
                      </div>
                      <span className="px-2.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        {svc.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed mb-6">
                      {svc.desc}
                    </p>

                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${accentClass} bg-opacity-10`}
                    >
                      <span className="font-bold text-sm">{svc.stat}</span>
                      <span className="text-[10px] opacity-70 font-medium uppercase tracking-widest">
                        {svc.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          REVENUE SIMULATOR
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <RevenueSimulator />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS — Résultats Concrets & ROI
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-white dark:bg-[#030712] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 bg-welqo-terracotta/5 border border-welqo-terracotta/10 rounded-md">
                <span className="text-welqo-terracotta text-[9px] font-bold tracking-[0.2em] uppercase">
                  Impact Mesurable
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[0.95]">
                Des résultats{" "}
                <span className="text-welqo-terracotta italic text-2xl md:text-3xl ml-1">
                  concrets.
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800"
                  />
                ))}
              </div>
              <div className="text-[11px] font-medium text-slate-500 leading-tight">
                <span className="text-slate-900 dark:text-white font-bold">
                  +50 propriétaires
                </span>
                <br />à Lille et métropole
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="group relative flex flex-col bg-slate-50/50 dark:bg-white/[0.02] rounded-xl border border-slate-200 dark:border-white/[0.05] p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 text-amber-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded text-[8px] font-bold uppercase tracking-widest">
                    ROI Focus
                  </div>
                </div>

                <blockquote className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>

                <div className="mt-auto">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-[10px] shadow-md`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                        {t.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 truncate max-w-[150px]">
                        {t.quartier} · {t.bien}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMPARISON TABLE
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white mb-3">
              Pourquoi Welqo ?
            </h2>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="text-left px-5 py-4 font-bold text-slate-400 text-[9px] uppercase tracking-widest w-1/3">
                    Critère
                  </th>
                  <th className="px-5 py-4 font-bold text-slate-500 text-[9px] uppercase tracking-widest text-center">
                    Seul
                  </th>
                  <th className="px-5 py-4 bg-welqo-terracotta/5 dark:bg-welqo-terracotta/10 text-center">
                    <span className="font-bold text-welqo-terracotta text-sm">
                      WELQO
                    </span>
                  </th>
                  <th className="px-5 py-4 font-bold text-slate-500 text-[9px] uppercase tracking-widest text-center">
                    Agence trad.
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {COMPARE_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={
                      i % 2 === 0
                        ? "bg-white dark:bg-slate-900"
                        : "bg-slate-50/30 dark:bg-slate-800/30"
                    }
                  >
                    <td className="px-5 py-3 font-bold text-slate-700 dark:text-slate-300">
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-center text-slate-400">
                      {row.solo}
                    </td>
                    <td className="px-5 py-3 text-center font-bold text-welqo-terracotta bg-welqo-terracotta/3 dark:bg-welqo-terracotta/5">
                      {row.welqo}
                    </td>
                    <td className="px-5 py-3 text-center text-slate-400">
                      {row.agence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-950 p-8 md:p-16 group/card">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-welqo-terracotta/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-transform duration-1000 group-hover/card:scale-110" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-grow text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-welqo-terracotta/10 border border-welqo-terracotta/20 text-welqo-terracotta rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-welqo-terracotta opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-welqo-terracotta"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Modèle Gagnant-Gagnant
                  </span>
                </div>

                <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-[1.1]">
                  Tarification simple,
                  <br />
                  <span className="text-welqo-terracotta">
                    sans frais cachés.
                  </span>
                </h2>
                <p className="text-slate-400 font-medium leading-relaxed mb-10 text-sm max-w-md">
                  Notre rémunération est indexée sur vos revenus. Nous ne
                  gagnons de l'argent que si vous en gagnez.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    "Annonces multi-plateformes",
                    "Photos & rédaction pro",
                    "Check-in / Out 7j/7",
                    "Ménage premium",
                    "Maintenance 24/7",
                    "Pricing dynamique IA",
                    "Dashboard temps réel",
                    "Assurance incluse",
                  ].map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-3 group/item text-left"
                    >
                      <div className="w-5 h-5 rounded-full bg-welqo-terracotta/10 flex items-center justify-center shrink-0 transition-colors group-hover/item:bg-welqo-terracotta/20">
                        <svg
                          className="w-2.5 h-2.5 text-welqo-terracotta"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-xs text-slate-300 font-medium">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Badge Monumental */}
              <div className="shrink-0 w-full md:w-80 bg-slate-900/40 border border-white/5 rounded-lg p-10 md:p-12 text-center relative overflow-hidden backdrop-blur-xl group/price transition-all duration-700 hover:border-welqo-terracotta/40 hover:shadow-[0_0_50px_rgba(212,85,55,0.15)]">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-welqo-terracotta/40 to-transparent" />

                {/* Label */}
                <div className="relative z-10 mb-8">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                    Commission
                  </span>
                  <div className="h-px w-8 bg-welqo-terracotta/30 mx-auto mt-2 group-hover/price:w-12 transition-all duration-500" />
                </div>

                {/* Price Display */}
                <div className="relative z-10 mb-8">
                  <div className="flex items-center justify-center">
                    <div className="flex items-start">
                      <span className="text-white text-7xl md:text-8xl font-bold tracking-tighter leading-none">
                        15
                      </span>
                      <div className="flex flex-col items-center mx-2 md:mx-3 mt-3 md:mt-4">
                        <div className="w-5 md:w-6 h-[2px] bg-welqo-terracotta rotate-[-45deg] mb-1" />
                        <div className="w-5 md:w-6 h-[2px] bg-welqo-terracotta rotate-[-45deg]" />
                      </div>
                      <span className="text-white text-7xl md:text-8xl font-bold tracking-tighter leading-none">
                        20
                      </span>
                    </div>
                    <span className="text-welqo-terracotta text-2xl md:text-3xl font-bold ml-1 mt-[-15px] md:mt-[-20px]">
                      %
                    </span>
                  </div>
                </div>

                {/* Detail */}
                <div className="relative z-10 mb-8">
                  <p className="text-slate-300 text-[11px] font-bold uppercase tracking-[0.2em]">
                    Du revenu brut
                  </p>
                  <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest mt-1">
                    Généré par votre bien
                  </p>
                </div>

                <div className="relative z-10 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />

                <a
                  href={`${base}#contact`}
                  className="relative z-10 block w-full py-4 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-lg font-bold text-sm shadow-xl shadow-welqo-terracotta/20 transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden group/btn"
                >
                  <span className="relative z-10">Devis gratuit →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </a>

                {/* Status */}
                <div className="relative z-10 mt-8 flex items-center justify-center gap-2 group/engagement">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping opacity-40" />
                  </div>
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest group-hover/engagement:text-slate-400 transition-colors">
                    Sans engagement de durée
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-white dark:bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Questions fréquentes
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <details
                key={i}
                className="group bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 overflow-hidden hover:border-welqo-terracotta/20 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                  <span className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                    {q}
                  </span>
                  <div className="w-7 h-7 bg-slate-200 dark:bg-slate-700 group-open:bg-welqo-terracotta group-open:text-white rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-slate-500">
                    <svg
                      className="w-3.5 h-3.5 group-open:rotate-45 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </summary>
                <p className="px-6 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-16 px-4 bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,85,55,0.1),transparent)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-welqo-terracotta/40 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-2 mb-8 bg-welqo-terracotta/10 border border-welqo-terracotta/20 text-welqo-terracotta rounded-full text-[10px] font-bold tracking-[0.15em] uppercase">
            Prêt à déléguer ?
          </span>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
            Votre bien mérite
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
              mieux que la moyenne.
            </span>
          </h2>

          <p className="text-slate-400 font-medium max-w-xl mx-auto mb-10 text-base leading-relaxed">
            Obtenez votre estimation de revenus gratuite sous 24h. Première
            visite offerte. Aucune obligation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={`mailto:contact@welqo.fr?subject=Demande de devis conciergerie Airbnb Lille`}
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-lg font-bold text-base hover:bg-welqo-terracotta hover:text-white transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Nous écrire maintenant
            </a>
            <a
              href={`${base}/blog/combien-rapporte-airbnb-lille-2025`}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold text-base transition-all"
            >
              Lire l'étude de marché
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500">
            {[
              "Réponse garantie sous 24h",
              "Devis 100 % gratuit",
              "Sans engagement de durée",
              "Visite offerte à Lille",
            ].map((g) => (
              <span
                key={g}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider"
              >
                <svg
                  className="w-3.5 h-3.5 text-welqo-terracotta"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
