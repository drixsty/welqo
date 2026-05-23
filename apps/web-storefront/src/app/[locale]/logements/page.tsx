import React from "react";
import { Metadata } from "next";
import { ArrowRight, MapPin, Clock, Star } from "lucide-react";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = locale === "fr";
  const BASE_URL = "https://welqo.fr";

  return {
    title: isFr
      ? "Confier son Airbnb à Welqo — Gestion Locative Hauts-de-France"
      : "Hand Over Your Airbnb to Welqo — Property Management Northern France",
    description: isFr
      ? "Welqo gère votre Airbnb à Lille, Lens, Arras, Béthune et Douai : annonces multi-plateformes, ménage, check-in, tarification dynamique. Audit gratuit, mise en ligne en 7 jours."
      : "Welqo manages your Airbnb in Lille, Lens, Arras and across Northern France: multi-platform listings, cleaning, check-in, dynamic pricing. Free audit, live in 7 days.",
    alternates: {
      canonical: `${BASE_URL}/${locale}/logements`,
      languages: {
        fr: `${BASE_URL}/fr/logements`,
        en: `${BASE_URL}/en/logements`,
        "x-default": `${BASE_URL}/fr/logements`,
      },
    },
  };
}

const CITIES = [
  { name: "Lille", region: "Métropole Lilloise" },
  { name: "Lens", region: "Hauts-de-France" },
  { name: "Arras", region: "Hauts-de-France" },
  { name: "Béthune", region: "Hauts-de-France" },
  { name: "Douai", region: "Hauts-de-France" },
];

export default function PropertyListingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isFr = locale === "fr";

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="py-24 px-6 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-primary/10 border border-primary/20 rounded-md">
            <span className="text-primary text-[11px] font-bold uppercase tracking-wider">
              {isFr ? "Portfolio en construction" : "Portfolio in progress"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[0.95] mb-6">
            {isFr ? (
              <>
                Votre logement pourrait
                <br />
                <span className="text-primary">être ici.</span>
              </>
            ) : (
              <>
                Your property could
                <br />
                <span className="text-primary">be here.</span>
              </>
            )}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            {isFr
              ? "Welqo sélectionne des biens d'exception dans les Hauts-de-France pour les gérer et les mettre en valeur sur les meilleures plateformes de location courte durée."
              : "Welqo selects exceptional properties across Northern France to manage and showcase on the best short-term rental platforms."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/proprietaires`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm transition-all hover:bg-welqo-terracotta dark:hover:bg-welqo-terracotta dark:hover:text-white shadow-sm active:scale-95"
            >
              {isFr ? "Proposer mon bien" : "Submit my property"}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`mailto:contact@welqo.fr?subject=Audit gratuit&body=Bonjour, je souhaite soumettre mon logement à Welqo.`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm border border-slate-200 dark:border-white/10 transition-all hover:border-primary/30 active:scale-95"
            >
              {isFr ? "Contacter l'équipe" : "Contact the team"}
            </a>
          </div>
        </div>
      </section>

      {/* Zones couvertes */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
              {isFr ? "Zones d'intervention" : "Coverage areas"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">
              {isFr
                ? "Nous intervenons dans toute la région"
                : "We operate across the entire region"}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CITIES.map((city) => (
              <div
                key={city.name}
                className="flex flex-col items-center gap-2 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 text-center"
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {city.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {city.region}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Critères de sélection */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4">
                {isFr ? "Notre charte qualité" : "Our quality charter"}
              </p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter mb-6">
                {isFr
                  ? "Des biens sélectionnés avec exigence"
                  : "Properties selected with discernment"}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                {isFr
                  ? "Nous ne gérons pas tous les biens. Chaque logement partenaire passe par un audit sur place pour garantir un niveau d'excellence compatible avec notre standard hôtelier."
                  : "We don't manage every property. Each partner property goes through an on-site audit to ensure a level of excellence compatible with our hotel standard."}
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: Star,
                    label: isFr
                      ? "Standard hôtelier 5★ exigé"
                      : "5★ hotel standard required",
                  },
                  {
                    icon: Clock,
                    label: isFr
                      ? "Mise en ligne en moins de 7 jours"
                      : "Live in less than 7 days",
                  },
                  {
                    icon: MapPin,
                    label: isFr
                      ? "Localisation stratégique (centre-ville, transports)"
                      : "Strategic location (city center, transport links)",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-welqo-terracotta/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <span className="px-2.5 py-1 bg-primary/20 border border-primary/30 text-primary text-[9px] font-bold rounded-full uppercase tracking-wider">
                  {isFr ? "Audit Gratuit" : "Free Audit"}
                </span>
                <h3 className="text-2xl font-bold mt-4 mb-3 tracking-tight">
                  {isFr
                    ? "Votre bien mérite mieux."
                    : "Your property deserves better."}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {isFr
                    ? "En 48h, nous analysons votre logement, estimons vos revenus potentiels et vous proposons un plan d'action concret. Gratuitement, sans engagement."
                    : "Within 48 hours, we analyze your property, estimate your potential income, and propose a concrete action plan. Free, no commitment."}
                </p>
                <a
                  href={`/${locale}/proprietaires`}
                  className="w-full py-3.5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isFr
                    ? "Demander mon audit gratuit"
                    : "Request my free audit"}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="mt-3 text-[10px] text-slate-500 text-center italic">
                  {isFr
                    ? "Visite sur place + étude de marché incluses"
                    : "On-site visit + market study included"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
