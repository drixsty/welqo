"use client";

import { motion } from "framer-motion";

const WELQO_PATH =
  "M707.08,596.81v15.11c-14.17,3.66-28.34.7-41.44-5.16-5.6-2.5-18.7-12.36-22.12-13.14-3.69-.84-10.95.91-15.77.65-14.81-.79-32.66-7.8-44.1-17.19-4.43-3.63-15-14.47-16.42-19.73-1.28-4.72,5.73-17.37,6.78-22.69,16.31,58.96,100.71,58.2,115.72-1.82,18.17-72.69-83.99-113.44-115.71-34.26-8.32,20.78-20.05,74.86-34.42,88.17-22.18,20.54-41.43-3.43-52.33-21.6-2.81-4.69-5.97-10.34-7.73-15.37l-1.72.51c-9.89,17.49-25.55,51.25-50.92,42.48-14.6-5.05-19.72-21.1-24.61-34.17-11.15-29.8-19.74-60.8-29.37-91.11h15.95l28.53,86.92c5.41,14.38,13.03,36.48,29.74,16.26,8.9-10.77,15.84-25.49,22.78-37.63-6.26-15.89-21.4-38.56-10.68-55.22,8.03-12.48,26.99-15.69,36.62-3.54,9.44,11.92,4.89,26.51.06,39.38-1.9,5.04-8.67,15.96-7.79,20.38.47,2.35,4.95,10.25,6.4,12.94,3.9,7.24,15.12,26.76,22.06,29.99,13.94,6.5,18.93-12.8,22.6-22.57,16.24-43.25,24.43-108.32,82.79-113.68,88.27-8.1,117.43,107.84,41.47,146.41,12.77,9.52,28.02,12.53,43.64,9.66ZM477.88,514.52c1,.75,6.38-13.35,6.75-14.65,1.61-5.8,4.27-17.5-4.67-18.14-16.68-1.21-5.08,24.99-2.08,32.79Z";

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
      {/* Logo */}
      <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-3">
        <svg
          viewBox="0 0 1080 1080"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-welqo-terracotta shrink-0"
          aria-hidden="true"
        >
          <path d={WELQO_PATH} />
        </svg>
        <span className="font-serif text-2xl tracking-tight text-white">
          wel<span className="text-welqo-terracotta">Qo</span>
        </span>
      </motion.div>

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
