# WELQO — Product Requirements Document

## MVP V1 — Focus Acquisition & Gestion Bassin Minier

**Version:** 1.2  
**Date:** Mai 2025  
**Statut:** DRAFT — Vision Approfondie  

---

## 1. CONTEXTE & VISION PRODUIT

### 1.1 Genèse & Pivot Stratégique
Welqo est une solution de conciergerie "Boutique". Nous délaissons le marché saturé et ultra-réglementé de Lille pour dominer le **Bassin Minier (Lens, Arras, Béthune, Douai)**. 

### 1.2 Proposition de Valeur "The Welqo Edge"
*   **Expertise Locale Réelle :** On ne gère pas depuis Paris, on est sur place à Lens et Arras.
*   **Pricing Événementiel :** Algorithme calé sur les matches du RC Lens et les grands événements (Main Square, Louvre-Lens).
*   **Conformité Sans Stress :** Accompagnement sur les zones "hors-compensation".

---

## 2. ANALYSE DU MARCHÉ & EXIGENCES

### 2.1 Cibles Voyageurs
1.  **Le "Supporter & Fan" :** Vient pour Bollaert. Besoin de proximité et de flexibilité.
2.  **Le "Consultant Industriel" :** Vient pour les pôles d'excellence. Besoin de confort, Wi-Fi Fibre et facturation pro.
3.  **Le "Touriste Culturel" :** Vient pour le Louvre-Lens ou Arras. Besoin de design et de conseils locaux.

### 2.2 Atouts Réglementaires
Exploiter l'absence de règle de compensation à Lens/Arras pour attirer les investisseurs lillois qui veulent diversifier leur parc sans contraintes juridiques lourdes.

---

## 3. DESIGN & IDENTITÉ VISUELLE

### 3.1 Esthétique "Héritage & Modernité"
Le design doit évoquer la chaleur du Nord et le luxe d'une conciergerie privée.
*   **Couleurs :** Anthracite (#2C3E50), Terracotta (#E67E22), Crème Lin (#F9F7F2).
*   **Typographie :** Playfair Display (Titres) pour le prestige, Inter (Corps) pour la clarté technique.
*   **Iconographie :** Minimaliste, utilisant des lignes fines pour un aspect "Architectural".

### 3.2 Principes UX
*   **Transparence Radicale :** Affichage clair de la commission et des revenus nets dans le dashboard.
*   **Confiance par l'Humain :** Mise en avant des City Managers locaux avec photo et bio.

---

## 4. SPÉCIFICATIONS FONCTIONNELLES

### 4.1 Acquisition (Propriétaires)
*   **Estimation de Revenus :** Simulateur basé sur les données réelles du Bassin Minier (pas de moyennes nationales floues).
*   **Signature de Mandat :** Workflow 100% digital avec archivage sécurisé sur MinIO.

### 4.2 Management (Dashboard)
*   **Calendrier de Prix Dynamique :** Interface permettant d'ajuster les prix en fonction des soirs de matches (Bollaert) ou événements locaux.
*   **Automatisation & Messagerie :** Système de templates intelligents pour automatiser 80% de la relation voyageur.

---

## 5. ARCHITECTURE TECHNIQUE

*   **Backend :** FastAPI (Python) pour sa rapidité et son support du typage.
*   **Frontend :** Next.js (Tailwind CSS) pour le SEO et la performance mobile.
*   **Storage :** MinIO pour la souveraineté des données (Contrats & Photos HD).
*   **Signature :** API de signature électronique (type Lex Persona).

---

## 6. USER STORIES CRITIQUES (V1)

| ID | User Story | Impact |
| :--- | :--- | :--- |
| **US-01** | Signature de mandat | Onboarding immédiat des propriétaires. |
| **US-02** | Pricing Overrides | Maximisation du CA lors des événements (ex: RC Lens). |
| **US-03** | Coffre-fort MinIO | Sécurité des documents sensibles (Contrats/IDs). |
4.  **V2.0 :** Channel Manager (Sync Airbnb/Booking) & Scale vers d'autres villes du Nord.

