"use client";

import { motion } from "framer-motion";

interface HeroAnimatedProps {
  badge: string;
  title1: string;
  title2: string;
  desc: string;
  cta1Label: string;
  cta2Label: string;
  cta1Href: string;
  cta2Href: string;
  chips: { icon: string; text: string }[];
  scrollLabel: string;
}

const ease: any = [0.22, 1, 0.36, 1];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease, delay },
  };
}

export function HeroAnimated({
  badge,
  title1,
  title2,
  desc,
  cta1Label,
  cta2Label,
  cta1Href,
  cta2Href,
  chips,
}: HeroAnimatedProps) {
  return (
    <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
      {/* Badge */}
      <motion.div {...fadeUp(0.05)} className="mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-welqo-terracotta/10 border border-welqo-terracotta/20 rounded-full">
          <span className="w-1.5 h-1.5 bg-welqo-terracotta rounded-full animate-pulse-soft" />
          <span className="text-welqo-terracotta text-[9px] font-bold tracking-[0.15em] uppercase">
            {badge}
          </span>
        </div>
      </motion.div>

      {/* H1 */}
      <motion.h1
        {...fadeUp(0.15)}
        transition={{ duration: 0.7, ease, delay: 0.15 }}
        className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.05] mb-5"
      >
        {title1}
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-welqo-terracotta to-orange-400">
          {title2}
        </span>
      </motion.h1>

      {/* Desc */}
      <motion.p
        {...fadeUp(0.25)}
        className="text-[13px] sm:text-sm text-slate-400 max-w-md mb-7 leading-relaxed font-medium"
        dangerouslySetInnerHTML={{ __html: desc }}
      />

      {/* CTAs */}
      <motion.div
        {...fadeUp(0.35)}
        className="flex flex-col sm:flex-row gap-3 mb-8 w-full lg:w-auto"
      >
        <a
          href={cta1Href}
          className="group inline-flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-welqo-terracotta/20 hover:shadow-welqo-terracotta/40"
        >
          {cta1Label}
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
        <a
          href={cta2Href}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-sm transition-all duration-200"
        >
          {cta2Label}
        </a>
      </motion.div>

      {/* Chips */}
      <motion.div
        {...fadeUp(0.45)}
        className="flex flex-wrap justify-center lg:justify-start items-center gap-2"
      >
        {chips.map((c) => (
          <span
            key={c.text}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/8 text-slate-400 rounded-full text-[10px] font-semibold"
          >
            <span>{c.icon}</span> {c.text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
