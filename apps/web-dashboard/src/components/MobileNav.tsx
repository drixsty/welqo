"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Settings,
  Plus,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOBILE_ITEMS = [
  { icon: LayoutDashboard, label: "Home", path: "" },
  { icon: Calendar, label: "Planning", path: "/calendrier" },
  { icon: null, label: "Add", path: "#", isAction: true },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: Settings, label: "Réglages", path: "/parametres" },
];

export const MobileNav = () => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "fr";
  const localeBase = `/${locale}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]" />

      <nav className="relative flex items-center justify-around px-4 pb-safe-area-inset-bottom h-20">
        {MOBILE_ITEMS.map((item, index) => {
          if (item.isAction) {
            return (
              <button
                key="action"
                className="flex items-center justify-center w-14 h-14 -mt-10 bg-primary text-white rounded-lg shadow-lg shadow-primary/30 active:scale-90 transition-transform"
              >
                <Plus className="w-8 h-8" />
              </button>
            );
          }

          const href = `${localeBase}${item.path}`;
          const isActive =
            item.path === ""
              ? pathname === localeBase || pathname === `${localeBase}/`
              : pathname.startsWith(href);

          return (
            <Link
              key={item.path}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 w-16 h-full transition-all",
                isActive
                  ? "text-primary scale-110"
                  : "text-slate-400 dark:text-slate-500",
              )}
            >
              <item.icon
                className={cn(
                  "w-6 h-6",
                  isActive ? "stroke-[2.5px]" : "stroke-[2px]",
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-bold tracking-tight",
                  isActive ? "opacity-100" : "opacity-70",
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1.5 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
