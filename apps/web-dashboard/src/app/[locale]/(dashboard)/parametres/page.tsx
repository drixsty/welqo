"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Bell, Shield, LogOut, Mail } from "lucide-react";
import { getStoredOwner, logout } from "../../../../lib/auth";
import { useAuthGuard } from "../../../../lib/useAuthGuard";
import { PageWrapper } from "../../../../components/PageWrapper";
import { Button } from "@welqo/ui";

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
      primary: false,
      items: [
        {
          label: "Nom complet",
          value: owner ? `${owner.firstName} ${owner.lastName}` : "—",
        },
        { label: "Email", value: owner?.email ?? "—" },
        { label: "Rôle", value: owner?.role ?? "Propriétaire" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      primary: true,
      items: [
        { label: "Réservations", value: "Activé" },
        { label: "Annulations", value: "Activé" },
        { label: "Rapport hebdomadaire", value: "Désactivé" },
      ],
    },
    {
      title: "Sécurité",
      icon: Shield,
      primary: false,
      items: [
        { label: "Authentification", value: "JWT" },
        { label: "Dernier accès", value: "Aujourd'hui" },
      ],
    },
  ];

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Paramètres
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Préférences et sécurité de votre compte
          </p>
        </div>
        <div className="h-px bg-slate-100 dark:bg-slate-800/60" />

        {/* Profile card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-slate-900 text-white rounded-lg border border-slate-800">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-lg font-bold border border-white/10 shrink-0">
            {owner ? `${owner.firstName[0]}${owner.lastName[0]}` : "?"}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-semibold tracking-tight">
              {owner
                ? `${owner.firstName} ${owner.lastName}`
                : "Utilisateur Welqo"}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-400 text-[11px] mt-0.5">
              <Mail className="w-3 h-3" />
              {owner?.email}
            </div>
            <span className="inline-block mt-2 px-2 py-0.5 bg-primary text-white rounded text-[9px] font-bold uppercase tracking-widest">
              {owner?.role ?? "OWNER"}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white hover:text-slate-900 shrink-0"
          >
            Modifier
          </Button>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
                <section.icon
                  className={`w-3.5 h-3.5 ${section.primary ? "text-primary" : "text-slate-400"}`}
                />
                <h2 className="text-xs font-semibold text-slate-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-800 dark:text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              router.push(`/${locale}/login`);
            }}
            className="flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg group hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-all text-left"
          >
            <div className="w-8 h-8 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-md flex items-center justify-center border border-red-100 dark:border-red-900/30 shrink-0 group-hover:scale-105 transition-transform">
              <LogOut className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                Déconnexion
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Quitter votre espace sécurisé
              </p>
            </div>
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
