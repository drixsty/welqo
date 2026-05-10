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
  BarChart3,
  FileText,
  MessageCircle,
  Zap,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getStoredOwner, logout, type Owner } from "../lib/auth";
import { BrandLogo } from "@welqo/ui";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_GROUPS = [
  {
    label: null,
    items: [
      { icon: LayoutDashboard, label: "Tableau de bord", path: "", exact: true },
    ],
  },
  {
    label: "Communication",
    items: [
      { icon: MessageCircle, label: "Messages", path: "/messages", exact: true },
      { icon: Zap, label: "Automatisations", path: "/messages/automatisations" },
    ],
  },
  {
    label: "Gestion",
    items: [
      { icon: Calendar, label: "Planning", path: "/calendrier", exact: true },
      { icon: FileText, label: "Mandats", path: "/mandats", exact: true },
      { icon: Home, label: "Logements", path: "/logements", exact: true },
    ],
  },
  {
    label: "Analyse",
    items: [
      { icon: BarChart3, label: "Analyses", path: "/stats", exact: true },
      { icon: CreditCard, label: "Finances", path: "/paiements", exact: true },
    ],
  },
];

type NavLinkProps = {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
};


function NavLink({ href, icon: Icon, label, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-xs transition-colors duration-100",
        active
          ? "text-primary bg-primary/[0.08] dark:bg-primary/[0.12] font-semibold"
          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium",
      )}
    >
      {active && (
        <span className="absolute left-0 inset-y-1.5 w-0.5 bg-primary rounded-r-full" />
      )}
      <Icon
        className={cn(
          "w-3.5 h-3.5 shrink-0",
          active ? "text-primary" : "text-slate-400 dark:text-slate-500",
        )}
      />
      <span>{label}</span>
    </Link>
  );
}

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [owner, setOwner] = useState<Owner | null>(null);

  const locale = pathname.split("/")[1] ?? "fr";
  const localeBase = `/${locale}`;

  useEffect(() => {
    setOwner(getStoredOwner());
  }, []);

  function handleLogout() {
    logout();
    router.push(`${localeBase}/login`);
  }

  function isActive(path: string, exact?: boolean) {
    const href = `${localeBase}${path}`;
    if (path === "") return pathname === localeBase || pathname === `${localeBase}/`;
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="w-56 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800/60 flex flex-col h-screen sticky top-0 z-40 overflow-y-auto">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 shrink-0">
        <Link href={localeBase} className="flex items-center gap-2.5">
          <BrandLogo
            variant="cursive"
            size="sm"
            className="text-slate-900 dark:text-white"
          />
          <span className="text-[9px] font-bold tracking-wide text-primary bg-primary/10 px-1.5 py-0.5 rounded-sm border border-primary/20">
            Pro
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-2.5 pb-4 space-y-4">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi}>
            {group.label && (
              <p className="px-2 mb-1.5 text-[9px] font-semibold tracking-[0.08em] text-slate-400 dark:text-slate-600">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  href={`${localeBase}${item.path}`}
                  icon={item.icon}
                  label={item.label}
                  active={isActive(item.path, item.exact)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-100 dark:border-slate-800/60">
        <div className="px-2.5 pt-2.5 pb-1">
          <NavLink
            href={`${localeBase}/parametres`}
            icon={Settings}
            label="Préférences"
            active={pathname.startsWith(`${localeBase}/parametres`)}
          />
        </div>

        <div className="px-3 py-3 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-[11px] shrink-0">
            {owner ? owner.firstName.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate leading-none mb-0.5">
              {owner ? `${owner.firstName} ${owner.lastName}` : "Propriétaire"}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-none">
              Welqo Pro
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Déconnexion"
            className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
