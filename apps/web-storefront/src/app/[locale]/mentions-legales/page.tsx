import React from "react";
import Link from "next/link";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isFr = locale !== "en";
  return {
    title: isFr ? "Mentions légales — Welqo" : "Legal Notice — Welqo",
    robots: { index: false },
  };
}

export default function MentionsLegalesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const base = `/${locale}`;
  return (
    <main className="min-h-screen bg-white dark:bg-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href={base}
          className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline mb-10"
        >
          ← Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase">
          Mentions légales
        </h1>
        <p className="text-slate-400 text-sm mb-12">
          Dernière mise à jour : {new Date().getFullYear()}
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">
              1. Éditeur du site
            </h2>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
              <p>
                <strong className="text-slate-900 dark:text-white">
                  Raison sociale :
                </strong>{" "}
                Welqo SAS
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  Siège social :
                </strong>{" "}
                [Adresse à compléter]
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  SIRET :
                </strong>{" "}
                [Numéro à compléter]
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  Capital social :
                </strong>{" "}
                [Montant à compléter]
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  Email :
                </strong>{" "}
                contact@welqo.fr
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  Directeur de publication :
                </strong>{" "}
                [Nom à compléter]
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">
              2. Hébergement
            </h2>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
              <p>
                <strong className="text-slate-900 dark:text-white">
                  Hébergeur :
                </strong>{" "}
                [Prestataire d'hébergement à compléter]
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  Adresse :
                </strong>{" "}
                [Adresse à compléter]
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">
              3. Propriété intellectuelle
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos)
              est la propriété exclusive de Welqo SAS ou de ses partenaires.
              Toute reproduction, même partielle, est strictement interdite sans
              autorisation préalable écrite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">
              4. Responsabilité
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Welqo s'efforce d'assurer l'exactitude et la mise à jour des
              informations diffusées sur ce site. Toutefois, Welqo ne peut
              garantir l'exactitude, la précision ou l'exhaustivité des
              informations mises à la disposition sur ce site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">
              5. Données personnelles
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Pour en savoir plus sur la gestion de vos données personnelles,
              veuillez consulter notre{" "}
              <Link
                href={`${base}/politique-de-confidentialite`}
                className="text-blue-600 hover:underline font-semibold"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">
              6. Cookies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Ce site utilise des cookies à des fins techniques et analytiques.
              Vous pouvez configurer votre navigateur pour refuser les cookies.
              Le refus de cookies peut entraîner une dégradation de votre
              expérience sur le site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">
              7. Droit applicable
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
