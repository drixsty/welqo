import React from "react";
import { getProperties } from "@/lib/api";
import { PropertyCard } from "@/components/PropertyCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { AlertCircle } from "lucide-react";

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
                  <PropertyCard key={p.id} property={p} />
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
    </main>
  );
}
