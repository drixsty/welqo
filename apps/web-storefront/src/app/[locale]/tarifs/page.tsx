import React from "react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import dynamic from "next/dynamic";
import { CheckCircle2, ArrowRight, X } from "lucide-react";

const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((mod) => mod.ContactForm),
  { ssr: false },
);

const BASE_URL = "https://welqo.fr";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const fr = locale !== "en";
  return {
    title: fr
      ? "Tarifs conciergerie Airbnb Welqo — commission 20%, sans frais fixe"
      : "Welqo Airbnb concierge pricing — 20% commission, no fixed fees",
    description: fr
      ? "Découvrez les tarifs de Welqo : commission 20% sur les revenus locatifs, zéro frais fixe, zéro engagement. Gestion complète Airbnb à Lille, Lens, Arras, Béthune. Devis gratuit sous 24h."
      : "Discover Welqo's pricing: 20% commission on rental income, zero fixed fees, zero commitment. Full Airbnb management in Lille, Lens, Arras, Béthune. Free quote within 24h.",
    keywords: fr
      ? [
          "tarif conciergerie airbnb",
          "prix gestion airbnb",
          "commission conciergerie airbnb",
          "coût conciergerie airbnb hauts-de-france",
          "tarif gestion locative courte durée",
        ]
      : [
          "airbnb concierge pricing",
          "airbnb management cost",
          "airbnb property manager fees",
          "short term rental management price northern france",
        ],
    alternates: {
      canonical:
        locale === "fr"
          ? `${BASE_URL}/tarifs`
          : `${BASE_URL}/${locale}/tarifs`,
      languages: {
        fr: `${BASE_URL}/tarifs`,
        en: `${BASE_URL}/en/tarifs`,
        "x-default": `${BASE_URL}/tarifs`,
      },
    },
    openGraph: {
      title: fr
        ? "Tarifs Welqo — conciergerie Airbnb 20% sans frais fixe"
        : "Welqo pricing — Airbnb concierge 20% no fixed fees",
      description: fr
        ? "Commission 20% sur vos revenus Airbnb. Zéro frais fixe, zéro engagement. Gestion complète en Hauts-de-France."
        : "20% commission on your Airbnb revenue. Zero fixed fees, zero commitment. Full management in Hauts-de-France.",
      url: locale === "fr" ? `${BASE_URL}/tarifs` : `${BASE_URL}/${locale}/tarifs`,
      type: "website",
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Tarifs Welqo Conciergerie Airbnb" }],
    },
  };
}

const fr_FAQS = [
  {
    q: "Combien coûte une conciergerie Airbnb ?",
    a: "Welqo facture une commission de 20% sur vos revenus locatifs bruts. Il n'y a aucun frais fixe mensuel, aucun frais de mise en service et aucun engagement de durée. Si vous ne gagnez rien, vous ne payez rien.",
  },
  {
    q: "Qu'est-ce qui est inclus dans les 20% ?",
    a: "La commission couvre la gestion complète : création et optimisation des annonces, pricing dynamique, accueil des voyageurs 24h/24 et 7j/7, coordination du ménage professionnel 5★, gestion des avis, maintenance et suivi des incidents, et reporting mensuel sur votre dashboard propriétaire.",
  },
  {
    q: "Y a-t-il des frais cachés ?",
    a: "Non. Les seuls coûts additionnels sont les frais de ménage (facturés aux voyageurs, non à vous), le linge si vous n'en fournissez pas, et les réparations éventuelles. Tout est transparent et communiqué avant chaque intervention.",
  },
  {
    q: "Comment fonctionne le paiement ?",
    a: "Les plateformes (Airbnb, Booking.com) vous versent directement les revenus. Welqo prélève sa commission de 20% mensuellement sur la base du relevé de vos revenus. Vous recevez un rapport détaillé chaque mois.",
  },
  {
    q: "Puis-je arrêter à tout moment ?",
    a: "Oui. Il n'y a aucun engagement de durée minimum. Vous pouvez mettre fin à notre collaboration avec un préavis de 30 jours. Aucune pénalité, aucun frais de résiliation.",
  },
];

