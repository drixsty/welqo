"use client";

import { useEffect, useState } from "react";

export function StickyMobileCTA({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);
  const isFr = locale !== "en";

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-4 py-3 flex items-center gap-3 shadow-2xl">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight truncate">
            {isFr ? "Audit gratuit de votre bien" : "Free property audit"}
          </p>
          <p className="text-[10px] text-slate-400 font-medium leading-tight">
            {isFr
              ? "Réponse sous 24h · Sans engagement"
              : "Reply within 24h · No commitment"}
          </p>
        </div>
        <a
          href="#contact"
          className="shrink-0 px-5 py-2.5 bg-welqo-terracotta text-white rounded-lg font-bold text-xs tracking-tight active:scale-95 transition-transform shadow-lg shadow-welqo-terracotta/20"
        >
          {isFr ? "Devis gratuit →" : "Free quote →"}
        </a>
      </div>
    </div>
  );
}
