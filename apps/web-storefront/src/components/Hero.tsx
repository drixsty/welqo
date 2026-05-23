import React from "react";
import { getTranslations } from "next-intl/server";
import { Sparkles, ArrowRight } from "lucide-react";

interface HeroProps {
  locale?: string;
}

export const Hero = async ({ locale = "fr" }: HeroProps) => {
  const t = await getTranslations("HomePage");
  const base = `/${locale}`;

  const isFr = locale === "fr";

  return (
    <section className="relative h-[calc(100vh-64px)] w-full flex items-center justify-center bg-slate-950">
      <div className="absolute inset-0 bg-slate-950/65 z-10" />
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        alt="Welqo Professional Management"
        className="absolute inset-0 w-full h-full object-cover grayscale-[0.1]"
      />

      <div className="relative z-20 text-center px-6 w-full max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[9px] font-black tracking-[0.2em] uppercase bg-slate-950/40 backdrop-blur-md border border-white/10 text-white rounded-md shadow-2xl">
          <Sparkles className="w-3 h-3 text-primary" />
          {t("badge")}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-5 leading-[0.95] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          {t.rich("heroTitle", {
            span: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h1>

        <p className="text-[14px] md:text-base text-white/90 max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-sm">
          {t("heroSubtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <a
            href={`${base}/proprietaires#simulator`}
            className="w-full sm:w-auto px-8 py-4 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl text-center active:scale-95"
          >
            {isFr ? "Simuler mes revenus" : "Simulate my income"}
          </a>
          <a
            href={`mailto:contact@welqo.fr?subject=Demande d'audit gratuit&body=Bonjour, je souhaite obtenir un audit gratuit de mon bien.`}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 backdrop-blur border border-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl text-center active:scale-95"
          >
            {isFr ? "Demander un audit gratuit" : "Request a free audit"}
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <a
            href={`${base}/proprietaires`}
            className="text-[10px] font-black tracking-[0.2em] text-white/50 hover:text-primary transition-colors flex items-center gap-2 uppercase"
          >
            {isFr ? "Découvrir la méthode Welqo" : "Discover the Welqo method"}
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
