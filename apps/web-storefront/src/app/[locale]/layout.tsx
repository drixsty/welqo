import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@welqo/ui";
import { CookieBanner } from "../../components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://welqo.fr";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = locale !== "en";

  return {
    title: isFr
      ? "Welqo — Conciergerie Airbnb Lille | Gestion Locative Courte Durée"
      : "Welqo — Airbnb Concierge Lille | Short-Term Rental Management",
    description: isFr
      ? "Confiez la gestion de votre bien à Welqo, la conciergerie Airbnb de référence à Lille. Transparence totale, revenus optimisés, zéro contrainte. Devis gratuit en 24h."
      : "Entrust your Lille property to Welqo, the leading Airbnb concierge service. Full transparency, optimised revenue, zero hassle. Free quote within 24h.",
    keywords: isFr
      ? [
          "conciergerie airbnb lille",
          "gestion airbnb lille",
          "gestion locative courte durée lille",
          "gestionnaire airbnb lille",
          "déléguer gestion airbnb lille",
          "agence location courte durée lille",
          "conciergerie location saisonnière nord",
          "rentabiliser appartement lille airbnb",
        ]
      : [
          "airbnb concierge lille",
          "short-term rental management lille",
          "property management lille france",
          "airbnb property manager lille",
        ],
    authors: [{ name: "Welqo" }],
    creator: "Welqo",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/fr`,
      },
    },
    openGraph: {
      title: isFr
        ? "Welqo — Conciergerie Airbnb Lille"
        : "Welqo — Airbnb Concierge Lille",
      description: isFr
        ? "Gestion complète de vos locations courtes durée à Lille. Transparence totale, revenus optimisés."
        : "Complete short-term rental management in Lille. Full transparency, optimised revenue.",
      url: `${BASE_URL}/${locale}`,
      siteName: "Welqo",
      locale: isFr ? "fr_FR" : "en_GB",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isFr ? "Welqo Conciergerie Airbnb Lille" : "Welqo Airbnb Concierge Lille",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr ? "Welqo — Conciergerie Airbnb Lille" : "Welqo — Airbnb Concierge Lille",
      description: isFr
        ? "Gestion complète de vos locations courtes durée à Lille."
        : "Complete short-term rental management in Lille.",
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
  console.log('DEBUG: layout locale param:', locale);
  if (!["en", "fr"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar title="WELQO" locale={locale} />
          <div className="pt-16">{children}</div>
          <Footer locale={locale} />
          <CookieBanner locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
