import React from "react";
import { getTranslations } from "next-intl/server";
import { Button } from "@welqo/ui";
import { SearchBar } from "./SearchBar";
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
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/40 z-10" />
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        alt="Welqo Professional Management"
        className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
      />

      <div className="relative z-20 text-center px-6 w-full max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-black tracking-widest uppercase bg-slate-900/60 backdrop-blur-md border border-white/10 text-white rounded-md">
          <Sparkles className="w-3 h-3 text-primary" />
          {t("badge")}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.95]">
          {t.rich("heroTitle", {
            span: (chunks) => <span className="text-primary">{chunks}</span>
          })}
        </h1>

        <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-12 font-medium leading-relaxed">
          {t("heroSubtitle")}
        </p>

        <SearchBar locale={locale} />

        <div className="mt-10 flex items-center justify-center">
          <a 
            href={`${base}/proprietaires`}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-primary transition-colors flex items-center gap-2"
          >
            {isFr ? "Devenir Propriétaire" : "Partner with us"}
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
