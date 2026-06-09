import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/reservation/", "/en/reservation/", "/api/"],
    },
    sitemap: "https://welqo.fr/sitemap.xml",
  };
}
