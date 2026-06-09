import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Camera,
  Wrench,
  BarChart3,
  Clock,
  Shield,
} from "lucide-react";

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
      ? "Confier son Airbnb à Welqo — Gestion Déléguée Hauts-de-France"
      : "Delegate Your Airbnb to Welqo — Managed Rentals Northern France",
    description: fr
      ? "Confiez la gestion de votre Airbnb à Welqo. Annonces optimisées, ménage 5★, check-in 24/7, pricing dynamique. Commission 20 %, zéro frais fixe. Devis gratuit sous 24h — Lille, Lens, Arras, Béthune."
      : "Delegate your Airbnb management to Welqo. Optimised listings, 5★ cleaning, 24/7 check-in, dynamic pricing. 20% commission, zero fixed fees. Free quote within 24h — Lille, Lens, Arras, Béthune.",
    keywords: fr
      ? [
          "confier airbnb",
          "déléguer gestion airbnb",
          "gestion déléguée airbnb hauts-de-france",
          "gérer airbnb à ma place",
          "conciergerie airbnb propriétaire",
          "gestion locative courte durée",
        ]
      : [
          "delegate airbnb management",
          "airbnb property manager northern france",
          "managed airbnb hauts-de-france",
        ],
    alternates: {
      canonical:
        locale === "fr"
          ? `${BASE_URL}/proprietaires`
          : `${BASE_URL}/${locale}/proprietaires`,
      languages: {
        fr: `${BASE_URL}/proprietaires`,
        en: `${BASE_URL}/en/proprietaires`,
        "x-default": `${BASE_URL}/proprietaires`,
      },
    },
    openGraph: {
      title: fr
        ? "Confier son Airbnb à Welqo — Welqo"
        : "Delegate Your Airbnb to Welqo — Welqo",
      description: fr
        ? "Gestion locative Airbnb clé en main dans les Hauts-de-France. Commission 20 %, sans frais fixe."
        : "Turnkey Airbnb rental management in Northern France. 20% commission, no fixed fees.",
      url:
        locale === "fr"
          ? `${BASE_URL}/proprietaires`
          : `${BASE_URL}/${locale}/proprietaires`,
      type: "website",
    },
  };
}

