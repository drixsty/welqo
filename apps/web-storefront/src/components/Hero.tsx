import React from "react";
import { getTranslations } from "next-intl/server";

interface HeroProps {
  locale?: string;
}

export const Hero = async ({ locale = "fr" }: HeroProps) => {
  const t = await getTranslations("HomePage");
  const base = `/${locale}`;

  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-950/40 dark:bg-slate-950/60 z-10" />
      <img
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop"
        alt="Welqo Stay"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 mb-8 text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md border border-white/20 text-white rounded">
          {t("badge")}
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
          {t("heroTitle")}
        </h1>
        <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto mb-10 font-medium leading-relaxed">
          {t("heroSubtitle")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`${base}#logements`}
            className="w-full sm:w-auto px-8 py-3.5 bg-welqo-terracotta text-white rounded-lg font-bold text-sm hover:bg-welqo-terracotta-dark transition-all text-center"
          >
            {t("bookStay")}
          </a>
          <a
            href={`${base}#contact`}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all text-center"
          >
            {t("trustUs")}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/40">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
