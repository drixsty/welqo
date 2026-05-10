import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Hero } from "../../components/Hero";
import { PropertyCard } from "../../components/PropertyCard";
import { BentoGrid, BentoGridItem, LuxuryCard } from "@welqo/ui";
import { JsonLd } from "../../components/JsonLd";

export default async function StorefrontPage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const base = `/${locale}`;

  const PROPERTIES = [
    {
      title: "La Demeure Bollaert",
      location: "Lens, France",
      price: 145,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      rating: 4.9,
      reviews: 32,
      guests: 6,
      badge: "Vue Stade",
      slug: "demeure-bollaert",
    },
    {
      title: "L'Appartement du Beffroi",
      location: "Arras, France",
      price: 110,
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop",
      rating: 5.0,
      reviews: 18,
      guests: 2,
      badge: "Grand-Place",
      slug: "appartement-beffroi",
    },
    {
      title: "Le Loft Art Déco",
      location: "Béthune, France",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=2070&auto=format&fit=crop",
      rating: 4.8,
      reviews: 12,
      guests: 4,
      slug: "loft-art-deco",
    },
  ];

  const isFr = locale !== "en";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://welqo.fr/#organization",
    name: "Welqo",
    description: isFr
      ? "Conciergerie Airbnb Boutique en Bassin Minier (Lens, Arras). Gestion locative courte durée, transparence totale, revenus optimisés."
      : "Boutique Airbnb concierge in Bassin Minier (Lens, Arras). Short-term rental management, full transparency, optimised revenue.",
    url: "https://welqo.fr",
    logo: "https://welqo.fr/logo.png",
    telephone: "+33-3-XX-XX-XX-XX",
    email: "contact@welqo.fr",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lens",
      addressRegion: "Hauts-de-France",
      postalCode: "62300",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.4292,
      longitude: 2.8319,
    },
    areaServed: [
      { "@type": "City", name: "Lens" },
      { "@type": "City", name: "Arras" },
      { "@type": "City", name: "Béthune" },
      { "@type": "City", name: "Douai" },
    ],
    priceRange: "€€",
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isFr
        ? "Services de Conciergerie Boutique"
        : "Boutique Concierge Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr
              ? "Gestion événementielle RC Lens"
              : "RC Lens Event Management",
            description: isFr
              ? "Optimisation spécifique pour les soirs de matches et événements au Louvre-Lens."
              : "Specific optimisation for match nights and Louvre-Lens events.",
          },
        },
      ],
    },
  };

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <JsonLd data={localBusinessSchema} />

      {/* Hero Section */}
      <Hero locale={locale} />

      {/* Featured Properties — Les Perles du Bassin Minier */}
      <section
        id="logements"
        className="py-24 px-6 relative overflow-hidden bg-white dark:bg-slate-950"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-md">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                  Sélection City Manager
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-8 leading-[0.9]">
                {t.rich("featuredTitle", {
                  span: (chunks) => (
                    <span className="text-welqo-terracotta italic block mt-2">
                      {chunks}
                    </span>
                  ),
                })}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                {t("featuredSubtitle")}
              </p>
            </div>
            <a
              href={`${base}/logements`}
              className="group inline-flex items-center gap-3 px-6 py-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-full text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all"
            >
              {t("viewCatalog")}
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-welqo-terracotta group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Background Decorative Glow */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-welqo-terracotta/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {PROPERTIES.map((p) => (
              <PropertyCard
                key={p.slug}
                title={p.title}
                location={p.location}
                price={p.price}
                image={p.image}
                rating={p.rating}
                reviews={p.reviews}
                guests={p.guests}
                badge={p.badge}
                href={`${base}/logements/${p.slug}`}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition — Propriétaires (Densité Maximale & Dashboard Pro) */}
      <section
        id="services"
        className="py-32 bg-white dark:bg-[#030712] relative overflow-hidden border-t border-slate-100 dark:border-white/[0.02]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-6 bg-welqo-terracotta/5 border border-welqo-terracotta/10 rounded-md">
              <span className="text-welqo-terracotta text-[10px] font-bold tracking-[0.2em] uppercase">
                Espace Propriétaires
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
              La gestion locative,
              <br />
              <span className="text-slate-400 dark:text-slate-500">
                réinventée par la donnée.
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
              Une infrastructure robuste conçue pour maximiser vos revenus sans
              effort. Transparence totale, performance locale.
            </p>
          </div>

          <BentoGrid className="max-w-6xl mx-auto gap-4">
            {[
              {
                title: "Analytics en temps réel",
                description:
                  "Monitoring précis de vos performances financières et taux d'occupation.",
                header: (
                  <div className="flex flex-1 w-full h-full min-h-[14rem] rounded-lg bg-slate-50 dark:bg-black p-6 border border-slate-200 dark:border-white/[0.08] relative overflow-hidden group/mockup">
                    <div className="flex flex-col h-full justify-between gap-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                            Revenu
                          </p>
                          <p className="text-lg font-mono font-bold text-slate-900 dark:text-white tracking-tighter">
                            4.890€
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                            Occupation
                          </p>
                          <p className="text-lg font-mono font-bold text-slate-900 dark:text-white tracking-tighter">
                            94%
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                            Note
                          </p>
                          <p className="text-lg font-mono font-bold text-slate-900 dark:text-white tracking-tighter">
                            4.9/5
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                            Croissance
                          </p>
                          <p className="text-lg font-mono font-bold text-emerald-500 tracking-tighter">
                            +12.4%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-end gap-1.5 h-full bg-slate-100/50 dark:bg-white/[0.02] rounded-lg p-4 border border-slate-200/50 dark:border-white/[0.05]">
                        {[
                          20, 35, 25, 50, 40, 65, 35, 80, 55, 70, 60, 90, 75,
                          85, 65, 95, 80, 45, 60, 85,
                        ].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-sm transition-all duration-500 ${i === 15 ? "bg-welqo-terracotta" : "bg-slate-300 dark:bg-white/[0.1]"}`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ),
                className: "md:col-span-2",
              },
              {
                title: "Yield Management",
                description: "Tarification dynamique intelligente.",
                header: (
                  <div className="flex flex-1 w-full h-full min-h-[14rem] rounded-lg bg-slate-50 dark:bg-black p-5 border border-slate-200 dark:border-white/[0.08] overflow-hidden">
                    <div className="flex flex-col gap-4 h-full">
                      <div className="space-y-2">
                        <div className="p-3 bg-white dark:bg-white/[0.03] rounded border border-slate-200 dark:border-white/[0.05] shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                              Match Lens
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-welqo-terracotta" />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold dark:text-white uppercase tracking-tighter">
                              12 AVRIL
                            </span>
                            <span className="text-sm font-mono font-bold text-welqo-terracotta">
                              245€
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Demand Heatmap Simulation */}
                      <div className="flex-1 bg-slate-100/50 dark:bg-white/[0.02] rounded-lg p-3 border border-slate-200/50 dark:border-white/[0.05]">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Demande (30j)
                        </p>
                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: 28 }).map((_, i) => (
                            <div
                              key={i}
                              className={`aspect-square rounded-[2px] ${i % 7 === 5 || i % 7 === 6 ? "bg-welqo-terracotta opacity-80" : "bg-slate-200 dark:bg-white/[0.1]"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
                className: "md:col-span-1",
              },
              {
                title: "Excellence Opérationnelle",
                description:
                  "Logistique hôtelière de pointe pilotée localement.",
                header: (
                  <div className="flex flex-1 w-full h-full min-h-[8rem] md:min-h-[10rem] rounded-lg bg-slate-50 dark:bg-black p-6 border border-slate-200 dark:border-white/[0.08] relative overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 justify-between items-start w-full">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                        {[
                          { label: "Ménage", status: "OK", time: "14:30" },
                          { label: "Check-in", status: "Actif", time: "16:00" },
                          { label: "Linge", status: "Livré", time: "09:15" },
                          { label: "Support", status: "24/7", time: "Online" },
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <div className="w-1 h-1 rounded-full bg-emerald-500" />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                {item.label}
                              </span>
                            </div>
                            <p className="text-xs font-bold dark:text-white">
                              {item.status}
                            </p>
                            <p className="text-[8px] font-mono text-slate-500">
                              {item.time}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="hidden lg:flex items-center gap-4 pl-8 border-l border-slate-200 dark:border-white/[0.05]">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-7 h-7 rounded-full border-2 border-slate-50 dark:border-black bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[9px] font-bold dark:text-white"
                            >
                              {i === 1 ? "JD" : i === 2 ? "ML" : "SB"}
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-bold uppercase text-slate-500">
                            Équipe locale
                          </p>
                          <p className="text-[10px] font-bold text-emerald-500">
                            Prête
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
                className: "md:col-span-3",
              },
            ].map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={`${item.className} bg-transparent border-slate-100 dark:border-white/[0.05] hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors rounded-lg overflow-hidden group p-4`}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <LuxuryCard
            variant="outline"
            className="p-10 md:p-16 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-8 text-center leading-tight">
              Prêt à redéfinir votre expérience locative ?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`${base}/#logements`}
                className="w-full sm:w-auto px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors text-center"
              >
                Explorer nos demeures
              </a>
              <a
                href={`${base}/#contact`}
                className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center"
              >
                Devenir propriétaire
              </a>
            </div>
          </LuxuryCard>
        </div>
      </section>
    </main>
  );
}
