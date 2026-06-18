import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "../../../../components/JsonLd";
import { ReadingProgress } from "../../../../components/blog/ReadingProgress";
import { reader } from "../../../../lib/reader";
import {
  DocumentRenderer,
  DocumentRendererProps,
} from "@keystatic/core/renderer";

const BASE_URL = "https://welqo.fr";

const CATEGORY_STYLE: Record<string, string> = {
  Rentabilité: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Guide: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Stratégie: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

export async function generateStaticParams() {
  const posts = await reader.collections.posts.list();
  const locales = ["en", "fr"];
  return locales.flatMap((locale) =>
    posts.map((slug) => ({
      slug,
      locale,
    }))
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getTextFromReactNode(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextFromReactNode).join("");
  if (node.props && node.props.children)
    return getTextFromReactNode(node.props.children);
  return "";
}

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const post = await reader.collections.posts.read(slug);
  if (!post) return {};

  const title = locale !== "en" ? post.titleFr : post.titleEn;
  const description = locale !== "en" ? post.descriptionFr : post.descriptionEn;
  const keywords = locale !== "en" ? post.keywordsFr : post.keywordsEn;
  const coverImage = post.coverImage || post.coverImageUrl || "";
  const coverImageAlt =
    (locale !== "en" ? post.coverImageAltFr : post.coverImageAltEn) || "";

  const imageUrl = coverImage.startsWith("http")
    ? coverImage
    : `${BASE_URL}${coverImage}`;

  return {
    title: `${title} — Welqo`,
    description,
    keywords: [...keywords],
    authors: [{ name: "Welqo" }],
    alternates: {
      canonical:
        locale === "fr"
          ? `${BASE_URL}/blog/${slug}`
          : `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        fr: `${BASE_URL}/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
        "x-default": `${BASE_URL}/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: coverImageAlt,
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
  const post = await reader.collections.posts.read(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const base = `/${locale}`;

  const title = locale !== "en" ? post.titleFr : post.titleEn;
  const description = locale !== "en" ? post.descriptionFr : post.descriptionEn;
  const keywords = locale !== "en" ? post.keywordsFr : post.keywordsEn;
  const coverImage = post.coverImage || post.coverImageUrl || "";
  const coverImageAlt =
    (locale !== "en" ? post.coverImageAltFr : post.coverImageAltEn) || "";

  const contentNodes = await (locale !== "en"
    ? post.contentFr()
    : post.contentEn());

  // Dynamically generate the TOC from H2 headings in contentNodes
  const toc = contentNodes
    .filter((node: any) => node.type === "heading" && node.level === 2)
    .map((node: any) => {
      const text = node.children.map((c: any) => c.text || "").join("");
      return {
        id: slugify(text),
        text,
      };
    });

  // Custom DocumentRenderer to set dynamic IDs matching the TOC and format properly
  const renderers: DocumentRendererProps["renderers"] = {
    block: {
      heading: ({ level, children }) => {
        const textContent = getTextFromReactNode(children);
        const id = slugify(textContent);
        const Heading = `h${level}` as any;
        return (
          <Heading id={id} className="scroll-mt-28">
            {children}
          </Heading>
        );
      },
    },
  };

  const imageUrl = coverImage.startsWith("http")
    ? coverImage
    : `${BASE_URL}${coverImage}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: imageUrl,
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
      "@id":
        locale === "fr"
          ? `${BASE_URL}/blog/${slug}`
          : `${BASE_URL}/${locale}/blog/${slug}`,
    },
    keywords: keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("home"),
        item: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item:
          locale === "fr" ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
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
        <Image
          src={imageUrl}
          alt={coverImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Central Content Block */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-12 md:pb-16">
          <div className="max-w-5xl mx-auto w-full">
            {/* 1. Metadata Badges */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`px-3 py-1 rounded-lg text-[9px] font-bold border backdrop-blur-md ${
                  CATEGORY_STYLE[post.category] ??
                  "bg-white/10 text-white border-white/20"
                }`}
              >
                {post.category}
              </span>
              <span className="text-white/80 text-[9px] font-bold tracking-widest bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/5">
                {post.readingMinutes} min {t("deRead").toLowerCase()}
              </span>
            </div>

            {/* 2. Breadcrumb (Integrated) */}
            <nav className="flex items-center gap-3 text-[10px] font-bold text-white/60 mb-6 tracking-wider">
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
                {title}
              </span>
            </nav>

            {/* 3. Title (Aerated) */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[1.1] max-w-4xl drop-shadow-2xl">
              {title}
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
              <p className="text-[10px] font-bold text-slate-400 leading-none mt-1 tracking-wider">
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
              "{description}"
            </p>
          </div>

          {/* Article content */}
          <div className="prose prose-slate dark:prose-invert max-w-3xl prose-p:text-[14px] prose-p:leading-snug prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:mb-3 prose-headings:tracking-tighter prose-headings:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3">
            <DocumentRenderer document={contentNodes} renderers={renderers} />
          </div>

          {/* CTA inline */}
          <div className="mt-12 p-10 md:p-12 bg-slate-950 rounded-xl text-white text-center relative overflow-hidden border border-white/5 max-w-3xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,85,55,0.15),transparent_60%)] pointer-events-none" />
            <div className="relative z-10">
              <p className="text-welqo-terracotta text-[10px] font-bold tracking-[0.3em] mb-6">
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
        </div>

        {/* Sticky TOC sidebar */}
        {toc.length > 0 && (
          <aside className="hidden xl:block xl:sticky xl:top-28 xl:self-start">
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 mb-6">
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
                    {item.text}
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
