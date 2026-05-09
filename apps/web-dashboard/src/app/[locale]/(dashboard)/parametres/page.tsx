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
      color: "text-blue-600",
      bg: "bg-blue-600/10",
      items: [
        { label: "Nom complet",   value: owner ? `${owner.firstName} ${owner.lastName}` : "—" },
        { label: "Email",         value: owner?.email ?? "—" },
        { label: "Rôle",          value: owner?.role ?? "—" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      color: "text-purple-600",
      bg: "bg-purple-600/10",
      items: [
        { label: "Email nouvelles réservations", value: "Activé" },
        { label: "Email annulations",            value: "Activé" },
        { label: "Résumé hebdomadaire",          value: "Désactivé" },
      ],
    },
    {
      title: "Sécurité",
      icon: Shield,
      color: "text-emerald-600",
      bg: "bg-emerald-600/10",
      items: [
        { label: "Authentification",   value: "JWT" },
        { label: "Dernière connexion", value: "Aujourd'hui" },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Paramètres
        </h1>
        <p className="text-slate-500 font-medium">Gérez votre compte et vos préférences.</p>
      </header>

      {/* Profile hero */}
      <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] text-white">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-black">
            {owner ? `${owner.firstName[0]}${owner.lastName[0]}` : "?"}
          </div>
          <div>
            <p className="text-xl font-black">
              {owner ? `${owner.firstName} ${owner.lastName}` : "Propriétaire"}
            </p>
            <p className="text-blue-200 text-sm font-medium">{owner?.email}</p>
            <span className="inline-block mt-2 px-3 py-0.5 bg-white/20 rounded-full text-xs font-black tracking-wide">
              {owner?.role ?? "OWNER"}
            </span>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.title} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className={`w-9 h-9 ${section.bg} ${section.color} rounded-xl flex items-center justify-center`}>
              <section.icon className="w-4.5 h-4.5 w-5 h-5" />
            </div>
            <h2 className="font-black text-slate-900 dark:text-white">{section.title}</h2>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between px-6 py-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.label}</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={() => { logout(); router.push(`/${locale}/login`); }}
        className="w-full flex items-center justify-between p-6 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 rounded-2xl text-red-600 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <LogOut className="w-5 h-5" />
          <span className="font-black">Se déconnecter</span>
        </div>
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
