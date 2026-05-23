import React from "react";
import { getTranslations } from "next-intl/server";
import { Button } from "@welqo/ui";
import { Home, Search, ArrowLeft } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 mb-4">
            <span className="text-4xl font-black text-slate-300">404</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            {t("title")}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="/"
            variant="primary"
            size="lg"
            icon={Home}
            className="w-full sm:w-auto px-8"
          >
            {t("goHome")}
          </Button>
          <Button
            href="/logements"
            variant="secondary"
            size="lg"
            icon={Search}
            className="w-full sm:w-auto px-8"
          >
            {t("browseProperties")}
          </Button>
        </div>

        <div className="pt-10 border-t border-slate-100 dark:border-white/5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            {t("popularLinks")}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="/proprietaires"
              className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              {t("owners")}
            </a>
            <a
              href="/blog"
              className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              Blog
            </a>
            <a
              href="/contact"
              className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
