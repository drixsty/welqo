import React from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight, User } from "lucide-react";
import { LuxuryCard } from "@welqo/ui";

interface PropertyCardProps {
  title: string;
  location: string;
  price: number;
  image: string;
  rating: number;
  guests: number;
  reviews?: number;
  href?: string;
  badge?: string;
  locale?: string;
}

export const PropertyCard = async ({
  title,
  location,
  price,
  image,
  rating,
  guests,
  reviews,
  href = "#",
  badge,
  locale = "fr",
}: PropertyCardProps) => {
  const t = await getTranslations("Common");
  const isFr = locale === "fr";

  return (
    <a href={href} className="group block">
      <LuxuryCard className="p-0 overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-none bg-white dark:bg-[#030712] transition-all duration-500 rounded-xl">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Location & Quality badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="px-2.5 py-1 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-md shadow-sm">
              <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white leading-none">
                {location}
              </p>
            </div>
            {badge && (
              <div className="px-2.5 py-1 bg-welqo-terracotta border border-welqo-terracotta/20 rounded-md shadow-sm">
                <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-white leading-none">
                  {badge}
                </p>
              </div>
            )}
          </div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-welqo-terracotta transition-colors leading-tight">
              {title}
            </h3>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded shadow-sm shrink-0">
              <svg
                className="text-amber-400 fill-current"
                width="10"
                height="10"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-[11px] font-mono font-bold text-slate-900 dark:text-white leading-none">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-5">
            <span className="flex items-center gap-1.5">
              <User className="w-3 h-3 opacity-70" />
              {t("guests", { count: guests })}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
            {reviews !== undefined && (
              <span className="flex items-center gap-1.5">
                {reviews} {isFr ? "avis" : "reviews"}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/[0.05]">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-mono font-bold text-slate-900 dark:text-white tracking-tighter">
                {price}€
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                / {t("night")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 group/btn">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white group-hover:text-welqo-terracotta transition-colors">
                {isFr ? "Voir" : "View"}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-welqo-terracotta group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </LuxuryCard>
    </a>
  );
};
