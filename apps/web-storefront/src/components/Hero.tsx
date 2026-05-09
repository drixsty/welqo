import React from "react";
import { getTranslations } from "next-intl/server";

interface HeroProps {
  locale?: string;
}

export const Hero = async ({ locale = "fr" }: HeroProps) => {
  const t = await getTranslations("HomePage");
  const base = `/${locale}`;

  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-white dark:to-black z-10" />
      <img
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop"
        alt="Welqo Luxury Stay"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom"
      />

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full">
          {t("badge")}
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
          {t("heroTitle")}
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          {t("heroSubtitle")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`${base}#logements`}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl text-center"
          >
            {t("bookStay")}
          </a>
          <a
            href={`${base}#contact`}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95 text-center"
          >
            {t("trustUs")}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
};
