"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BrandLogo } from "@welqo/ui";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "fr";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] [background-size:20px_20px]" />

      <div className="w-full max-w-[360px] z-10 animate-fade-up">
        <div className="bg-white dark:bg-slate-900/50 rounded-lg p-7 border border-slate-100 dark:border-white/5">
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-400 hover:text-welqo-terracotta transition-colors mb-5 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-[12px] font-bold">Retour</span>
            </button>

            <div className="text-center flex flex-col items-center">
              <BrandLogo size="sm" className="mb-4 scale-95" />
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Mot de passe oublié
              </h1>
              <p className="text-slate-500 text-sm mt-2 font-medium">
                Entrez votre e-mail pour réinitialiser vos accès
              </p>
            </div>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
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
                    className="peer w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/10 rounded-md outline-none ring-0 focus:ring-0 focus:border-welqo-terracotta transition-all font-medium text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-welqo-terracotta hover:bg-[#b84429] disabled:opacity-50 text-white text-sm font-bold rounded flex items-center justify-center gap-2 mt-1 transition-colors"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  "Envoyer le lien"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-lg animate-fade-in">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
              <p className="text-emerald-800 dark:text-emerald-300 text-sm font-bold">
                Lien envoyé !
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 text-[11px] mt-1.5 font-medium leading-relaxed">
                Vérifiez votre boîte de réception pour réinitialiser votre mot
                de passe.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 text-center">
            <button
              onClick={() => router.push(`/${locale}/contact-support`)}
              className="text-welqo-terracotta text-[12px] font-bold hover:underline"
            >
              Contactez le support
            </button>
          </div>
        </div>

        <p className="text-center mt-5 text-[10px] text-slate-400 font-medium tracking-tight">
          Welqo Professional — Sécurité des accès
        </p>
      </div>
    </div>
  );
}
