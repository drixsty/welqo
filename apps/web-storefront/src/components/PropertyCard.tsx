import React from "react";
import { getTranslations } from "next-intl/server";

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
}: PropertyCardProps) => {
  const t = await getTranslations("Common");

  return (
    <a
      href={href}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Location pill */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider">
          {location}
        </div>
        {/* Quality badge */}
        {badge && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
            {badge}
          </div>
        )}
        {/* Wishlist heart */}
        <div className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-blue-600">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-sm font-bold shrink-0 ml-2">
            <svg className="text-yellow-400" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-slate-900 dark:text-white">{rating.toFixed(1)}</span>
            {reviews !== undefined && (
              <span className="text-slate-400 font-medium">({reviews})</span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 11-4-4 4 4 0 014 4z" />
          </svg>
          {t("guests", { count: guests })}
        </p>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {price}€
            </span>
            <span className="text-xs text-slate-500 font-bold uppercase ml-1">
              / {t("night")}
            </span>
          </div>
          <span className="px-6 py-2 bg-slate-900 dark:bg-white dark:text-black text-white rounded-full text-sm font-bold group-hover:bg-blue-600 group-hover:dark:bg-blue-600 group-hover:dark:text-white transition-colors">
            {t("details")}
          </span>
        </div>
      </div>
    </a>
  );
};
