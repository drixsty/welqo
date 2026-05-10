"use client";

import React from "react";
import { Share2, Heart, Grid } from "lucide-react";

interface ImageGalleryProps {
  images: { url: string; isCover: boolean }[];
  title: string;
}

export const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const PLACEHOLDER = "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=2070&auto=format&fit=crop";
  const cover = images.find(img => img.isCover) || images[0] || { url: PLACEHOLDER };
  const others = images.filter(img => !img.isCover).slice(0, 4);

  return (
    <div className="relative group rounded-xl overflow-hidden border border-slate-100 dark:border-white/5">
      {/* Actions */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-slate-200 hover:bg-white transition-colors">
          <Share2 className="w-3.5 h-3.5 text-slate-900" />
        </button>
        <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-slate-200 hover:bg-white transition-colors">
          <Heart className="w-3.5 h-3.5 text-slate-900" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px]">
        {/* Main Cover */}
        <div className="md:col-span-2 md:row-span-2 relative overflow-hidden">
          <img 
            src={cover?.url} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Secondary Images */}
        {others.map((img, i) => (
          <div key={i} className="hidden md:block relative overflow-hidden">
            <img 
              src={img.url} 
              alt={`${title} ${i}`} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            {i === 3 && others.length >= 4 && (
              <button className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white gap-1 group/btn">
                <Grid className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-wider">Tout voir</span>
              </button>
            )}
          </div>
        ))}
        
        {/* Fill empty spots */}
        {others.length < 4 && Array.from({ length: 4 - others.length }).map((_, i) => (
           <div key={`fill-${i}`} className="hidden md:block bg-slate-50 dark:bg-white/[0.02]" />
        ))}
      </div>
    </div>
  );
};
