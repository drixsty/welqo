"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

interface FAQItem {
  q: string;
  a: string;
}

interface InteractiveFAQProps {
  faqs: FAQItem[];
}

export function InteractiveFAQ({ faqs }: InteractiveFAQProps) {
  const t = useTranslations("InteractiveFAQ");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filter FAQs based on search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase().trim();
    return faqs.filter(
      (item) =>
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query),
    );
  }, [faqs, searchQuery]);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Bar - Glassmorphism style */}
      <div className="relative max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setOpenIndex(null); // Close active acc when search changes
          }}
          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-slate-900 dark:text-white text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-welqo-terracotta/50 focus:bg-white dark:focus:bg-slate-850 focus:ring-1 focus:ring-welqo-terracotta/20 transition-all duration-350 shadow-sm"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 px-2 py-0.5 rounded cursor-pointer"
          >
            {t("clear")}
          </button>
        )}
      </div>

      {/* Accordions layout */}
      <div className="space-y-3 max-w-3xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => {
              const originalIndex = faqs.findIndex((item) => item.q === faq.q);
              const isOpen = openIndex === originalIndex;

              return (
                <motion.div
                  key={faq.q}
                  layout="position"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100/50 dark:hover:bg-slate-900/80 ${
                    isOpen
                      ? "border-welqo-terracotta/30 dark:border-welqo-terracotta/20 ring-1 ring-welqo-terracotta/10 shadow-lg shadow-welqo-terracotta/[0.02]"
                      : "border-slate-100 dark:border-slate-850"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(originalIndex)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus:outline-none"
                  >
                    <span className="font-extrabold text-slate-900 dark:text-white text-xs md:text-sm tracking-tight leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-welqo-terracotta text-white rotate-180 scale-105 shadow-md shadow-welqo-terracotta/20"
                          : "bg-slate-200/60 dark:bg-slate-800 text-slate-500 hover:bg-slate-350 dark:hover:bg-slate-700"
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-500 dark:text-slate-400 text-xs md:text-[13px] leading-relaxed font-medium border-t border-slate-100/50 dark:border-slate-800/30 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })
          ) : (
            /* Fallback Empty Card */
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center flex flex-col items-center justify-center max-w-md mx-auto"
            >
              <div className="w-12 h-12 bg-welqo-terracotta/10 border border-welqo-terracotta/25 text-welqo-terracotta rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                {t("noAnswerFound")}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-6">
                {t("noAnswerDesc")}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-xs hover:bg-welqo-terracotta dark:hover:bg-welqo-terracotta dark:hover:text-white transition-all shadow"
              >
                {t("askQuestion")}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
