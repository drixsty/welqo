import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import dynamic from "next/dynamic";
import { ArrowRight, Calculator, BarChart3, CheckCircle2 } from "lucide-react";

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
      ? "Calculateur de Rentabilité Airbnb Hauts-de-France — Gratuit | Welqo"
      : "Airbnb Yield Calculator Hauts-de-France — Free | Welqo",
    description: fr
      ? "Calculez gratuitement le revenu mensuel de votre Airbnb à Lille, Lens, Arras ou Béthune. Estimez votre rendement brut, net et cash-flow en 30 secondes."
      : "Calculate your Airbnb monthly revenue in Lille, Lens, Arras or Béthune for free. Estimate gross yield, net yield and cash flow in 30 seconds.",
    keywords: fr
      ? [
          "calculateur rentabilité airbnb",
          "simulateur revenus airbnb",
          "rendement airbnb hauts-de-france",
          "calculer revenus location courte durée",
          "combien rapporte airbnb lille",
        ]
      : [
          "airbnb yield calculator",
          "airbnb revenue simulator hauts-de-france",
          "short term rental calculator france",
        ],
    alternates: {
      canonical:
        locale === "fr"
          ? `${BASE_URL}/calculateur-rentabilite-airbnb`
          : `${BASE_URL}/${locale}/calculateur-rentabilite-airbnb`,
      languages: {
        fr: `${BASE_URL}/calculateur-rentabilite-airbnb`,
        en: `${BASE_URL}/en/calculateur-rentabilite-airbnb`,
        "x-default": `${BASE_URL}/calculateur-rentabilite-airbnb`,
      },
    },
    openGraph: {
      title: fr
        ? "Calculateur Rentabilité Airbnb — Welqo"
        : "Airbnb Yield Calculator — Welqo",
      description: fr
        ? "Estimez gratuitement votre revenu Airbnb en Hauts-de-France. Outil gratuit Welqo."
        : "Estimate your Airbnb revenue in Hauts-de-France for free. Free Welqo tool.",
      url:
        locale === "fr"
          ? `${BASE_URL}/calculateur-rentabilite-airbnb`
          : `${BASE_URL}/${locale}/calculateur-rentabilite-airbnb`,
      type: "website",
    },
  };
}

export default async function CalculateurPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "CalculateurPage" });
  const fr = locale !== "en";

  const HOW_STEPS = [
    {
      icon: Calculator,
      title: t("howStep1Title"),
      desc: t("howStep1Desc"),
      num: "01",
    },
    {
      icon: BarChart3,
      title: t("howStep2Title"),
      desc: t("howStep2Desc"),
      num: "02",
    },
    {
      icon: CheckCircle2,
      title: t("howStep3Title"),
      desc: t("howStep3Desc"),
      num: "03",
    },
  ];

  const FAQS = [
    { q: t("faq_0_q"), a: t("faq_0_a") },
    { q: t("faq_1_q"), a: t("faq_1_a") },
    { q: t("faq_2_q"), a: t("faq_2_a") },
    { q: t("faq_3_q"), a: t("faq_3_a") },
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

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: fr
      ? "Calculateur de Rentabilité Airbnb — Welqo"
      : "Airbnb Yield Calculator — Welqo",
    url:
      locale === "fr"
        ? `${BASE_URL}/calculateur-rentabilite-airbnb`
        : `${BASE_URL}/${locale}/calculateur-rentabilite-airbnb`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description: fr
      ? "Estimez gratuitement le revenu mensuel de votre bien Airbnb en Hauts-de-France."
      : "Estimate your Airbnb monthly revenue in Hauts-de-France for free.",
    provider: { "@type": "Organization", name: "Welqo", url: BASE_URL },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: fr ? "Calculateur Rentabilité" : "Yield Calculator",
        item:
          locale === "fr"
            ? `${BASE_URL}/calculateur-rentabilite-airbnb`
            : `${BASE_URL}/${locale}/calculateur-rentabilite-airbnb`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
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
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[0.95] mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#simulator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-welqo-terracotta text-white rounded-xl font-bold text-sm transition-all hover:bg-welqo-terracotta/90 shadow-sm active:scale-95"
            >
              {fr ? "Lancer le calculateur" : "Launch the calculator"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {t("howTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_STEPS.map((step) => (
              <div
                key={step.num}
                className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-slate-100 dark:text-slate-800">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-welqo-terracotta/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-welqo-terracotta" />
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
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

      {/* ── SIMULATOR ────────────────────────────────────────────────── */}
      <section
        id="simulator"
        className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(212,85,55,0.15),transparent)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              {fr
                ? "Calculez votre rentabilité maintenant"
                : "Calculate your yield now"}
            </h2>
          </div>
          <RevenueSimulator locale={locale} />
        </div>
      </section>

      {/* ── LIENS VILLES ─────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
              {fr
                ? "Explorez les marchés Airbnb de la région"
                : "Explore the regional Airbnb markets"}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: "Lille", slug: "conciergerie-airbnb-lille" },
              { city: "Lens", slug: "conciergerie-airbnb-lens" },
              { city: "Arras", slug: "conciergerie-airbnb-arras" },
              { city: "Béthune", slug: "conciergerie-airbnb-bethune" },
            ].map((item) => (
              <a
                key={item.city}
                href={fr ? `/${item.slug}` : `/en/${item.slug}`}
                className="flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 hover:border-welqo-terracotta/30 transition-colors font-bold text-slate-900 dark:text-white text-sm hover:text-welqo-terracotta"
              >
                {fr ? `Conciergerie ${item.city}` : `${item.city} Concierge`} →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
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
                className="group bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden hover:border-welqo-terracotta/20 transition-all duration-200"
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

      {/* ── CTA CONTACT ──────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-20 px-6 bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,85,55,0.1),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 leading-none">
            {t("ctaTitle")}
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto mb-10 text-base leading-relaxed">
            {t("ctaSubtitle")}
          </p>
          <div className="max-w-lg mx-auto w-full">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
