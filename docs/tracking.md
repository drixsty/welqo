# WELQO — Suivi de Projet & Backlog MVP

## 📊 État d'Avancement : Pivot Bassin Minier en cours

| ID             | User Story / Task                                | Module      | MoSCoW | Points | Statut         |
| :------------- | :----------------------------------------------- | :---------- | :----- | :----- | :------------- |
| **SOCLE**      | **Socle Technique (V0.1 - Bordeaux Pilot)**      | -           | -      | -      | **[COMPLÉTÉ]** |
| **US-DSGN-01** | Identité Visuelle (Anthracite/Terracotta/Crème)  | Design      | MUST   | 3      | [x]            |
| **US-DSGN-02** | UI Kit & Composants Dashboard (Tailwind)         | Design      | MUST   | 5      | [x]            |
| **US-MKT-01**  | Scraping/Import Calendrier Événements Lens/Arras | Recherche   | SHOULD | 5      | [ ]            |
| **US-MKT-02**  | Audit Réglementaire détaillé par ville cible     | Recherche   | MUST   | 3      | [ ]            |
| **US-ACQ-01**  | Landing Page "Propriétaire Lens/Arras"           | Acquisition | MUST   | 5      | [x]            |
| **US-ACQ-02**  | Formulaire d'Estimation de Revenus               | Acquisition | MUST   | 3      | [x]            |
| **US-ACQ-03**  | Workflow Signature Mandat Digital                | Acquisition | MUST   | 8      | [x]            |
| **US-DASH-01** | Pricing Dynamique (Calendrier Overrides)         | Dashboard   | MUST   | 8      | [ ]            |
| **US-DASH-02** | Messagerie Locataires (Chat Temps Réel)          | Dashboard   | SHOULD | 13     | [ ]            |
| **US-DASH-03** | Configuration Messages Automatiques              | Dashboard   | SHOULD | 5      | [ ]            |
| **US-SRCH-01** | Recherche Localisée (Bassin Minier)              | Recherche   | MUST   | 5      | [ ]            |
| **US-SRCH-02** | Filtre de Prix sur Carte Interactive             | Recherche   | SHOULD | 8      | [ ]            |
| **TECH-MINIO** | Setup MinIO (Storage Photos & Contrats)          | Infra       | MUST   | 5      | [x]            |
| **TECH-SIGN**  | Intégration API Signature Électronique           | Infra       | MUST   | 5      | [x]            |

---

## ✅ Socle Technique Validé (V0.1)

| ID          | Task                                | Statut |
| :---------- | :---------------------------------- | :----- |
| **US-A01**  | Page d'accueil initiale             | [x]    |
| **US-B01**  | Calendrier dispo temps réel         | [x]    |
| **US-B03**  | Paiement Stripe + confirmation      | [x]    |
| **US-C01**  | Auth propriétaire JWT               | [x]    |
| **TECH-01** | Job sync Beds24 (Source de données) | [x]    |

---

## 🚀 Checklist Pivot Go-Live (Lens/Arras)

| #   | Critère                                                | Priorité | Statut |
| :-- | :----------------------------------------------------- | :------- | :----- |
| 1   | Landing Page conversion proprio en ligne               | P0       | [x]    |
| 2   | Bucket MinIO "private-docs" sécurisé                   | P0       | [x]    |
| 3   | Signature numérique fonctionnelle en sandbox           | P0       | [x]    |
| 4   | Calendrier Bollaert/Louvre-Lens intégré au pricing     | P1       | [ ]    |
| 5   | Sélectionneur de région fonctionnel (Arras/Lens/Lille) | P1       | [ ]    |

---

## 📈 Métriques de succès du Pivot (J+60)

- [ ] **Acquisition :** > 5 mandats de gestion signés électroniquement (Bassin Minier).
- [ ] **Lead Gen :** > 50 estimations de revenus réalisées via le formulaire.
- [ ] **Opérations :** 0 erreur de synchronisation sur le pricing dynamique.
- [ ] **Confiance :** 100% des contrats stockés et accessibles via MinIO.
- [ ] **Lighthouse :** Score Performance > 90 sur la nouvelle Landing Page.
