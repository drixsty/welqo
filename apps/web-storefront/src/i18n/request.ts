import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = ["en", "fr"].includes(locale) ? locale : "fr";
  console.log("DEBUG: next-intl resolvedLocale:", resolvedLocale);

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
  };
});
