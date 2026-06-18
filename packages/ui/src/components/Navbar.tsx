"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";

interface NavLink {
  label: string;
  href: string;
  sectionId?: string;
}

interface NavbarProps {
  title?: string;
  locale?: string;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

function defaultLinks(locale: string): NavLink[] {
  const isFr = locale !== "en";
  const base = isFr ? "" : "/en";
  const homePath = isFr ? "/" : "/en";
  return isFr
    ? [
        {
          label: "Comment ça marche",
          href: `${homePath}#comment-ca-marche`,
          sectionId: "comment-ca-marche",
        },
        {
          label: "Estimer mes revenus",
          href: `${homePath}#simulator`,
          sectionId: "simulator",
        },
        {
          label: "Pourquoi Welqo",
          href: `${homePath}#pourquoi-welqo`,
          sectionId: "pourquoi-welqo",
        },
        { label: "Propriétaires", href: `${base}/proprietaires` },
        { label: "Blog", href: `${base}/blog` },
      ]
    : [
        {
          label: "How it works",
          href: `${homePath}#how-it-works`,
          sectionId: "how-it-works",
        },
        {
          label: "Estimate my income",
          href: `${homePath}#simulator`,
          sectionId: "simulator",
        },
        {
          label: "Why Welqo",
          href: `${homePath}#why-welqo`,
          sectionId: "why-welqo",
        },
        { label: "For owners", href: `${base}/proprietaires` },
        { label: "Blog", href: `${base}/blog` },
      ];
}

export const Navbar = ({
  locale = "fr",
  links,
  ctaLabel,
  ctaHref,
}: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  const isFr = locale !== "en";
  const base = isFr ? "" : "/en";

  // Custom language switcher logic for 'as-needed' locale prefix
  let localeSwitchHref = "/";
  if (pathname) {
    if (locale === "fr") {
      // Switch from FR to EN (prepend /en)
      localeSwitchHref = pathname === "/" ? "/en" : `/en${pathname}`;
    } else {
      // Switch from EN to FR (remove /en)
      localeSwitchHref = pathname.replace(/^\/en/, "") || "/";
    }
  } else {
    localeSwitchHref = locale === "fr" ? "/en" : "/";
  }

  const navLinks = links ?? defaultLinks(locale);
  const cta = ctaLabel ?? (isFr ? "Devis gratuit" : "Free quote");
  const ctaLink = ctaHref ?? (isFr ? "/#contact" : "/en#contact");

  // Scroll-spy
  useEffect(() => {
    const sectionIds = navLinks
      .filter((l) => l.sectionId)
      .map((l) => l.sectionId as string);
    if (sectionIds.length === 0) return;

    const visible = new Map<string, number>();
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          let best: string | null = null;
          let bestRatio = 0;
          visible.forEach((ratio, key) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = key;
            }
          });
          setActiveSection(best);
        },
        { threshold: [0, 0.1, 0.3, 0.5] },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [navLinks]);

  const isTransparent = false;

  const isLinkActive = (link: NavLink) => {
    if (link.sectionId) return activeSection === link.sectionId;
    const homePath = base || "/";
    return (
      pathname === link.href ||
      (link.href !== homePath && pathname?.startsWith(link.href))
    );
  };

  const handleLocaleSwitch = () => {
    const targetLocale = locale === "fr" ? "en" : "fr";
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 h-16 flex items-center transition-all duration-300 ${
        isTransparent
          ? "bg-gradient-to-b from-black/40 to-transparent border-b border-transparent"
          : "bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href={base || "/"}
            className="transition-transform hover:scale-105 active:scale-95 shrink-0"
          >
            <BrandLogo
              variant="cursive"
              size="sm"
              className={`scale-90 origin-left transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-slate-900 dark:text-white"
              }`}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link, i) => {
              const active = isLinkActive(link);
              const showSep =
                !link.sectionId &&
                i > 0 &&
                !!navLinks[i - 1]?.sectionId;
              return (
                <div key={link.label} className="flex items-center">
                  {showSep && (
                    <div
                      className={`w-px h-4 mx-2 ${isTransparent ? "bg-white/30" : "bg-slate-200 dark:bg-slate-700"}`}
                    />
                  )}
                  <a
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md text-[12px] font-bold transition-all duration-200 ${
                      active
                        ? isTransparent
                          ? "text-white bg-white/15"
                          : "text-welqo-terracotta bg-welqo-terracotta/10"
                        : isTransparent
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.label}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Right: locale + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={localeSwitchHref}
              onClick={handleLocaleSwitch}
              className={`text-[11px] font-bold px-2 py-1.5 rounded-md transition-all duration-200 ${
                isTransparent
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {locale === "fr" ? "EN" : "FR"}
            </a>
            <a
              href={ctaLink}
              className="h-9 px-5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 whitespace-nowrap"
            >
              {cta}
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              isTransparent
                ? "hover:bg-white/10"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <div className="w-5 flex flex-col gap-[5px]">
              {[
                open ? "rotate-45 translate-y-[6.5px]" : "",
                open ? "opacity-0 scale-x-0" : "",
                open ? "-rotate-45 -translate-y-[6.5px]" : "",
              ].map((transform, i) => (
                <span
                  key={i}
                  className={`block h-[1.5px] w-full rounded-full transition-all duration-300 origin-center ${transform} ${
                    isTransparent ? "bg-white" : "bg-slate-900 dark:bg-white"
                  }`}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu — fond solide pour éviter tout problème de contraste */}
      <div
        className={`fixed inset-x-0 top-16 z-40 md:hidden transition-all duration-300 ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-1"
        }`}
      >
        <div className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 px-4 py-4 space-y-1 shadow-xl">
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  active
                    ? "bg-welqo-terracotta/10 text-welqo-terracotta"
                    : "text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-welqo-terracotta shrink-0" />
                )}
              </a>
            );
          })}

          <div className="pt-3 mt-1 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <a
              href={ctaLink}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-welqo-terracotta hover:bg-welqo-terracotta-dark text-white rounded-xl font-bold text-sm transition-all active:scale-95"
            >
              {cta}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href={localeSwitchHref}
              onClick={handleLocaleSwitch}
              className="flex items-center justify-center w-full py-2.5 text-slate-400 dark:text-slate-500 text-xs font-bold"
            >
              {locale === "fr" ? "Switch to English" : "Version Française"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
