import React from "react";
import type { Metadata } from "next";
import { JsonLd } from "../../components/JsonLd";
import { RevenueSimulator } from "../../components/proprietaires/RevenueSimulator";
import { ContactForm } from "../../components/ContactForm";
import { ScrollReveal } from "../../components/ScrollReveal";

const BASE_URL = "https://welqo.fr";

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
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/fr`,
      },
    },
    openGraph: {
      title: isFr
        ? "Conciergerie Airbnb Lille — Gestion Locative Clé en Main | Welqo"
        : "Airbnb Concierge Lille — Hands-Free Property Management | Welqo",
      description: isFr
        ? "Welqo gère votre bien Airbnb à Lille : annonces, check-in/out, ménage, maintenance. Devis gratuit 24h."
        : "Welqo manages your Airbnb in Lille. Free quote 24h.",
      url: `${BASE_URL}/${locale}`,
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

const COMPARE_ROWS = [
  { label: "Frais fixes", solo: "0 €", welqo: "0 €", agence: "250–400 €/mois" },
  { label: "Commission", solo: "0 %", welqo: "20 %", agence: "25–30 %" },
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

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const base = `/${locale}`;
  const isFr = locale !== "en";

  const BENTO_SERVICES = [
    {
      tag: isFr ? "Multi-plateformes" : "Multi-platform",
      title: isFr
        ? "Annonces qui performent partout"
        : "High-performing listings everywhere",
      desc: isFr
        ? "Photos pro, titre SEO, description convertissante. Votre bien visible sur Airbnb, Booking.com, Vrbo et Expedia simultanément."
        : "Professional photos, SEO title, converting description. Your property visible on Airbnb, Booking.com, Vrbo and Expedia simultaneously.",
      icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      stat: isFr ? "+35% de revenus" : "+35% revenue",
      statLabel: isFr ? "vs annonce amateur" : "vs amateur listing",
      accent: "blue",
    },
    {
      tag: isFr ? "Optimisation" : "Optimization",
      title: isFr
        ? "Tarification dynamique réactive"
        : "Reactive dynamic pricing",
      desc: isFr
        ? "Ajustement quotidien basé sur la demande locale — matchs du LOSC, Braderie, salons régionaux — pour maximiser l'occupation au meilleur prix."
        : "Daily adjustment based on local demand — LOSC matches, Braderie, regional trade shows — to maximize occupancy at the best price.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      stat: "+22%",
      statLabel: isFr ? "de revenus" : "in revenue",
      accent: "blue",
    },
    {
      tag: isFr ? "Transparence" : "Transparency",
      title: isFr
        ? "Dashboard propriétaire temps réel"
        : "Real-time owner dashboard",
      desc: isFr
        ? "Revenus, calendrier, avis voyageurs et état de votre bien. Accessible depuis votre téléphone à tout moment, 24h/24."
        : "Revenue, calendar, guest reviews and property status. Accessible from your phone at any time, 24/7.",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      stat: "24/7",
      statLabel: isFr ? "accès propriétaire" : "owner access",
      accent: "violet",
    },
  ];

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
    areaServed: [
      { "@type": "City", name: "Lille" },
      { "@type": "City", name: "Lens" },
      { "@type": "City", name: "Arras" },
      { "@type": "City", name: "Béthune" },
      { "@type": "City", name: "Douai" },
      { "@type": "City", name: "Roubaix" },
      { "@type": "City", name: "Tourcoing" },
    ],
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
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-[calc(100dvh-4rem)] flex flex-col bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(15,23,42,0.5),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 flex-grow flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left — Copy */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-welqo-terracotta/10 border border-welqo-terracotta/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-welqo-terracotta rounded-full animate-pulse-soft" />
                <span className="text-welqo-terracotta text-[9px] font-bold tracking-[0.15em] uppercase">
                  Conciergerie Airbnb · Lille
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-[0.95] mb-3">
                {isFr ? (
                  <>
                    Libérez-vous de la gestion.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
                      Maximisez vos revenus.
                    </span>
                  </>
                ) : (
                  <>
                    Free yourself from management.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
                      Maximize your income.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-[14px] text-slate-400 max-w-md mb-5 leading-relaxed font-medium">
                {isFr ? (
                  <>
                    Welqo est la conciergerie Airbnb de référence à Lille.
                    Gestion{" "}
                    <strong className="text-slate-200">100 % déléguée</strong> —
                    annonces, accueil, ménage, maintenance — avec dashboard
                    temps réel.
                  </>
                ) : (
                  <>
                    Welqo is the reference Airbnb concierge in Lille.{" "}
                    <strong className="text-slate-200">100% delegated</strong>{" "}
                    management — listings, welcome, cleaning, maintenance — with
                    real-time dashboard.
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-lg font-bold text-sm transition-all duration-200"
                >
                  {isFr ? "Obtenir mon devis gratuit" : "Get my free quote"}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  href="#comment-ca-marche"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold text-sm transition-all duration-200"
                >
                  {isFr ? "Comment ça marche" : "How it works"}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  {
                    icon: "✨",
                    text: isFr ? "Lancement exclusif" : "Exclusive launch",
                  },
                  { icon: "🏠", text: isFr ? "Standard 5★" : "5★ Standard" },
                  { icon: "📍", text: "Lille" },
                  {
                    icon: "🔓",
                    text: isFr ? "Sans engagement" : "No contract",
                  },
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

            {/* Right — Dashboard mockup */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="absolute w-80 h-80 bg-welqo-terracotta/10 rounded-full blur-3xl" />
              <div className="relative animate-float z-10 w-full max-w-sm">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 shadow-2xl shadow-black/50">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                        {isFr
                          ? "Revenus ce mois (exemple)"
                          : "Monthly income (example)"}
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
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2 animate-float-slow">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {isFr ? "Simulation" : "Simulation"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platforms bar */}
        <div className="relative z-10 w-full border-t border-white/5 bg-slate-900/50 backdrop-blur-sm py-3 md:py-4 px-4 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-welqo-terracotta" />
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em]">
                {isFr
                  ? "Diffusé sur les leaders mondiaux"
                  : "Listed on world leaders"}
              </p>
            </div>
            <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center opacity-40">
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
              {isFr ? "Le problème" : "The problem"}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white mb-3">
              {isFr ? (
                <>
                  Gérer un Airbnb est un{" "}
                  <span className="text-red-500">métier à plein temps.</span>
                </>
              ) : (
                <>
                  Managing an Airbnb is a{" "}
                  <span className="text-red-500">full-time job.</span>
                </>
              )}
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto font-medium text-[13px] leading-relaxed">
              {isFr
                ? "Déléguez la charge mentale. Gagnez 10h par semaine."
                : "Delegate the mental load. Save 10 hours a week."}
            </p>
          </div>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PAIN_POINTS.map((p) => (
                <div
                  key={p.text}
                  className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/70 hover:shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200"
                >
                  <span className="text-xl shrink-0">{p.emoji}</span>
                  <p className="text-slate-600 dark:text-slate-300 text-[13px] font-medium leading-snug">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════════ */}
      <section
        id="comment-ca-marche"
        className="py-16 px-4 bg-slate-50 dark:bg-slate-950"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-[9px] font-bold tracking-[0.15em] uppercase bg-welqo-terracotta/10 text-welqo-terracotta rounded-full">
              {isFr ? "Processus" : "Process"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {isFr ? (
                <>
                  Votre bien rentable en{" "}
                  <span className="text-welqo-terracotta">7 jours.</span>
                </>
              ) : (
                <>
                  Your property profitable in{" "}
                  <span className="text-welqo-terracotta">7 days.</span>
                </>
              )}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="group relative flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="relative mb-6">
                  {i !== 0 && (
                    <div className="hidden md:block absolute top-8 right-1/2 w-full h-[2px] bg-slate-200 dark:bg-slate-800 z-0" />
                  )}
                  {i !== STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-slate-200 dark:bg-slate-800 z-0" />
                  )}
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm relative z-10 ${i === 1 ? "bg-welqo-terracotta" : "bg-slate-900 dark:bg-slate-800"}`}
                  >
                    {step.num}
                  </div>
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
          BENTO SERVICES
      ══════════════════════════════════════════════════════ */}
      <section
        id="services"
        className="pt-16 pb-32 px-4 bg-white dark:bg-black"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-[9px] font-bold tracking-[0.15em] uppercase bg-welqo-terracotta/10 text-welqo-terracotta rounded-full">
              {isFr ? "Expertise" : "Expertise"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {isFr ? (
                <>
                  L'excellence hôtelière
                  <br />
                  <span className="text-welqo-terracotta">
                    au service de votre patrimoine.
                  </span>
                </>
              ) : (
                <>
                  Hotel excellence
                  <br />
                  <span className="text-welqo-terracotta">
                    at the service of your property.
                  </span>
                </>
              )}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENTO_SERVICES.map((svc, i) => {
              const accentMap: Record<string, string> = {
                blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
                emerald:
                  "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
              };
              const accentClass = accentMap[svc.accent] ?? accentMap.blue;
              return (
                <ScrollReveal key={svc.title} delay={i * 80}>
                  <div className="group relative rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 overflow-hidden hover:shadow-card hover:-translate-y-1 hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-300">
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
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          REVENUE SIMULATOR
      ══════════════════════════════════════════════════════ */}
      <section
        id="simulator"
        className="py-16 px-4 bg-slate-50 dark:bg-slate-950"
      >
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <RevenueSimulator locale={locale} />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMPARISON TABLE
      ══════════════════════════════════════════════════════ */}
      <section
        id="pourquoi-welqo"
        className="py-12 px-4 bg-white dark:bg-black"
      >
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white mb-3">
                {isFr ? "Pourquoi Welqo ?" : "Why Welqo?"}
              </h2>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="text-left px-5 py-4 font-bold text-slate-400 text-[9px] uppercase tracking-widest w-1/3">
                      {isFr ? "Critère" : "Criteria"}
                    </th>
                    <th className="px-5 py-4 font-bold text-slate-500 text-[9px] uppercase tracking-widest text-center">
                      {isFr ? "Seul" : "Solo"}
                    </th>
                    <th className="px-5 py-4 bg-welqo-terracotta/5 dark:bg-welqo-terracotta/10 text-center">
                      <span className="font-bold text-welqo-terracotta text-sm">
                        WELQO
                      </span>
                    </th>
                    <th className="hidden sm:table-cell px-5 py-4 font-bold text-slate-500 text-[9px] uppercase tracking-widest text-center">
                      {isFr ? "Agence trad." : "Traditional agency"}
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
                      <td className="px-4 sm:px-5 py-3 font-bold text-slate-700 dark:text-slate-300">
                        {row.label}
                      </td>
                      <td className="px-4 sm:px-5 py-3 text-center text-slate-400">
                        {row.solo}
                      </td>
                      <td className="px-4 sm:px-5 py-3 text-center font-bold text-welqo-terracotta bg-welqo-terracotta/3 dark:bg-welqo-terracotta/5">
                        {row.welqo}
                      </td>
                      <td className="hidden sm:table-cell px-4 sm:px-5 py-3 text-center text-slate-400">
                        {row.agence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUNDER COMMITMENT
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
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 bg-welqo-terracotta/5 border border-welqo-terracotta/10 rounded-md">
              <span className="text-welqo-terracotta text-[9px] font-bold tracking-[0.2em] uppercase">
                {isFr ? "Notre Engagement Qualité" : "Our Quality Commitment"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[0.95]">
              {isFr
                ? "Une relation de confiance, "
                : "A relationship based on trust, "}
              <span className="text-welqo-terracotta italic text-2xl md:text-3xl ml-1">
                {isFr ? "directe et transparente." : "direct and transparent."}
              </span>
            </h2>
          </div>
          <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-sm text-slate-700 dark:text-slate-300">
            <div className="space-y-6 text-[14px] leading-relaxed font-medium">
              <p>
                {isFr
                  ? "Parce que Welqo est une conciergerie à taille humaine en pleine phase de lancement dans la métropole lilloise, nous faisons le choix fort de la qualité sur la quantité."
                  : "Because Welqo is a boutique concierge company in its launch phase in the Lille area, we make the strong choice of quality over quantity."}
              </p>
              <p>
                {isFr
                  ? "Nous n'acceptons qu'un nombre limité de nouveaux propriétaires chaque trimestre. Pourquoi ? Pour garantir que chaque bien que nous gérons bénéficie d'une attention quotidienne directe de la part de nos fondateurs, d'un niveau d'entretien irréprochable et d'une hospitalité 5★ authentique pour vos voyageurs."
                  : "We only accept a limited number of new property owners each quarter. Why? To guarantee that every property we manage benefits from direct, daily attention from our founders, impeccable maintenance, and authentic 5★ hospitality for your guests."}
              </p>
              <div className="border-t border-slate-200 dark:border-white/10 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {isFr
                      ? "Kevin & l'Équipe Fondatrice"
                      : "Kevin & the Founding Team"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {isFr
                      ? "Conciergerie Premium · Hauts-de-France"
                      : "Premium Concierge · Northern France"}
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-lg font-bold text-xs transition-all duration-200"
                >
                  {isFr
                    ? "Échanger avec les fondateurs"
                    : "Chat with the founders"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-white dark:bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-950 p-6 md:p-12 group/card">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-welqo-terracotta/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-grow text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-welqo-terracotta/10 border border-welqo-terracotta/20 text-welqo-terracotta rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-welqo-terracotta opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-welqo-terracotta" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    {isFr ? "Modèle Gagnant-Gagnant" : "Win-Win Model"}
                  </span>
                </div>
                <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-[1.1]">
                  {isFr ? (
                    <>
                      Tarification simple,
                      <br />
                      <span className="text-welqo-terracotta">
                        sans frais cachés.
                      </span>
                    </>
                  ) : (
                    <>
                      Simple pricing,
                      <br />
                      <span className="text-welqo-terracotta">
                        no hidden fees.
                      </span>
                    </>
                  )}
                </h2>
                <p className="text-slate-400 font-medium leading-relaxed mb-10 text-sm max-w-md">
                  {isFr
                    ? "Notre rémunération est indexée sur vos revenus. Nous ne gagnons de l'argent que si vous en gagnez."
                    : "Our fees are indexed on your income. We only make money when you do."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {(isFr
                    ? [
                        "Annonces multi-plateformes",
                        "Photos & rédaction pro",
                        "Check-in / Out 7j/7",
                        "Ménage premium",
                        "Maintenance 24/7",
                        "Pricing dynamique IA",
                        "Dashboard temps réel",
                        "Assurance incluse",
                      ]
                    : [
                        "Multi-platform listings",
                        "Pro photos & copywriting",
                        "Check-in / Out 7d/7",
                        "Premium cleaning",
                        "24/7 Maintenance",
                        "AI dynamic pricing",
                        "Real-time dashboard",
                        "Insurance included",
                      ]
                  ).map((f) => (
                    <div key={f} className="flex items-center gap-3 text-left">
                      <div className="w-5 h-5 rounded-full bg-welqo-terracotta/10 flex items-center justify-center shrink-0">
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
              <div className="shrink-0 w-full md:w-72 bg-slate-900/40 border border-white/5 rounded-lg p-8 md:p-10 text-center relative overflow-hidden backdrop-blur-xl hover:border-welqo-terracotta/40 transition-all duration-700">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-welqo-terracotta/40 to-transparent" />
                <div className="relative z-10 mb-8">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                    {isFr ? "Commission" : "Commission"}
                  </span>
                </div>
                <div className="relative z-10 mb-8">
                  <div className="flex items-center justify-center">
                    <span className="text-white text-8xl font-bold tracking-tighter leading-none">
                      20
                    </span>
                    <span className="text-welqo-terracotta text-3xl font-bold ml-1 mt-[-20px]">
                      %
                    </span>
                  </div>
                </div>
                <div className="relative z-10 mb-8">
                  <p className="text-slate-300 text-[11px] font-bold uppercase tracking-[0.2em]">
                    {isFr ? "Du revenu brut" : "Of gross revenue"}
                  </p>
                  <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest mt-1">
                    {isFr
                      ? "Généré par votre bien"
                      : "Generated by your property"}
                  </p>
                </div>
                <div className="relative z-10 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />
                <a
                  href="#contact"
                  className="relative z-10 block w-full py-4 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-lg font-bold text-sm shadow-xl shadow-welqo-terracotta/20 transition-all duration-300 hover:-translate-y-1 active:scale-95"
                >
                  {isFr ? "Devis gratuit →" : "Free quote →"}
                </a>
                <div className="relative z-10 mt-8 flex items-center justify-center gap-2">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping opacity-40" />
                  </div>
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                    {isFr
                      ? "Sans engagement de durée"
                      : "No long-term commitment"}
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
              {isFr ? "Questions fréquentes" : "Frequently asked questions"}
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
          CTA FINAL / CONTACT
      ══════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-16 px-4 bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,85,55,0.1),transparent)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-welqo-terracotta/40 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-2 mb-8 bg-welqo-terracotta/10 border border-welqo-terracotta/20 text-welqo-terracotta rounded-full text-[10px] font-bold tracking-[0.15em] uppercase">
            {isFr ? "Prêt à déléguer ?" : "Ready to delegate?"}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
            {isFr ? (
              <>
                Votre bien mérite
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
                  mieux que la moyenne.
                </span>
              </>
            ) : (
              <>
                Your property deserves
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
                  better than average.
                </span>
              </>
            )}
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto mb-10 text-base leading-relaxed">
            {isFr
              ? "Obtenez votre estimation de revenus gratuite sous 24h. Première visite offerte. Aucune obligation."
              : "Get your free income estimate within 24h. First visit included. No obligation."}
          </p>
          <div className="max-w-lg mx-auto w-full">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BLOG / RESOURCES
      ══════════════════════════════════════════════════════ */}
      <section className="pt-24 pb-48 px-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-welqo-terracotta text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
                {isFr ? "Expertise & Conseils" : "Expertise & Advice"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white leading-none">
                {isFr ? (
                  <>
                    Guides pour les{" "}
                    <span className="text-welqo-terracotta">
                      propriétaires.
                    </span>
                  </>
                ) : (
                  <>
                    Guides for{" "}
                    <span className="text-welqo-terracotta">
                      property owners.
                    </span>
                  </>
                )}
              </h2>
            </div>
            <a
              href={`${base}/blog`}
              className="text-sm font-bold text-slate-500 hover:text-welqo-terracotta transition-colors flex items-center gap-2"
            >
              {isFr ? "Voir tout le blog" : "View all posts"}
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                slug: "combien-rapporte-airbnb-lille-2025",
                title: "Rentabilité Lille 2025",
                desc: "Étude complète des revenus par quartier.",
                category: "Étude",
              },
              {
                slug: "checklist-lancer-airbnb-lille",
                title: "Lancer son Airbnb",
                desc: "La checklist juridique et pratique.",
                category: "Guide",
              },
              {
                slug: "meilleurs-quartiers-airbnb-lille",
                title: "Meilleurs Quartiers",
                desc: "Où investir pour maximiser son ROI.",
                category: "Stratégie",
              },
              {
                slug: "conciergerie-airbnb-lens-arras-bassin-minier",
                title: "Opportunité Hauts-de-France",
                desc: "Lens & Arras : le nouvel eldorado.",
                category: "Marché",
              },
            ].map((resource) => (
              <a
                key={resource.slug}
                href={`${base}/blog/${resource.slug}`}
                className="group p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 transition-all"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-welqo-terracotta transition-colors">
                  {resource.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1 group-hover:text-welqo-terracotta transition-colors">
                  {resource.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {resource.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
