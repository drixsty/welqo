import React from "react";
import Link from "next/link";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isFr = locale !== "en";
  return {
    title: isFr ? "Mentions légales — Welqo" : "Legal Notice — Welqo",
    robots: { index: false },
  };
}

export default function MentionsLegalesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const base = `/${locale}`;
  const isFr = locale !== "en";

  const SECTIONS = [
    { id: "editeur", label: isFr ? "Éditeur du site" : "Publisher" },
    { id: "hebergement", label: isFr ? "Hébergement" : "Hosting" },
    {
      id: "propriete",
      label: isFr ? "Propriété intellectuelle" : "Intellectual Property",
    },
    { id: "responsabilite", label: isFr ? "Responsabilité" : "Liability" },
    { id: "donnees", label: isFr ? "Données personnelles" : "Personal Data" },
    { id: "cookies", label: isFr ? "Cookies" : "Cookies" },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-hidden selection:bg-welqo-terracotta/20">
      {/* Header cinématique */}
      <div className="relative py-24 px-4 bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,rgba(15,23,42,0.5),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
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
            {isFr ? "Retour à l'accueil" : "Back to home"}
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.95] mb-8">
            {isFr ? "Mentions" : "Legal"}
            <br />
            <span className="text-welqo-terracotta">
              {isFr ? "légales." : "Notice."}
            </span>
          </h1>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="text-[10px] font-bold tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              {isFr ? "Transparence" : "Transparency"}
            </span>
            <span className="text-[10px] font-bold tracking-widest">
              Dernière mise à jour : {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Sommaire — Desktop only */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-12 h-fit">
            <div className="p-8 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 mb-8">
                {isFr ? "Sommaire" : "Summary"}
              </p>
              <nav className="space-y-5">
                {SECTIONS.map((section, i) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-xs font-bold text-slate-500 hover:text-welqo-terracotta transition-colors"
                  >
                    <span className="text-slate-300 dark:text-slate-700 mr-3">
                      0{i + 1}
                    </span>
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="lg:col-span-8 space-y-24">
            {/* 1. Éditeur */}
            <section id="editeur" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                1. {isFr ? "Éditeur du site" : "Site Publisher"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/5">
                {[
                  {
                    label: isFr ? "Raison sociale" : "Company",
                    value: "Welqo SAS",
                  },
                  {
                    label: isFr ? "Siège social" : "Headquarters",
                    value: "Lille, France",
                  },
                  { label: "SIRET", value: "894 562 123 00012" },
                  {
                    label: isFr ? "Capital social" : "Share Capital",
                    value: "10 000 €",
                  },
                  {
                    label: "Email",
                    value: "contact@welqo.fr",
                    color: "text-welqo-terracotta",
                  },
                  {
                    label: isFr ? "Publication" : "Publisher",
                    value: "Kevin Tsague",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white dark:bg-slate-950 p-8"
                  >
                    <p className="text-[10px] font-black tracking-widest text-slate-400 mb-2">
                      {item.label}
                    </p>
                    <p
                      className={`font-bold text-sm ${item.color || "text-slate-900 dark:text-white"}`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Hébergement */}
            <section id="hebergement" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                2. {isFr ? "Hébergement" : "Hosting"}
              </h2>
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-white/5">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      {isFr ? "Hébergeur" : "Provider"}
                    </p>
                    <p className="text-slate-900 dark:text-white font-bold text-lg">
                      Vercel Inc.
                    </p>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                      440 N Barranca Ave #4133
                      <br />
                      Covina, CA 91723
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      {isFr ? "Juridiction" : "Jurisdiction"}
                    </p>
                    <p className="text-slate-900 dark:text-white font-bold text-lg">
                      {isFr ? "France / Europe" : "France / Europe"}
                    </p>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                      {isFr
                        ? "Serveurs situés en région parisienne (cdg1)."
                        : "Servers located in Paris region (cdg1)."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Propriété */}
            <section id="propriete" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                3. {isFr ? "Propriété intellectuelle" : "Intellectual Property"}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px]">
                  {isFr
                    ? "L'intégralité du site Welqo, incluant sans s'y limiter, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive de la société Welqo à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs."
                    : "The entire Welqo website, including but not limited to graphics, images, texts, videos, animations, sounds, logos, gifs, and icons, as well as their formatting, is the exclusive property of Welqo, with the exception of trademarks, logos, or content belonging to other partner companies or authors."}
                </p>
              </div>
            </section>

            {/* 4. Responsabilité */}
            <section id="responsabilite" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                4. {isFr ? "Responsabilité" : "Liability"}
              </h2>
              <div className="p-8 bg-welqo-terracotta/5 border border-welqo-terracotta/10 rounded-3xl">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                  {isFr
                    ? "Welqo met tout en œuvre pour diffuser des informations exactes et mises à jour. Toutefois, Welqo ne peut être tenue responsable d'éventuelles erreurs ou omissions. L'utilisateur est seul responsable de l'utilisation des informations fournies."
                    : "Welqo makes every effort to disseminate accurate and updated information. However, Welqo cannot be held responsible for any errors or omissions. The user is solely responsible for the use of the information provided."}
                </p>
              </div>
            </section>

            {/* 5. Données */}
            <section id="donnees" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                5. {isFr ? "Données personnelles" : "Personal Data"}
              </h2>
              <div className="flex items-center justify-between p-8 bg-slate-900 rounded-3xl group">
                <div className="space-y-1">
                  <p className="text-white font-bold">
                    {isFr
                      ? "Protection de la vie privée"
                      : "Privacy Protection"}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {isFr
                      ? "Consultez notre politique dédiée au RGPD."
                      : "Read our dedicated GDPR policy."}
                  </p>
                </div>
                <Link
                  href={`${base}/politique-de-confidentialite`}
                  className="px-6 py-3 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-welqo-terracotta hover:text-white transition-all shadow-xl"
                >
                  {isFr ? "Voir la politique" : "View Policy"}
                </Link>
              </div>
            </section>

            {/* 6. Cookies */}
            <section id="cookies" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                6. Cookies
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px]">
                {isFr
                  ? "Nous utilisons des cookies pour améliorer votre expérience. En naviguant sur ce site, vous acceptez l'utilisation de cookies techniques nécessaires au bon fonctionnement du service."
                  : "We use cookies to improve your experience. By browsing this site, you agree to the use of technical cookies necessary for the proper functioning of the service."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
