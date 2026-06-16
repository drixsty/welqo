import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  locale?: string;
}

export const Footer = ({ locale = "fr" }: FooterProps) => {
  const isFr = locale !== "en";
  const base = isFr ? "" : "/en";
  const homePath = isFr ? "/" : "/en";
  const year = new Date().getFullYear();
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;

  const col1 = {
    title: isFr ? "L'Univers Welqo" : "Welqo Universe",
    links: [
      {
        label: isFr
          ? "Propriétaires — Confier son Airbnb"
          : "For owners — Hand over your Airbnb",
        href: `${base}/proprietaires`,
      },
      {
        label: isFr ? "Tarifs — Commission 20%" : "Pricing — 20% Commission",
        href: `${base}/tarifs`,
      },
      {
        label: isFr ? "Calculateur de rentabilité" : "Yield calculator",
        href: `${base}/calculateur-rentabilite-airbnb`,
      },
      {
        label: isFr ? "Nos logements" : "Our properties",
        href: `${base}/logements`,
      },
      {
        label: "Blog",
        href: `${base}/blog`,
      },
      {
        label: isFr ? "À propos de Welqo" : "About Welqo",
        href: `${base}/a-propos`,
      },
      ...(dashboardUrl
        ? [
            {
              label: isFr ? "Espace Propriétaire" : "Owner Portal",
              href: dashboardUrl,
            },
          ]
        : []),
    ],
  };

  const colVilles = {
    title: isFr ? "Nos villes" : "Our cities",
    links: [
      {
        label: isFr ? "Conciergerie Airbnb Lille" : "Airbnb Concierge Lille",
        href: `${base}/conciergerie-airbnb-lille`,
      },
      {
        label: isFr ? "Conciergerie Airbnb Lens" : "Airbnb Concierge Lens",
        href: `${base}/conciergerie-airbnb-lens`,
      },
      {
        label: isFr ? "Conciergerie Airbnb Arras" : "Airbnb Concierge Arras",
        href: `${base}/conciergerie-airbnb-arras`,
      },
      {
        label: isFr
          ? "Conciergerie Airbnb Béthune"
          : "Airbnb Concierge Béthune",
        href: `${base}/conciergerie-airbnb-bethune`,
      },
      {
        label: "Vieux-Lille",
        href: `${base}/conciergerie-airbnb-vieux-lille`,
      },
      {
        label: "Wazemmes",
        href: `${base}/conciergerie-airbnb-wazemmes`,
      },
      {
        label: "Euralille",
        href: `${base}/conciergerie-airbnb-euralille`,
      },
      {
        label: isFr ? "Conciergerie Airbnb Douai" : "Airbnb Concierge Douai",
        href: `${base}/conciergerie-airbnb-douai`,
      },
    ],
  };

  const col2 = {
    title: isFr ? "Légal & Éthique" : "Legal & Ethics",
    links: [
      {
        label: isFr ? "Mentions légales" : "Legal notice",
        href: `${base}/mentions-legales`,
      },
      {
        label: isFr ? "Politique de confidentialité" : "Privacy policy",
        href: `${base}/politique-de-confidentialite`,
      },
      {
        label: isFr ? "Politique de cookies" : "Cookies policy",
        href: `${base}/politique-de-cookies`,
      },
    ],
  };

  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <a href={base || "/"} className="block w-fit">
              <BrandLogo
                variant="cursive"
                size="sm"
                className="text-slate-900 dark:text-white"
              />
            </a>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
              {isFr
                ? "Gestion locative et conciergerie de confiance pour vos biens d'exception dans le Hauts-de-France."
                : "Trusted rental management and concierge services for your exceptional properties in Hauts-de-France."}
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-slate-900 dark:text-white mb-6">
              {col1.title}
            </h3>
            <ul className="space-y-3">
              {col1.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-welqo-terracotta transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column Villes */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-slate-900 dark:text-white mb-6">
              {colVilles.title}
            </h3>
            <ul className="space-y-3">
              {colVilles.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-welqo-terracotta transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-slate-900 dark:text-white mb-6">
              {col2.title}
            </h3>
            <ul className="space-y-3">
              {col2.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-welqo-terracotta transition-colors"
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
      <div className="border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-32 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            © {year} Welqo.{" "}
            {isFr
              ? "Conciergerie à Lille, Lens & Arras."
              : "Concierge in Lille, Lens & Arras."}
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <a
              href={`${base}/mentions-legales`}
              className="hover:text-welqo-terracotta transition-colors"
            >
              {isFr ? "Légal" : "Legal"}
            </a>
            <a
              href={`${base}/politique-de-confidentialite`}
              className="hover:text-welqo-terracotta transition-colors"
            >
              {isFr ? "Confidentialité" : "Privacy"}
            </a>
            <a
              href={`${base}/politique-de-cookies`}
              className="hover:text-welqo-terracotta transition-colors"
            >
              {isFr ? "Cookies" : "Cookies"}
            </a>
            <span className="text-welqo-terracotta font-bold tracking-tighter">
              Hauts-de-France
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
