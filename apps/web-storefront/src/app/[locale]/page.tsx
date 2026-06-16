import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "../../components/JsonLd";
import dynamic from "next/dynamic";

const RevenueSimulator = dynamic(
  () =>
    import("../../components/proprietaires/RevenueSimulator").then(
      (mod) => mod.RevenueSimulator,
    ),
  { ssr: false },
);

const InteractiveHeroDashboard = dynamic(
  () =>
    import("../../components/InteractiveHeroDashboard").then(
      (mod) => mod.InteractiveHeroDashboard,
    ),
  { ssr: false },
);

const ContactForm = dynamic(
  () => import("../../components/ContactForm").then((mod) => mod.ContactForm),
  { ssr: false },
);
import { ScrollReveal } from "../../components/ScrollReveal";
import { ScrollToTop } from "../../components/ScrollToTop";
import { HeroAnimated } from "../../components/HeroAnimated";
import { AnimatedCounter } from "../../components/AnimatedCounter";

const BASE_URL = "https://welqo.fr";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const fr = locale !== "en";
  return {
    title: fr
      ? "Conciergerie Airbnb Hauts-de-France — Gestion Locative Clé en Main | Welqo"
      : "Airbnb Concierge Hauts-de-France — Hands-Free Property Management | Welqo",
    description: fr
      ? "Welqo gère votre bien Airbnb dans les Hauts-de-France de A à Z : annonces optimisées, check-in/out, ménage professionnel, maintenance et dashboard propriétaire en temps réel. Devis gratuit sous 24h."
      : "Welqo manages your Airbnb property in Hauts-de-France from A to Z: optimised listings, check-in/out, professional cleaning, maintenance and real-time owner dashboard. Free quote in 24h.",
    keywords: fr
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
      canonical: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`,
      languages: {
        fr: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      title: fr
        ? "Conciergerie Airbnb Hauts-de-France — Gestion Locative Clé en Main | Welqo"
        : "Airbnb Concierge Hauts-de-France — Hands-Free Property Management | Welqo",
      description: fr
        ? "Welqo gère votre bien Airbnb en Hauts-de-France : annonces, check-in/out, ménage, maintenance. Devis gratuit 24h."
        : "Welqo manages your Airbnb in Hauts-de-France. Free quote 24h.",
      url: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`,
      siteName: "Welqo",
      type: "website",
    },
  };
}

