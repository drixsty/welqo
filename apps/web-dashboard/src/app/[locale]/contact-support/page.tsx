"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { BrandLogo } from "@welqo/ui";
import { ArrowLeft, Mail, Phone } from "lucide-react";

export default function ContactSupportPage() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "fr";

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] [background-size:20px_20px]" />

      <div className="w-full max-w-[400px] z-10 animate-fade-up">
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
                Contacter un conseiller
              </h1>
              <p className="text-slate-500 text-sm mt-2 font-medium text-center">
                Notre équipe est à votre disposition pour vous accompagner.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: Mail,
                title: "Par e-mail",
                value: "partenaires@welqo.com",
                href: "mailto:partenaires@welqo.com",
              },
              {
                icon: Phone,
                title: "Par téléphone",
                value: "03 20 00 00 00",
                sub: "9h - 18h",
                href: "tel:0320000000",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-md border border-slate-50 dark:border-white/5 hover:border-welqo-terracotta hover:bg-white dark:hover:bg-slate-900 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:scale-105 transition-transform">
                  <item.icon className="w-4 h-4 text-welqo-terracotta" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-bold text-slate-500 group-hover:text-welqo-terracotta transition-colors uppercase tracking-tight">
                      {item.title}
                    </p>
                    {item.sub && (
                      <span className="text-[9px] text-slate-400 italic">
                        ({item.sub})
                      </span>
                    )}
                  </div>
                  <p className="text-[15px] font-bold text-slate-900 dark:text-white group-hover:text-welqo-terracotta transition-colors leading-tight">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 text-center">
            <button
              onClick={() => router.push(`/${locale}/login`)}
              className="text-welqo-terracotta text-[13px] font-bold hover:underline"
            >
              Se connecter
            </button>
          </div>
        </div>

        <p className="text-center mt-5 text-[10px] text-slate-400 font-medium tracking-tight">
          Welqo Professional — Excellence & Support
        </p>
      </div>
    </div>
  );
}
