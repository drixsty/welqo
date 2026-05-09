import React from "react";

interface FooterProps {
  locale?: string;
}

export const Footer = ({ locale = "fr" }: FooterProps) => {
  const isFr  = locale !== "en";
  const base  = `/${locale}`;
  const year  = new Date().getFullYear();

  const col1 = {
    title: isFr ? "Plateforme"  : "Platform",
    links: [
      { label: isFr ? "Conciergerie Airbnb Lille" : "Airbnb Concierge Lille", href: `${base}/proprietaires` },
      { label: isFr ? "Dashboard propriétaire"    : "Owner Dashboard",        href: process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "#" },
      { label: isFr ? "Réserver un séjour"        : "Book a stay",            href: base },
      { label: isFr ? "Nos logements"             : "Our properties",         href: `${base}/logements` },
    ],
  };

  const col2 = {
    title: isFr ? "Assistance" : "Support",
    links: [
      { label: isFr ? "Centre d'aide"                : "Help center",     href: "#" },
      { label: isFr ? "Mentions légales"             : "Legal notice",    href: `${base}/mentions-legales` },
      { label: isFr ? "Politique de confidentialité" : "Privacy policy",  href: `${base}/politique-de-confidentialite` },
    ],
  };

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <a href={base} className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white transition-transform group-hover:scale-110">
                W
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                WELQO
              </span>
            </a>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs text-sm leading-relaxed font-medium">
              {isFr
                ? "Excellence en gestion locative courte durée. Transparence totale pour les propriétaires, expériences inoubliables pour les voyageurs."
                : "Excellence in short-term rental management. Full transparency for owners, unforgettable experiences for guests."}
            </p>
            {/* Social proof */}
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <span className="flex -space-x-2">
                {["bg-blue-500", "bg-purple-500", "bg-emerald-500"].map((c, i) => (
                  <span key={i} className={`w-7 h-7 ${c} rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-white text-[10px] font-black`}>
                    {["M", "L", "A"][i]}
                  </span>
                ))}
              </span>
              <span className="ml-1">
                {isFr ? "Rejoignez +50 propriétaires" : "Join 50+ owners"}
              </span>
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">
              {col1.title}
            </h3>
            <ul className="space-y-3">
              {col1.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">
              {col2.title}
            </h3>
            <ul className="space-y-3">
              {col2.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 font-medium">
            © {year} Welqo.{" "}
            {isFr ? "Tous droits réservés." : "All rights reserved."}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href={`${base}/mentions-legales`} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium">
              {isFr ? "Mentions légales" : "Legal"}
            </a>
            <span>·</span>
            <a href={`${base}/politique-de-confidentialite`} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium">
              {isFr ? "Confidentialité" : "Privacy"}
            </a>
            <span>·</span>
            <span className="font-black text-blue-600">🇫🇷 France</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