export default async function ProprietairesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "ProprietairesPage" });
  const tHome = await getTranslations({ locale, namespace: "HomePage" });
  const fr = locale !== "en";

  const STEPS = [
    {
      n: "01",
      duration: tHome("step_0_duration"),
      title: tHome("step_0_title"),
      desc: tHome("step_0_desc"),
    },
    {
      n: "02",
      duration: tHome("step_1_duration"),
      title: tHome("step_1_title"),
      desc: tHome("step_1_desc"),
    },
    {
      n: "03",
      duration: tHome("step_2_duration"),
      title: tHome("step_2_title"),
      desc: tHome("step_2_desc"),
    },
  ];

  const SERVICES = [
    { icon: Camera, label: tHome("pricingFeature_1") },
    { icon: TrendingUp, label: tHome("pricingFeature_5") },
    { icon: CheckCircle2, label: tHome("pricingFeature_2") },
    { icon: Wrench, label: tHome("pricingFeature_4") },
    { icon: BarChart3, label: tHome("pricingFeature_6") },
    { icon: Shield, label: tHome("pricingFeature_7") },
  ];

  const COMPARE_ROWS = [
    {
      label: tHome("compare_0_label"),
      solo: tHome("compare_0_solo"),
      welqo: tHome("compare_0_welqo"),
      agency: tHome("compare_0_agency"),
    },
    {
      label: tHome("compare_1_label"),
      solo: tHome("compare_1_solo"),
      welqo: tHome("compare_1_welqo"),
      agency: tHome("compare_1_agency"),
    },
    {
      label: tHome("compare_2_label"),
      solo: tHome("compare_2_solo"),
      welqo: tHome("compare_2_welqo"),
      agency: tHome("compare_2_agency"),
    },
    {
      label: tHome("compare_3_label"),
      solo: tHome("compare_3_solo"),
      welqo: tHome("compare_3_welqo"),
      agency: tHome("compare_3_agency"),
    },
    {
      label: tHome("compare_4_label"),
      solo: tHome("compare_4_solo"),
      welqo: tHome("compare_4_welqo"),
      agency: tHome("compare_4_agency"),
    },
    {
      label: tHome("compare_6_label"),
      solo: tHome("compare_6_solo"),
      welqo: tHome("compare_6_welqo"),
      agency: tHome("compare_6_agency"),
    },
    {
      label: tHome("compare_7_label"),
      solo: tHome("compare_7_solo"),
      welqo: tHome("compare_7_welqo"),
      agency: tHome("compare_7_agency"),
    },
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
        name: locale === "en" ? "For Owners" : "Propriétaires",
        item:
          locale === "fr"
            ? `${BASE_URL}/proprietaires`
            : `${BASE_URL}/${locale}/proprietaires`,
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business-proprietaires`,
    name: "Welqo — Conciergerie Airbnb Hauts-de-France",
    description:
      locale === "en"
        ? "Delegate your Airbnb management to Welqo. Dynamic pricing, 5★ cleaning, 24/7 guest reception. 20% commission, no fixed fees."
        : "Confiez la gestion de votre Airbnb à Welqo. Pricing dynamique, ménage 5★, accueil 24h/24. Commission 20%, sans frais fixe.",
    url: `${BASE_URL}/proprietaires`,
    telephone: "+33999912173",
    email: "contact@welqo.fr",
    priceRange: "20%",
    image: `${BASE_URL}/og-image.jpg`,
    sameAs: [
      "https://www.facebook.com/welqo",
      "https://www.instagram.com/welqo.conciergerie",
    ],
    areaServed: [
      { "@type": "City", name: "Lille" },
      { "@type": "City", name: "Lens" },
      { "@type": "City", name: "Arras" },
      { "@type": "City", name: "Béthune" },
      { "@type": "City", name: "Douai" },
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
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={localBusinessSchema} />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 px-6 bg-slate-950 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.25),transparent)]" />
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
              {fr ? "Obtenir mon devis gratuit" : "Get my free quote"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS EN 3 ÉTAPES ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-welqo-terracotta text-[10px] font-bold tracking-[0.2em] mb-3 block">
              {fr ? "Notre process" : "Our process"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {tHome("processTitle1")}{" "}
              <span className="text-welqo-terracotta">
                {tHome("processTitle2")}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">
                    {step.n}
                  </span>
                  <span className="text-xs font-bold text-welqo-terracotta bg-welqo-terracotta/10 px-2.5 py-1 rounded-full tracking-wider">
                    {step.duration}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE QUI EST INCLUS ───────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-welqo-terracotta text-[10px] font-bold tracking-[0.2em] mb-3 block">
              {fr ? "Services inclus" : "Included services"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {tHome("servicesTitle1")}
              <br />
              <span className="text-welqo-terracotta">
                {tHome("servicesTitle2")}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5"
              >
                <div className="w-9 h-9 rounded-lg bg-welqo-terracotta/10 flex items-center justify-center shrink-0">
                  <svc.icon className="w-4 h-4 text-welqo-terracotta" />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {svc.label}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing pill */}
          <div className="mt-12 p-8 bg-slate-950 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">
                {tHome("pricingBadge")}
              </p>
              <p className="text-white font-bold text-xl">
                {tHome("pricingTitle1")} {tHome("pricingTitle2")}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                {tHome("pricingSubtitle")}
              </p>
            </div>
            <div className="flex flex-col items-center shrink-0">
              <span className="text-6xl font-black text-welqo-terracotta leading-none">
                20<span className="text-3xl">%</span>
              </span>
              <span className="text-slate-400 text-xs font-bold tracking-wider mt-1">
                {tHome("pricingOfGross")}
              </span>
              <span className="text-slate-500 text-xs mt-0.5">
                {tHome("pricingNoCommit")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARATIF ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {tHome("whyTitle")}
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-slate-950 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/5">
                  <th className="text-left px-6 py-4 font-bold text-slate-500 dark:text-slate-400 tracking-wider text-xs">
                    {tHome("compareCriteria")}
                  </th>
                  <th className="px-4 py-4 font-bold text-slate-500 dark:text-slate-400 tracking-wider text-xs text-center">
                    {tHome("compareSolo")}
                  </th>
                  <th className="px-4 py-4 font-bold text-welqo-terracotta tracking-wider text-xs text-center bg-welqo-terracotta/5">
                    Welqo
                  </th>
                  <th className="px-4 py-4 font-bold text-slate-500 dark:text-slate-400 tracking-wider text-xs text-center">
                    {tHome("compareAgency")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                      {row.label}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-500 dark:text-slate-400">
                      {row.solo}
                    </td>
                    <td className="px-4 py-4 text-center font-semibold text-welqo-terracotta bg-welqo-terracotta/5">
                      {row.welqo}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-500 dark:text-slate-400">
                      {row.agency}
                    </td>
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

      {/* ── CONTACT ────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-20 px-6 bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,85,55,0.1),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 leading-none">
            {fr
              ? "Prêt à confier votre bien à Welqo ?"
              : "Ready to entrust your property to Welqo?"}
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto mb-10 text-base leading-relaxed">
            {fr
              ? "Audit gratuit sous 24h. Notre équipe vous contacte pour évaluer votre potentiel locatif — sans engagement."
              : "Free audit within 24h. Our team contacts you to evaluate your rental potential — no commitment."}
          </p>
          <div className="max-w-lg mx-auto w-full">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
