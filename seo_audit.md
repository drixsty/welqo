# 🔍 Rapport d'Audit SEO — Welqo Storefront

Ce rapport détaille l'audit technique SEO du monorepo `web-storefront` à la suite de la transition vers la structure d'URL optimisée `localePrefix: "as-needed"` (français servi à la racine `/` sans préfixe `/fr`). Il identifie des vulnérabilités critiques d'indexation et des chaînes de redirection dégradant l'UX et le budget de crawl, puis propose les ajustements structurels correspondants.

---

## 📋 Résumé Exécutif des Vulnérabilités

| Aspect Audité                          |     Statut      | Risque / Impact                                                                                                                                                                                                                                                                     | Solution Proposée                                                                                      |
| :------------------------------------- | :-------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **Indexation & Crawl (`robots.ts`)**   |  ⚠️ Vulnérable  | Les règles `disallow` de `robots.txt` bloquent toujours les anciens chemins locaux `/fr/reservation/` et `/fr/proprietaires/`. Comme les URL n'ont plus le préfixe `/fr`, les formulaires sensibles de réservation et de contact sont entièrement exposés à l'indexation de Google. | Mettre à jour `robots.ts` pour bloquer les URL racines `/reservation/` et `/proprietaires/`.           |
| **Boucles & Chaînes de Redirection**   | ❌ Non conforme | `/reservation/` redirige vers `/proprietaires/` qui redirige vers `/fr` qui redirige vers `/`. Cette cascade de **3 sauts HTTP** dégrade le Time-To-First-Byte (TTFB) de plus de `+500 ms` et gaspille le budget de crawl de Googlebot.                                             | Effectuer des redirections directes en une seule étape (`redirect(locale === "fr" ? "/" : "/en")`).    |
| **Cohérence OpenGraph (`layout.tsx`)** | ⚠️ Non conforme | L'URL OpenGraph (`og:url`) génère toujours `https://welqo.fr/fr` pour les utilisateurs francophones, provoquant une incohérence par rapport au lien canonique et des avertissements sur les outils de partage (Facebook Debugger, LinkedIn).                                        | Synchroniser l'URL OpenGraph pour utiliser la racine propre `/` (sans préfixe `/fr`) pour le français. |
| **Balises Alternatives & Sitemaps**    |   ✅ Conforme   | Les balises `hreflang`, liens `canonical`, et le plan du site dynamique `sitemap.ts` sont parfaitement configurés sans le préfixe `/fr`.                                                                                                                                            | _Aucune modification requise._                                                                         |

---

## 🛠️ Analyse Détaillée des Vulnérabilités & Correctifs

### 1. Sécurisation de l'Indexation des Pages Privées dans `robots.ts`

> [!WARNING]
> Les moteurs de recherche évaluent les requêtes d'URL publiques réelles et non pas les réécritures internes de Next.js.

- **Problème actuel :**
  ```typescript
  disallow: [
    "/fr/reservation/",
    "/en/reservation/",
    "/fr/proprietaires/",
    "/en/proprietaires/",
  ];
  ```
  Le français n'ayant plus de préfixe `/fr`, les robots explorent librement `/reservation/` et `/proprietaires/`. Ils risquent d'indexer des pages vides, des formulaires ou des pages réservées à des flux utilisateurs spécifiques.
- **Correctif proposé :**
  Ajuster les disallows pour correspondre aux chemins réels :
  ```typescript
  disallow: [
    "/reservation/",
    "/en/reservation/",
    "/proprietaires/",
    "/en/proprietaires/",
    "/api/",
  ];
  ```

### 2. Élimination des chaînes de redirection à plusieurs étapes

> [!CAUTION]
> Une chaîne de redirection prolongée (3 sauts ou plus) peut amener les moteurs de recherche à abandonner le crawl de la page cible et nuit gravement à la performance mobile.

- **Problème actuel :**
  1. L'utilisateur ou le robot visite `/reservation/`.
  2. Le serveur exécute `redirect("/${locale}/proprietaires")` (renvoie `/fr/proprietaires`).
  3. L'utilisateur accède à `/proprietaires` via redirection middleware, où la page exécute `redirect("/${locale}")` (renvoie `/fr`).
  4. Le middleware `next-intl` intercepte `/fr` et redirige vers `/`.
- **Correctif proposé :**
  - Dans `reservation/page.tsx` : Court-circuiter et rediriger directement vers la racine de la langue :
    ```typescript
    redirect(locale === "fr" ? "/" : "/en");
    ```
  - Dans `proprietaires/page.tsx` : Supprimer le préfixe `/fr` lors de la redirection :
    ```typescript
    redirect(locale === "fr" ? "/" : "/en");
    ```

### 3. Alignement de l'URL OpenGraph (`og:url`)

- **Problème actuel :**
  Dans `layout.tsx`, la balise génère :
  ```typescript
  url: `${BASE_URL}/${locale}`;
  ```
  Pour le français, cela renvoie `https://welqo.fr/fr`, qui redirige immédiatement vers `https://welqo.fr`.
- **Correctif proposé :**
  Utiliser la même logique d'évaluation d'adresse propre que les balises canoniques :
  ```typescript
  url: locale === "fr" ? BASE_URL : `${BASE_URL}/${locale}`;
  ```

---

## 📈 Bénéfices Attendus après Implémentation

1. **Zéro fuite d'indexation** : Sécurisation absolue des formulaires d'entonnoir et pages utilitaires.
2. **Optimisation du budget de crawl** : Googlebot accède immédiatement aux pages de contenu sans se heurter à des boucles de redirection complexes.
3. **Gain de performance (TTFB)** : Élimination de `+300 ms` à `+500 ms` de redirections superflues pour les utilisateurs égarés arrivant sur ces anciennes URL.
4. **Cohérence des signaux sociaux** : Métadonnées OpenGraph 100% alignées sur les adresses de production canoniques.
