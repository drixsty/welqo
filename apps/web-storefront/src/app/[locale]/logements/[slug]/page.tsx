import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Gallery } from "../../../../components/Gallery";
import { BookingWidget } from "../../../../components/BookingWidget";
import { JsonLd } from "../../../../components/JsonLd";

const BASE_URL = "https://welqo.fr";

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const isFr = locale !== "en";
  // In a real app this would come from the DB via slug
  const title = "L'Appartement Bordelais";
  const city  = "Lille";
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
      images: [{ url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop", width: 1200, height: 800 }],
      type: "website",
    },
  };
}

export default async function PropertyPage({
  params: { slug: _slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
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
    "name": property.title,
    "description": property.description,
    "url": `${BASE_URL}/${locale}/logements/appartement-bordelais`,
    "image": property.images.map((src) =>
      src.startsWith("http") ? src : `${BASE_URL}${src}`
    ),
    "priceRange": `À partir de ${property.price}€ / nuit`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": property.rating,
      "reviewCount": property.reviews,
      "bestRating": 5,
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lille",
      "addressRegion": "Hauts-de-France",
      "postalCode": "59000",
      "addressCountry": "FR",
    },
    "amenityFeature": property.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      "name": a.name,
      "value": true,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil",    "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": "Logements",  "item": `${BASE_URL}/${locale}/logements` },
      { "@type": "ListItem", "position": 3, "name": property.title },
    ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-12 pb-24">
      <JsonLd data={propertySchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <a href={base} className="hover:text-blue-600">
            Accueil
          </a>
          <span>/</span>
          <a href={`${base}/logements`} className="hover:text-blue-600">
            Logements
          </a>
          <span>/</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {property.title}
          </span>
        </nav>

        {/* Gallery */}
        <Gallery images={property.images} />

        {/* Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase italic">
                  {property.title}
                </h1>
                <p className="text-lg text-slate-500 font-medium">
                  {property.guests} {t("guests")} · {property.bedrooms}{" "}
                  {t("bedrooms")} · {property.beds} {t("beds")} ·{" "}
                  {property.bathrooms} {t("bathrooms")}
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <svg
                  className="text-yellow-400"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="font-bold">{property.rating}</span>
                <span className="text-slate-400 text-sm">
                  ({property.reviews})
                </span>
              </div>
            </div>

            <hr className="my-8 border-slate-100 dark:border-slate-800" />

            {/* Host Section */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                W
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  Géré par Welqo Conciergerie
                </h3>
                <p className="text-sm text-slate-500">
                  Service d'excellence · Réponse sous 1h
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {property.description}
              </p>
            </div>

            <hr className="my-12 border-slate-100 dark:border-slate-800" />

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
                {t("amenities")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl">
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
                    <span className="font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
              <button className="mt-10 px-8 py-3 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                Afficher les 25 équipements
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
            />
          </div>
        </div>
      </div>
    </main>
  );
}
