import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@welqo/ui";
import { CookieBanner } from "../../components/CookieBanner";

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
  const isFr = locale !== "en";

  return {
    title: isFr
      ? "Welqo — Conciergerie Airbnb Lens & Arras | Gestion Locative Bassin Minier"
      : "Welqo — Airbnb Concierge Lens & Arras | Bassin Minier Rental Management",
    description: isFr
      ? "Confiez la gestion de votre bien à Welqo, l'expert conciergerie Airbnb du Bassin Minier (Lens, Arras). Transparence totale, revenus optimisés, zéro contrainte."
      : "Entrust your property to Welqo, the Airbnb concierge expert in Bassin Minier (Lens, Arras). Full transparency, optimised revenue, zero hassle.",
    keywords: isFr
      ? [
          "conciergerie airbnb lens",
          "conciergerie airbnb arras",
          "gestion airbnb arras",
          "gestion locative courte durée lens",
          "gestionnaire airbnb arras",
          "déléguer gestion airbnb lens",
          "agence location courte durée arras",
          "conciergerie location saisonnière bassin minier",
        ]
      : [
          "airbnb concierge lens",
          "airbnb concierge arras",
          "short-term rental management arras",
          "property management lens france",
          "airbnb property manager arras",
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
        ? "Welqo — Conciergerie Airbnb Lens & Arras"
        : "Welqo — Airbnb Concierge Lens & Arras",
      description: isFr
        ? "Gestion complète de vos locations courtes durée en Bassin Minier. Transparence totale, revenus optimisés."
        : "Complete short-term rental management in Bassin Minier. Full transparency, optimised revenue.",
      url: `${BASE_URL}/${locale}`,
      siteName: "Welqo",
      locale: isFr ? "fr_FR" : "en_GB",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isFr
            ? "Welqo Conciergerie Airbnb Bassin Minier"
            : "Welqo Airbnb Concierge Bassin Minier",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFr
        ? "Welqo — Conciergerie Airbnb Lens & Arras"
        : "Welqo — Airbnb Concierge Lens & Arras",
      description: isFr
        ? "Gestion complète de vos locations courtes durée en Bassin Minier."
        : "Complete short-term rental management in Bassin Minier.",
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

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
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
