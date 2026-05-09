import React from "react";

export const Gallery = ({ images }: { images: string[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[600px] w-full rounded-[2rem] overflow-hidden">
      {/* Main Image */}
      <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
        <img
          src={images[0]}
          alt="Main view"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      </div>

      {/* Secondary Images */}
      {images.slice(1, 5).map((img, i) => (
        <div key={i} className="hidden md:block relative group overflow-hidden">
          <img
            src={img}
            alt={`View ${i + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>
      ))}

      {/* View All Button Overlay (on last image) */}
      <div className="absolute bottom-6 right-6 z-10">
        <button className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16M7 10a3 3 0 110-6 3 3 0 010 6z" />
          </svg>
          Voir toutes les photos
        </button>
      </div>
    </div>
  );
};
