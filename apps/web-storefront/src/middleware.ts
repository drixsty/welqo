import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr"],

  // Used when no locale matches
  defaultLocale: "fr",

  // Do not show default locale prefix in the URL
  localePrefix: "as-needed",
});

export const config = {
  // Match all pathnames except for API, internals, and static files
  matcher: [
    "/((?!api|keystatic|_next/static|_next/image|_next/data|_vercel|images|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|googleaf5c4f2d1757e220.html).*)",
  ],
};
