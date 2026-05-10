"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PropertySummary } from "@welqo/types";
import { Star, Bed, Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property?: PropertySummary;
  images?: string[]; // Optional additional images for hover gallery
  loading?: boolean;
  locale?: string;
}

export const PropertyCard = ({ 
  property, 
  images = [],
  loading = false,
  locale = "fr"
}: PropertyCardProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isFr = locale === "fr";

  // Fallback images logic
  const allImages = (property as any)?.images || (property?.coverPhoto 
    ? [property.coverPhoto, ...(images || [])].slice(0, 5) 
    : []);

  if (loading || !property) {
    return <PropertyCardSkeleton />;
  }

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % allImages.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <a 
      href={`/logements/${property.slug}`} 
      className="group block space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 🖼️ Image Container */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-slate-900/5 dark:group-hover:shadow-none">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentIdx}
            src={allImages[currentIdx]} 
            alt={property.title} 
            initial={{ opacity: 0.8, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Gallery Controls (Mobile hidden, Desktop hover) */}
        {allImages.length > 1 && isHovered && (
          <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
            <button 
              onClick={prevImg}
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center backdrop-blur-sm shadow-xl transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImg}
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center backdrop-blur-sm shadow-xl transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dots Indicator */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {allImages.map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  currentIdx === i ? "bg-white w-4" : "bg-white/40"
                )}
              />
            ))}
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm rounded-2xl border border-slate-200/50 dark:border-white/10 flex items-center gap-1.5 z-20">
          <Star className="w-3 h-3 text-amber-500 fill-current" />
          <span className="text-[10px] font-black tracking-tight text-slate-900 dark:text-white">{property.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* 📝 Content */}
      <div className="px-2 space-y-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-slate-900 dark:text-white tracking-tighter text-base leading-tight group-hover:text-primary transition-colors flex-1">
            {property.title}
          </h3>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">€{property.price.base}</span>
            <span className="text-[9px] font-bold text-slate-400 tracking-widest">{isFr ? "par nuit" : "per night"}</span>
          </div>
        </div>
        
        <p className="text-xs font-bold text-slate-500/80 dark:text-slate-400/60 tracking-[0.1em]">
          {(property as any).location?.city || (property as any).city || "Hauts-de-France"}
        </p>
        
        <div className="pt-3 flex items-center gap-4 text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">{(property as any).capacity?.bedrooms || 2} Ch.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">65 m²</span>
          </div>
        </div>
      </div>
    </a>
  );
};

const PropertyCardSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="aspect-[4/3] rounded-3xl bg-slate-100 dark:bg-white/[0.03]" />
    <div className="px-2 space-y-3">
      <div className="flex justify-between">
        <div className="h-4 w-2/3 bg-slate-100 dark:bg-white/[0.03] rounded-full" />
        <div className="h-4 w-1/4 bg-slate-100 dark:bg-white/[0.03] rounded-full" />
      </div>
      <div className="h-2 w-1/3 bg-slate-100 dark:bg-white/[0.03] rounded-full opacity-50" />
    </div>
  </div>
);
