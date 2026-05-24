import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, BLOG_POSTS } from "../../../../lib/blog";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "../../../../components/JsonLd";
import { ReadingProgress } from "../../../../components/blog/ReadingProgress";
import { ArticleToc } from "../../../../components/blog/ArticleToc";
import { ArticleCombienRapporteAirbnbLille } from "../../../../components/blog/ArticleCombienRapporteAirbnbLille";
import { ArticleChecklistLancerAirbnb } from "../../../../components/blog/ArticleChecklistLancerAirbnb";
import { ArticleMeilleursQuartiers } from "../../../../components/blog/ArticleMeilleursQuartiers";
import { ArticleConciergerieLensArras } from "../../../../components/blog/ArticleConciergerieLensArras";

const BASE_URL = "https://welqo.fr";

const CATEGORY_STYLE: Record<string, string> = {
  Rentabilité: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Guide: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Stratégie: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

interface TocItem {
  id: string;
  key: string;
}

const TOC_MAP: Record<string, TocItem[]> = {
  "combien-rapporte-airbnb-lille-2025": [
    { id: "revenus-moyens", key: "toc_revenus_moyens" },
    { id: "par-quartier", key: "toc_par_quartier" },
    { id: "facteurs", key: "toc_facteurs" },
    { id: "conciergerie", key: "toc_conciergerie" },
    { id: "reglementation", key: "toc_reglementation" },
    { id: "conclusion", key: "toc_conclusion" },
  ],
  "checklist-lancer-airbnb-lille": [
    { id: "etapes", key: "toc_etapes" },
    { id: "erreurs", key: "toc_erreurs" },
    { id: "solo-vs-conciergerie", key: "toc_solo_vs_conciergerie" },
  ],
  "meilleurs-quartiers-airbnb-lille": [
    { id: "classement", key: "toc_classement" },
    { id: "choisir", key: "toc_choisir" },
    { id: "gestion-pro", key: "toc_gestion_pro" },
  ],
  "conciergerie-airbnb-lens-arras-bassin-minier": [
    { id: "louvre-lens", key: "toc_louvre_lens" },
    { id: "rc-lens-matchs", key: "toc_rc_lens" },
    { id: "lens-vs-arras", key: "toc_lens_vs_arras" },
    { id: "rentabilite", key: "toc_rentabilite" },
    { id: "conciergerie", key: "toc_conciergerie_lens" },
    { id: "conclusion", key: "toc_conclusion" },
  ],
};

const ARTICLE_MAP: Record<string, React.ComponentType<{ locale: string }>> = {
  "combien-rapporte-airbnb-lille-2025": ArticleCombienRapporteAirbnbLille,
  "checklist-lancer-airbnb-lille": ArticleChecklistLancerAirbnb,
  "meilleurs-quartiers-airbnb-lille": ArticleMeilleursQuartiers,
  "conciergerie-airbnb-lens-arras-bassin-minier": ArticleConciergerieLensArras,
};

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: locale !== "en" ? post.titleFr : post.titleEn,
    description: locale !== "en" ? post.descriptionFr : post.descriptionEn,
    keywords: locale !== "en" ? post.keywordsFr : post.keywordsEn,
    authors: [{ name: "Welqo" }],
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
        "x-default": `${BASE_URL}/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: locale !== "en" ? post.titleFr : post.titleEn,
      description: locale !== "en" ? post.descriptionFr : post.descriptionEn,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: post.coverImage.startsWith("http")
            ? post.coverImage
            : `${BASE_URL}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const base = `/${locale}`;
  const Article = ARTICLE_MAP[slug];
  const toc = TOC_MAP[slug] ?? [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: locale !== "en" ? post.titleFr : post.titleEn,
    description: locale !== "en" ? post.descriptionFr : post.descriptionEn,
    image: post.coverImage.startsWith("http")
      ? post.coverImage
      : `${BASE_URL}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: "Welqo", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "Welqo",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${slug}`,
    },
    keywords: (locale !== "en" ? post.keywordsFr : post.keywordsEn).join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("home"),
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: locale !== "en" ? post.titleFr : post.titleEn,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-hidden selection:bg-welqo-terracotta/20">
      <ReadingProgress />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── COVER HERO ─────────────────────────────────────────────── */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-slate-950">
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Central Content Block */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-12 md:pb-16">
          <div className="max-w-5xl mx-auto w-full">
            {/* 1. Metadata Badges */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-[9px] font-bold border backdrop-blur-md ${
                  CATEGORY_STYLE[post.category] ??
                  "bg-white/10 text-white border-white/20"
                }`}
              >
                {post.category}
              </span>
              <span className="text-white/80 text-[9px] font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                {post.readingMinutes} min {t("deRead").toLowerCase()}
              </span>
            </div>

            {/* 2. Breadcrumb (Integrated) */}
            <nav className="flex items-center gap-3 text-[10px] font-bold text-white/60 mb-6 uppercase tracking-wider">
              <a
                href={base}
                className="hover:text-welqo-terracotta transition-colors"
              >
                {t("home")}
              </a>
              <span className="text-welqo-terracotta/40">/</span>
              <a
                href={`${base}/blog`}
                className="hover:text-welqo-terracotta transition-colors"
              >
                Blog
              </a>
              <span className="text-welqo-terracotta/40">/</span>
              <span className="text-white/40 truncate max-w-[200px] font-medium">
                {locale !== "en" ? post.titleFr : post.titleEn}
              </span>
            </nav>

            {/* 3. Title (Aerated) */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[1.1] max-w-4xl drop-shadow-2xl">
              {locale !== "en" ? post.titleFr : post.titleEn}
            </h1>
          </div>
        </div>

        {/* Transition curve removed for flat look */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20" />
      </div>

      {/* ── META BAR ────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-black/80 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 bg-welqo-terracotta rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-lg shadow-welqo-terracotta/20">
              W
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                Welqo
              </p>
              <p className="text-[10px] font-bold text-slate-400 leading-none mt-1 uppercase tracking-wider">
                {new Date(
                  post.updatedAt ?? post.publishedAt,
                ).toLocaleDateString(locale !== "en" ? "fr-FR" : "en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`${base}#contact`}
              className="px-6 py-2 bg-welqo-terracotta hover:bg-welqo-terracotta/90 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-welqo-terracotta/10"
            >
              {t("freeSimulation")}
            </a>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY + TOC ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-8 xl:grid xl:grid-cols-[1fr_240px] xl:gap-16 xl:items-start">
        {/* Main content */}
        <div className="min-w-0">
          {/* Description lead */}
          <div className="mb-8 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-welqo-terracotta max-w-2xl">
            <p className="text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
              "{locale !== "en" ? post.descriptionFr : post.descriptionEn}"
            </p>
          </div>

          {/* Article content */}
          <div className="prose prose-slate dark:prose-invert max-w-3xl prose-p:text-[14px] prose-p:leading-snug prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:mb-3 prose-headings:tracking-tighter prose-headings:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3">
            {Article ? (
              <Article locale={locale} />
            ) : (
              <p className="text-slate-500">{t("articleComingSoon")}</p>
            )}
          </div>

          {/* CTA inline */}
          <div className="mt-12 p-10 md:p-12 bg-slate-950 rounded-xl text-white text-center relative overflow-hidden border border-white/5 max-w-3xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,85,55,0.15),transparent_60%)] pointer-events-none" />
            <div className="relative z-10">
              <p className="text-welqo-terracotta text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">
                {t("takeAction")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
                {t("readyTitle")}
              </h2>
              <p className="text-slate-400 font-medium mb-10 text-lg max-w-lg mx-auto leading-relaxed">
                {t("readySubtitle")}
              </p>
              <a
                href={`${base}#contact`}
                className="inline-block px-10 py-4 bg-welqo-terracotta text-white rounded-xl font-bold hover:bg-welqo-terracotta/90 transition-all active:scale-95 border border-welqo-terracotta/20"
              >
                {t("freeQuote")}
              </a>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tighter">
                {t("relatedArticles")}
              </h2>
              <div className="h-px flex-1 bg-slate-100 dark:bg-white/5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {BLOG_POSTS.filter((p) => p.slug !== slug)
                .slice(0, 2)
                .map((p) => (
                  <a
                    key={p.slug}
                    href={`${base}/blog/${p.slug}`}
                    className="group flex flex-col gap-4 p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-white/5 hover:bg-white dark:hover:bg-slate-900 hover:border-welqo-terracotta/20 transition-all duration-500"
                  >
                    <div className="aspect-[16/9] rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                      <img
                        src={p.coverImage}
                        alt={p.coverImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="px-1">
                      <span className="text-[10px] font-bold text-welqo-terracotta block mb-1 tracking-wider">
                        {p.category.toUpperCase()}
                      </span>
                      <p className="font-bold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-welqo-terracotta transition-colors line-clamp-2 tracking-tight">
                        {locale !== "en" ? p.titleFr : p.titleEn}
                      </p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* Sticky TOC sidebar */}
        {toc.length > 0 && (
          <aside className="hidden xl:block xl:sticky xl:top-28 xl:self-start">
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                {t("summaryLabel")}
              </p>
              <nav className="space-y-5">
                {toc.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-xs font-bold text-slate-500 hover:text-welqo-terracotta transition-colors"
                  >
                    <span className="text-slate-300 dark:text-slate-700 mr-3">
                      0{i + 1}
                    </span>
                    {t(item.key as any)}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
