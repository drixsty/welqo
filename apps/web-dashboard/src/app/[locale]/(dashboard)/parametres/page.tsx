"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Bell, Shield, LogOut, ChevronRight } from "lucide-react";
import { getStoredOwner, logout } from "../../../../lib/auth";
import { useAuthGuard } from "../../../../lib/useAuthGuard";

export default function ParametresPage() {
  const router = useRouter();
  const { locale } = useAuthGuard();
  const [owner, setOwner] = useState(getStoredOwner());

  useEffect(() => {
    setOwner(getStoredOwner());
  }, []);

  const sections = [
    {
      title: "Profil",
      icon: User,
      color: "text-slate-900 dark:text-white",
      bg: "bg-slate-100 dark:bg-slate-800",
      items: [
        {
          label: "Nom complet",
          value: owner ? `${owner.firstName} ${owner.lastName}` : "—",
        },
        { label: "Email", value: owner?.email ?? "—" },
        { label: "Rôle", value: owner?.role ?? "—" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      color: "text-welqo-terracotta",
      bg: "bg-welqo-terracotta/10",
      items: [
        { label: "Email nouvelles réservations", value: "Activé" },
        { label: "Email annulations", value: "Activé" },
        { label: "Résumé hebdomadaire", value: "Désactivé" },
      ],
    },
    {
      title: "Sécurité",
      icon: Shield,
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-50 dark:bg-slate-800/50",
      items: [
        { label: "Authentification", value: "JWT" },
        { label: "Dernière connexion", value: "Aujourd'hui" },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Paramètres
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Gérez votre compte et vos préférences de sécurité.
        </p>
      </header>

      {/* Profile hero */}
      {/* Profile hero */}
      <div className="p-8 bg-slate-900 dark:bg-slate-50 rounded-lg text-white dark:text-slate-900 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white/10 dark:bg-slate-900/10 rounded-lg flex items-center justify-center text-2xl font-bold border border-white/20">
            {owner ? `${owner.firstName[0]}${owner.lastName[0]}` : "?"}
          </div>
          <div>
            <p className="text-xl font-bold">
              {owner ? `${owner.firstName} ${owner.lastName}` : "Propriétaire"}
            </p>
            <p className="text-slate-300 dark:text-slate-500 text-sm font-medium">
              {owner?.email}
            </p>
            <span className="inline-block mt-2 px-3 py-0.5 bg-welqo-terracotta rounded-full text-[10px] font-bold tracking-wide uppercase">
              {owner?.role ?? "OWNER"}
            </span>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div
          key={section.title}
          className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div
              className={`w-8 h-8 ${section.bg} ${section.color} rounded-lg flex items-center justify-center`}
            >
              <section.icon className="w-4.5 h-4.5 w-4 h-4" />
            </div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              {section.title}
            </h2>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {section.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {item.label}
                </span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      {/* Logout */}
      <button
        onClick={() => {
          logout();
          router.push(`/${locale}/login`);
        }}
        className="w-full flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-red-500 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <LogOut className="w-5 h-5" />
          <span className="font-bold">Se déconnecter</span>
        </div>
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
