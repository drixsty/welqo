import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  MapPin,
  TrendingUp,
  Calendar,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const RevenueSimulator = dynamic(
  () =>
    import("@/components/proprietaires/RevenueSimulator").then(
      (mod) => mod.RevenueSimulator,
    ),
  { ssr: false },
);

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
      ? "Conciergerie Airbnb Lille — Gestion Locative Premium | Welqo"
      : "Lille Airbnb Concierge — Premium Property Management | Welqo",
    description: fr
      ? "Maximisez vos revenus locatifs à Lille (Vieux-Lille, Euralille, Vauban). Conciergerie Airbnb complète, ménage 5★ et pricing dynamique. Devis gratuit."
      : "Maximize your rental income in Lille (Vieux-Lille, Euralille, Vauban). Full Airbnb concierge, 5★ cleaning and dynamic pricing. Free quote.",
    keywords: fr
      ? [
          "conciergerie airbnb lille",
          "gestion locative lille",
          "conciergerie lille",
          "gestion airbnb lille",
          "vieux-lille airbnb",
        ]
      : [
          "airbnb concierge lille",
          "property management lille",
          "lille airbnb manager",
        ],
    alternates: {
      canonical:
        locale === "fr"
          ? `${BASE_URL}/conciergerie-airbnb-lille`
          : `${BASE_URL}/${locale}/conciergerie-airbnb-lille`,
      languages: {
        fr: `${BASE_URL}/conciergerie-airbnb-lille`,
        en: `${BASE_URL}/en/conciergerie-airbnb-lille`,
        "x-default": `${BASE_URL}/conciergerie-airbnb-lille`,
      },
    },
    openGraph: {
      title: fr
        ? "Conciergerie Airbnb Lille — Welqo"
        : "Lille Airbnb Concierge — Welqo",
      description: fr
        ? "Gestion locative d'exception à Lille métropole. Profitez de nos services de conciergerie clé en main."
        : "Exceptional rental management in Lille metropole. Enjoy our turnkey concierge services.",
      url:
        locale === "fr"
          ? `${BASE_URL}/conciergerie-airbnb-lille`
          : `${BASE_URL}/${locale}/conciergerie-airbnb-lille`,
      type: "website",
    },
  };
}

