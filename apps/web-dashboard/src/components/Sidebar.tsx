"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Home,
  CreditCard,
  Settings,
  LogOut,
  TrendingUp,
  FileText,
  MessageCircle,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getStoredOwner, logout, type Owner } from "../lib/auth";
import { BrandLogo } from "@welqo/ui";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Tableau de Bord", path: "" },
  { icon: FileText, label: "Mandats", path: "/mandats" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: Calendar, label: "Planning", path: "/calendrier" },
  { icon: Home, label: "Demeures", path: "/logements" },
  { icon: TrendingUp, label: "Analyses", path: "/stats" },
  { icon: CreditCard, label: "Finances", path: "/paiements" },
  { icon: Settings, label: "Préférences", path: "/parametres" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [owner, setOwner] = useState<Owner | null>(null);

  // Extract locale from pathname: "/fr/calendrier" → "fr"
  const locale = pathname.split("/")[1] ?? "fr";
  const localeBase = `/${locale}`;

  useEffect(() => {
    setOwner(getStoredOwner());
  }, []);

  function handleLogout() {
    logout();
    router.push(`${localeBase}/login`);
  }

  return (
    <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 z-40 overflow-y-auto">
      {/* Logo */}
      <div className="px-6 py-8 shrink-0">
        <Link href={localeBase} className="flex items-center gap-2 group">
          <BrandLogo
            variant="cursive"
            size="sm"
            className="text-slate-900 dark:text-white"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest text-welqo-terracotta bg-welqo-terracotta/10 px-1.5 py-0.5 rounded">
            Pro
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
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
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                isActive
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50",
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4",
                  isActive
                    ? "text-welqo-terracotta"
                    : "text-slate-400 dark:text-slate-500",
                )}
              />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1 h-4 bg-welqo-terracotta rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Owner info & logout */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-xs shrink-0">
            {owner ? owner.firstName.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="overflow-hidden">
            <p className="text-slate-900 dark:text-white font-bold text-xs truncate">
              {owner ? `${owner.firstName} ${owner.lastName}` : "Propriétaire"}
            </p>
            <p className="text-slate-500 text-[10px] truncate">
              {owner?.email ?? "welqo.io"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors font-medium text-xs"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
