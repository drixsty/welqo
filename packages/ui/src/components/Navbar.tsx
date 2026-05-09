"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  return isFr
    ? [
        { label: "Logements",     href: "#logements" },
        { label: "Propriétaires", href: `/${locale}/proprietaires` },
        { label: "Blog",          href: `/${locale}/blog` },
      ]
    : [
        { label: "Properties", href: "#logements" },
        { label: "For Owners", href: `/${locale}/proprietaires` },
        { label: "Blog",       href: `/${locale}/blog` },
      ];
}

export const Navbar = ({
  title = "WELQO",
  locale = "fr",
  links,
  ctaLabel,
  ctaHref,
}: NavbarProps) => {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isFr   = locale !== "en";
  const altLocale     = locale === "fr" ? "en" : "fr";
  const localeSwitchHref = pathname
    ? pathname.replace(new RegExp(`^/${locale}`), `/${altLocale}`)
    : `/${altLocale}`;
  const navLinks = links ?? defaultLinks(locale);
  const cta      = ctaLabel ?? (isFr ? "Nous contacter" : "Contact us");
  const ctaLink  = ctaHref  ?? `/${locale}#contact`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80"
          : "bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-sm transition-transform group-hover:scale-110">
              W
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {title}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link: NavLink) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Locale toggle */}
            <a
              href={localeSwitchHref}
              className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {locale === "fr" ? "EN" : "FR"}
            </a>
            <a
              href={ctaLink}
              className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-black hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              {cta}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className={`w-5 h-0.5 bg-slate-900 dark:bg-white rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-slate-900 dark:bg-white rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-slate-900 dark:bg-white rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-72 border-t border-slate-100 dark:border-slate-800" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1 bg-white dark:bg-slate-950">
          {navLinks.map((link: NavLink) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 pb-1 flex items-center gap-3 px-4">
            <a
              href={ctaLink}
              onClick={() => setOpen(false)}
              className="flex-1 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black text-center hover:bg-blue-600 transition-colors"
            >
              {cta}
            </a>
            <a
              href={localeSwitchHref}
              className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-black uppercase tracking-widest"
            >
              {locale === "fr" ? "EN" : "FR"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
