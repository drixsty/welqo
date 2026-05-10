import React from "react";
import { getTranslations } from "next-intl/server";
import { Button } from "@welqo/ui";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  locale?: string;
}

export const Hero = async ({ locale = "fr" }: HeroProps) => {
  const t = await getTranslations("HomePage");
  const base = `/${locale}`;

  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
      {/* Premium Overlay & Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-welqo-anthracite/60 via-welqo-anthracite/40 to-welqo-anthracite/80 z-10" />
      <img
        src="/images/hero-pivot.png"
        alt="Welqo Luxury Stay Arras"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom"
      />

      {/* Architectural Elements */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2" />
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 text-[10px] font-bold tracking-[0.3em] uppercase bg-white/5 backdrop-blur-xl border border-white/10 text-welqo-cream rounded-full animate-fade-in">
          <Sparkles className="w-3 h-3 text-welqo-terracotta" />
          {t("badge")}
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight mb-10 leading-[1.05] animate-slide-up">
          {t.rich("heroTitle", {
            span: (chunks) => <span className="text-welqo-terracotta italic">{chunks}</span>
          })}
        </h1>

        <p className="text-lg md:text-xl text-welqo-cream/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-fade-up">
          {t("heroSubtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up">
          <Button
            size="lg"
            variant="primary"
            className="w-full sm:w-auto"
            href={`${base}#logements`}
          >
            {t("bookStay")}
          </Button>
          <Button
            size="lg"
            variant="cream"
            className="w-full sm:w-auto"
            icon={ArrowRight}
            iconPosition="right"
            href={`${base}#contact`}
          >
            {t("trustUs")}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/30 hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Découvrir</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};