/* ─── PAGE ─────────────────────────────────────────────────────────── */

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const base = `/${locale}`;
  const fr = locale !== "en";

  const BENTO_SERVICES = [
    {
      href: "#contact",
      tag: t("svc_0_tag"),
      title: t("svc_0_title"),
      desc: t("svc_0_desc"),
      icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      stat: t("svc_0_stat"),
      statLabel: t("svc_0_statLabel"),
      accent: "blue",
    },
    {
      href: "#simulator",
      tag: t("svc_1_tag"),
      title: t("svc_1_title"),
      desc: t("svc_1_desc"),
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      stat: "+22%",
      statLabel: t("svc_1_statLabel"),
      accent: "blue",
    },
    {
      href: "#contact",
      tag: t("svc_2_tag"),
      title: t("svc_2_title"),
      desc: t("svc_2_desc"),
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      stat: "24/7",
      statLabel: t("svc_2_statLabel"),
      accent: "violet",
    },
  ];

  const PAIN_POINTS = [
    { emoji: "😩", text: t("pain_0") },
    { emoji: "🧹", text: t("pain_1") },
    { emoji: "📉", text: t("pain_2") },
    { emoji: "🔧", text: t("pain_3") },
    { emoji: "📸", text: t("pain_4") },
    { emoji: "⭐", text: t("pain_5") },
  ];

  const STEPS = [
    {
      num: "01",
      title: t("step_0_title"),
      desc: t("step_0_desc"),
      duration: t("step_0_duration"),
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      num: "02",
      title: t("step_1_title"),
      desc: t("step_1_desc"),
      duration: t("step_1_duration"),
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      num: "03",
      title: t("step_2_title"),
      desc: t("step_2_desc"),
      duration: t("step_2_duration"),
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    },
  ];

  const COMPARE_ROWS = [
    {
      label: t("compare_0_label"),
      solo: t("compare_0_solo"),
      welqo: t("compare_0_welqo"),
      agence: t("compare_0_agency"),
    },
    {
      label: t("compare_1_label"),
      solo: t("compare_1_solo"),
      welqo: t("compare_1_welqo"),
      agence: t("compare_1_agency"),
    },
    {
      label: t("compare_2_label"),
      solo: t("compare_2_solo"),
      welqo: t("compare_2_welqo"),
      agence: t("compare_2_agency"),
    },
    {
      label: t("compare_3_label"),
      solo: t("compare_3_solo"),
      welqo: t("compare_3_welqo"),
      agence: t("compare_3_agency"),
    },
    {
      label: t("compare_4_label"),
      solo: t("compare_4_solo"),
      welqo: t("compare_4_welqo"),
      agence: t("compare_4_agency"),
    },
    {
      label: t("compare_5_label"),
      solo: t("compare_5_solo"),
      welqo: t("compare_5_welqo"),
      agence: t("compare_5_agency"),
    },
    {
      label: t("compare_6_label"),
      solo: t("compare_6_solo"),
      welqo: t("compare_6_welqo"),
      agence: t("compare_6_agency"),
    },
    {
      label: t("compare_7_label"),
      solo: t("compare_7_solo"),
      welqo: t("compare_7_welqo"),
      agence: t("compare_7_agency"),
    },
  ];

  const FAQS = [
    { q: t("faq_0_q"), a: t("faq_0_a") },
    { q: t("faq_1_q"), a: t("faq_1_a") },
    { q: t("faq_2_q"), a: t("faq_2_a") },
    { q: t("faq_3_q"), a: t("faq_3_a") },
    { q: t("faq_4_q"), a: t("faq_4_a") },
    { q: t("faq_5_q"), a: t("faq_5_a") },
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Welqo",
        item: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: locale === "en" ? "Airbnb Concierge" : "Conciergerie Airbnb",
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
      locale === "en"
        ? "Complete short-term rental management for Airbnb owners in Hauts-de-France. Commission 15-20%, no fixed fees."
        : "Gestion locative courte durée complète pour propriétaires Airbnb en Hauts-de-France. Commission 15-20%, sans frais fixe.",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      description:
        locale === "en"
          ? "Commission between 15% and 20% of gross income. No fixed fees."
          : "Commission entre 15% et 20% des revenus bruts. Sans frais fixe.",
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100dvh-4rem)] flex flex-col bg-slate-950 overflow-hidden">
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

        <div className="relative z-10 flex-grow flex items-center w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left — Copy (animated) */}
            <HeroAnimated
              badge={t("heroBadge")}
              title1={t("heroTitle1")}
              title2={t("heroTitle2")}
              desc={t.raw("heroDesc")}
              cta1Label={t("heroCta1")}
              cta2Label={t("heroCta2")}
              cta1Href="#contact"
              cta2Href={fr ? "#comment-ca-marche" : "#how-it-works"}
              chips={[
                { icon: "✨", text: t("heroBadgeLaunch") },
                { icon: "🏠", text: t("heroBadgeStandard") },
                { icon: "📍", text: "Hauts-de-France" },
                { icon: "🔓", text: t("heroBadgeNoContract") },
              ]}
              scrollLabel={t("scrollDiscover")}
            />

            {/* Right — Interactive Dashboard mockup */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="absolute w-80 h-80 bg-welqo-terracotta/10 rounded-full blur-3xl" />
              <div className="relative animate-float z-10 w-full">
                <InteractiveHeroDashboard locale={locale} />
              </div>
            </div>
          </div>
        </div>

        {/* Kinetic Scroll Indicator — in-flow to avoid overlap with chips */}
        <div className="relative z-20 hidden md:flex justify-center py-3">
          <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[8px] font-black text-slate-500 tracking-[0.25em]">
              {t("scrollDiscover")}
            </span>
            <div className="w-5 h-8 rounded-full border border-slate-700 flex justify-center p-1.5 relative overflow-hidden bg-slate-950/20 backdrop-blur-sm">
              <div
                className="w-1.5 h-1.5 rounded-full bg-welqo-terracotta animate-bounce"
                style={{ animationDuration: "1.8s" }}
              />
            </div>
          </div>
        </div>

        {/* Platforms bar */}
        <div className="relative z-10 w-full border-t border-white/5 bg-slate-900/50 backdrop-blur-sm py-3 px-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-welqo-terracotta" />
              <p className="text-slate-500 text-[9px] font-bold tracking-[0.2em]">
                {t("heroPlatformsLabel")}
              </p>
            </div>
            <div className="flex items-center gap-5 sm:gap-8 flex-wrap justify-center opacity-40">
              {["Airbnb", "Booking.com", "Vrbo", "Expedia", "Abritel"].map(
                (p) => (
                  <span
                    key={p}
                    className="text-white/80 font-bold text-xs tracking-tight cursor-default"
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
            <span className="inline-block px-3 py-1 mb-3 text-[9px] font-bold tracking-[0.15em] bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-full border border-red-100 dark:border-red-900">
              {t("painBadge")}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white mb-3">
              {t("painTitle1")}{" "}
              <span className="text-red-500">{t("painTitle2")}</span>
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto font-medium text-[13px] leading-relaxed">
              {t("painSubtitle")}
            </p>
          </div>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PAIN_POINTS.map((p) => (
                <div
                  key={p.text}
                  className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800"
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
        id={fr ? "comment-ca-marche" : "how-it-works"}
        className="py-16 px-4 bg-slate-50 dark:bg-slate-950"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-[9px] font-bold tracking-[0.15em] bg-orange-50 dark:bg-orange-950/30 text-orange-800 dark:text-orange-400 rounded-full border border-orange-100 dark:border-orange-900">
              {t("processBadge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {t("processTitle1")}{" "}
              <span className="text-welqo-terracotta">
                {t("processTitle2")}
              </span>
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
                <span className="text-[10px] font-bold tracking-[0.2em] text-welqo-terracotta mb-2">
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
            <span className="inline-block px-3 py-1 mb-4 text-[9px] font-bold tracking-[0.15em] bg-orange-50 dark:bg-orange-950/30 text-orange-800 dark:text-orange-400 rounded-full border border-orange-100 dark:border-orange-900">
              {t("servicesBadge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {t("servicesTitle1")}
              <br />
              <span className="text-welqo-terracotta">
                {t("servicesTitle2")}
              </span>
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
                  <div className="relative rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 overflow-hidden transition-all duration-300">
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
                        <span className="px-2.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-full text-[9px] font-bold tracking-wider">
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
                        <span className="text-[10px] opacity-70 font-medium tracking-widest">
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
        id={fr ? "pourquoi-welqo" : "why-welqo"}
        className="py-12 px-4 bg-white dark:bg-black"
      >
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white mb-3">
                {t("whyTitle")}
              </h2>
            </div>
            {/* Mobile View — Cards layout for small viewports */}
            <div className="grid grid-cols-1 gap-3 sm:hidden">
              {COMPARE_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-4 shadow-sm"
                >
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-3 tracking-tight">
                    {row.label}
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-850 flex flex-col justify-between min-h-[52px]">
                      <p className="text-[7.5px] font-bold text-slate-400 tracking-widest mb-1 leading-none">
                        {t("compareSolo")}
                      </p>
                      <p className="font-semibold text-slate-600 dark:text-slate-300 leading-tight break-words">
                        {row.solo}
                      </p>
                    </div>
                    <div className="bg-welqo-terracotta/5 dark:bg-welqo-terracotta/10 border border-welqo-terracotta/20 p-2.5 rounded-lg relative overflow-hidden flex flex-col justify-between min-h-[52px]">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-welqo-terracotta/5 rounded-full blur-sm" />
                      <p className="text-[7.5px] font-black text-welqo-terracotta tracking-widest mb-1 leading-none relative z-10">
                        WELQO
                      </p>
                      <p className="font-extrabold text-welqo-terracotta leading-tight break-words relative z-10">
                        {row.welqo}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-850 flex flex-col justify-between min-h-[52px]">
                      <p className="text-[7.5px] font-bold text-slate-400 tracking-widest mb-1 leading-none">
                        {t("compareAgency")}
                      </p>
                      <p className="font-semibold text-slate-500 leading-tight break-words">
                        {row.agence}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View — Table layout for larger viewports */}
            <div className="hidden sm:block overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="text-left px-5 py-4 font-bold text-slate-400 text-[9px] tracking-widest w-1/3">
                      {t("compareCriteria")}
                    </th>
                    <th className="px-5 py-4 font-bold text-slate-500 text-[9px] tracking-widest text-center">
                      {t("compareSolo")}
                    </th>
                    <th className="px-5 py-4 bg-welqo-terracotta/5 dark:bg-welqo-terracotta/10 text-center">
                      <span className="font-bold text-welqo-terracotta text-sm">
                        WELQO
                      </span>
                    </th>
                    <th className="hidden sm:table-cell px-5 py-4 font-bold text-slate-500 text-[9px] tracking-widest text-center">
                      {t("compareAgency")}
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
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900 rounded-md">
              <span className="text-orange-800 dark:text-orange-400 text-[9px] font-bold tracking-[0.2em]">
                {t("commitBadge")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[0.95]">
              {t("commitTitle1")}
              <span className="text-welqo-terracotta italic text-2xl md:text-3xl ml-1">
                {t("commitTitle2")}
              </span>
            </h2>
          </div>
          <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-sm text-slate-700 dark:text-slate-300">
            <div className="space-y-6 text-[14px] leading-relaxed font-medium">
              <p>{t("commitP1")}</p>
              <p>{t("commitP2")}</p>
              <div className="border-t border-slate-200 dark:border-white/10 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {t("commitFounder")}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t("commitFounderSub")}
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-lg font-bold text-xs transition-all duration-200"
                >
                  {t("commitCta")}
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
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-950 p-6 sm:p-10 lg:p-14 group/card">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-welqo-terracotta/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-10 md:gap-8 lg:gap-16 items-stretch md:items-center">
              <div className="flex-grow text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-welqo-terracotta/10 border border-welqo-terracotta/20 text-welqo-terracotta rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-welqo-terracotta opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-welqo-terracotta" />
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em]">
                    {t("pricingBadge")}
                  </span>
                </div>
                <h2 className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 leading-[1.1]">
                  {t("pricingTitle1")}
                  <br />
                  <span className="text-welqo-terracotta">
                    {t("pricingTitle2")}
                  </span>
                </h2>
                <p className="text-slate-400 font-medium leading-relaxed mb-10 text-sm max-w-md mx-auto md:mx-0">
                  {t("pricingSubtitle")}
                </p>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-3.5 lg:gap-y-4 max-w-md xs:max-w-none mx-auto md:mx-0">
                  {Array.from({ length: 8 }, (_, i) =>
                    t(`pricingFeature_${i}` as any),
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
                      <span className="text-[13px] text-slate-300 font-medium">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 w-full md:w-72 lg:w-80 max-w-sm md:max-w-none mx-auto md:mx-0 bg-slate-900/40 border border-white/5 rounded-2xl p-6 sm:p-8 lg:p-10 text-center relative overflow-hidden backdrop-blur-xl transition-all duration-700">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-welqo-terracotta/40 to-transparent" />
                <div className="relative z-10 mb-8">
                  <span className="text-slate-400 text-[10px] font-bold tracking-[0.3em]">
                    {t("pricingCommission")}
                  </span>
                </div>
                <div className="relative z-10 mb-8">
                  <div className="flex items-center justify-center">
                    <AnimatedCounter
                      to={20}
                      duration={1.8}
                      className="text-white text-8xl font-bold tracking-tighter leading-none"
                    />
                    <span className="text-welqo-terracotta text-3xl font-bold ml-1 mt-[-20px]">
                      %
                    </span>
                  </div>
                </div>
                <div className="relative z-10 mb-8">
                  <p className="text-slate-300 text-[11px] font-bold tracking-[0.2em]">
                    {t("pricingOfGross")}
                  </p>
                  <p className="text-slate-400 text-[10px] font-medium tracking-widest mt-1">
                    {t("pricingGenerated")}
                  </p>
                </div>
                <div className="relative z-10 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />
                <a
                  href="#contact"
                  className="relative z-10 block w-full py-4 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-lg font-bold text-sm shadow-xl shadow-welqo-terracotta/20 transition-all duration-300 hover:-translate-y-1 active:scale-95 animate-pulse-soft"
                >
                  {t("pricingCta")}
                </a>
                <div className="relative z-10 mt-8 flex items-center justify-center gap-2">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping opacity-40" />
                  </div>
                  <p className="text-slate-400 text-[9px] font-bold tracking-widest">
                    {t("pricingNoCommit")}
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
              {t("faqTitle")}
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
          <span className="inline-block px-4 py-2 mb-8 bg-welqo-terracotta/10 border border-welqo-terracotta/20 text-welqo-terracotta rounded-full text-[10px] font-bold tracking-[0.15em]">
            {t("readyToDelegate")}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
            {t("propertyDeservesTitle1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
              {t("propertyDeservesTitle2")}
            </span>
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto mb-10 text-base leading-relaxed">
            {t("propertyDeservesDesc")}
          </p>
          <div className="max-w-lg mx-auto w-full">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BLOG / RESOURCES
      ══════════════════════════════════════════════════════ */}
      <section className="pt-16 pb-28 md:pt-24 md:pb-40 px-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 items-start">
            <div className="max-w-xl">
              <span className="text-welqo-terracotta text-[10px] font-bold tracking-[0.2em] mb-3 block">
                {t("expertiseBadge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white leading-tight">
                {t("guidesTitle1")}{" "}
                <span className="text-welqo-terracotta">
                  {t("guidesTitle2")}
                </span>
              </h2>
            </div>
            <a
              href={`${base}/blog`}
              className="text-sm font-bold text-slate-500 hover:text-welqo-terracotta transition-colors flex items-center gap-2 mt-2 sm:mt-0"
            >
              {t("viewAllBlog")}
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
                slug: "combien-rapporte-airbnb-lille-2026",
                title:
                  locale === "en"
                    ? "Lille Yield 2026"
                    : "Rentabilité Lille 2026",
                desc:
                  locale === "en"
                    ? "Complete study of district-by-district revenues."
                    : "Étude complète des revenus par quartier.",
                category: locale === "en" ? "Study" : "Étude",
                badgeClass:
                  "text-orange-800 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900",
                icon: (
                  <svg
                    className="w-5 h-5 text-orange-600 dark:text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
              },
              {
                slug: "checklist-lancer-airbnb-lille",
                title:
                  locale === "en" ? "Launch Your Airbnb" : "Lancer son Airbnb",
                desc:
                  locale === "en"
                    ? "The legal and practical step-by-step checklist."
                    : "La checklist juridique et pratique.",
                category: "Guide",
                badgeClass:
                  "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900",
                icon: (
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 00-2 2v12a2 2 0 002 2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                ),
              },
              {
                slug: "meilleurs-quartiers-airbnb-lille",
                title:
                  locale === "en"
                    ? "Best Neighbourhoods"
                    : "Meilleurs Quartiers",
                desc:
                  locale === "en"
                    ? "Where to invest to maximize your ROI."
                    : "Où investir pour maximiser son ROI.",
                category: locale === "en" ? "Strategy" : "Stratégie",
                badgeClass:
                  "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900",
                icon: (
                  <svg
                    className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
              },
              {
                slug: "conciergerie-airbnb-lens-arras-bassin-minier",
                title:
                  locale === "en"
                    ? "Northern France Opportunity"
                    : "Opportunité Hauts-de-France",
                desc:
                  locale === "en"
                    ? "Lens & Arras: the new eldorado."
                    : "Lens & Arras : le nouvel eldorado.",
                category: locale === "en" ? "Market" : "Marché",
                badgeClass:
                  "text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 border-violet-100 dark:border-violet-900",
                icon: (
                  <svg
                    className="w-5 h-5 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
            ].map((resource) => (
              <a
                key={resource.slug}
                href={`${base}/blog/${resource.slug}`}
                className="group relative flex flex-col justify-between p-5 xs:p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-card hover:-translate-y-2 hover:border-welqo-terracotta/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-welqo-terracotta/5 dark:bg-welqo-terracotta/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2.5 py-0.5 border text-[9px] font-bold tracking-wider rounded-md ${resource.badgeClass}`}
                    >
                      {resource.category}
                    </span>
                    <div className="p-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      {resource.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 group-hover:text-welqo-terracotta transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {resource.desc}
                  </p>
                </div>

                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-welqo-terracotta transition-colors flex items-center gap-1.5 mt-4">
                  {t("readPost")}
                  <svg
                    className="w-3 h-3 transition-transform group-hover:translate-x-1"
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
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Back to Top Button */}
      <ScrollToTop />
    </main>
  );
}
