"use client";

import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface MobileBookingBarProps {
  price: number;
  rating: number;
  reviewsCount: number;
  onBook: () => void;
  isVisible: boolean;
}

export const MobileBookingBar = ({
  price,
  rating,
  reviewsCount,
  onBook,
  isVisible,
}: MobileBookingBarProps) => {
  const t = useTranslations("MobileBooking");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-t border-slate-200/50 dark:border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                €{price}
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest">
                {t("perNight")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="w-3 h-3 text-amber-500 fill-current" />
              <span className="text-[10px] font-black text-slate-900 dark:text-white">
                {rating.toFixed(1)}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                ({reviewsCount})
              </span>
            </div>
          </div>

          <button
            onClick={onBook}
            className="px-8 py-4 bg-welqo-terracotta text-white rounded-2xl font-black text-sm shadow-xl shadow-welqo-terracotta/20 flex items-center gap-3 active:scale-95 transition-transform"
          >
            {t("book")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
