import React from "react";
import Link from "next/link";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isFr = locale !== "en";
  return {
    title: isFr
      ? "Politique de confidentialité — Welqo"
      : "Privacy Policy — Welqo",
    robots: { index: false },
  };
}

export default function PolitiqueConfidentialitePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const base = `/${locale}`;
  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-hidden selection:bg-welqo-terracotta/20">
      {/* Header cinématique */}
      <div className="relative py-20 px-4 bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(15,23,42,0.5),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href={base}
            className="group inline-flex items-center gap-2 text-slate-400 font-bold text-[10px] tracking-[0.2em] hover:text-white transition-colors mb-12"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour à l'accueil
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[0.95] mb-6">
            Votre vie privée,
            <br />
            <span className="text-welqo-terracotta">notre priorité.</span>
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <span className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Conforme RGPD
            </span>
            <span className="text-[10px] font-bold">
              Dernière mise à jour : {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sommaire — Desktop only */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-12 h-fit">
            <div className="p-8 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
                Sommaire
              </p>
              <nav className="space-y-4">
                {[
                  "Responsable",
                  "Données collectées",
                  "Finalités",
                  "Base légale",
                  "Conservation",
                  "Partage",
                  "Vos droits",
                ].map((item, i) => (
                  <a
                    key={item}
                    href={`#section-${i + 1}`}
                    className="block text-xs font-bold text-slate-500 hover:text-welqo-terracotta transition-colors"
                  >
                    {i + 1}. {item}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="lg:col-span-8 space-y-20">
            <section id="section-1">
              <h2 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
                1. Responsable du traitement
              </h2>
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Entité
                  </p>
                  <p className="text-slate-900 dark:text-white font-bold">
                    Welqo SAS
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    Siège social à Lille, France
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Email DPO
                  </p>
                  <p className="text-welqo-terracotta font-bold">
                    dpo@welqo.fr
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    Réponse sous 48h ouvrées
                  </p>
                </div>
              </div>
            </section>

            <section id="section-2">
              <h2 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
                2. Données collectées
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-8">
                Nous limitons la collecte aux données strictement nécessaires
                pour vous fournir nos services de conciergerie.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    cat: "Identification",
                    ex: "Nom, prénom, email, téléphone",
                    icon: "👤",
                  },
                  {
                    cat: "Réservation",
                    ex: "Dates, nombre de voyageurs, logement",
                    icon: "🏠",
                  },
                  {
                    cat: "Financières",
                    ex: "Traitées par Stripe (sécurisé)",
                    icon: "💳",
                  },
                  {
                    cat: "Navigation",
                    ex: "IP, type de navigateur, pages visitées",
                    icon: "🌐",
                  },
                ].map((item) => (
                  <div
                    key={item.cat}
                    className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg group hover:border-welqo-terracotta/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-lg shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        {item.cat}
                      </p>
                      <p className="text-slate-500 text-xs mt-1">{item.ex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="section-3">
              <h2 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
                3. Finalités du traitement
              </h2>
              <div className="space-y-4">
                {[
                  "Traitement et gestion de votre réservation",
                  "Envoi d'emails transactionnels indispensables",
                  "Amélioration continue de votre expérience utilisateur",
                  "Respect de nos obligations légales et comptables",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800"
                  >
                    <div className="w-2 h-2 rounded-full bg-welqo-terracotta" />
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="section-5">
              <h2 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
                5. Durée de conservation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { type: "Réservations", durée: "5 ans" },
                  { type: "Cookies analytiques", durée: "13 mois" },
                  { type: "Emails", durée: "3 ans" },
                  { type: "Logs serveur", durée: "1 an" },
                ].map((d) => (
                  <div
                    key={d.type}
                    className="p-6 bg-slate-950 rounded-lg border border-white/5 group hover:border-welqo-terracotta/30 transition-all"
                  >
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest mb-1">
                      {d.type}
                    </p>
                    <p className="text-white font-bold text-xl">{d.durée}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="section-7">
              <h2 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
                7. Vos droits
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-8">
                Vous gardez le contrôle total sur vos données. Exercez vos
                droits simplement par email.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {[
                  "Accès",
                  "Rectification",
                  "Effacement",
                  "Portabilité",
                  "Opposition",
                  "Limitation",
                ].map((droit) => (
                  <div
                    key={droit}
                    className="p-4 bg-welqo-terracotta/5 border border-welqo-terracotta/10 rounded-lg text-center group hover:bg-welqo-terracotta/10 transition-colors"
                  >
                    <p className="text-welqo-terracotta font-bold text-sm tracking-tight">
                      {droit}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-8 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <p className="text-slate-900 dark:text-white font-bold text-sm mb-4">
                  Besoin d'aide ?
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Contactez notre DPO à{" "}
                  <strong className="text-welqo-terracotta">
                    dpo@welqo.fr
                  </strong>
                  . En cas de litige, vous pouvez également saisir la CNIL sur{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-welqo-terracotta"
                  >
                    www.cnil.fr
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