export default async function LilleLandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "LilleLandingPage" });

  const STATS = [
    {
      icon: TrendingUp,
      value: t("statRevenue"),
      label: t("statRevenueLabel"),
    },
    {
      icon: Calendar,
      value: t("statOccupancy"),
      label: t("statOccupancyLabel"),
    },
    {
      icon: ShieldCheck,
      value: t("statPrice"),
      label: t("statPriceLabel"),
    },
  ];

  const DISTRICTS = [
    { name: t("district_0_name"), desc: t("district_0_desc") },
    { name: t("district_1_name"), desc: t("district_1_desc") },
    { name: t("district_2_name"), desc: t("district_2_desc") },
    { name: t("district_3_name"), desc: t("district_3_desc") },
    { name: t("district_4_name"), desc: t("district_4_desc") },
  ];

  const FAQS = [
    { q: t("faq_0_q"), a: t("faq_0_a") },
    { q: t("faq_1_q"), a: t("faq_1_a") },
    { q: t("faq_2_q"), a: t("faq_2_a") },
    { q: t("faq_3_q"), a: t("faq_3_a") },
    { q: t("faq_4_q"), a: t("faq_4_a") },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business-lille`,
    name: "Welqo Conciergerie Lille",
    description:
      locale === "en"
        ? "Premium Airbnb concierge and property management services in Lille."
        : "Services premium de conciergerie Airbnb et de gestion locative à Lille.",
    url: `${BASE_URL}/conciergerie-airbnb-lille`,
    telephone: "+33999912173",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vieux-Lille",
      addressLocality: "Lille",
      postalCode: "59000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "50.62925",
      longitude: "3.057256",
    },
    priceRange: "20%",
    image: `${BASE_URL}/og-image.jpg`,
    sameAs: [
      "https://www.facebook.com/welqo",
      "https://www.instagram.com/welqo.conciergerie",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    hasMap: "https://www.google.com/maps/search/Welqo+Conciergerie+Lille",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : "Accueil",
        item: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name:
          locale === "en"
            ? "Lille Airbnb Concierge"
            : "Conciergerie Airbnb Lille",
        item:
          locale === "fr"
            ? `${BASE_URL}/conciergerie-airbnb-lille`
            : `${BASE_URL}/${locale}/conciergerie-airbnb-lille`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      {/* Schemas JSON-LD */}
      <JsonLd data={faqSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 px-6 bg-slate-950 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.25),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,rgba(15,23,42,0.5),transparent)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-welqo-terracotta/10 border border-welqo-terracotta/20 rounded-md">
            <span className="text-welqo-terracotta text-[11px] font-bold tracking-wider">
              {t("heroBadge")}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[0.95] mb-6">
            {t("heroTitle1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
              {t("heroTitle2")}
            </span>
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-xl font-bold text-sm transition-all hover:bg-welqo-terracotta hover:text-white shadow-sm active:scale-95"
            >
              {locale === "en"
                ? "Get my free quote"
                : "Obtenir mon devis gratuit"}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#simulator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-slate-300 rounded-xl font-bold text-sm border border-white/10 transition-all hover:border-welqo-terracotta/30 active:scale-95"
            >
              {locale === "en" ? "Simulate income" : "Simuler mes revenus"}
            </a>
          </div>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS LILLE ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-welqo-terracotta text-[10px] font-bold tracking-[0.2em] mb-3 block">
              {t("statsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {t("statsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm text-center flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-welqo-terracotta/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-welqo-terracotta" />
                </div>
                <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold tracking-wider max-w-[200px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUARTIERS COUVERTS ──────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-welqo-terracotta text-[10px] font-bold tracking-[0.2em] mb-3 block">
              {t("districtsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {t("districtsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISTRICTS.map((dist, i) => (
              <div
                key={i}
                className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col gap-3 hover:border-welqo-terracotta/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-welqo-terracotta shrink-0" />
                  <span className="font-bold text-slate-900 dark:text-white text-base">
                    {dist.name}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {dist.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIMULATEUR DE REVENUS LILLE ────────────────────────────── */}
      <section
        id="simulator"
        className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(212,85,55,0.15),transparent)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="px-2.5 py-1 bg-welqo-terracotta/20 border border-welqo-terracotta/30 text-welqo-terracotta text-[9px] font-bold rounded-full tracking-wider">
              {locale === "en" ? "Yield Simulator" : "Simulateur local"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-4">
              {locale === "en"
                ? "Estimate your Lille property potential"
                : "Estimez le rendement de votre bien à Lille"}
            </h2>
          </div>
          <RevenueSimulator locale={locale} />
        </div>
      </section>

      {/* ── FAQ LOCALE ─────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {t("faqTitle")}
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <details
                key={i}
                className="group bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden hover:border-welqo-terracotta/20 transition-all duration-200"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                  <span className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                    {q}
                  </span>
                  <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 group-open:bg-welqo-terracotta group-open:text-white rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-slate-500">
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

      {/* ── ARTICLES LIÉS ──────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] mb-3 text-center">
            {locale === "en" ? "Go further" : "Pour aller plus loin"}
          </p>
          <h2 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white text-center mb-8">
            {locale === "en"
              ? "Useful resources on Lille Airbnb"
              : "Ressources utiles sur l'Airbnb à Lille"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title:
                  locale === "en"
                    ? "How Much Does an Airbnb in Lille Earn in 2026?"
                    : "Combien rapporte un Airbnb à Lille en 2026 ?",
                href:
                  locale === "fr"
                    ? "/blog/combien-rapporte-airbnb-lille-2026"
                    : "/en/blog/combien-rapporte-airbnb-lille-2026",
                category: locale === "en" ? "Profitability" : "Rentabilité",
              },
              {
                title:
                  locale === "en"
                    ? "The 5 Best Neighbourhoods for Airbnb in Lille"
                    : "Les 5 meilleurs quartiers pour louer sur Airbnb à Lille",
                href:
                  locale === "fr"
                    ? "/blog/meilleurs-quartiers-airbnb-lille"
                    : "/en/blog/meilleurs-quartiers-airbnb-lille",
                category: locale === "en" ? "Strategy" : "Stratégie",
              },
              {
                title:
                  locale === "en"
                    ? "The Complete Checklist to Launch Your Airbnb in Lille"
                    : "La checklist complète pour lancer son Airbnb à Lille",
                href:
                  locale === "fr"
                    ? "/blog/checklist-lancer-airbnb-lille"
                    : "/en/blog/checklist-lancer-airbnb-lille",
                category: "Guide",
              },
            ].map((article) => (
              <a
                key={article.href}
                href={article.href}
                className="flex flex-col gap-3 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 hover:border-welqo-terracotta/30 hover:shadow-sm transition-all group"
              >
                <span className="text-[9px] font-bold tracking-widest text-welqo-terracotta">
                  {article.category}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-welqo-terracotta transition-colors leading-snug">
                  {article.title}
                </span>
                <span className="text-xs text-slate-400 mt-auto">
                  {locale === "en" ? "Read the article →" : "Lire l'article →"}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-20 px-6 bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,85,55,0.1),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 leading-none">
            {locale === "en"
              ? "Ready to maximize your income?"
              : "Prêt à maximiser vos revenus locatifs ?"}
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto mb-10 text-base leading-relaxed">
            {locale === "en"
              ? "Schedule a free audit with our local Lille team."
              : "Organisez un audit de rendement gratuit avec notre équipe locale lilloise."}
          </p>
          <div className="max-w-lg mx-auto w-full">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
