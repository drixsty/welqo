"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { submitCookieConsentEmail } from "@/app/actions/cookie-consent";

const STORAGE_KEY = "welqo_cookie_consent";

type Consent = "accepted" | "declined" | null;

interface CookieBannerProps {
  locale?: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function CookieBanner({ locale = "fr" }: CookieBannerProps) {
  const t = useTranslations("CookieBanner");
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const base = locale === "fr" ? "" : "/en";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
    setConsent(stored);
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "accepted");
    }
    setConsent("accepted");
    setVisible(false);

    if (email && isValidEmail(email)) {
      submitCookieConsentEmail({ email, locale }).catch(() => {});
    }
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
      aria-label={t("ariaLabel")}
      className="fixed bottom-0 left-0 right-0 z-50 p-6 md:max-w-md md:left-6 md:bottom-6 md:right-auto animate-fade-up"
    >
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded flex items-center justify-center text-sm">
            🍪
          </div>
          <h2 className="font-bold text-slate-900 dark:text-white text-base tracking-tight">
            {t("title")}
          </h2>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-5">
          {t("message")}{" "}
          <Link
            href={`${base}/politique-de-confidentialite`}
            className="text-welqo-terracotta hover:underline font-bold"
          >
            {t("policy")}
          </Link>
          .
        </p>

        {/* Section opt-in email — facultatif, séparée du consentement cookies */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mb-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            aria-label={t("emailPlaceholder")}
            className="w-full px-3 py-2 mb-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-welqo-terracotta"
          />
          <p className="text-[10px] text-slate-400 leading-snug">
            {t("consentHint")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={accept}
            className="flex-1 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-xs transition-all hover:bg-slate-800 dark:hover:bg-slate-100"
          >
            {t("accept")}
          </button>
          <button
            onClick={decline}
            className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-bold text-xs transition-all hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {t("decline")}
          </button>
        </div>
      </div>
    </div>
  );
}
