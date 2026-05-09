import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "fr"];

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale || "fr";
  console.log('DEBUG: next-intl resolvedLocale:', resolvedLocale);

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
  };
});
