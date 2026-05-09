import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { Hero } from "../../components/Hero";
import { PropertyCard } from "../../components/PropertyCard";
import { JsonLd } from "../../components/JsonLd";

export default async function StorefrontPage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const base = `/${locale}`;

  const PROPERTIES = [
    {
      title: "L'Appartement Bordelais",
      location: "Bordeaux, France",
      price: 185,
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop",
      rating: 4.9,
      reviews: 47,
      guests: 4,
      badge: "Top rated",
      slug: "appartement-bordelais",
    },
    {
      title: "Villa Contemporary",
      location: "Cap Ferret, France",
      price: 450,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      rating: 5.0,
      reviews: 23,
      guests: 8,
      badge: "Exclusif",
      slug: "villa-contemporary",
    },
    {
      title: "Le Loft Industriel",
      location: "Lille, France",
      price: 120,
      image: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=2070&auto=format&fit=crop",
      rating: 4.8,
      reviews: 61,
      guests: 2,
      slug: "loft-industriel",
    },
  ];

  const isFr = locale !== "en";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://welqo.fr/#organization",
    "name": "Welqo",
    "description": isFr
      ? "Conciergerie Airbnb à Lille. Gestion locative courte durée, transparence totale, revenus optimisés pour les propriétaires."
      : "Airbnb concierge in Lille. Short-term rental management, full transparency, optimised revenue for property owners.",
    "url": "https://welqo.fr",
    "logo": "https://welqo.fr/logo.png",
    "telephone": "+33-3-XX-XX-XX-XX",
    "email": "contact@welqo.fr",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lille",
      "addressRegion": "Hauts-de-France",
      "postalCode": "59000",
      "addressCountry": "FR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.6292,
      "longitude": 3.0573,
    },
    "areaServed": [
      { "@type": "City", "name": "Lille" },
      { "@type": "City", "name": "Roubaix" },
      { "@type": "City", "name": "Tourcoing" },
      { "@type": "City", "name": "Villeneuve-d'Ascq" },
    ],
    "priceRange": "€€",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": isFr ? "Services de Conciergerie" : "Concierge Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isFr ? "Gestion locative Airbnb complète" : "Full Airbnb property management",
            "description": isFr
              ? "Prise en charge complète : annonces, check-in/out, ménage, maintenance et suivi des revenus."
              : "Full management: listings, check-in/out, cleaning, maintenance and revenue tracking.",
          },
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": isFr ? "Optimisation de revenus locatifs" : "Rental revenue optimisation",
            "description": isFr
              ? "Tarification dynamique et stratégie multiplateforme pour maximiser votre rentabilité."
              : "Dynamic pricing and multi-platform strategy to maximise your profitability.",
          },
        },
      ],
    },
  };

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-black">
      <JsonLd data={localBusinessSchema} />
      {/* Hero Section */}
      <Hero locale={locale} />

      {/* Featured Properties */}
      <section id="logements" className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase">
              {t.rich("featuredTitle", {
                span: (chunks) => (
                  <span className="text-blue-600">{chunks}</span>
                ),
              })}
            </h2>
            <p className="text-slate-500 max-w-md font-medium">
              {t("featuredSubtitle")}
            </p>
          </div>
          <a
            href={`${base}/logements`}
            className="text-blue-600 font-bold hover:underline flex items-center gap-2 shrink-0"
          >
            {t("viewCatalog")}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </section>

      {/* Value Proposition (Owners) */}
      <section id="services" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase">
              Propriétaires : <br />
              <span className="text-blue-600">
                Libérez-vous des contraintes
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              Welqo prend en charge la gestion complète de vos biens avec une
              transparence que vous ne trouverez nulle part ailleurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Visibilité Totale",
                desc: "Un dashboard en temps réel pour voir vos revenus, le calendrier et l'état de votre bien comme si vous y étiez.",
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
              },
              {
                title: "Optimisation Revenue",
                desc: "Algorithmes de tarification dynamique pour maximiser votre rentabilité selon la demande et les événements locaux.",
                icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
              },
              {
                title: "Service 5 Étoiles",
                desc: "Ménage professionnel, maintenance réactive et communication voyageurs irréprochable 24/7.",
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
              >
                <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-24 text-center text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight relative z-10">
            PRÊT À REDÉFINIR <br /> VOTRE EXPÉRIENCE ?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <a
              href={`${base}#logements`}
              className="w-full sm:w-auto px-12 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl text-center"
            >
              Je suis Voyageur
            </a>
            <a
              href={`${base}#contact`}
              className="w-full sm:w-auto px-12 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all text-center"
            >
              Je suis Propriétaire
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
