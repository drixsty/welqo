"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  Share2,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Gallery = ({ images }: { images: string[] }) => {
  const t = useTranslations("Gallery");
  const [isOpen, setIsOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight")
        setCurrentIdx((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  return (
    <>
      <div className="relative group/gallery">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[360px] sm:h-[440px] md:h-[560px] lg:h-[650px] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-200/50 dark:border-white/[0.05]">
          {/* Main Image */}
          <div
            className={cn(
              "md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer transition-all duration-700",
              hoveredIdx !== null && hoveredIdx !== 0
                ? "opacity-30 blur-[2px] scale-[0.98]"
                : "opacity-100 scale-100",
            )}
            onMouseEnter={() => setHoveredIdx(0)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => {
              setCurrentIdx(0);
              setIsOpen(true);
            }}
          >
            <Image
              src={images[0]}
              alt="Main view"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
          </div>

          {/* Secondary Images Grid */}
          <div className="hidden md:grid md:col-span-2 md:row-span-2 grid-cols-2 grid-rows-2 gap-4">
            {images.slice(1, 5).map((img, i) => {
              const actualIdx = i + 1;
              return (
                <div
                  key={i}
                  className={cn(
                    "relative group overflow-hidden cursor-pointer transition-all duration-700",
                    hoveredIdx !== null && hoveredIdx !== actualIdx
                      ? "opacity-30 blur-[2px] scale-[0.98]"
                      : "opacity-100 scale-100",
                  )}
                  onMouseEnter={() => setHoveredIdx(actualIdx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => {
                    setCurrentIdx(actualIdx);
                    setIsOpen(true);
                  }}
                >
                  <Image
                    src={img}
                    alt={`View ${actualIdx}`}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Floating */}
        <div className="absolute top-8 right-8 z-10 flex gap-3">
          <button className="w-12 h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 group">
            <Share2 className="w-5 h-5 text-slate-900 dark:text-white group-hover:text-welqo-terracotta transition-colors" />
          </button>
          <button className="w-12 h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 group">
            <Heart className="w-5 h-5 text-slate-900 dark:text-white group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* View All Button Overlay */}
        <div className="absolute bottom-8 right-8 z-10">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-white/[0.1] rounded-2xl text-[11px] font-black tracking-[0.15em] text-slate-900 dark:text-white shadow-2xl hover:scale-105 transition-all active:scale-95 group"
          >
            <Grid className="w-4 h-4 text-welqo-terracotta transition-transform group-hover:rotate-90" />
            {t("viewAll", { count: images.length })}
          </button>
        </div>
      </div>

      {/* 🎬 FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-slate-950/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-12"
          >
            {/* Header Controls */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-[1000]">
              <div className="text-white/40 text-[10px] font-black tracking-[0.2em]">
                {currentIdx + 1} <span className="mx-2">/</span> {images.length}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Display */}
            <div className="relative w-full max-w-6xl aspect-[4/3] md:aspect-video flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIdx}
                  src={images[currentIdx]}
                  initial={{ opacity: 0, x: 30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.98 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50)
                      setCurrentIdx((prev) => (prev + 1) % images.length);
                    if (info.offset.x > 50)
                      setCurrentIdx(
                        (prev) => (prev - 1 + images.length) % images.length,
                      );
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full h-full object-contain rounded-2xl cursor-grab active:cursor-grabbing select-none"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between px-4 md:-mx-20 pointer-events-none">
                <button
                  onClick={() =>
                    setCurrentIdx(
                      (prev) => (prev - 1 + images.length) % images.length,
                    )
                  }
                  className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-md pointer-events-auto shadow-2xl active:scale-95"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() =>
                    setCurrentIdx((prev) => (prev + 1) % images.length)
                  }
                  className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all border border-white/10 backdrop-blur-md pointer-events-auto shadow-2xl active:scale-95"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>

            {/* Thumbnails Strip */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={cn(
                    "relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all",
                    currentIdx === i
                      ? "border-welqo-terracotta scale-110 shadow-lg shadow-welqo-terracotta/20"
                      : "border-transparent opacity-40 hover:opacity-100",
                  )}
                >
                  <Image
                    src={img}
                    fill
                    sizes="80px"
                    className="object-cover select-none pointer-events-none"
                    alt="Thumbnail"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
