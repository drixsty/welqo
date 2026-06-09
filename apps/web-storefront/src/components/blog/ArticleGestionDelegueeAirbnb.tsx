import React from "react";

export function ArticleGestionDelegueeAirbnb({ locale }: { locale: string }) {
  const isEn = locale === "en";

  return (
    <div>
      {isEn ? (
        <p>
          You have an Airbnb property but don't want to spend your evenings
          managing guest messages, coordinating cleaning between two back-to-back
          bookings or handling a broken boiler at midnight? Delegated management
          is the answer — but navigating the different options available can be
          confusing. This guide explains everything.
        </p>
      ) : (
        <p>
          Vous avez un bien Airbnb mais vous ne souhaitez pas passer vos soirées
          à gérer les messages voyageurs, coordonner le ménage entre deux
          réservations enchaînées ou gérer une chaudière en panne à minuit ? La
          gestion déléguée est la solution — mais s'y retrouver parmi les
          différentes options disponibles peut être complexe. Ce guide vous
          explique tout.
        </p>
      )}

      <h2 id="quest-ce-que">
        {isEn
          ? "What Is Delegated Airbnb Management?"
          : "Qu'est-ce que la gestion déléguée Airbnb ?"}
      </h2>
      {isEn ? (
        <p>
          Delegated management means entrusting all or part of your Airbnb
          operations to a professional third party. This covers: guest
          communication, check-in/out, professional cleaning, dynamic pricing,
          maintenance and reporting. The property owner keeps ownership and
          receives monthly revenues minus the management fee.
        </p>
      ) : (
        <p>
          La gestion déléguée consiste à confier tout ou partie des opérations
          de votre Airbnb à un professionnel tiers. Cela couvre : la
          communication voyageurs, les check-in/out, le ménage professionnel, la
          tarification dynamique, la maintenance et le reporting. Le propriétaire
          conserve la propriété et perçoit les revenus mensuels déduction faite
          des frais de gestion.
        </p>
      )}

      <h2 id="types-gestion">
        {isEn
          ? "The 3 Types of Property Management"
          : "Les 3 types de gestion locative"}
      </h2>

      <h3>
        {isEn ? "1. The Airbnb Concierge" : "1. La conciergerie Airbnb"}
      </h3>
      {isEn ? (
        <>
          <p>
            A concierge specialises exclusively in short-term rental management.
            It handles the full guest experience: welcome, cleaning, pricing,
            multi-platform listings and owner reporting.
          </p>
          <ul>
            <li>
              <strong>Commission:</strong> 15–25% of gross revenue (no fixed
              fees)
            </li>
            <li>
              <strong>Best for:</strong> Owners who want complete hands-off
              management
            </li>
            <li>
              <strong>Typical result:</strong> +30–40% more revenue than
              self-management
            </li>
          </ul>
        </>
      ) : (
        <>
          <p>
            Une conciergerie est spécialisée exclusivement dans la gestion
            locative courte durée. Elle prend en charge l'expérience voyageur
            complète : accueil, ménage, tarification, annonces multi-plateformes
            et reporting propriétaire.
          </p>
          <ul>
            <li>
              <strong>Commission :</strong> 15 à 25 % du revenu brut (aucun
              frais fixe)
            </li>
            <li>
              <strong>Idéal pour :</strong> les propriétaires qui souhaitent une
              gestion totalement déléguée
            </li>
            <li>
              <strong>Résultat typique :</strong> +30 à 40 % de revenus par
              rapport à la gestion en solo
            </li>
          </ul>
        </>
      )}

      <h3>
        {isEn
          ? "2. The Traditional Agency"
          : "2. L'agence immobilière traditionnelle"}
      </h3>
      {isEn ? (
        <>
          <p>
            Some real estate agencies have diversified into short-term rental
            management, but this is often a secondary activity alongside their
            main long-term letting and sales business.
          </p>
          <ul>
            <li>
              <strong>Fixed fees:</strong> €250–400/month + 25–30% commission
            </li>
            <li>
              <strong>Disadvantage:</strong> Less specialised, often limited to
              a single platform, less reactive
            </li>
          </ul>
        </>
      ) : (
        <>
          <p>
            Certaines agences immobilières se sont diversifiées dans la gestion
            locative courte durée, mais il s'agit souvent d'une activité
            secondaire à côté de leur cœur de métier (location longue durée,
            transaction).
          </p>
          <ul>
            <li>
              <strong>Frais fixes :</strong> 250 à 400 €/mois + commission 25 à
              30 %
            </li>
            <li>
              <strong>Inconvénient :</strong> Moins spécialisée, souvent limitée
              à une plateforme, moins réactive
            </li>
          </ul>
        </>
      )}

      <h3>
        {isEn
          ? "3. The Independent Manager (Freelance)"
          : "3. Le gestionnaire indépendant (freelance)"}
      </h3>
      {isEn ? (
        <>
          <p>
            An individual who manages several Airbnb properties independently,
            usually located within their neighbourhood.
          </p>
          <ul>
            <li>
              <strong>Commission:</strong> 10–18% (often lower)
            </li>
            <li>
              <strong>Risk:</strong> No professional insurance, no legal
              guarantees, variable service quality
            </li>
          </ul>
        </>
      ) : (
        <>
          <p>
            Un particulier qui gère plusieurs biens Airbnb de façon indépendante,
            généralement dans son quartier.
          </p>
          <ul>
            <li>
              <strong>Commission :</strong> 10 à 18 % (souvent plus basse)
            </li>
            <li>
              <strong>Risque :</strong> Pas d'assurance professionnelle, pas de
              garanties juridiques, qualité de service variable
            </li>
          </ul>
        </>
      )}

      <h2 id="choisir-partenaire">
        {isEn
          ? "How to Choose the Right Partner"
          : "Comment choisir le bon partenaire"}
      </h2>
      {isEn ? (
        <>
          <p>
            Five questions to ask before signing with a property manager:
          </p>
          <ol>
            <li>
              <strong>On which platforms do you list?</strong> A good concierge
              should list on Airbnb, Booking.com and Vrbo as a minimum.
            </li>
            <li>
              <strong>What is your pricing model?</strong> Avoid fixed fees —
              commission only ensures alignment of interests.
            </li>
            <li>
              <strong>What is your average rating?</strong> Ask for the average
              rating across all managed properties (aim for 4.7+/5).
            </li>
            <li>
              <strong>How do you handle maintenance emergencies?</strong> A
              local team is essential for rapid response.
            </li>
            <li>
              <strong>What does the owner dashboard include?</strong> Real-time
              revenue, occupancy, reviews — everything should be visible.
            </li>
          </ol>
        </>
      ) : (
        <>
          <p>
            Cinq questions à poser avant de signer avec un gestionnaire :
          </p>
          <ol>
            <li>
              <strong>Sur quelles plateformes publiez-vous ?</strong> Un bon
              gestionnaire diffuse au minimum sur Airbnb, Booking.com et Vrbo.
            </li>
            <li>
              <strong>Quel est votre modèle de rémunération ?</strong> Évitez les
              frais fixes — la commission seule aligne les intérêts.
            </li>
            <li>
              <strong>Quelle est votre note moyenne ?</strong> Demandez la note
              moyenne sur l'ensemble des biens gérés (visez 4,7+/5).
            </li>
            <li>
              <strong>Comment gérez-vous les urgences maintenance ?</strong> Une
              équipe locale est indispensable pour une réactivité maximale.
            </li>
            <li>
              <strong>Que contient le dashboard propriétaire ?</strong> Revenus
              en temps réel, taux d'occupation, avis — tout doit être visible.
            </li>
          </ol>
        </>
      )}

      <h2 id="welqo-modele">
        {isEn ? "The Welqo Model in Northern France" : "Le modèle Welqo en Hauts-de-France"}
      </h2>
      {isEn ? (
        <p>
          Welqo operates on a <strong>commission-only model (20%)</strong> with
          no fixed fees, covering Lille, Lens, Arras and Béthune. This means our
          interests are perfectly aligned with yours: we only earn money when you
          do.
        </p>
      ) : (
        <p>
          Welqo fonctionne sur un{" "}
          <strong>modèle à la commission uniquement (20 %)</strong>, sans frais
          fixe, couvrant Lille, Lens, Arras et Béthune. Cela signifie que nos
          intérêts sont parfaitement alignés avec les vôtres : nous ne gagnons
          de l'argent que lorsque vous en gagnez.
        </p>
      )}

      {/* ── CTA ── */}
      <div className="not-prose mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { city: "Lille", slug: "conciergerie-airbnb-lille" },
          { city: "Lens", slug: "conciergerie-airbnb-lens" },
          { city: "Arras", slug: "conciergerie-airbnb-arras" },
          { city: "Béthune", slug: "conciergerie-airbnb-bethune" },
        ].map((item) => (
          <a
            key={item.city}
            href={isEn ? `/en/${item.slug}` : `/${item.slug}`}
            className="flex items-center justify-between gap-2 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-welqo-terracotta/40 transition-colors group"
          >
            <span className="font-bold text-white group-hover:text-welqo-terracotta transition-colors text-sm">
              {isEn ? `Airbnb Concierge ${item.city}` : `Conciergerie Airbnb ${item.city}`} →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
