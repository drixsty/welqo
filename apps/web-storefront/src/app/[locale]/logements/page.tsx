import React from "react";
import { getProperties } from "@/lib/api";
import { PropertyCard } from "@/components/PropertyCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { AlertCircle } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = locale === "fr";
  const BASE_URL = "https://welqo.fr";
  
  return {
    title: isFr 
      ? "Nos Demeures d'Exception | Conciergerie Welqo Bassin Minier" 
      : "Our Exceptional Properties | Welqo Concierge Bassin Minier",
    description: isFr
      ? "Découvrez notre sélection de logements premium à Lens, Arras et Béthune. Réservez votre séjour idéal avec Welqo."
      : "Discover our selection of premium properties in Lens, Arras, and Béthune. Book your ideal stay with Welqo.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/logements`,
      languages: {
        fr: `${BASE_URL}/fr/logements`,
        en: `${BASE_URL}/en/logements`,
        "x-default": `${BASE_URL}/fr/logements`,
      },
    },
  };
}

export default async function PropertyListingPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: any;
}) {
  const response = await getProperties(searchParams) || { properties: [], distribution: [] };
  const properties = response.properties || [];
  const distribution = response.distribution || [];
  const isFr = locale === "fr";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Content Area */}
          <div className="flex-1 space-y-10 order-2 lg:order-1">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {isFr ? "Trouvez votre séjour idéal" : "Find your perfect stay"}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  {properties.length} {isFr ? "logements disponibles dans le bassin minier" : "Properties available in the mining area"}
                </p>
              </div>
            </div>

            {/* Property Grid */}
            {properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-white/10 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isFr ? "Aucun résultat pour cette recherche" : "No results for this search"}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1">
                    {isFr 
                      ? "Essayez de modifier vos filtres ou de réinitialiser la recherche pour trouver d'autres logements." 
                      : "Try adjusting your filters or resetting the search to find other properties."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} locale={locale} />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Fixed Filter Sidebar */}
          <div className="order-1 lg:order-2">
            <FilterSidebar locale={locale} distribution={distribution} />
          </div>
        </div>
      </div>

      {/* Trust Section / Footer spacing */}
      <div className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
            Welqo — excellence en conciergerie
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            {isFr 
              ? "Tous nos logements sont sélectionnés avec soin et gérés directement par nos équipes locales pour vous garantir un séjour sans compromis." 
              : "All our properties are carefully selected and managed directly by our local teams to guarantee you an uncompromising stay."}
          </p>
        </div>
      </div>
      {/* ── BLOG SECTION ────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white dark:bg-black border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
                Blog Welqo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white leading-none">
                Conseils pour vos <span className="text-primary">prochains séjours.</span>
              </h2>
            </div>
            <a 
              href={`/${locale}/blog`}
              className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-2"
            >
              Voir tout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                slug: "meilleurs-quartiers-airbnb-lille",
                title: "Où loger à Lille ?",
                category: "Guide Voyage"
              },
              {
                slug: "combien-rapporte-airbnb-lille-2025",
                title: "Marché Locatif 2025",
                category: "Investissement"
              },
              {
                slug: "conciergerie-airbnb-lens-arras-bassin-minier",
                title: "Focus Bassin Minier",
                category: "Local"
              }
            ].map((post) => (
              <a 
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Lire l'article
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
