"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { login } from "../../../lib/auth";
import { BrandLogo } from "@welqo/ui";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "fr";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push(`/${locale}`);
    } catch (err: any) {
      setError(err.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] [background-size:20px_20px]" />

      <div className="w-full max-w-[360px] z-10 animate-fade-up">
        <div className="bg-white dark:bg-slate-900/50 rounded-lg p-7 border border-slate-100 dark:border-white/5">
          <div className="text-center mb-7 flex flex-col items-center">
            <BrandLogo size="sm" className="mb-4 scale-95" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Accès partenaire
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Veuillez vous identifier pour accéder à votre espace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5 ml-0.5 tracking-tight">
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-welqo-terracotta transition-all duration-200 peer-focus:h-1/2 rounded-full" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder="Votre e-mail"
                  required
                  autoComplete="email"
                  className="peer w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/10 rounded-md outline-none ring-0 focus:ring-0 focus:border-welqo-terracotta transition-all font-medium text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="relative group">
              <div className="flex items-center justify-between mb-1.5 ml-0.5">
                <label className="block text-[11px] font-bold text-slate-500 tracking-tight">
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={() => router.push(`/${locale}/forgot-password`)}
                  className="text-[11px] font-bold text-slate-400 hover:text-welqo-terracotta transition-colors"
                >
                  Oublié ?
                </button>
              </div>
              <div className="relative">
                <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-welqo-terracotta transition-all duration-200 peer-focus:h-1/2 rounded-full" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="peer w-full px-4 py-2.5 pr-10 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/10 rounded-md outline-none ring-0 focus:ring-0 focus:border-welqo-terracotta transition-all font-medium text-sm text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-welqo-terracotta transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 text-[12px] font-medium rounded border border-red-100 dark:border-red-900/30">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-welqo-terracotta hover:bg-[#b84429] disabled:opacity-50 text-white text-sm font-bold rounded flex items-center justify-center gap-2 mt-2 transition-colors"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <div className="mt-7 pt-6 border-t border-slate-50 dark:border-white/5 text-center">
            <button
              onClick={() => router.push(`/${locale}/contact-support`)}
              className="text-slate-900 dark:text-white text-[13px] font-bold hover:text-welqo-terracotta transition-colors"
            >
              Contacter mon conseiller
            </button>
          </div>
        </div>

        <p className="text-center mt-5 text-[10px] text-slate-400 font-medium tracking-tight">
          Welqo Professional — Partenaire de votre succès
        </p>
      </div>
    </div>
  );
}
