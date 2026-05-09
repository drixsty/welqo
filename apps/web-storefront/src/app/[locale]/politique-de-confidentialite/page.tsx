import React from "react";
import Link from "next/link";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isFr = locale !== "en";
  return {
    title: isFr ? "Politique de confidentialité — Welqo" : "Privacy Policy — Welqo",
    robots: { index: false },
  };
}

export default function PolitiqueConfidentialitePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const base = `/${locale}`;
  return (
    <main className="min-h-screen bg-white dark:bg-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href={base} className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline mb-10">
          ← Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase">
          Politique de confidentialité
        </h1>
        <p className="text-slate-400 text-sm mb-12">Dernière mise à jour : {new Date().getFullYear()} — Conforme au RGPD</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">1. Responsable du traitement</h2>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
              <p><strong className="text-slate-900 dark:text-white">Société :</strong> Welqo SAS</p>
              <p><strong className="text-slate-900 dark:text-white">Email DPO :</strong> dpo@welqo.fr</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">2. Données collectées</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Dans le cadre de nos services, nous collectons les données suivantes :
            </p>
            <ul className="space-y-3">
              {[
                { cat: "Données d'identification", ex: "Nom, prénom, adresse email, numéro de téléphone" },
                { cat: "Données de réservation", ex: "Dates de séjour, nombre de voyageurs, logement réservé" },
                { cat: "Données financières", ex: "Montants payés (traitées par Stripe — nous ne stockons pas vos données de carte)" },
                { cat: "Données de navigation", ex: "Adresse IP, type de navigateur, pages visitées (via cookies analytiques)" },
              ].map((item) => (
                <li key={item.cat} className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{item.cat}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{item.ex}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">3. Finalités du traitement</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Vos données sont collectées pour les finalités suivantes :
            </p>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex gap-2"><span className="text-blue-600">→</span> Traitement et gestion de votre réservation</li>
              <li className="flex gap-2"><span className="text-blue-600">→</span> Envoi d'emails transactionnels (confirmation, rappels)</li>
              <li className="flex gap-2"><span className="text-blue-600">→</span> Amélioration de nos services et de votre expérience</li>
              <li className="flex gap-2"><span className="text-blue-600">→</span> Respect de nos obligations légales et comptables</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">4. Base légale</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Le traitement de vos données est fondé sur l'exécution du contrat de réservation (art. 6.1.b RGPD) et, pour les cookies analytiques, sur votre consentement (art. 6.1.a RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">5. Durée de conservation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { type: "Données de réservation", durée: "5 ans (obligations comptables)" },
                { type: "Données de navigation", durée: "13 mois maximum" },
                { type: "Emails transactionnels", durée: "3 ans" },
                { type: "Données de connexion", durée: "1 an" },
              ].map((d) => (
                <div key={d.type} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{d.type}</p>
                  <p className="text-blue-600 text-sm font-medium mt-1">{d.durée}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">6. Partage des données</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Vos données peuvent être partagées avec nos prestataires techniques dans le strict cadre de la fourniture du service :
            </p>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex gap-2"><span className="text-blue-600">→</span> <strong className="text-slate-800 dark:text-slate-200">Stripe</strong> — Traitement des paiements (USA, certifié Privacy Shield)</li>
              <li className="flex gap-2"><span className="text-blue-600">→</span> <strong className="text-slate-800 dark:text-slate-200">Beds24</strong> — Gestionnaire de réservations</li>
              <li className="flex gap-2"><span className="text-blue-600">→</span> <strong className="text-slate-800 dark:text-slate-200">Resend</strong> — Envoi d'emails transactionnels</li>
            </ul>
            <p className="text-slate-500 text-sm mt-4">Nous ne vendons jamais vos données à des tiers.</p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight mb-4">7. Vos droits</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Accès", "Rectification", "Effacement", "Portabilité", "Opposition", "Limitation"].map((droit) => (
                <div key={droit} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                  <p className="text-blue-700 dark:text-blue-400 font-bold text-sm">{droit}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-4">
              Pour exercer vos droits, contactez : <strong>dpo@welqo.fr</strong>.
              Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
