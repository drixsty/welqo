import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@welqo/ui";
import { CookieBanner } from "../../components/CookieBanner";
import { CustomCursor } from "../../components/CustomCursor";
import { StickyMobileCTA } from "../../components/StickyMobileCTA";
import { JsonLd } from "../../components/JsonLd";
import GoogleAnalytics from "../../components/GoogleAnalytics";
import { SmoothScroll } from "../../components/SmoothScroll";
import { PageTransition } from "../../components/PageTransition";
import { GrainOverlay } from "../../components/GrainOverlay";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const BASE_URL = "https://welqo.fr";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const fr = locale !== "en";

  return {
    title: fr
      ? "Welqo — Conciergerie Airbnb & Gestion Locative Hauts-de-France"
      : "Welqo — Airbnb Concierge & Rental Management Northern France",
    description: fr
      ? "Gestion locative d'exception et conciergerie Airbnb dans les Hauts-de-France (Lille, Lens, Arras). Maximisez vos revenus sereinement avec l'expert local."
      : "Exceptional rental management and Airbnb concierge in Northern France (Lille, Lens, Arras). Maximize your income with the local expert.",
    keywords: fr
      ? [
          "conciergerie airbnb hauts-de-france",
          "conciergerie airbnb lille",
          "conciergerie airbnb lens",
          "conciergerie airbnb arras",
          "gestion airbnb hauts-de-france",
          "gestion locative courte durée lille",
          "gestionnaire airbnb lens",
          "déléguer gestion airbnb arras",
        ]
      : [
          "airbnb concierge northern france",
          "airbnb concierge lille",
          "airbnb concierge lens",
          "property management arras",
        ],
    authors: [{ name: "Welqo" }],
    creator: "Welqo",
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: "/icons/welqo.svg",
      shortcut: "/icons/welqo.svg",
      apple: "/icons/welqo.svg",
    },
    alternates: {
      canonical: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`,
      languages: {
        fr: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      title: fr
        ? "Welqo — Conciergerie Airbnb Hauts-de-France"
        : "Welqo — Airbnb Concierge Northern France",
      description: fr
        ? "Gestion locative d'exception dans les Hauts-de-France. Expertise locale à Lille, Lens et Arras."
        : "Exceptional rental management in Northern France. Local expertise in Lille, Lens and Arras.",
      url: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`,
      siteName: "Welqo",
      locale: fr ? "fr_FR" : "en_GB",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: fr
            ? "Welqo Conciergerie Airbnb Hauts-de-France"
            : "Welqo Airbnb Concierge Hauts-de-France",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fr
        ? "Welqo — Conciergerie Airbnb Lens & Arras"
        : "Welqo — Airbnb Concierge Lens & Arras",
      description: fr
        ? "Gestion complète de vos locations courtes durée en Hauts-de-France."
        : "Complete short-term rental management in Hauts-de-France.",
      images: [`${BASE_URL}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!["en", "fr"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  const fr = locale !== "en";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "Welqo",
    description: fr
      ? "Conciergerie Airbnb et gestion locative courte durée dans les Hauts-de-France."
      : "Airbnb concierge and short-term rental management in Northern France.",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
    priceRange: "20% commission",
    areaServed: [
      { "@type": "City", name: "Lille" },
      { "@type": "City", name: "Lens" },
      { "@type": "City", name: "Arras" },
      { "@type": "City", name: "Béthune" },
      { "@type": "City", name: "Douai" },
      { "@type": "City", name: "Roubaix" },
      { "@type": "City", name: "Tourcoing" },
    ],
    serviceType: fr
      ? [
          "Conciergerie Airbnb",
          "Gestion locative courte durée",
          "Optimisation tarifaire",
        ]
      : ["Airbnb concierge", "Short-term rental management", "Dynamic pricing"],
    sameAs: [
      "https://www.facebook.com/welqo",
      "https://www.instagram.com/welqo.conciergerie",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Welqo",
    url: BASE_URL,
    inLanguage: fr ? "fr-FR" : "en-GB",
  };

  return (
    <html lang={locale} className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <JsonLd data={localBusinessSchema} />
          <JsonLd data={websiteSchema} />
          <SmoothScroll />
          <GrainOverlay />
          <Navbar title="WELQO" locale={locale} />
          <div className="pt-16">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer locale={locale} />
          <CustomCursor />
          <StickyMobileCTA locale={locale} />
          <CookieBanner locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
