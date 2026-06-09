import React from "react";
import { notFound } from "next/navigation";
import { getProperty, getProperties } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import { Gallery } from "@/components/Gallery";
import { OwnerPropertyShowcaseSidebar } from "@/components/OwnerPropertyShowcaseSidebar";
import { JsonLd } from "@/components/JsonLd";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  Star,
  MapPin,
  Bed,
  Bath,
  Users,
  Maximize,
  CheckCircle2,
  ShieldCheck,
  Wifi,
  Car,
  ChefHat,
  Tv,
  Wind,
  Coffee,
  Waves,
} from "lucide-react";

const PropertyMap = dynamic(
  () => import("@/components/PropertyMap").then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-50 animate-pulse rounded-lg" />
    ),
  },
);

const AMENITY_ICONS: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  kitchen: ChefHat,
  tv: Tv,
  ac: Wind,
  coffee: Coffee,
  pool: Waves,
  default: CheckCircle2,
};

export async function generateStaticParams() {
  try {
    const { properties } = await getProperties();
    const locales = ["en", "fr"];

    return locales.flatMap((locale) =>
      properties.map((property) => ({
        slug: property.slug,
        locale: locale,
      })),
    );
  } catch (error) {
    console.error("Failed to generate static params for properties", error);
    return [];
  }
}

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const property = await getProperty(slug);
  if (!property) return {};

  const title = property.content
    ? locale === "fr"
      ? property.content.fr.title
      : property.content.en.title
    : locale === "fr"
      ? (property as any).titleFr
      : (property as any).titleEn;

  const description = property.content
    ? locale === "fr"
      ? property.content.fr.description
      : property.content.en.description
    : locale === "fr"
      ? (property as any).descFr
      : (property as any).descEn;

  const city = (property as any).location?.city || (property as any).city;
  const BASE_URL = "https://welqo.fr";

  return {
    title: `${title} | Conciergerie Welqo ${city}`,
    description: description?.substring(0, 160),
    alternates: {
      canonical:
        locale === "fr"
          ? `${BASE_URL}/logements/${slug}`
          : `${BASE_URL}/${locale}/logements/${slug}`,
      languages: {
        fr: `${BASE_URL}/logements/${slug}`,
        en: `${BASE_URL}/en/logements/${slug}`,
        "x-default": `${BASE_URL}/logements/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      images: property.photos?.filter((p) => p.isCover).map((p) => p.url) || [],
    },
  };
}

// OwnerPropertyShowcaseSidebar is now imported from @/components/OwnerPropertyShowcaseSidebar

export default async function PropertyDetailsPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  const property = await getProperty(slug);
  if (!property) notFound();

  const t = await getTranslations({ locale, namespace: "PropertyPage" });
  const p = property as any;

  // Normalize data
  const normalized = {
    title: p.content
      ? locale === "fr"
        ? p.content.fr.title
        : p.content.en.title
      : locale === "fr"
        ? p.titleFr
        : p.titleEn,
    description: p.content
      ? locale === "fr"
        ? p.content.fr.description
        : p.content.en.description
      : locale === "fr"
        ? p.descFr
        : p.descEn,
    location: p.location?.city
      ? p.location
      : {
          address: p.address,
          city: p.city,
          latitude: p.latitude,
          longitude: p.longitude,
        },
    capacity: p.capacity?.maxGuests
      ? p.capacity
      : {
          maxGuests: p.maxGuests,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          surface: p.surface,
        },
    pricing: p.pricing?.basePricePerNight
      ? p.pricing
      : {
          basePricePerNight: p.basePricePerNight,
          cleaningFee: p.cleaningFee,
          touristTax: p.touristTax,
        },
  };

  const propertySummary = {
    id: property.id,
    slug: property.slug,
    title: normalized.title,
    location: normalized.location,
    capacity: normalized.capacity,
    price: {
      base: normalized.pricing.basePricePerNight,
      cleaning: normalized.pricing.cleaningFee,
    },
    coverPhoto:
      property.photos?.find((p: any) => p.isCover)?.url ||
      property.photos?.[0]?.url ||
      "",
    rating: 0,
    reviewsCount: 0,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: normalized.title,
    description: normalized.description,
    image: property.photos?.map((p: any) => p.url),
    address: {
      "@type": "PostalAddress",
      addressLocality: normalized.location.city,
      streetAddress: normalized.location.address,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: normalized.location.latitude,
      longitude: normalized.location.longitude,
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
    numberOfRooms: normalized.capacity.bedrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: normalized.capacity.maxGuests,
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      <JsonLd data={jsonLd} />
      {/* Header Info */}
      <section className="pt-10 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-500 text-[10px] font-bold rounded">
                  {normalized.location.city}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-extrabold rounded tracking-wider">
                  <Star className="w-3 h-3 fill-current text-primary" />
                  {t("standard5star")}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {normalized.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{normalized.location.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 self-start lg:self-center">
              <div className="w-10 h-10 rounded-lg bg-welqo-terracotta flex items-center justify-center text-white text-lg font-bold">
                M
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400">
                  City manager
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  Marc-Antoine
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Gallery images={property.photos?.map((p: any) => p.url) || []} />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  icon: Users,
                  value: normalized.capacity.maxGuests,
                  label: t("travelers"),
                },
                {
                  icon: Bed,
                  value: normalized.capacity.bedrooms,
                  label: t("rooms"),
                },
                {
                  icon: Bath,
                  value: normalized.capacity.bathrooms,
                  label: t("bathrooms2"),
                },
                {
                  icon: Maximize,
                  value: `${normalized.capacity.surface || 65}m²`,
                  label: t("surface"),
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10"
                >
                  <stat.icon className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("aboutProperty")}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {normalized.description}
              </p>
            </div>

            {/* Amenities Section - Improved Design */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("amenitiesServices")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {property.amenities.map((amenity: any) => {
                  const Icon =
                    AMENITY_ICONS[amenity.key] || AMENITY_ICONS.default;
                  return (
                    <div
                      key={amenity.key}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:border-primary/30 transition-colors">
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {amenity.label}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400">
                          {t("included")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("location")}
              </h3>
              <div className="h-[350px] rounded-xl overflow-hidden border border-slate-100 dark:border-white/10">
                <PropertyMap
                  properties={[propertySummary]}
                  center={[
                    normalized.location.latitude || 50.63297,
                    normalized.location.longitude || 3.05858,
                  ]}
                  zoom={15}
                />
              </div>
            </div>

            {/* Promise */}
            <div className="p-8 bg-slate-900 rounded-xl text-white flex items-center gap-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold mb-1">{t("promise")}</h4>
                <p className="text-slate-400 text-sm font-medium leading-snug">
                  {t("promiseText")}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="relative">
            <OwnerPropertyShowcaseSidebar
              locale={locale}
              title={normalized.title}
              city={normalized.location.city}
              address={normalized.location.address}
              basePrice={normalized.pricing.basePricePerNight}
              cleaningFee={normalized.pricing.cleaningFee}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
