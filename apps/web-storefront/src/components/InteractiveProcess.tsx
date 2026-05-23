"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  num: string;
  title: string;
  desc: string;
  duration: string;
  icon: string;
}

interface InteractiveProcessProps {
  steps: Step[];
  locale?: string;
}

export function InteractiveProcess({ steps }: InteractiveProcessProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      {/* Mobile view: Swipeable or Tabbed Step Navigator */}
      <div className="block md:hidden space-y-6">
        {/* Step Tabs Trigger */}
        <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-xl gap-1">
          {steps.map((step, idx) => (
            <button
              key={step.num}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-3 px-1 rounded-lg text-xs font-black tracking-wider uppercase transition-all cursor-pointer text-center flex flex-col items-center justify-center min-h-[44px] ${
                activeTab === idx
                  ? "bg-welqo-terracotta text-white shadow-md shadow-welqo-terracotta/20 scale-[1.02]"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span className="text-[9px] opacity-75">Étape</span>
              <span className="text-sm font-black leading-none mt-0.5">
                {step.num}
              </span>
            </button>
          ))}
        </div>

        {/* Active Card step content */}
        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-welqo-terracotta/5 rounded-full blur-2xl pointer-events-none" />

              <div className="w-14 h-14 bg-welqo-terracotta text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-welqo-terracotta/10 mb-4 relative z-10">
                {steps[activeTab].num}
                <div className="absolute inset-0 bg-welqo-terracotta rounded-xl animate-ping opacity-15" />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-welqo-terracotta mb-2 bg-welqo-terracotta/5 border border-welqo-terracotta/10 px-2 py-0.5 rounded">
                {steps[activeTab].duration}
              </span>

              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">
                {steps[activeTab].title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-xs">
                {steps[activeTab].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop view: 3-column connected timeline with hovering state lighting */}
      <div className="hidden md:grid grid-cols-3 gap-10 relative">
        {/* Progress horizontal line in the background */}
        <div className="absolute top-8 left-[12%] right-[12%] h-[1.5px] bg-slate-200 dark:bg-slate-800 z-0">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-slate-900 via-welqo-terracotta to-slate-900 dark:from-slate-850 dark:via-welqo-terracotta dark:to-slate-850"
          />
        </div>

        {steps.map((step, idx) => {
          const isMiddle = idx === 1;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col items-start bg-white dark:bg-slate-950 p-6 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-850 hover:shadow-card hover:bg-slate-50/30 dark:hover:bg-slate-900/30 transition-all duration-300"
            >
              <div className="relative mb-6 z-10">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md transition-all duration-500 ${
                    isMiddle
                      ? "bg-welqo-terracotta shadow-lg shadow-welqo-terracotta/25 group-hover:scale-105"
                      : "bg-slate-900 dark:bg-slate-800 group-hover:bg-welqo-terracotta group-hover:shadow-lg group-hover:shadow-welqo-terracotta/20 group-hover:scale-105"
                  }`}
                >
                  {step.num}
                </div>
                {isMiddle && (
                  <div className="absolute inset-0 bg-welqo-terracotta rounded-xl animate-pulse opacity-20 pointer-events-none" />
                )}
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-welqo-terracotta mb-2 bg-welqo-terracotta/5 border border-welqo-terracotta/10 px-2 py-0.5 rounded">
                {step.duration}
              </span>

              <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-welqo-terracotta transition-colors">
                {step.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-medium">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
