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
      className={`md:hidden fixed bottom-6 inset-x-4 z-40 max-w-md mx-auto transition-all duration-500 ease-out-quint ${
        visible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/40 dark:border-white/10 px-5 py-4 flex items-center justify-between gap-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] rounded-2xl">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            {t("title")}
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-tight mt-1.5">
            {t("subtitle")}
          </p>
        </div>

        <motion.a
          whileTap={{ scale: 0.97 }}
          href="#contact"
          className="shrink-0 h-10 px-5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-xl font-bold text-xs tracking-tight flex items-center justify-center transition-all duration-300"
        >
          {t("cta")}
        </motion.a>
      </div>
    </div>
  );
}
