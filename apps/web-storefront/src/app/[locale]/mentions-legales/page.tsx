import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return {
    title:
      locale !== "en" ? "Mentions légales — Welqo" : "Legal Notice — Welqo",
    robots: { index: false },
  };
}

export default async function MentionsLegalesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("MentionsLegales");
  const base = `/${locale}`;

  const SECTIONS = [
    { id: "editeur", label: t("section_editeur") },
    { id: "hebergement", label: t("section_hebergement") },
    { id: "propriete", label: t("section_propriete") },
    { id: "responsabilite", label: t("section_responsabilite") },
    { id: "donnees", label: t("section_donnees") },
    { id: "cookies", label: t("section_cookies") },
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
            {t("backHome")}
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.95] mb-8">
            {t("title1")}
            <br />
            <span className="text-welqo-terracotta">{t("title2")}</span>
          </h1>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="text-[10px] font-bold tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              {t("transparency")}
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
                {t("summary")}
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
                1. {t("sectionTitle1")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/5">
                {[
                  {
                    label: t("label_company"),
                    value: "Welqo SAS",
                  },
                  {
                    label: t("label_headquarters"),
                    value: "Lille, France",
                  },
                  { label: "SIRET", value: "894 562 123 00012" },
                  {
                    label: t("label_capital"),
                    value: "10 000 €",
                  },
                  {
                    label: "Email",
                    value: "contact@welqo.fr",
                    color: "text-welqo-terracotta",
                  },
                  {
                    label: t("label_publisher"),
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
                2. {t("sectionTitle2")}
              </h2>
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-white/5">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      {t("label_provider")}
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
                      {t("label_jurisdiction")}
                    </p>
                    <p className="text-slate-900 dark:text-white font-bold text-lg">
                      {t("jurisdictionValue")}
                    </p>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                      {t("jurisdictionDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Propriété */}
            <section id="propriete" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                3. {t("sectionTitle3")}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px]">
                  {t("proprieteText")}
                </p>
              </div>
            </section>

            {/* 4. Responsabilité */}
            <section id="responsabilite" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                4. {t("sectionTitle4")}
              </h2>
              <div className="p-8 bg-welqo-terracotta/5 border border-welqo-terracotta/10 rounded-3xl">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                  {t("responsabiliteText")}
                </p>
              </div>
            </section>

            {/* 5. Données */}
            <section id="donnees" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                5. {t("sectionTitle5")}
              </h2>
              <div className="flex items-center justify-between p-8 bg-slate-900 rounded-3xl group">
                <div className="space-y-1">
                  <p className="text-white font-bold">{t("donneesTitle")}</p>
                  <p className="text-slate-400 text-xs">{t("donneesDesc")}</p>
                </div>
                <Link
                  href={`${base}/politique-de-confidentialite`}
                  className="px-6 py-3 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-welqo-terracotta hover:text-white transition-all shadow-xl"
                >
                  {t("viewPolicy")}
                </Link>
              </div>
            </section>

            {/* 6. Cookies */}
            <section id="cookies" className="scroll-mt-12">
              <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8">
                6. {t("sectionTitle6")}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px]">
                {t("cookiesText")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
