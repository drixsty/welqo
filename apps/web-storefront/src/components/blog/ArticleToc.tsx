"use client";
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

export function ArticleToc({
  items,
  locale = "fr",
}: {
  items: TocItem[];
  locale?: string;
}) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((e: IntersectionObserverEntry) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0% -65% 0%" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
        Sommaire
      </p>
      <ul className="space-y-0.5">
        {items.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`flex items-center gap-2 text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 rounded-r-sm ${
                active === id
                  ? "border-blue-600 text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/30"
                  : "border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500"
              }`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">
          Déléguer votre Airbnb
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
          Welqo gère votre bien à Lille. Devis gratuit en 24h.
        </p>
        <a
          href="#contact"
          className="block text-center py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-black transition-colors"
        >
          Estimer mes revenus →
        </a>
        <a
          href={`/${locale}/proprietaires`}
          className="block text-center py-1.5 text-blue-600 text-xs font-bold hover:underline mt-1"
        >
          En savoir plus
        </a>
      </div>
    </nav>
  );
}
