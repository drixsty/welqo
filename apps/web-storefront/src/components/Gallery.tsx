import React from "react";

export const Gallery = ({ images }: { images: string[] }) => {
  return (
    <div className="relative group/gallery">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[500px] md:h-[600px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/[0.08]">
        {/* Main Image */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden border-r border-slate-200 dark:border-white/[0.08]">
          <img
            src={images[0]}
            alt="Main view"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Secondary Images */}
        <div className="hidden md:grid md:col-span-2 md:row-span-2 grid-cols-2 grid-rows-2 gap-3">
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative group overflow-hidden">
              <img
                src={img}
                alt={`View ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* View All Button Overlay */}
      <div className="absolute bottom-6 right-6 z-10">
        <button className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] rounded-full text-[11px] font-bold uppercase tracking-widest text-slate-900 dark:text-white shadow-xl hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95">
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-welqo-terracotta"
          >
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16M7 10a3 3 0 110-6 3 3 0 010 6z" />
          </svg>
          Voir les photos
        </button>
      </div>
    </div>
  );
};
