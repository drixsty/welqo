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
      <JsonLd data={{}} />

      <Hero locale={locale} />

      {/* Featured Properties */}
      <section id="logements" className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-md shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 text-[11px] font-bold">
                  Sélection City Manager
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter leading-none mb-8">
                Les perles du <span className="text-primary">Bassin Minier</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                Découvrez notre catalogue exclusif de propriétés gérées avec excellence à Lens, Arras et Béthune.
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
              Voir tout le catalogue
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Owners Section */}
      <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-primary/10 border border-primary/20 rounded-md shadow-sm">
              <span className="text-primary text-[11px] font-bold">
                Espace Propriétaires
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter leading-none mb-8">
              La gestion locative, <span className="text-slate-500">réinventée par la donnée.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
              Une infrastructure robuste conçue pour maximiser vos revenus. Transparence totale, performance locale et pilotage simplifié.
            </p>
          </div>

          <BentoGrid className="gap-8">
            {[
              {
                title: "Analytics en temps réel",
                description: "Monitoring précis de vos performances financières et taux d'occupation via votre tableau de bord dédié.",
                className: "md:col-span-2",
                header: (
                  <div className="w-full h-56 bg-slate-100 dark:bg-slate-950 rounded-lg p-8 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-12 w-full max-w-md">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Revenu mensuel</p>
                        <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">4.890€</p>
                      </div>
                      <div className="space-y-2 text-right">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Taux d'occupation</p>
                        <p className="text-4xl font-bold text-emerald-500 tracking-tighter">94%</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                title: "Yield Management",
                description: "Tarification dynamique intelligente basée sur l'offre et la demande locale en temps réel.",
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

      {/* Simulator */}
      <section id="estimation" className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-primary/10 border border-primary/20 rounded-md shadow-sm">
                <span className="text-primary text-[11px] font-bold">
                  Maximisation de CA
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-10 leading-tight tracking-tighter">
                Estimez vos revenus en <span className="text-primary">Bassin Minier</span>
              </h2>
              <div className="space-y-8">
                {[
                  { icon: Zap, title: "Pricing événementiel", desc: "Optimisation automatique des tarifs pour les soirs de matches et événements locaux." },
                  { icon: ShieldCheck, title: "Gestion 360°", desc: "De la photographie professionnelle à la maintenance, nous nous occupons de tout pour vous." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-6 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <RevenueSimulator />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="p-16 bg-slate-900 text-white rounded-lg text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,85,55,0.05),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight tracking-tighter">
                Prêt à redéfinir votre expérience locative ?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10">
                  Explorer nos demeures
                </Button>
                <Button size="lg" variant="primary" className="w-full sm:w-auto px-10">
                  Devenir propriétaire Welqo
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
