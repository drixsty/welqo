import React from "react";
import { PropertySummary } from "@welqo/types";
import { Star, Bed, Maximize, MapPin } from "lucide-react";

interface PropertyCardProps {
  property?: PropertySummary;
  title?: string;
  location?: string;
  price?: number;
  image?: string;
  rating?: number;
  guests?: number;
  reviews?: number;
  href?: string;
  badge?: string;
  variant?: "vertical" | "horizontal";
}

export const PropertyCard = ({ 
  property, 
  variant = "vertical",
  title,
  location,
  price,
  image,
  rating,
  guests,
  href,
  badge
}: PropertyCardProps) => {
  const displayTitle = property?.title || title || "";
  const displayLocation = property?.location?.city || location || "";
  const displayPrice = property?.price?.base || price || 0;
  const displayImage = property?.coverPhoto || image || "";
  const displayRating = property ? 4.8 : (rating || 0);
  const displayHref = property ? `/logements/${property.slug}` : (href || "#");

  if (!displayTitle && !property) return null;

  return (
    <a href={displayHref} className="group block space-y-3">
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5">
        <img 
          src={displayImage} 
          alt={displayTitle} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 px-2 py-0.5 bg-white dark:bg-slate-900 shadow-sm rounded-sm border border-slate-200 dark:border-slate-800 flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-500 fill-current" />
          <span className="text-[10px] font-bold text-slate-900 dark:text-white">{displayRating.toFixed(1)}</span>
        </div>
        {badge && (
           <div className="absolute top-3 right-3 px-2 py-0.5 bg-primary rounded-sm text-white text-[10px] font-bold">
             {badge}
           </div>
        )}
      </div>
      <div className="px-1">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="font-bold text-slate-900 dark:text-white truncate text-sm group-hover:text-primary transition-colors">
            {displayTitle}
          </h3>
          <span className="text-sm font-bold text-slate-900 dark:text-white">€{displayPrice}</span>
        </div>
        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3">{displayLocation}</p>
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">{property ? "2" : guests} Voyageurs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">{property ? "60 m²" : "45 m²"}</span>
          </div>
        </div>
      </div>
    </a>
  );
};
