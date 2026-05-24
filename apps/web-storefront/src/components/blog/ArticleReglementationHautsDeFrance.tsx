import React from "react";

export function ArticleReglementationHautsDeFrance({
  locale,
}: {
  locale: string;
}) {
  const base = `/${locale}`;
  const isEn = locale === "en";

  return (
    <article className="relative">
      {/* Introduction */}
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-[15px]">
        {isEn
          ? "Renting your property on short-term platforms like Airbnb, Booking.com or Vrbo is a highly profitable strategy in Lille and the wider Hauts-de-France region. However, dynamic tourist growth has prompted local authorities, particularly in Lille, to implement a strict regulatory framework. This guide details all compliance obligations for 2026 to ensure you rent legally and stress-free."
          : "Louer son bien immobilier sur des plateformes de location courte durée comme Airbnb, Booking.com ou Vrbo est une stratégie extrêmement rentable à Lille et dans les Hauts-de-France. Cependant, l'essor touristique de la région a poussé les municipalités, Lille en tête, à instaurer un cadre réglementaire strict. Ce guide détaille toutes les obligations légales en vigueur en 2026 pour vous permettre de louer en toute légalité et sérénité."}
      </p>

      {/* ── SECTION 1 : LA REGLE DES 120 JOURS ───────────────────── */}
      <h2
        id="regles-120-jours"
        className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mt-12 mb-6 scroll-mt-28"
      >
        {isEn
          ? "1. The 120-Day Limit for Primary Residences"
          : "1. La règle des 120 jours (Résidence principale)"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-[15px]">
        {isEn ? (
          <>
            Under French law, your **primary residence** (the home you occupy
            for at least 8 months per year) can be rented to tourists without
            complex administrative changes. However, a strict restriction
            applies: you cannot rent it for more than **120 days per calendar
            year**.
          </>
        ) : (
          <>
            Selon la loi française, votre **résidence principale** (le logement
            que vous occupez au moins 8 mois par an) peut être louée à une
            clientèle touristique de passage de manière très simple. Toutefois,
            une restriction majeure s'applique : vous ne pouvez pas la louer
            plus de **120 jours par année civile** (du 1er janvier au 31
            décembre).
          </>
        )}
      </p>
      <div className="p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30 bg-amber-500/5 mb-8">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
          {isEn
            ? "⚠️ Automatic Platform Blocking"
            : "⚠️ Blocage automatique des plateformes"}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {isEn
            ? "Since January 1st, Airbnb, Booking.com and other major platforms automatically block calendar availability once the 120-day threshold is met in Lille. Any attempt to bypass this rule exposes you to a civil fine of up to €10,000 per listing."
            : "Depuis le 1er janvier, Airbnb, Booking.com et les autres leaders du secteur bloquent automatiquement vos calendriers dès que le seuil de 120 jours de location est atteint à Lille. Toute tentative de contournement vous expose à une amende civile pouvant atteindre 10 000 € par annonce."}
        </p>
      </div>

      {/* ── SECTION 2 : NUMERO ENREGISTREMENT ─────────────────────── */}
      <h2
        id="numero-enregistrement"
        className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mt-16 mb-6 scroll-mt-28"
      >
        {isEn
          ? "2. Mandatory Registration Number in Lille"
          : "2. La déclaration préalable et le numéro d'enregistrement"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-[15px]">
        {isEn ? (
          <>
            Lille has adopted the **mandatory registration number** system.
            Whether it is a primary or secondary residence, every owner must
            declare their furnished tourist accommodation (meublé de tourisme)
            online.
          </>
        ) : (
          <>
            La ville de Lille a adopté le dispositif du **numéro
            d'enregistrement obligatoire**. Que vous louiez votre résidence
            principale ou secondaire, vous devez impérativement obtenir un
            numéro de déclaration en ligne (composé de 13 caractères) avant de
            publier la moindre annonce.
          </>
        )}
      </p>

      {/* Step by Step Declaration */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-white/5 mb-10">
        <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-4">
          {isEn
            ? "How to declare your Airbnb in Lille:"
            : "Les étapes de déclaration à Lille :"}
        </h3>
        <ul className="space-y-3">
          {[
            isEn
              ? "Access the official Lille Metropole online furnished rental portal."
              : "Se connecter sur le portail de télédéclaration de la Métropole Européenne de Lille (MEL).",
            isEn
              ? "Fill out the description form (address, capacity, classification level)."
              : "Remplir le formulaire descriptif (adresse, capacité d'accueil, niveau de classement).",
            isEn
              ? "Instantly receive your 13-character registration number."
              : "Obtenir instantanément votre numéro d'enregistrement à 13 caractères.",
            isEn
              ? "Insert this number explicitly on Airbnb, Booking.com, and other platforms."
              : "Renseigner ce numéro obligatoirement sur votre annonce Airbnb ou Booking.com sous peine de suspension.",
          ].map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                0{i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── SECTION 3 : CHANGEMENT D'USAGE ──────────────────────── */}
      <h2
        id="changement-usage"
        className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mt-16 mb-6 scroll-mt-28"
      >
        {isEn
          ? "3. Secondary Residences & Change of Use Rules"
          : "3. Résidence secondaire & Règlement de changement d'usage"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-[15px]">
        {isEn ? (
          <>
            If the property is a **secondary residence** (or owned via an
            investment vehicle like a SCI), renting it on Airbnb is highly
            restricted in Lille. You must request a **Change of Use**
            authorization from the town hall.
          </>
        ) : (
          <>
            Si le logement est une **résidence secondaire** (ou géré via une
            société type SCI), l'activité de location touristique est considérée
            comme commerciale. À Lille, vous devez impérativement obtenir une
            autorisation de **changement d'usage** délivrée par la mairie.
          </>
        )}
      </p>

      {/* Compensation Rule Card */}
      <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 mb-10">
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-3">
          {isEn
            ? "The Rule of Compensation in Lille"
            : "La règle de compensation lilloise"}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {isEn
            ? "To preserve local housing supply, Lille requires owners of secondary residences to 'compensate' the loss of residential space. You must convert an equivalent commercial space into a long-term residential home in the same area. This makes self-managing secondary holiday rentals very complex for individual investors."
            : "Pour préserver le marché locatif traditionnel, la ville de Lille impose une règle de 'compensation' très stricte. Pour transformer un logement en meublé de tourisme secondaire, vous devez transformer un espace commercial équivalent (ex : local commercial ou bureau) en habitation à l'année dans le même secteur. Cette contrainte rend la gestion autonome de résidences secondaires en Airbnb complexe pour un particulier."}
        </p>
        <div className="flex items-center gap-2 text-xs font-bold text-welqo-terracotta">
          <span>{isEn ? "💡 Good to know:" : "💡 Bon à savoir :"}</span>
          <span className="text-slate-700 dark:text-slate-300">
            {isEn
              ? "Subletting in Lille is legal only with the owner's explicit written consent."
              : "La sous-location professionnelle à Lille est réglementée et nécessite l'accord écrit du propriétaire."}
          </span>
        </div>
      </div>

      {/* ── SECTION 4 : FISCALITE ET TAXE ───────────────────────── */}
      <h2
        id="fiscalite-taxe"
        className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mt-16 mb-6 scroll-mt-28"
      >
        {isEn
          ? "4. Taxation & Tourist Tax in Northern France"
          : "4. Fiscalité & Taxe de séjour"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-[15px]">
        {isEn ? (
          <>
            Rental income generated in Hauts-de-France must be declared as
            **BIC** (Bénéfices Industriels et Commerciaux). Additionally, the
            **tourist tax** is paid by travelers on a nightly basis. Major
            platforms collect it automatically, but direct bookings must declare
            and transfer it to the local authorities.
          </>
        ) : (
          <>
            Les revenus issus de vos locations courtes durées doivent être
            déclarés sous le régime des **BIC** (Bénéfices Industriels et
            Commerciaux), soit sous le statut de Micro-BIC (abattement de 50 %),
            soit au régime Réel (déduction de toutes vos charges d'exploitation,
            travaux et amortissements). De plus, une **taxe de séjour**
            s'applique par nuitée et par voyageur à Lille. Si les grandes
            plateformes la prélèvent automatiquement pour vous, elle doit être
            collectée et reversée manuellement en cas de réservation directe.
          </>
        )}
      </p>

      {/* ── SECTION 5 : ONBOARDING WELQO ───────────────────────── */}
      <h2
        id="onboarding-welqo"
        className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter mt-16 mb-6 scroll-mt-28"
      >
        {isEn
          ? "5. Let Welqo Secure Your Airbnb Compliance"
          : "5. Comment Welqo sécurise votre conformité"}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-[15px]">
        {isEn ? (
          <>
            Administrative procedures and regulatory declarations can be
            exhausting and time-consuming. Because Welqo is a concierge rooted
            in proximity and local expertise, we handle **100% of these
            compliance steps** for you.
          </>
        ) : (
          <>
            Les démarches administratives, déclarations municipales et calculs
            de conformité peuvent s'avérer longs et complexes. Parce que Welqo
            est une conciergerie de proximité ancrée localement, nous prenons en
            charge **100 % de ces démarches règlementaires** pour vous.
          </>
        )}
      </p>

      {/* Conversion Banner */}
      <div className="my-12 p-8 bg-slate-900 dark:bg-slate-950/50 rounded-3xl border border-white/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(212,85,55,0.1),transparent)]" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="px-2 py-0.5 bg-welqo-terracotta/20 border border-welqo-terracotta/30 text-welqo-terracotta text-[9px] font-bold rounded uppercase tracking-wider">
            {isEn ? "Compliant Onboarding" : "Accompagnement légal"}
          </span>
          <h3 className="text-2xl font-bold text-white mt-4 mb-4 tracking-tight leading-tight">
            {isEn
              ? "Delegate your Airbnb compliance in Hauts-de-France"
              : "Déléguez en toute sécurité la gestion légale de votre Airbnb"}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
            {isEn
              ? "From town hall declarations to dynamic pricing and 5★ cleaning, Welqo handles everything. Get your free property audit."
              : "De la déclaration en mairie à l'optimisation des prix et au ménage 5★, Welqo s'occupe de tout. Obtenez votre audit de rendement offert."}
          </p>
          <a
            href={`${base}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-welqo-terracotta hover:text-white transition-all shadow-md active:scale-95"
          >
            {isEn
              ? "Optimize my property income →"
              : "Faire auditer mon bien gratuitement →"}
          </a>
        </div>
      </div>
    </article>
  );
}
