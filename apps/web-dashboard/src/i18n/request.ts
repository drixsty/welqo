import { getRequestConfig } from "next-intl/server";

const locales = ["en", "fr"];

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale || "fr";

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
  };
});
