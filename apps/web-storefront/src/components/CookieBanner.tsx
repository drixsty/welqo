"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "welqo_cookie_consent";

type Consent = "accepted" | "declined" | null;

interface CookieBannerProps {
  locale?: string;
}

export function CookieBanner({ locale = "fr" }: CookieBannerProps) {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible]  = useState(false);
  const base = `/${locale}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
    setConsent(stored);
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "accepted");
    }
    setConsent("accepted");
    setVisible(false);
  };

  const decline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "declined");
    }
    setConsent("declined");
    setVisible(false);
  };

  if (!visible || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Bandeau de consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 md:max-w-xl md:left-6 md:bottom-6 md:right-auto animate-fade-up"
    >
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/10 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center text-lg">
            🍪
          </div>
          <h2 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
            Cookies & Confidentialité
          </h2>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser
          notre trafic. En cliquant sur «&nbsp;Accepter&nbsp;», vous consentez à leur utilisation
          conformément à notre{" "}
          <Link
            href={`${base}/politique-de-confidentialite`}
            className="text-blue-600 hover:underline font-semibold"
          >
            politique de confidentialité
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={accept}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            Tout accepter
          </button>
          <button
            onClick={decline}
            className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-black text-sm transition-all active:scale-95"
          >
            Refuser
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          <Link href={`${base}/mentions-legales`} className="hover:text-blue-600 transition-colors">
            Mentions légales
          </Link>
          {" · "}
          <Link href={`${base}/politique-de-confidentialite`} className="hover:text-blue-600 transition-colors">
            Politique de confidentialité
          </Link>
        </p>
      </div>
    </div>
  );
}
