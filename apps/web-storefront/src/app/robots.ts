import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/reservation/",
        "/en/reservation/",
        "/proprietaires/",
        "/en/proprietaires/",
        "/api/",
      ],
    },
    sitemap: "https://welqo.fr/sitemap.xml",
  };
}
