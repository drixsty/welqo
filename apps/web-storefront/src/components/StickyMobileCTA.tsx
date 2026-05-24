"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function StickyMobileCTA({ locale: _locale }: { locale: string }) {
  const t = useTranslations("StickyMobileCTA");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-4 inset-x-4 z-40 max-w-lg mx-auto transition-all duration-500 ease-out-quint ${
        visible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/40 dark:border-white/10 px-4 py-3 flex items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-2xl">
        <div className="flex items-center gap-3 min-w-0">
          {/* Circular badge with checklist icon & live pulsing dot */}
          <div className="relative shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-welqo-terracotta/10 dark:bg-welqo-terracotta/20 border border-welqo-terracotta/20">
            <svg
              className="w-4.5 h-4.5 text-welqo-terracotta"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-extrabold text-slate-900 dark:text-white leading-tight truncate tracking-tight">
              {t("title")}
            </p>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider leading-none mt-0.5">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <motion.a
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          href="#contact"
          className="shrink-0 h-10 px-4.5 bg-gradient-to-r from-welqo-terracotta to-orange-500 hover:from-welqo-terracotta-dark hover:to-orange-600 text-white rounded-xl font-bold text-xs tracking-tight shadow-md shadow-welqo-terracotta/25 flex items-center justify-center border border-white/10 transition-all duration-300"
        >
          {t("cta")}
        </motion.a>
      </div>
    </div>
  );
}
