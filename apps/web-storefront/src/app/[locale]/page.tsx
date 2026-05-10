import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight, MapPin, ShieldCheck, Zap } from "lucide-react";
import { Hero } from "../../components/Hero";
import { PropertyCard } from "../../components/PropertyCard";
import { BentoGrid, BentoGridItem, LuxuryCard, Button } from "@welqo/ui";
import { JsonLd } from "../../components/JsonLd";
import { RevenueSimulator } from "../../components/proprietaires/RevenueSimulator";

export default async function StorefrontPage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const base = `/${locale}`;

  const PROPERTIES = [
    {
      title: "Le Cocon Lillois",
      location: "Lille, France",
      price: 120,
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop",
      rating: 4.8,
      reviews: 24,
      guests: 4,
      badge: "Coup de coeur",
      slug: "cocon-lillois",
    },
    {
      title: "Le Loft Industriel",
      location: "Lille, France",
      price: 95,
      image: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=2070&auto=format&fit=crop",
      rating: 4.9,
      reviews: 15,
      guests: 2,
      badge: "Design",
      slug: "loft-industriel",
    },
    {
      title: "Suite Art Déco - Lens",
      location: "Lens, France",
      price: 110,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      rating: 5.0,
      reviews: 32,
      guests: 2,
      badge: "Proche Louvre",
      slug: "suite-art-deco-lens",
    },
  ];

  const isFr = locale !== "en";
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Hero locale={locale} />

      {/* Featured Properties */}
      <section id="logements" className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-md shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 text-[11px] font-bold">
                  {t("featuredBadge")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[0.95] mb-6">
                {t.rich("featuredTitle", {
                  span: (chunks) => <span className="text-primary">{chunks}</span>
                })}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                {t("featuredSubtitle")}
              </p>
            </div>
            <Button
              href={`${base}/logements`}
              variant="secondary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="px-8"
            >
              {t("viewCatalog")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROPERTIES.map((p) => {
              const propertyObj = {
                id: p.slug,
                slug: p.slug,
                title: p.title,
                location: { city: p.location.split(",")[0].trim() },
                coverPhoto: p.image,
                price: { base: p.price },
                rating: p.rating,
                reviewsCount: p.reviews,
                capacity: { maxGuests: p.guests, bedrooms: 2 },
                images: [p.image]
              };
              
              return (
                <PropertyCard
                  key={p.slug}
                  property={propertyObj as any}
                  locale={locale}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Owners Section */}
      <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-primary/10 border border-primary/20 rounded-md shadow-sm">
              <span className="text-primary text-[11px] font-bold">
                {t("ownersBadge")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[0.95] mb-6">
              {t.rich("ownersTitle", {
                span: (chunks) => <span className="text-slate-500">{chunks}</span>
              })}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
              {t("ownersSubtitle")}
            </p>
          </div>

          <BentoGrid className="gap-8">
            {[
              {
                title: isFr ? "Analytics en temps réel" : "Real-time Analytics",
                description: isFr 
                  ? "Monitoring précis de vos performances financières et taux d'occupation via votre tableau de bord dédié."
                  : "Precise monitoring of your financial performance and occupancy rate via your dedicated dashboard.",
                className: "md:col-span-2",
                header: (
                  <div className="w-full h-56 bg-slate-100 dark:bg-slate-950 rounded-lg p-8 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-12 w-full max-w-md">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{isFr ? "Revenu mensuel" : "Monthly Revenue"}</p>
                        <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">4.890€</p>
                      </div>
                      <div className="space-y-2 text-right">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{isFr ? "Taux d'occupation" : "Occupancy Rate"}</p>
                        <p className="text-4xl font-bold text-emerald-500 tracking-tighter">94%</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                title: isFr ? "Yield Management" : "Yield Management",
                description: isFr
                  ? "Tarification dynamique intelligente basée sur l'offre et la demande locale en temps réel."
                  : "Intelligent dynamic pricing based on real-time local supply and demand.",
                className: "md:col-span-1",
                header: <div className="w-full h-56 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center">
                   <TrendingUp className="w-12 h-12 text-primary/40" />
                </div>
              }
            ].map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={`${item.className} bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-lg p-8 shadow-sm`}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      <section id="estimation" className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-primary/10 border border-primary/20 rounded-md shadow-sm">
              <span className="text-primary text-[11px] font-bold">
                {t("simulatorBadge")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-[0.95] tracking-tighter">
              {t.rich("simulatorTitle", {
                span: (chunks) => <span className="text-primary">{chunks}</span>
              })}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { 
                icon: Zap, 
                title: isFr ? "Pricing événementiel" : "Event Pricing", 
                desc: isFr 
                  ? "Optimisation automatique des tarifs pour les soirs de matches et événements locaux." 
                  : "Automatic price optimization for match nights and local events."
              },
              { 
                icon: ShieldCheck, 
                title: isFr ? "Gestion 360°" : "360° Management", 
                desc: isFr 
                  ? "De la photographie professionnelle à la maintenance, nous nous occupons de tout pour vous." 
                  : "From professional photography to maintenance, we take care of everything for you."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-white/5 items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-fade-up">
            <RevenueSimulator locale={locale} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="p-16 bg-slate-900 text-white rounded-lg text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,85,55,0.05),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-[0.95] tracking-tighter">
                {t("ctaTitle")}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" variant="secondary" href={`${base}/logements`} className="w-full sm:w-auto px-10">
                  {t("ctaProperties")}
                </Button>
                <Button size="lg" variant="primary" href={`${base}/proprietaires`} className="w-full sm:w-auto px-10">
                  {t("ctaOwners")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const TrendingUp = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
