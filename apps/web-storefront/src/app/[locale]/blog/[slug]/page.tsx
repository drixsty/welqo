import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, BLOG_POSTS } from "../../../../lib/blog";
import { JsonLd } from "../../../../components/JsonLd";
import { ReadingProgress } from "../../../../components/blog/ReadingProgress";
import { ArticleToc } from "../../../../components/blog/ArticleToc";
import { ArticleCombienRapporteAirbnbLille } from "../../../../components/blog/ArticleCombienRapporteAirbnbLille";
import { ArticleChecklistLancerAirbnb } from "../../../../components/blog/ArticleChecklistLancerAirbnb";
import { ArticleMeilleursQuartiers } from "../../../../components/blog/ArticleMeilleursQuartiers";

const BASE_URL = "https://welqo.fr";

const CATEGORY_STYLE: Record<string, string> = {
  Rentabilité: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Guide: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Stratégie: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

interface TocItem {
  id: string;
  title: string;
}

const TOC_MAP: Record<string, TocItem[]> = {
  "combien-rapporte-airbnb-lille-2025": [
    { id: "revenus-moyens", title: "Revenus moyens à Lille" },
    { id: "par-quartier", title: "Données par quartier" },
    { id: "facteurs", title: "Facteurs de rentabilité" },
    { id: "conciergerie", title: "Faut-il une conciergerie ?" },
    { id: "reglementation", title: "Réglementation 2025" },
    { id: "conclusion", title: "Conclusion" },
  ],
  "checklist-lancer-airbnb-lille": [
    { id: "etapes", title: "Les 6 étapes essentielles" },
    { id: "erreurs", title: "Erreurs fréquentes" },
    { id: "solo-vs-conciergerie", title: "Solo vs conciergerie" },
  ],
  "meilleurs-quartiers-airbnb-lille": [
    { id: "classement", title: "Classement des quartiers" },
    { id: "choisir", title: "Choisir selon son profil" },
    { id: "gestion-pro", title: "Impact de la gestion pro" },
  ],
};

const ARTICLE_MAP: Record<string, React.ComponentType<{ locale: string }>> = {
  "combien-rapporte-airbnb-lille-2025": ArticleCombienRapporteAirbnbLille,
  "checklist-lancer-airbnb-lille": ArticleChecklistLancerAirbnb,
  "meilleurs-quartiers-airbnb-lille": ArticleMeilleursQuartiers,
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
  const isFr = locale !== "en";

  return {
    title: isFr ? post.titleFr : post.titleEn,
    description: isFr ? post.descriptionFr : post.descriptionEn,
    keywords: isFr ? post.keywordsFr : post.keywordsEn,
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
      title: isFr ? post.titleFr : post.titleEn,
      description: isFr ? post.descriptionFr : post.descriptionEn,
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

export default function BlogPostPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const isFr = locale !== "en";
  const base = `/${locale}`;
  const Article = ARTICLE_MAP[slug];
  const toc = TOC_MAP[slug] ?? [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: isFr ? post.titleFr : post.titleEn,
    description: isFr ? post.descriptionFr : post.descriptionEn,
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
    keywords: (isFr ? post.keywordsFr : post.keywordsEn).join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
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
        name: isFr ? post.titleFr : post.titleEn,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <ReadingProgress />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── COVER HERO ─────────────────────────────────────────────── */}
      <div className="relative h-80 md:h-[480px] w-full overflow-hidden bg-slate-900">
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Top breadcrumb */}
        <div className="absolute top-24 left-0 right-0 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-slate-400">
              <a href={base} className="hover:text-white transition-colors">
                {isFr ? "Accueil" : "Home"}
              </a>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 18l6-6-6-6"
                />
              </svg>
              <a
                href={`${base}/blog`}
                className="hover:text-white transition-colors"
              >
                Blog
              </a>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 18l6-6-6-6"
                />
              </svg>
              <span className="text-slate-300 truncate max-w-[200px] font-medium">
                {isFr ? post.titleFr : post.titleEn}
              </span>
            </nav>
          </div>
        </div>

        {/* Bottom title */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 md:pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide border backdrop-blur-sm ${
                  CATEGORY_STYLE[post.category] ??
                  "bg-white/10 text-white border-white/20"
                }`}
              >
                {post.category}
              </span>
              <span className="text-slate-400 text-xs">
                {post.readingMinutes} min {isFr ? "de lecture" : "read"}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight max-w-3xl">
              {isFr ? post.titleFr : post.titleEn}
            </h1>
          </div>
        </div>
      </div>

      {/* ── META BAR ────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-black sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-black/95">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0">
              W
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-slate-900 dark:text-white leading-none">
                Welqo
              </p>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5">
                {new Date(
                  post.updatedAt ?? post.publishedAt,
                ).toLocaleDateString(isFr ? "fr-FR" : "en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {post.readingMinutes} min
            </span>
            <a
              href={`${base}/proprietaires`}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-black transition-colors"
            >
              {isFr ? "Devis gratuit" : "Free quote"}
            </a>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY + TOC ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 xl:grid xl:grid-cols-[1fr_260px] xl:gap-16 xl:items-start">
        {/* Main content */}
        <div className="min-w-0">
          {/* Description lead */}
          <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border-l-4 border-blue-600">
            <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {isFr ? post.descriptionFr : post.descriptionEn}
            </p>
          </div>

          {/* Article content */}
          {Article ? (
            <Article locale={locale} />
          ) : (
            <p className="text-slate-500">
              {isFr ? "Article en cours de rédaction." : "Article coming soon."}
            </p>
          )}

          {/* CTA inline */}
          <div className="mt-16 p-8 md:p-10 bg-blue-600 rounded-[1.75rem] text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                {isFr
                  ? "Prêt à déléguer votre Airbnb à Lille ?"
                  : "Ready to hand over your Lille Airbnb?"}
              </h2>
              <p className="text-blue-100 font-medium mb-6 text-sm max-w-md mx-auto">
                {isFr
                  ? "Welqo s'occupe de tout : annonces, check-in, ménage, maintenance. Devis gratuit en 24h."
                  : "Welqo handles everything: listings, check-in, cleaning, maintenance. Free quote in 24h."}
              </p>
              <a
                href={`${base}/proprietaires`}
                className="inline-block px-8 py-3.5 bg-white text-blue-600 rounded-2xl font-black hover:scale-105 transition-transform active:scale-95 shadow-lg"
              >
                {isFr ? "Découvrir nos services →" : "Explore our services →"}
              </a>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-16">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              {isFr ? "À lire également" : "Related articles"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BLOG_POSTS.filter((p) => p.slug !== slug)
                .slice(0, 2)
                .map((p) => (
                  <a
                    key={p.slug}
                    href={`${base}/blog/${p.slug}`}
                    className="group flex gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={p.coverImage}
                        alt={p.coverImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-wide text-blue-600 block mb-1">
                        {p.category}
                      </span>
                      <p className="font-black text-slate-900 dark:text-white text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {isFr ? p.titleFr : p.titleEn}
                      </p>
                      <p className="text-xs text-slate-400 mt-1.5">
                        {p.readingMinutes} min {isFr ? "de lecture" : "read"}
                      </p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* Sticky TOC sidebar */}
        {toc.length > 0 && (
          <aside className="hidden xl:block xl:sticky xl:top-24 xl:self-start mt-2">
            <ArticleToc items={toc} locale={locale} />
          </aside>
        )}
      </div>
    </main>
  );
}
