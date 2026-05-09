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
  ShieldCheck,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getStoredOwner, logout, type Owner } from "../lib/auth";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Vue d'ensemble", path: "" },
  { icon: Calendar,        label: "Calendrier",     path: "/calendrier" },
  { icon: Home,            label: "Mes Logements",  path: "/logements" },
  { icon: TrendingUp,      label: "Performances",   path: "/stats" },
  { icon: CreditCard,      label: "Paiements",      path: "/paiements" },
  { icon: Settings,        label: "Paramètres",     path: "/parametres" },
];

export const Sidebar = () => {
  const pathname  = usePathname();
  const router    = useRouter();
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
    <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-8">
        <Link href={localeBase} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-110">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-black text-xl tracking-tighter">WELQO</h1>
            <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">Partner</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 py-4 space-y-2">
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
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive
                  ? "bg-blue-600/10 text-blue-500 border border-blue-600/20 shadow-inner"
                  : "text-slate-400 hover:text-white hover:bg-slate-900",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-blue-500" : "text-slate-500",
                )}
              />
              <span className="font-bold text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Owner info & logout */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/50">
        <div className="flex items-center gap-4 p-4 mb-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-slate-800 flex items-center justify-center text-white font-black text-sm shrink-0">
            {owner ? owner.firstName.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm truncate">
              {owner ? `${owner.firstName} ${owner.lastName}` : "—"}
            </p>
            <p className="text-slate-500 text-xs truncate">
              {owner?.email ?? "—"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
