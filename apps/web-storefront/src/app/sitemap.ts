import { MetadataRoute } from "next";
import { BLOG_POSTS } from "../lib/blog";
import { getProperties } from "../lib/api";

const BASE_URL = "https://welqo.fr";

const STATIC_PAGES = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/proprietaires", priority: 0.9, freq: "monthly" },
  { path: "/blog", priority: 0.8, freq: "weekly" },
  { path: "/logements", priority: 0.8, freq: "weekly" },
  { path: "/mentions-legales", priority: 0.1, freq: "yearly" },
  { path: "/politique-de-confidentialite", priority: 0.1, freq: "yearly" },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const locales = ["fr", "en"] as const;

  // Static pages
  const staticEntries = locales.flatMap((locale) =>
    STATIC_PAGES.map(({ path, priority, freq }) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: freq as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority,
    })),
  );

  // Blog posts
  const blogEntries = locales.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  );

  // Properties (Dynamic)
  let propertyEntries: MetadataRoute.Sitemap = [];
  try {
    const { properties } = await getProperties();
    propertyEntries = locales.flatMap((locale) =>
      properties.map((property) => ({
        url: `${BASE_URL}/${locale}/logements/${property.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    );
  } catch (error) {
    console.error("Failed to fetch properties for sitemap", error);
  }

  return [...staticEntries, ...blogEntries, ...propertyEntries];
}
