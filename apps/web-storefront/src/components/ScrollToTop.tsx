"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export function ScrollToTop() {
  const t = useTranslations("ScrollToTop");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          type="button"
          className="fixed bottom-28 md:bottom-6 right-6 z-[80] w-11 h-11 bg-slate-950/80 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-welqo-terracotta hover:border-welqo-terracotta cursor-pointer hover:-translate-y-1 active:scale-90 active:translate-y-0 group"
          aria-label={t("backToTop")}
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
