import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Gallery } from "../../../../components/Gallery";
import { BookingWidget } from "../../../../components/BookingWidget";
import { JsonLd } from "../../../../components/JsonLd";
import {
  Users,
  Bed,
  Bath,
  DoorOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const BASE_URL = "https://welqo.fr";

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const isFr = locale !== "en";
  // In a real app this would come from the DB via slug
  const title = "L'Appartement Bordelais";
  const city = "Lille";
  return {
    title: isFr
      ? `${title} — Location Courte Durée ${city} | Welqo`
      : `${title} — Short-Term Rental ${city} | Welqo`,
    description: isFr
      ? `Réservez ${title} à ${city} via Welqo. Appartement de luxe, gestion professionnelle, check-in flexible. À partir de 185€ / nuit.`
      : `Book ${title} in ${city} via Welqo. Luxury apartment, professional management, flexible check-in. From €185 / night.`,
    alternates: {
      canonical: `${BASE_URL}/${locale}/logements/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/logements/${slug}`,
        en: `${BASE_URL}/en/logements/${slug}`,
        "x-default": `${BASE_URL}/fr/logements/${slug}`,
      },
    },
    openGraph: {
      title: `${title} — Welqo`,
      description: isFr
        ? `Location courte durée à ${city}. À partir de 185€ / nuit.`
        : `Short-term rental in ${city}. From €185 / night.`,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop",
          width: 1200,
          height: 800,
        },
      ],
      type: "website",
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations("PropertyPage");
  const base = `/${locale}`;

  // Mock data for the pilot property
  const property = {
    id: "prop_bordeaux_001",
    title: "L'Appartement Bordelais",
    description:
      "Nichée au cœur du triangle d'or, cette demeure d'exception allie le charme de l'ancien (moulures, parquet d'époque) et le confort d'un design contemporain haut de gamme. Profitez d'un séjour inoubliable dans la ville du vin.",
    price: 185,
    rating: 4.9,
    reviews: 124,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop",
    ],
    amenities: [
      {
        name: "WiFi Haute Vitesse",
        icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.372 9.372c5.857-5.858 15.355-5.858 21.214 0",
      },
      { name: "Cuisine Équipée", icon: "M3 3h18v18H3V3z M9 9h6v6H9V9z" },
      {
        name: "Climatisation",
        icon: "M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6",
      },
      {
        name: "Lave-linge",
        icon: "M8 7h8M8 11h8M9 15h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      },
    ],
  };

  const propertySchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.title,
    description: property.description,
    url: `${BASE_URL}/${locale}/logements/appartement-bordelais`,
    image: property.images.map((src) =>
      src.startsWith("http") ? src : `${BASE_URL}${src}`,
    ),
    priceRange: `À partir de ${property.price}€ / nuit`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: property.rating,
      reviewCount: property.reviews,
      bestRating: 5,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lille",
      addressRegion: "Hauts-de-France",
      postalCode: "59000",
      addressCountry: "FR",
    },
    amenityFeature: property.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.name,
      value: true,
    })),
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
        name: "Logements",
        item: `${BASE_URL}/${locale}/logements`,
      },
      { "@type": "ListItem", position: 3, name: property.title },
    ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-12 pb-24">
      <JsonLd data={propertySchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="mb-12 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <a
            href={base}
            className="flex items-center gap-1.5 hover:text-welqo-terracotta transition-colors"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Accueil
          </a>
          <span className="text-slate-200 dark:text-white/10 font-light">
            /
          </span>
          <a
            href={`${base}/logements`}
            className="hover:text-welqo-terracotta transition-colors"
          >
            Logements
          </a>
          <span className="text-slate-200 dark:text-white/10 font-light">
            /
          </span>
          <span className="text-slate-900 dark:text-white font-mono lowercase tracking-tighter opacity-80 bg-slate-100 dark:bg-white/[0.03] px-2 py-0.5 rounded">
            {property.title.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </nav>

        {/* Gallery */}
        <Gallery images={property.images} />

        {/* Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-welqo-terracotta/5 border border-welqo-terracotta/10 rounded-lg mb-8">
                <span className="w-1.5 h-1.5 bg-welqo-terracotta rounded-full animate-pulse" />
                <span className="text-welqo-terracotta text-[10px] font-bold tracking-[0.15em] uppercase">
                  Sélection d'Exception
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <div className="max-w-3xl">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-welqo-anthracite dark:text-white tracking-tighter leading-[0.95] mb-4">
                    {property.title}
                  </h1>
                  <p className="text-slate-400 font-medium text-lg tracking-tight">
                    Bordeaux · Triangle d'Or
                  </p>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-xl shadow-card">
                    <span className="font-mono font-bold text-lg text-welqo-anthracite dark:text-white">
                      {property.rating}
                    </span>
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(property.rating) ? "fill-current" : "text-slate-200 dark:text-white/10"}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-2">
                    Basé sur {property.reviews} avis
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: t("guests"),
                    val: property.guests,
                    icon: <Users className="w-4 h-4" />,
                  },
                  {
                    label: t("bedrooms"),
                    val: property.bedrooms,
                    icon: <DoorOpen className="w-4 h-4" />,
                  },
                  {
                    label: t("beds"),
                    val: property.beds,
                    icon: <Bed className="w-4 h-4" />,
                  },
                  {
                    label: t("bathrooms"),
                    val: property.bathrooms,
                    icon: <Bath className="w-4 h-4" />,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl flex flex-col gap-3 group hover:border-welqo-terracotta/30 transition-colors"
                  >
                    <span className="text-slate-400 group-hover:text-welqo-terracotta transition-colors">
                      {stat.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-lg font-mono font-bold text-welqo-anthracite dark:text-white leading-none mb-1">
                        {stat.val}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-8 border-slate-100 dark:border-slate-800" />

            {/* Host Section — Brand Identity */}
            <div className="p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl mb-16 flex flex-col md:flex-row items-center md:items-start gap-10">
              <div className="relative shrink-0">
                <div className="w-24 h-24 bg-welqo-anthracite rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  W
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-slate-50 dark:border-slate-900 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h3 className="font-bold text-2xl text-welqo-anthracite dark:text-white tracking-tight">
                    Conciergerie Welqo
                  </h3>
                  <div className="inline-flex items-center px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-md border border-emerald-500/20">
                    Propriété Gérée
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-2xl mb-8">
                  Ce logement est opéré par nos équipes locales. Nous
                  garantissons une propreté irréprochable, un support 24/7 et
                  une expérience d'accueil d'exception pour chaque voyageur.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                      Réactivité
                    </span>
                    <span className="font-bold text-emerald-500">
                      Moins d'une heure
                    </span>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden md:block" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                      Service
                    </span>
                    <span className="font-bold text-welqo-anthracite dark:text-white">
                      Assistance 24/7
                    </span>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden md:block" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                      Check-in
                    </span>
                    <span className="font-bold text-welqo-anthracite dark:text-white">
                      Autonome & Flexible
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {property.description}
              </p>
            </div>

            <hr className="my-12 border-slate-100 dark:border-slate-800" />

            {/* Amenities — Pro Grid */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-sm font-bold text-welqo-anthracite dark:text-white uppercase tracking-[0.25em]">
                  {t("amenities")}
                </h2>
                <div className="h-px flex-1 bg-slate-100 dark:bg-white/5" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {property.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-card hover:border-welqo-terracotta/20 transition-all group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 group-hover:text-welqo-terracotta transition-colors">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-welqo-anthracite dark:text-slate-300">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-10 inline-flex items-center gap-3 px-8 py-3 bg-welqo-anthracite text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-welqo-terracotta transition-all shadow-lg shadow-welqo-anthracite/20">
                Afficher les 25 équipements
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-1">
            <BookingWidget
              propertyId={property.id}
              price={property.price}
              cleaningFee={65}
              touristTax={2.4}
              maxGuests={property.guests}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
