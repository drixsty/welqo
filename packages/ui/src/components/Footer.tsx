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
        label: isFr ? "Conciergerie Lens & Arras" : "Lens & Arras Concierge",
        href: `${base}/blog/conciergerie-airbnb-lens-arras-bassin-minier`,
      },
      ...(dashboardUrl
        ? [
            {
              label: isFr ? "Espace Propriétaire" : "Owner Portal",
              href: dashboardUrl,
            },
          ]
        : []),
      {
        label: isFr ? "Nos Logements" : "Our Properties",
        href: `${base}/logements`,
      },
      {
        label: isFr ? "Estimer mes revenus" : "Estimate my income",
        href: `${homePath}#simulator`,
      },
      {
        label: "Blog",
        href: `${base}/blog`,
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
    ],
  };

  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
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

          {/* Column 2 */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
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
            <span className="text-welqo-terracotta font-bold uppercase tracking-tighter">
              Hauts-de-France
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
