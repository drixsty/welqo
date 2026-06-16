const fs = require("fs");
const path = require("path");

const messagesFr = require("../messages/fr.json");
const messagesEn = require("../messages/en.json");
const destDir = path.join(__dirname, "../content/pages");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Mentions Légales Content FR
const mentionsLegalesFr = [
  {
    type: "heading",
    level: 2,
    children: [{ text: "1. Éditeur du site" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Raison sociale : Lonside Corp." },
      { text: "\nSiège social : Lille, France" },
      { text: "\nSIRET : 999 912 173 00013" },
      { text: "\nCapital social : 10 000 €" },
      { text: "\nEmail : contact@welqo.fr" },
      { text: "\nPublication : Kevin Tsague" },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "2. Hébergement" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Hébergeur : Vercel Inc." },
      { text: "\nAdresse : 440 N Barranca Ave #4133, Covina, CA 91723" },
      { text: "\nJuridiction : France / Europe (Serveurs situés en région parisienne (cdg1))." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "3. Propriété intellectuelle" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "L'intégralité du site Welqo, incluant sans s'y limiter, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive de la société Welqo à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "4. Responsabilité" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Welqo met tout en œuvre pour diffuser des informations exactes et mises à jour. Toutefois, Welqo ne peut être tenue responsable d'éventuelles erreurs ou omissions. L'utilisateur est seul responsable de l'utilisation des informations fournies." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "5. Données personnelles" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Pour toute information sur la collecte et le traitement de vos données personnelles, veuillez consulter notre Politique de Confidentialité." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "6. Cookies" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Nous utilisons des cookies pour améliorer votre expérience. En naviguant sur ce site, vous acceptez l'utilisation de cookies techniques nécessaires au bon fonctionnement du service. Pour plus de détails, consultez notre Politique relative aux Cookies." },
    ],
  },
];

// Mentions Légales Content EN
const mentionsLegalesEn = [
  {
    type: "heading",
    level: 2,
    children: [{ text: "1. Website Publisher" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Company Name: Lonside Corp." },
      { text: "\nRegistered Office: Lille, France" },
      { text: "\nSIRET: 999 912 173 00013" },
      { text: "\nShare Capital: €10,000" },
      { text: "\nEmail: contact@welqo.fr" },
      { text: "\nPublisher: Kevin Tsague" },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "2. Hosting" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Host: Vercel Inc." },
      { text: "\nAddress: 440 N Barranca Ave #4133, Covina, CA 91723" },
      { text: "\nJurisdiction: France / Europe (Servers located in Paris region (cdg1))." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "3. Intellectual Property" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "The entire Welqo website, including but not limited to graphics, images, texts, videos, animations, sounds, logos, gifs, and icons, as well as their layout, is the exclusive property of Welqo, with the exception of trademarks, logos, or content belonging to other partner companies or authors." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "4. Liability" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Welqo makes every effort to provide accurate and up-to-date information. However, Welqo cannot be held liable for any errors or omissions. The user is solely responsible for using the information provided." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "5. Personal Data" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "For details regarding the collection and processing of personal data, please check our Privacy Policy." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "6. Cookies" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "We use cookies to improve your experience. By browsing this website, you agree to the use of technical cookies necessary for the service to function properly. For more details, consult our Cookies Policy." },
    ],
  },
];

// Politique de Confidentialité FR
const politiqueConfidentialiteFr = [
  {
    type: "heading",
    level: 2,
    children: [{ text: "1. Responsable du traitement" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Lonside Corp. est le responsable du traitement de vos données personnelles. Pour toute question, vous pouvez contacter notre délégué à la protection des données (DPO) à dpo@welqo.fr. Une réponse vous sera apportée sous 48h ouvrées." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "2. Données collectées" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Nous collectons uniquement les données nécessaires pour vous fournir nos services de conciergerie Airbnb :" },
    ],
  },
  {
    type: "unordered-list",
    children: [
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Identification : Nom, prénom, adresse e-mail, numéro de téléphone." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Réservation : Dates de séjour, nombre de voyageurs, caractéristiques du logement." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Paiement : Les données financières sont traitées de manière sécurisée par Stripe." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Navigation : Adresse IP, cookies techniques, données de trafic." }] }] },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "3. Finalités du traitement" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Vos données sont traitées pour les finalités suivantes :" },
    ],
  },
  {
    type: "unordered-list",
    children: [
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Gestion et facturation de vos réservations." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Envoi des instructions de check-in et informations transactionnelles indispensables." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Optimisation de l'expérience utilisateur et de la performance du site." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Respect des obligations légales et comptables de Welqo." }] }] },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "4. Base légale" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Le traitement est fondé sur l'exécution du contrat de réservation, votre consentement pour les cookies non-techniques, et le respect de nos obligations légales." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "5. Conservation" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Vos données de réservations sont conservées 5 ans. Les emails commerciaux sont supprimés après 3 ans d'inactivité. Les cookies analytiques ont une durée de vie de 13 mois maximum." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "6. Vos droits" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de limitation et de portabilité de vos données. Contactez dpo@welqo.fr. En cas de litige non résolu, vous pouvez saisir la CNIL." },
    ],
  },
];

