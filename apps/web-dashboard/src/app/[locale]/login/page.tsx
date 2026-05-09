"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { login } from "../../../lib/auth";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "fr";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="w-full max-w-md z-10">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-500/5 border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tighter mb-4 uppercase italic">
              {t("title")}
            </h1>
            <p className="text-slate-500 text-sm font-medium">{t("subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 ml-1">
                {t("emailLabel")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="marc@exemple.fr"
                required
                autoComplete="email"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 ml-1">
                {t("passwordLabel")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all font-medium"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs font-bold text-blue-600 hover:underline">
                {t("forgotPassword")}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 text-sm font-bold rounded-2xl border border-red-100 dark:border-red-900">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion…
                </span>
              ) : (
                t("loginButton")
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 font-medium mb-2">{t("noAccount")}</p>
            <button className="text-blue-600 font-bold hover:underline">{t("contactWelqo")}</button>
          </div>
        </div>

        <p className="text-center mt-8 text-xs text-slate-400 font-medium tracking-widest uppercase">
          Welqo — Excellence en Conciergerie
        </p>
      </div>
    </div>
  );
}
