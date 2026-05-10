"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { Globe } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
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
  const base = `/${locale}`;
  return isFr
    ? [
        { label: "Hébergements", href: base },
        { label: "Propriétaires", href: `${base}/proprietaires` },
        { label: "Blog", href: `${base}/blog` },
      ]
    : [
        { label: "Accommodations", href: base },
        { label: "Owners", href: `${base}/proprietaires` },
        { label: "Blog", href: `${base}/blog` },
      ];
}

export const Navbar = ({
  title = "WELQO",
  locale = "fr",
  links,
  ctaLabel,
  ctaHref,
}: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isFr = locale !== "en";
  const altLocale = locale === "fr" ? "en" : "fr";
  const localeSwitchHref = pathname
    ? pathname.replace(new RegExp(`^/${locale}`), `/${altLocale}`)
    : `/${altLocale}`;
  const navLinks = links ?? defaultLinks(locale);
  const cta = ctaLabel ?? (isFr ? "Devenir partenaire" : "Become a partner");
  const ctaLink = ctaHref ?? `/${locale}/proprietaires#simulator`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 border-b h-16 flex items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl ${
        scrolled || open
          ? "border-slate-200/60 dark:border-white/10 shadow-sm"
          : "border-slate-200/20 dark:border-white/5 shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href={`/${locale}`} className="transition-transform hover:scale-105 active:scale-95">
              <BrandLogo
                variant="cursive"
                size="sm"
                className="text-slate-900 dark:text-white scale-90 origin-left"
              />
            </a>
          </div>

          {/* Desktop Links - Center */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link: NavLink) => {
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname?.startsWith(link.href));
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-bold transition-all duration-200 ${
                    isActive 
                      ? "text-welqo-terracotta bg-welqo-terracotta/5" 
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Section - CTA & Locale */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={localeSwitchHref}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === "fr" ? "EN" : "FR"}</span>
            </a>
            <a
              href={ctaLink}
              className="h-9 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold rounded-lg hover:bg-welqo-terracotta dark:hover:bg-welqo-terracotta dark:hover:text-white transition-all flex items-center justify-center tracking-tight shadow-sm active:scale-95 border border-transparent"
            >
              {cta}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-[1.5px] rounded-full bg-slate-900 dark:bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-[5.5px]" : ""}`} />
              <span className={`w-3/4 h-[1.5px] rounded-full bg-slate-900 dark:bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`w-full h-[1.5px] rounded-full bg-slate-900 dark:bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-x-0 top-16 z-50 md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-screen opacity-100 border-t border-slate-100 dark:border-white/5" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-10 space-y-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl">
          {navLinks.map((link: NavLink) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-2xl font-bold text-slate-900 dark:text-white hover:text-welqo-terracotta transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-8 flex flex-col gap-3">
            <a
              href={ctaLink}
              onClick={() => setOpen(false)}
              className="w-full py-4 bg-welqo-terracotta text-white rounded-lg font-bold text-center active:scale-95 transition-transform"
            >
              {cta}
            </a>
            <a
              href={localeSwitchHref}
              className="w-full py-4 bg-slate-50 dark:bg-slate-900 text-slate-400 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <Globe className="w-3.5 h-3.5" />
              {locale === "fr" ? "Switch to English" : "Version Française"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
