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
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-500 ease-out-quint ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-t border-slate-200/50 dark:border-white/5 px-4 py-4.5 flex items-center gap-4 shadow-2xl pb-6">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-slate-900 dark:text-white leading-tight truncate">
            {t("title")}
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight mt-1">
            {t("subtitle")}
          </p>
        </div>
        <motion.a
          whileTap={{ scale: 0.95 }}
          href="#contact"
          className="shrink-0 h-11 px-5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-xl font-bold text-xs tracking-tight shadow-lg shadow-welqo-terracotta/20 flex items-center justify-center border border-white/10"
        >
          {t("cta")}
        </motion.a>
      </div>
    </div>
  );
}
