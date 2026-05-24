import React from "react";
import type { Metadata } from "next";
import { BLOG_POSTS } from "../../../lib/blog";
import { JsonLd } from "../../../components/JsonLd";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://welqo.fr";

const CATEGORY_STYLE: Record<string, string> = {
  Rentabilité: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Guide: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Stratégie: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const CATEGORY_I18N_KEY: Record<string, string> = {
  Rentabilité: "cat_Rentabilite",
  Guide: "cat_Guide",
  Stratégie: "cat_Strategie",
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      locale !== "en"
        ? "Blog Welqo — Conseils Airbnb & Gestion Locative Hauts-de-France"
        : "Welqo Blog — Airbnb Tips & Rental Management Hauts-de-France",
    description:
      locale !== "en"
        ? "Guides pratiques, études de rentabilité et conseils d'experts pour maximiser les revenus de votre Airbnb en Hauts-de-France. Par la conciergerie Welqo."
        : "Practical guides, profitability studies and expert tips to maximise your Airbnb revenue in Hauts-de-France. By Welqo concierge.",
    keywords:
      locale !== "en"
        ? [
            "blog airbnb lille",
            "conseils location courte durée",
            "rentabilité airbnb hauts-de-france",
            "guide conciergerie airbnb",
            "revenus airbnb lille",
          ]
        : [
            "airbnb tips lille",
            "short-term rental blog",
            "airbnb revenue northern france",
          ],
    alternates: {
      canonical:
        locale === "fr" ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`,
      languages: {
        fr: `${BASE_URL}/blog`,
        en: `${BASE_URL}/en/blog`,
        "x-default": `${BASE_URL}/blog`,
      },
    },
    openGraph: {
      title:
        locale !== "en"
          ? "Blog Welqo — Conseils Airbnb Hauts-de-France"
          : "Welqo Blog — Airbnb Tips Northern France",
      description:
        locale !== "en"
          ? "Guides et études de marché pour rentabiliser votre Airbnb en Hauts-de-France."
          : "Guides and market studies to maximise your Airbnb in Hauts-de-France.",
      url: locale === "fr" ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`,
      siteName: "Welqo",
      type: "website",
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Blog" });
  const base = `/${locale}`;
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

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
        name: "Blog",
        item:
          locale === "fr" ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`,
      },
    ],
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name:
      locale !== "en"
        ? "Blog Welqo — Conseils Airbnb Hauts-de-France"
        : "Welqo Blog — Airbnb Hauts-de-France Tips",
    url: locale === "fr" ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`,
    publisher: { "@type": "Organization", name: "Welqo", url: BASE_URL },
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: locale !== "en" ? p.titleFr : p.titleEn,
      url:
        locale === "fr"
          ? `${BASE_URL}/blog/${p.slug}`
          : `${BASE_URL}/${locale}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
    })),
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-hidden selection:bg-welqo-terracotta/20">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogSchema} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 min-h-[calc(100dvh-4rem)] flex flex-col justify-center">
        {/* Cinematic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.15),transparent)]" />
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 text-[9px] font-bold text-white mb-4">
            <a
              href={base}
              className="hover:text-welqo-terracotta transition-colors uppercase"
            >
              {t("home")}
            </a>
            <span className="text-welqo-terracotta">/</span>
            <span className="text-slate-300 uppercase">Blog</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left: Title */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-white/5 border border-white/10 rounded-md shadow-sm">
                <span className="text-slate-400 text-[9px] font-bold">
                  {t("ownerResources")}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-[0.95] mb-4">
                {t("airbnbTipsTitle1")}{" "}
                <span className="text-welqo-terracotta">Airbnb</span>
                <br />
                {t("airbnbTipsTitle2")}
              </h1>

              <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6 max-w-md">
                {t("heroSubtitle")}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {(["Rentabilité", "Guide", "Stratégie"] as const).map((cat) => (
                  <span
                    key={cat}
                    className={`px-4 py-1 rounded-full text-[10px] font-bold border ${CATEGORY_STYLE[cat] ?? "bg-slate-800 text-slate-300 border-slate-700"}`}
                  >
                    {t(CATEGORY_I18N_KEY[cat] ?? cat)}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Featured article */}
            <div className="lg:w-[42%] w-full">
              <a
                href={`${base}/blog/${featured.slug}`}
                className="group block relative rounded-xl overflow-hidden bg-slate-900 border border-white/10 hover:border-welqo-terracotta/30 transition-all duration-500"
              >
                {/* Cover image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={featured.coverImage}
                    alt={featured.coverImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${CATEGORY_STYLE[featured.category] ?? "bg-slate-800 text-slate-300 border-slate-700"}`}
                    >
                      {t(
                        CATEGORY_I18N_KEY[featured.category] ??
                          featured.category,
                      )}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tighter mb-4 group-hover:text-welqo-terracotta transition-colors leading-tight">
                    {locale !== "en" ? featured.titleFr : featured.titleEn}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-0">
                    <div className="w-8 h-8 bg-welqo-terracotta rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                      W
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-300">Welqo</span>
                      <span>
                        {new Date(featured.publishedAt).toLocaleDateString(
                          locale !== "en" ? "fr-FR" : "en-GB",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}{" "}
                        · {featured.readingMinutes} min
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider removed for flat look */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20" />
      </section>

      {/* ── OTHER ARTICLES ──────────────────────────────────────────── */}
      <section className="bg-white dark:bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tighter">
              {t("latestArticles")}
            </h2>
            <div className="h-px flex-1 mx-8 bg-slate-100 dark:bg-white/5" />
            <span className="text-[10px] font-bold text-slate-400 tracking-widest">
              {rest.length} ARTICLES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((post) => (
              <a
                key={post.slug}
                href={`${base}/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row gap-5 p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-white/5 hover:bg-white dark:hover:bg-slate-900 hover:border-welqo-terracotta/20 transition-all duration-500"
              >
                {/* Thumb */}
                <div className="w-full sm:w-32 aspect-[4/3] rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-3 border ${
                        CATEGORY_STYLE[post.category] ??
                        "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {t(CATEGORY_I18N_KEY[post.category] ?? post.category)}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-welqo-terracotta transition-colors line-clamp-2">
                      {locale !== "en" ? post.titleFr : post.titleEn}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold mt-4">
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString(
                        locale !== "en" ? "fr-FR" : "en-GB",
                        { month: "short", year: "numeric" },
                      )}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span>
                      {post.readingMinutes} MIN {t("deRead")}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: "1 200 €", label: t("avgMonthlyRevenue") },
              { val: "82 %", label: t("vieuxLilleOccupancy") },
              { val: "+38 %", label: t("revenueVsSolo") },
              { val: "4,9 / 5", label: t("avgRating") },
            ].map(({ val, label }) => (
              <div key={val}>
                <p className="text-3xl md:text-4xl font-bold text-welqo-terracotta tracking-tighter">
                  {val}
                </p>
                <p className="text-[10px] text-slate-500 font-bold mt-2 tracking-widest leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-black py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-950 rounded-xl overflow-hidden relative p-12 md:p-20 text-center border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,85,55,0.1),transparent_60%)] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="relative z-10">
              <p className="text-welqo-terracotta text-[10px] font-bold tracking-[0.3em] mb-6">
                {t("ctaAction")}
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8 leading-[0.95]">
                {t("ctaTitle")}
              </h2>
              <p className="text-slate-400 font-medium text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                {t("ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${base}#contact`}
                  className="px-10 py-5 bg-welqo-terracotta hover:bg-welqo-terracotta/90 text-white rounded-xl font-bold transition-all active:scale-95 border border-welqo-terracotta/20"
                >
                  {t("freeQuote")}
                </a>
                <a
                  href={`${base}#contact`}
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/10"
                >
                  {t("contactUs")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
