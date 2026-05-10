"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { login } from "../../../lib/auth";
import { BrandLogo, Button } from "@welqo/ui";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "fr";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-slate-50 dark:bg-black relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="w-full max-w-md z-10">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 md:p-12 shadow-2xl shadow-primary/5 border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-10 flex flex-col items-center">
            <BrandLogo variant="cursive" size="lg" className="mb-8" />
            <h1 className="text-3xl font-luxury tracking-tight mb-2">
              {t("title")}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              {t("subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 ml-1 tracking-widest">
                {t("emailLabel")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="marc@exemple.fr"
                required
                autoComplete="email"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 ml-1 tracking-widest">
                {t("passwordLabel")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs font-bold text-primary hover:underline"
              >
                {t("forgotPassword")}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 text-sm font-bold rounded-md border border-red-100 dark:border-red-900">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={loading}
            >
              {t("loginButton")}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 font-medium mb-2">
              {t("noAccount")}
            </p>
            <button className="text-primary font-bold hover:underline">
              {t("contactWelqo")}
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-[10px] text-slate-400 font-medium tracking-[0.2em] uppercase">
          Welqo — Excellence en Conciergerie
        </p>
      </div>
    </div>
  );
}
