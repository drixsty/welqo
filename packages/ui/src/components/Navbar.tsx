"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";

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
        { label: "Logements", href: base },
        { label: "Conciergerie", href: `${base}/proprietaires` },
        { label: "Blog", href: `${base}/blog` },
      ]
    : [
        { label: "Accommodations", href: base },
        { label: "Concierge", href: `${base}/proprietaires` },
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
  const cta = ctaLabel ?? (isFr ? "Devenir Propriétaire" : "Partner with us");
  const ctaLink = ctaHref ?? `/${locale}/proprietaires#simulator`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${
        scrolled || open
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 shadow-sm"
          : "bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-100 dark:border-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2 group">
            <BrandLogo
              variant="cursive"
              size="sm"
              className="text-slate-900 dark:text-white"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link: NavLink) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-welqo-terracotta transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Locale toggle */}
            <a
              href={localeSwitchHref}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 transition-colors px-2 py-1 rounded"
            >
              {locale === "fr" ? "EN" : "FR"}
            </a>
            <a
              href={ctaLink}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-welqo-terracotta transition-all"
            >
              {cta}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Menu"
            aria-expanded={open}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 bg-slate-900 dark:bg-white ${open ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 bg-slate-900 dark:bg-white ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 bg-slate-900 dark:bg-white ${open ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-slate-200 dark:border-slate-800 ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-10 space-y-4 bg-white dark:bg-slate-950">
          {navLinks.map((link: NavLink) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-2xl font-bold text-slate-900 dark:text-white hover:text-welqo-terracotta transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-10 flex flex-col gap-3">
            <a
              href={ctaLink}
              onClick={() => setOpen(false)}
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-center hover:bg-welqo-terracotta hover:text-white transition-colors"
            >
              {cta}
            </a>
            <a
              href={localeSwitchHref}
              className="w-full py-4 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-lg text-sm font-bold text-center uppercase tracking-widest"
            >
              {locale === "fr" ? "Switch to English" : "Version Française"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
