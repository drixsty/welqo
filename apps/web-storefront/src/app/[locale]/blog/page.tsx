import React from "react";
import type { Metadata } from "next";
import { BLOG_POSTS } from "../../../lib/blog";
import { JsonLd } from "../../../components/JsonLd";

const BASE_URL = "https://welqo.fr";

const CATEGORY_STYLE: Record<string, string> = {
  Rentabilité: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Guide: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Stratégie: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = locale !== "en";
  return {
    title: isFr
      ? "Blog Welqo — Conseils Airbnb & Location Courte Durée Lille"
      : "Welqo Blog — Airbnb Tips & Short-Term Rental Lille",
    description: isFr
      ? "Guides, études de marché et conseils pratiques pour rentabiliser votre bien sur Airbnb à Lille. Rédigés par les experts de la conciergerie Welqo."
      : "Guides, market studies and practical tips to maximise your Airbnb revenue in Lille. Written by Welqo concierge experts.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        fr: `${BASE_URL}/fr/blog`,
        en: `${BASE_URL}/en/blog`,
        "x-default": `${BASE_URL}/fr/blog`,
      },
    },
  };
}

export default function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isFr = locale !== "en";
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
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/${locale}/blog`,
      },
    ],
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: isFr
      ? "Blog Welqo — Conseils Airbnb Lille"
      : "Welqo Blog — Airbnb Lille Tips",
    url: `${BASE_URL}/${locale}/blog`,
    publisher: { "@type": "Organization", name: "Welqo", url: BASE_URL },
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: isFr ? p.titleFr : p.titleEn,
      url: `${BASE_URL}/${locale}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
    })),
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogSchema} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient blobs */}
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-10">
            <a href={base} className="hover:text-slate-300 transition-colors">
              {isFr ? "Accueil" : "Home"}
            </a>
            <svg
              className="w-3.5 h-3.5 text-slate-600"
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
            <span className="text-slate-300 font-semibold">Blog</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left: Title */}
            <div className="lg:w-5/12 lg:pt-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-soft" />
                {isFr ? "Ressources propriétaires" : "Owner resources"}
              </span>

              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-6">
                {isFr ? (
                  <>
                    Conseils{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                      Airbnb
                    </span>
                    <br />à Lille
                  </>
                ) : (
                  <>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                      Airbnb
                    </span>{" "}
                    Tips
                    <br />
                    in Lille
                  </>
                )}
              </h1>

              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8 max-w-sm">
                {isFr
                  ? "Guides pratiques, études de marché et stratégies pour maximiser la rentabilité de votre bien à Lille."
                  : "Practical guides, market studies and strategies to maximise your Lille property's profitability."}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {(["Rentabilité", "Guide", "Stratégie"] as const).map((cat) => (
                  <span
                    key={cat}
                    className={`px-3 py-1 rounded-full text-xs font-black border ${CATEGORY_STYLE[cat] ?? "bg-slate-800 text-slate-300 border-slate-700"}`}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-600 mt-8">
                <span>{BLOG_POSTS.length} articles</span>
                <span>·</span>
                <span>{isFr ? "Mis à jour mai 2025" : "Updated May 2025"}</span>
              </div>
            </div>

            {/* Right: Featured article */}
            <div className="lg:w-7/12 w-full">
              <a
                href={`${base}/blog/${featured.slug}`}
                className="group block relative rounded-[1.75rem] overflow-hidden bg-slate-900 border border-slate-800 hover:border-blue-600/40 transition-all duration-500 shadow-2xl hover:shadow-[0_32px_80px_-16px_rgba(37,99,235,0.2)]"
              >
                {/* Cover image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={featured.coverImage}
                    alt={featured.coverImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border backdrop-blur-sm ${CATEGORY_STYLE[featured.category] ?? "bg-slate-800 text-slate-300 border-slate-700"}`}
                    >
                      {featured.category}
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-[10px] font-black border border-white/10">
                      {isFr ? "★ Populaire" : "★ Popular"}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                    {isFr ? featured.titleFr : featured.titleEn}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-5">
                    {isFr ? featured.descriptionFr : featured.descriptionEn}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[9px] font-black text-white">
                        W
                      </div>
                      <span>Welqo</span>
                      <span>·</span>
                      <span>
                        {new Date(featured.publishedAt).toLocaleDateString(
                          isFr ? "fr-FR" : "en-GB",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </span>
                      <span>·</span>
                      <span>{featured.readingMinutes} min</span>
                    </div>
                    <span className="text-blue-400 text-sm font-black group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {isFr ? "Lire" : "Read"}
                      <svg
                        className="w-4 h-4"
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
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom curve */}
        <div
          className="relative z-10 h-12 bg-white dark:bg-black"
          style={{ borderRadius: "3rem 3rem 0 0", marginTop: "-1px" }}
        />
      </section>

      {/* ── OTHER ARTICLES ──────────────────────────────────────────── */}
      <section className="bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {isFr ? "À lire également" : "Also worth reading"}
            </h2>
            <span className="text-sm text-slate-400">
              {rest.length} {isFr ? "articles" : "articles"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((post) => (
              <a
                key={post.slug}
                href={`${base}/blog/${post.slug}`}
                className="group flex gap-5 p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-card-hover transition-all duration-300"
              >
                {/* Thumb */}
                <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700">
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col justify-between min-w-0 flex-1">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide mb-2 border ${
                        CATEGORY_STYLE[post.category] ??
                        "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {post.category}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {isFr ? post.titleFr : post.titleEn}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-2">
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString(
                        isFr ? "fr-FR" : "en-GB",
                        { month: "short", year: "numeric" },
                      )}
                    </span>
                    <span>·</span>
                    <span>
                      {post.readingMinutes} min {isFr ? "de lecture" : "read"}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                val: "1 200 €",
                label: isFr
                  ? "Revenu brut moyen / mois"
                  : "Avg. monthly revenue",
              },
              {
                val: "82 %",
                label: isFr
                  ? "Taux d'occupation Vieux-Lille"
                  : "Vieux-Lille occupancy",
              },
              {
                val: "+38 %",
                label: isFr
                  ? "Revenus avec Welqo vs solo"
                  : "Revenue vs self-managing",
              },
              {
                val: "4,9 / 5",
                label: isFr
                  ? "Note moyenne nos logements"
                  : "Avg. rating our listings",
              },
            ].map(({ val, label }) => (
              <div key={val}>
                <p className="text-2xl md:text-3xl font-black text-blue-600 tracking-tighter">
                  {val}
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 px-8 md:px-16 py-16 text-center">
              <p className="text-blue-400 text-xs font-black uppercase tracking-[0.25em] mb-4">
                {isFr ? "Passez à l'action" : "Take action"}
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
                {isFr ? (
                  <>
                    Prêt à déléguer votre
                    <br />
                    Airbnb à Lille ?
                  </>
                ) : (
                  <>
                    Ready to hand over your
                    <br />
                    Lille Airbnb?
                  </>
                )}
              </h2>
              <p className="text-slate-400 font-medium mb-8 max-w-lg mx-auto">
                {isFr
                  ? "Welqo gère tout : annonces, check-in, ménage, maintenance. Devis gratuit sous 24h."
                  : "Welqo handles everything: listings, check-in, cleaning, maintenance. Free quote in 24h."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`${base}/proprietaires`}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-glow-blue"
                >
                  {isFr ? "Découvrir nos services →" : "Explore our services →"}
                </a>
                <a
                  href={`${base}#contact`}
                  className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white rounded-2xl font-black transition-all border border-white/10"
                >
                  {isFr ? "Nous contacter" : "Contact us"}
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-slate-500 text-sm">
                {(isFr
                  ? [
                      "✓ Sans engagement",
                      "✓ Devis sous 24h",
                      "✓ Commission 15–20 %",
                    ]
                  : ["✓ No commitment", "✓ Quote in 24h", "✓ 15–20% commission"]
                ).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
