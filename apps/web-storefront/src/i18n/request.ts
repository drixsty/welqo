import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["fr", "en"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const MESSAGE_IMPORTS: Record<SupportedLocale, () => Promise<any>> = {
  fr: () => import("../../messages/fr.json"),
  en: () => import("../../messages/en.json"),
};

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = (
    SUPPORTED_LOCALES.includes(locale as any) ? locale : "fr"
  ) as SupportedLocale;
  console.log("DEBUG: next-intl resolvedLocale:", resolvedLocale);

  const importFn = MESSAGE_IMPORTS[resolvedLocale];

  return {
    locale: resolvedLocale,
    messages: (await importFn()).default,
  };
});