// Politique de Confidentialité EN
const politiqueConfidentialiteEn = [
  {
    type: "heading",
    level: 2,
    children: [{ text: "1. Data Controller" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Lonside Corp. is the controller of your personal data. For any questions, please contact our Data Protection Officer (DPO) at dpo@welqo.fr. We will respond within 48 business hours." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "2. Collected Data" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "We only collect data necessary to provide our Airbnb concierge services:" },
    ],
  },
  {
    type: "unordered-list",
    children: [
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Identification: Last name, first name, email address, phone number." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Reservation: Stay dates, number of guests, property features." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Payment: Financial data is securely processed by Stripe." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Navigation: IP address, technical cookies, traffic data." }] }] },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "3. Purposes of Processing" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Your data is processed for the following purposes:" },
    ],
  },
  {
    type: "unordered-list",
    children: [
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Managing and billing your bookings." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Sending check-in instructions and essential transactional info." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Optimising user experience and website performance." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Complying with Welqo's legal and accounting obligations." }] }] },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "4. Legal Basis" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Processing is based on contract performance, your consent for non-technical cookies, and compliance with our legal obligations." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "5. Data Retention" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Your booking data is retained for 5 years. Marketing emails are deleted after 3 years of inactivity. Analytical cookies have a lifespan of maximum 13 months." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "6. Your Rights" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "In accordance with GDPR, you have the right to access, rectify, delete, restrict, and export your data. Contact dpo@welqo.fr. For unresolved disputes, you may contact the CNIL." },
    ],
  },
];

// Politique de Cookies FR
const politiqueCookiesFr = [
  {
    type: "heading",
    level: 2,
    children: [{ text: "1. Qu'est-ce qu'un cookie ?" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, mobile ou tablette) lors de la visite d'un site internet. Il permet au site de mémoriser vos actions et préférences pour faciliter votre navigation." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "2. Quels types de cookies utilisons-nous ?" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Nous utilisons deux types de cookies en 2026 :" },
    ],
  },
  {
    type: "unordered-list",
    children: [
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Cookies techniques nécessaires : indispensables pour mémoriser votre langue de préférence (FR/EN) et sécuriser votre paiement via Stripe." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Cookies analytiques : pour suivre de manière anonyme les statistiques de trafic et améliorer les performances de notre site." }] }] },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "3. Comment gérer ou désactiver vos cookies ?" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "Vous pouvez désactiver l'utilisation des cookies facultatifs à tout moment en ajustant les paramètres de votre navigateur web ou en déclinant le consentement via notre bannière de cookies." },
    ],
  },
];

// Politique de Cookies EN
const politiqueCookiesEn = [
  {
    type: "heading",
    level: 2,
    children: [{ text: "1. What is a cookie?" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "A cookie is a small text file stored on your device (computer, mobile, or tablet) when you visit a website. It allows the site to remember your actions and preferences to facilitate your navigation." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "2. What types of cookies do we use?" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "We use two types of cookies in 2026:" },
    ],
  },
  {
    type: "unordered-list",
    children: [
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Necessary technical cookies: essential for remembering your preferred language (FR/EN) and securing your payments via Stripe." }] }] },
      { type: "list-item", children: [{ type: "paragraph", children: [{ text: "Analytical cookies: to anonymously track traffic stats and improve website performance." }] }] },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ text: "3. How to manage or disable cookies?" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "You can disable the use of optional cookies at any time by adjusting your web browser settings or by declining consent through our cookie consent banner." },
    ],
  },
];

const pages = [
  {
    slug: "mentions-legales",
    titleFr: "Mentions Légales — Welqo",
    titleEn: "Legal Notice — Welqo",
    descriptionFr: "Mentions légales de Lonside Corp. et conditions d'hébergement du site de conciergerie Welqo.",
    descriptionEn: "Legal notice for Lonside Corp. and hosting terms for Welqo concierge services.",
    contentFr: mentionsLegalesFr,
    contentEn: mentionsLegalesEn,
  },
  {
    slug: "politique-de-confidentialite",
    titleFr: "Politique de Confidentialité — Welqo",
    titleEn: "Privacy Policy — Welqo",
    descriptionFr: "Protection des données personnelles et conformité RGPD chez Welqo.",
    descriptionEn: "Personal data protection and GDPR compliance policy at Welqo.",
    contentFr: politiqueConfidentialiteFr,
    contentEn: politiqueConfidentialiteEn,
  },
  {
    slug: "politique-de-cookies",
    titleFr: "Politique de Cookies — Welqo",
    titleEn: "Cookies Policy — Welqo",
    descriptionFr: "Utilisation des cookies techniques et analytiques sur le site Welqo.",
    descriptionEn: "Technical and analytical cookies usage policy at Welqo.",
    contentFr: politiqueCookiesFr,
    contentEn: politiqueCookiesEn,
  },
];

for (const page of pages) {
  const filePath = path.join(destDir, `${page.slug}.json`);
  fs.writeFileSync(
    filePath,
    JSON.stringify(
      {
        slug: page.slug,
        titleFr: page.titleFr,
        titleEn: page.titleEn,
        descriptionFr: page.descriptionFr,
        descriptionEn: page.descriptionEn,
        updatedAt: "2026-06-16",
        contentFr: page.contentFr,
        contentEn: page.contentEn,
      },
      null,
      2
    ),
    "utf-8"
  );
  console.log(`Created page: ${page.slug}`);
}

console.log("Pages migration complete!");
