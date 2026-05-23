import React from "react";
import { notFound } from "next/navigation";
import { getProperty, getProperties } from "@/lib/api";
import { Gallery } from "@/components/Gallery";
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

  const isFr = locale === "fr";
  const title = property.content
    ? isFr
      ? property.content.fr.title
      : property.content.en.title
    : isFr
      ? (property as any).titleFr
      : (property as any).titleEn;

  const description = property.content
    ? isFr
      ? property.content.fr.description
      : property.content.en.description
    : isFr
      ? (property as any).descFr
      : (property as any).descEn;

  const city = (property as any).location?.city || (property as any).city;
  const BASE_URL = "https://welqo.fr";

  return {
    title: `${title} | Conciergerie Welqo ${city}`,
    description: description?.substring(0, 160),
    alternates: {
      canonical: `${BASE_URL}/${locale}/logements/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/logements/${slug}`,
        en: `${BASE_URL}/en/logements/${slug}`,
        "x-default": `${BASE_URL}/fr/logements/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      images: property.photos?.filter((p) => p.isCover).map((p) => p.url) || [],
    },
  };
}

function OwnerPropertyShowcaseSidebar({
  isFr,
  title,
  city,
  address,
  basePrice,
  cleaningFee,
}: {
  isFr: boolean;
  title: string;
  city: string;
  address: string;
  basePrice: number;
  cleaningFee: number;
}) {
  const estimatedDays = 25; // 82% occupancy
  const monthlyRevenue = Math.round(basePrice * estimatedDays);
  const yearlyRevenue = monthlyRevenue * 12;

  const emailSubject = isFr
    ? `Demande d'audit et estimation locative - ${title}`
    : `Audit and rental estimate request - ${title}`;

  const emailBody = isFr
    ? `Bonjour l'équipe Welqo,\n\nJe suis propriétaire d'un bien de standing similaire à "${title}" situé à ${city} (${address}) et je serais intéressé(e) par une estimation gratuite de son potentiel de revenus ainsi que par votre charte d'aménagement 5★.\n\nMerci de me recontacter pour planifier un échange téléphonique ou une visite sur place.\n\nCordialement.`
    : `Hello Welqo Team,\n\nI own a premium property similar to "${title}" located in ${city} (${address}) and I would be interested in a free estimation of its revenue potential as well as your 5★ staging charter.\n\nThank you for getting back to me to schedule a call or physical visit.\n\nBest regards.`;

  const mailtoLink = `mailto:contact@welqo.fr?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-white/10 p-6 md:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-welqo-terracotta/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 space-y-6">
        <div>
          <span className="px-2.5 py-0.5 bg-primary/20 border border-primary/30 text-primary text-[9px] font-bold rounded-full uppercase tracking-wider">
            {isFr ? "Performance Propriétaire" : "Owner Performance"}
          </span>
          <h3 className="text-xl font-bold tracking-tight mt-4">
            {isFr ? "Simulateur de Rendement" : "Yield Simulator"}
          </h3>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed font-medium">
            {isFr
              ? "Estimez les revenus de ce logement s'il était géré sous notre charte d'excellence Welqo 5★."
              : "Estimate the income of this property if managed under our Welqo 5★ excellence charter."}
          </p>
        </div>

        {/* Revenue Display Box */}
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {isFr ? "Revenus Locatifs Estimés" : "Estimated Rental Revenue"}
            </p>
            <p className="text-3xl font-extrabold text-white mt-1">
              {monthlyRevenue.toLocaleString()} €{" "}
              <span className="text-xs font-medium text-slate-400">
                / {isFr ? "mois" : "month"}
              </span>
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">
              {isFr ? "Potentiel Annuel" : "Annual Potential"}
            </span>
            <span className="font-bold text-primary">
              {yearlyRevenue.toLocaleString()} €
            </span>
          </div>
        </div>

        {/* Simulation Breakdown Details */}
        <div className="space-y-3 pt-2">
          {[
            {
              label: isFr ? "Hypothèse d'Occupation" : "Occupancy Assumption",
              value: "82% (25 nuits / mois)",
            },
            {
              label: isFr ? "Tarif Moyen par Nuit" : "Average Nightly Rate",
              value: `${basePrice} €`,
            },
            {
              label: isFr
                ? "Frais Ménage (Payés Voyageurs)"
                : "Cleaning Fees (Paid by Guests)",
              value: `${cleaningFee} €`,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2 font-medium"
            >
              <span className="text-slate-400">{item.label}</span>
              <span className="text-slate-200 font-semibold">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Welqo Added Value Checklist */}
        <div className="space-y-3 pt-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {isFr
              ? "Ce que Welqo prend en charge :"
              : "What Welqo handles for you:"}
          </p>
          {[
            isFr
              ? "Multidiffusion premium (Airbnb, Booking.com, Welqo)"
              : "Premium multi-listing (Airbnb, Booking.com, Welqo)",
            isFr
              ? "Optimisation dynamique des prix via algorithme local"
              : "Dynamic price optimization via local algorithm",
            isFr
              ? "Sélection rigoureuse des voyageurs & caution"
              : "Rigorous guest screening & security deposit",
            isFr
              ? "Maintenance réactive et ménage hôtelier 5★"
              : "Reactive maintenance & 5★ hotel-grade cleaning",
          ].map((benefit, index) => (
            <div
              key={index}
              className="flex gap-2 items-start text-[10px] text-slate-300 font-medium"
            >
              <span className="text-primary font-bold">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <a
            href={mailtoLink}
            className="w-full py-3.5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 text-center"
          >
            {isFr
              ? "Faire auditer mon bien gratuitement"
              : "Get my free property audit"}
          </a>
          <p className="mt-2.5 text-[8px] text-slate-400 text-center italic opacity-60 leading-tight">
            {isFr
              ? "* Rapport de potentiel personnalisé livré sous 48h sans engagement."
              : "* Personalized potential report delivered within 48h, no commitment."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function PropertyDetailsPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  const property = await getProperty(slug);
  if (!property) notFound();

  const isFr = locale === "fr";
  const p = property as any;

  // Normalize data
  const normalized = {
    title: p.content
      ? isFr
        ? p.content.fr.title
        : p.content.en.title
      : isFr
        ? p.titleFr
        : p.titleEn,
    description: p.content
      ? isFr
        ? p.content.fr.description
        : p.content.en.description
      : isFr
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
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-extrabold rounded uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-current text-primary" />
                  {isFr ? "Standard 5★ Welqo" : "Welqo 5★ Standard"}
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
                  label: "Voyageurs",
                },
                {
                  icon: Bed,
                  value: normalized.capacity.bedrooms,
                  label: "Chambres",
                },
                {
                  icon: Bath,
                  value: normalized.capacity.bathrooms,
                  label: "Salles de bain",
                },
                {
                  icon: Maximize,
                  value: `${normalized.capacity.surface || 65}m²`,
                  label: "Surface",
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
                À propos de ce logement
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {normalized.description}
              </p>
            </div>

            {/* Amenities Section - Improved Design */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Équipements et services
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
                          Inclus
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
                Localisation
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
                <h4 className="text-base font-bold mb-1">La promesse Welqo</h4>
                <p className="text-slate-400 text-sm font-medium leading-snug">
                  Géré avec exigence hôtelière. Propreté impeccable, accueil
                  personnalisé et assistance 24/7.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="relative">
            <OwnerPropertyShowcaseSidebar
              isFr={isFr}
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