const en_FAQS = [
  {
    q: "How much does an Airbnb concierge cost?",
    a: "Welqo charges a 20% commission on your gross rental revenue. There are no monthly fixed fees, no setup costs and no commitment period. If you earn nothing, you pay nothing.",
  },
  {
    q: "What is included in the 20%?",
    a: "The commission covers full management: listing creation and optimisation, dynamic pricing, 24/7 guest reception, coordination of professional 5★ cleaning, review management, maintenance and incident follow-up, and monthly reporting via your owner dashboard.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. The only additional costs are cleaning fees (charged to guests, not to you), linen if you do not provide it, and any eventual repairs. Everything is transparent and communicated before each intervention.",
  },
  {
    q: "How does payment work?",
    a: "Platforms (Airbnb, Booking.com) pay you directly. Welqo deducts its 20% commission monthly based on your revenue statement. You receive a detailed report every month.",
  },
  {
    q: "Can I stop at any time?",
    a: "Yes. There is no minimum commitment period. You can end our collaboration with 30 days' notice. No penalty, no termination fee.",
  },
];

export default async function TarifsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const fr = locale !== "en";
  const FAQS = fr ? fr_FAQS : en_FAQS;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business-tarifs`,
    name: "Welqo — Conciergerie Airbnb Hauts-de-France",
    url: `${BASE_URL}/tarifs`,
    telephone: "+33999912173",
    email: "contact@welqo.fr",
    priceRange: "20%",
    image: `${BASE_URL}/og-image.jpg`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: fr ? "Gestion Airbnb Welqo" : "Welqo Airbnb Management",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: fr ? "Gestion Airbnb complète" : "Full Airbnb Management",
            description: fr
              ? "Gestion complète de votre location courte durée : annonces, accueil, ménage, pricing, reporting."
              : "Full short-term rental management: listings, reception, cleaning, pricing, reporting.",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "20",
            priceCurrency: "EUR",
            unitText: fr ? "% des revenus locatifs" : "% of rental revenue",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: "1",
              unitCode: "MON",
            },
          },
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: fr ? "Accueil" : "Home",
        item: fr ? BASE_URL : `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: fr ? "Tarifs" : "Pricing",
        item: fr ? `${BASE_URL}/tarifs` : `${BASE_URL}/${locale}/tarifs`,
      },
    ],
  };

  const INCLUDED = fr
    ? [
        "Création & optimisation des annonces multi-plateformes",
        "Pricing dynamique (Airbnb, Booking.com, VRBO)",
        "Accueil des voyageurs 24h/24, 7j/7",
        "Coordination du ménage professionnel 5★",
        "Gestion des avis et réputation en ligne",
        "Suivi des incidents et maintenance",
        "Dashboard propriétaire en temps réel",
        "Reporting mensuel détaillé",
      ]
    : [
        "Multi-platform listing creation & optimisation",
        "Dynamic pricing (Airbnb, Booking.com, VRBO)",
        "24/7 guest reception",
        "Coordination of professional 5★ cleaning",
        "Review management and online reputation",
        "Incident follow-up and maintenance",
        "Real-time owner dashboard",
        "Detailed monthly reporting",
      ];

  const COMPARISON = {
    headers: fr
      ? ["Critère", "Gestion solo", "Agence classique", "Welqo"]
      : ["Criteria", "Self-managed", "Traditional agency", "Welqo"],
    rows: fr
      ? [
          ["Frais mensuels fixes", "0€", "150–400€/mois", "0€"],
          ["Commission", "0%", "20–30%", "20%"],
          ["Optimisation tarifaire", "Manuelle", "Basique", "Dynamique IA"],
          ["Accueil voyageurs", "Vous", "Variable", "24h/24, 7j/7"],
          ["Multi-plateformes", "Non", "Partiel", "Oui"],
          ["Dashboard propriétaire", "Non", "Non", "Oui"],
          ["Engagement", "—", "12 mois min.", "Aucun"],
        ]
      : [
          ["Fixed monthly fees", "€0", "€150–400/mo", "€0"],
          ["Commission", "0%", "20–30%", "20%"],
          ["Pricing optimisation", "Manual", "Basic", "Dynamic AI"],
          ["Guest reception", "You", "Variable", "24/7"],
          ["Multi-platform", "No", "Partial", "Yes"],
          ["Owner dashboard", "No", "No", "Yes"],
          ["Commitment", "—", "12 months min.", "None"],
        ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <JsonLd data={faqSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 px-6 bg-slate-950 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.25),transparent)]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-welqo-terracotta/10 border border-welqo-terracotta/20 rounded-md">
            <span className="text-welqo-terracotta text-[11px] font-bold tracking-wider">
              {fr ? "Tarification transparente" : "Transparent pricing"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[0.95] mb-6">
            {fr ? "20% de commission." : "20% commission."}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
              {fr ? "Zéro frais fixe." : "Zero fixed fees."}
            </span>
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            {fr
              ? "Chez Welqo, vous ne payez que lorsque vous gagnez. Notre commission de 20% couvre la gestion complète de votre Airbnb — du ménage au reporting, en passant par l'accueil des voyageurs."
              : "At Welqo, you only pay when you earn. Our 20% commission covers full Airbnb management — from cleaning to reporting and guest reception."}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95"
          >
            {fr ? "Obtenir mon devis gratuit" : "Get my free quote"}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── MODÈLE TARIFAIRE ────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] mb-3">
              {fr ? "Notre modèle" : "Our model"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {fr ? "Simple, juste, aligné sur votre succès" : "Simple, fair, aligned with your success"}
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {fr
                ? "Si vous ne gagnez pas, nous ne gagnons pas. Ce modèle à la performance nous pousse à maximiser vos revenus en permanence."
                : "If you don't earn, we don't earn. This performance-based model drives us to constantly maximise your revenue."}
            </p>
          </div>

          {/* 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                value: "20%",
                label: fr ? "Commission sur vos revenus" : "Commission on your revenue",
                desc: fr ? "Calculée sur les revenus bruts perçus via les plateformes." : "Calculated on gross revenue received via platforms.",
              },
              {
                value: "0€",
                label: fr ? "Frais fixes mensuels" : "Monthly fixed fees",
                desc: fr ? "Aucun abonnement, aucun frais de mise en service, aucun frais cachés." : "No subscription, no setup fee, no hidden costs.",
              },
              {
                value: "0",
                label: fr ? "Mois d'engagement minimum" : "Minimum commitment months",
                desc: fr ? "Arrêtez quand vous voulez avec un préavis de 30 jours." : "Stop whenever you want with 30 days' notice.",
              },
            ].map((card) => (
              <div
                key={card.value}
                className="text-center p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/5"
              >
                <div className="text-5xl font-bold text-welqo-terracotta mb-3 tracking-tighter">{card.value}</div>
                <div className="font-bold text-slate-900 dark:text-white mb-2">{card.label}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Ce qui est inclus */}
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-welqo-terracotta/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white tracking-tight mb-8">
                {fr ? "Ce qui est inclus dans les 20%" : "What's included in the 20%"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {INCLUDED.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-welqo-terracotta mt-0.5 shrink-0" />
                    <span className="text-slate-300 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARATIF ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] mb-3">
              {fr ? "Comparatif" : "Comparison"}
            </p>
            <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {fr ? "Welqo vs vos autres options" : "Welqo vs your other options"}
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  {COMPARISON.headers.map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-4 text-left font-bold text-slate-900 dark:text-white ${i === 3 ? "bg-welqo-terracotta/10 text-welqo-terracotta" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={`border-t border-slate-100 dark:border-white/5 ${ri % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/50 dark:bg-slate-900/50"}`}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-5 py-4 ${ci === 0 ? "font-bold text-slate-700 dark:text-slate-300" : "text-slate-500 dark:text-slate-400"} ${ci === 3 ? "font-bold text-welqo-terracotta bg-welqo-terracotta/5" : ""}`}
                      >
                        {cell === "Non" || cell === "No" ? (
                          <X className="w-4 h-4 text-red-400" />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {fr ? "Questions sur les tarifs" : "Pricing questions"}
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <details
                key={i}
                className="group bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden hover:border-welqo-terracotta/20 transition-all duration-200"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                  <span className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{q}</span>
                  <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 group-open:bg-welqo-terracotta group-open:text-white rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-slate-500">
                    <svg className="w-3.5 h-3.5 group-open:rotate-45 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </summary>
                <p className="px-6 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,85,55,0.1),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 leading-none">
            {fr ? "Démarrez sans engagement" : "Start with no commitment"}
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto mb-10 text-base leading-relaxed">
            {fr
              ? "Recevez une estimation personnalisée de vos revenus potentiels en 24h. Audit de rendement gratuit par notre équipe locale."
              : "Receive a personalised estimate of your potential revenue within 24h. Free yield audit by our local team."}
          </p>
          <div className="max-w-lg mx-auto w-full">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
