import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import dynamic from "next/dynamic";
import { MapPin, Shield, TrendingUp, Clock } from "lucide-react";

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
      ? "À propos de Welqo — Conciergerie Airbnb Hauts-de-France"
      : "About Welqo — Airbnb Concierge Hauts-de-France",
    description: fr
      ? "Welqo est une conciergerie Airbnb fondée en Hauts-de-France. Équipe locale, commission 20% sans frais fixe, couverture Lille, Lens, Arras, Béthune."
      : "Welqo is an Airbnb concierge founded in Hauts-de-France. Local team, 20% commission with no fixed fees, covering Lille, Lens, Arras, Béthune.",
    keywords: fr
      ? [
          "conciergerie airbnb hauts-de-france",
          "welqo conciergerie",
          "gestion locative lille",
          "à propos welqo",
          "conciergerie airbnb lille lens arras béthune",
        ]
      : [
          "airbnb concierge hauts-de-france",
          "welqo about",
          "property management northern france",
        ],
    alternates: {
      canonical:
        locale === "fr"
          ? `${BASE_URL}/a-propos`
          : `${BASE_URL}/${locale}/a-propos`,
      languages: {
        fr: `${BASE_URL}/a-propos`,
        en: `${BASE_URL}/en/a-propos`,
        "x-default": `${BASE_URL}/a-propos`,
      },
    },
    openGraph: {
      title: fr ? "À propos de Welqo" : "About Welqo",
      description: fr
        ? "L'équipe derrière la conciergerie Airbnb leader en Hauts-de-France."
        : "The team behind the leading Airbnb concierge in Hauts-de-France.",
      url:
        locale === "fr"
          ? `${BASE_URL}/a-propos`
          : `${BASE_URL}/${locale}/a-propos`,
      type: "website",
    },
  };
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const fr = locale !== "en";

  const VALUES = [
    { icon: Shield, title: t("value_0_title"), desc: t("value_0_desc") },
    { icon: MapPin, title: t("value_1_title"), desc: t("value_1_desc") },
    { icon: TrendingUp, title: t("value_2_title"), desc: t("value_2_desc") },
  ];

  const STATS = [
    { value: t("stat_0_value"), label: t("stat_0_label") },
    { value: t("stat_1_value"), label: t("stat_1_label") },
    { value: t("stat_2_value"), label: t("stat_2_label") },
    { value: t("stat_3_value"), label: t("stat_3_label") },
  ];

  const CITIES = [
    { city: "Lille", slug: "conciergerie-airbnb-lille" },
    { city: "Lens", slug: "conciergerie-airbnb-lens" },
    { city: "Arras", slug: "conciergerie-airbnb-arras" },
    { city: "Béthune", slug: "conciergerie-airbnb-bethune" },
  ];

  const FAQS = [
    { q: t("faq_0_q"), a: t("faq_0_a") },
    { q: t("faq_1_q"), a: t("faq_1_a") },
    { q: t("faq_2_q"), a: t("faq_2_a") },
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: fr ? "À propos de Welqo" : "About Welqo",
    url:
      locale === "fr"
        ? `${BASE_URL}/a-propos`
        : `${BASE_URL}/${locale}/a-propos`,
    description: fr
      ? "Welqo est une conciergerie Airbnb fondée en Hauts-de-France."
      : "Welqo is an Airbnb concierge founded in Hauts-de-France.",
    mainEntity: {
      "@type": "Organization",
      name: "Welqo",
      url: BASE_URL,
      foundingLocation: {
        "@type": "Place",
        name: "Hauts-de-France, France",
      },
      areaServed: [
        { "@type": "City", name: "Lille" },
        { "@type": "City", name: "Lens" },
        { "@type": "City", name: "Arras" },
        { "@type": "City", name: "Béthune" },
      ],
      knowsAbout: [
        "Location courte durée",
        "Conciergerie Airbnb",
        "Gestion locative",
        "Tarification dynamique",
      ],
    },
  };

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
        name: "Accueil",
        item: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: fr ? "À propos" : "About",
        item:
          locale === "fr"
            ? `${BASE_URL}/a-propos`
            : `${BASE_URL}/${locale}/a-propos`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <JsonLd data={aboutSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center bg-slate-950 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.25),transparent)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 bg-welqo-terracotta/10 border border-welqo-terracotta/20 rounded-lg">
            <span className="w-1.5 h-1.5 bg-welqo-terracotta rounded-full animate-pulse-soft" />
            <span className="text-welqo-terracotta text-[9px] font-bold tracking-[0.15em]">
              {t("heroBadge")}
            </span>
          </div>
          <h1 className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.05] mb-5">
            {t("heroTitle")}
          </h1>
          <p className="text-[13px] sm:text-sm text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
            {t("missionTitle")}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t("missionText")}
          </p>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tighter text-white text-center mb-12">
            {t("statsTitle")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="text-center flex flex-col items-center gap-2"
              >
                <span className="text-3xl md:text-4xl font-black text-welqo-terracotta tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 font-bold tracking-wider max-w-[160px] leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white text-center mb-12">
            {t("valuesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-welqo-terracotta/10 flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-welqo-terracotta" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
            {t("teamTitle")}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t("teamText")}
          </p>
        </div>
      </section>

      {/* ── CITIES ───────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white text-center mb-10">
            {t("citiesTitle")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CITIES.map((item) => (
              <a
                key={item.city}
                href={fr ? `/${item.slug}` : `/en/${item.slug}`}
                className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-white/5 hover:border-welqo-terracotta/30 transition-colors group"
              >
                <MapPin className="w-4 h-4 text-welqo-terracotta shrink-0" />
                <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-welqo-terracotta transition-colors">
                  {item.city}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
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

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-20 px-6 bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,85,55,0.1),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 leading-none">
            {fr ? "Travaillons ensemble" : "Let's work together"}
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto mb-10 text-base leading-relaxed">
            {fr
              ? "Devis gratuit sous 24h, sans engagement."
              : "Free quote within 24 hours, no commitment."}
          </p>
          <div className="max-w-lg mx-auto w-full">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
