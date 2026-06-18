import { vi } from "vitest";

// Variables d'env par défaut pour les tests
process.env.BREVO_API_KEY = "test-api-key";
process.env.BREVO_SENDER_EMAIL = "contact@welqo.fr";
process.env.BREVO_SENDER_NAME = "Welqo";
process.env.BREVO_ADMIN_EMAIL = "admin@welqo.fr";
process.env.BREVO_LIST_PROSPECTS = "1";
process.env.BREVO_LIST_NEWSLETTER = "2";
process.env.BREVO_LIST_GUESTS = "3";
