import { MetadataRoute } from "next";
import { BLOG_POSTS } from "../lib/blog";

const BASE_URL = "https://welqo.fr";
const LOCALES = ["fr", "en"] as const;

type Locale = (typeof LOCALES)[number];

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      LOCALES.map((l) => [
        l,
        l === "fr" ? `${BASE_URL}${path}` : `${BASE_URL}/${l}${path}`,
      ]),
    ) as Record<Locale, string>,
  };
}

const STATIC_PAGES = [
  { path: "", priority: 1.0, freq: "weekly" as const },
  { path: "/blog", priority: 0.8, freq: "weekly" as const },
  { path: "/logements", priority: 0.8, freq: "weekly" as const },
  {
    path: "/conciergerie-airbnb-lille",
    priority: 0.9,
    freq: "weekly" as const,
  },
  {
    path: "/conciergerie-airbnb-lens",
    priority: 0.9,
    freq: "weekly" as const,
  },
  {
    path: "/conciergerie-airbnb-arras",
    priority: 0.9,
    freq: "weekly" as const,
  },
  {
    path: "/conciergerie-airbnb-bethune",
    priority: 0.9,
    freq: "weekly" as const,
  },
  {
    path: "/proprietaires",
    priority: 0.85,
    freq: "weekly" as const,
  },
  {
    path: "/conciergerie-airbnb-vieux-lille",
    priority: 0.8,
    freq: "weekly" as const,
  },
  {
    path: "/conciergerie-airbnb-wazemmes",
    priority: 0.8,
    freq: "weekly" as const,
  },
  {
    path: "/conciergerie-airbnb-euralille",
    priority: 0.8,
    freq: "weekly" as const,
  },
  {
    path: "/calculateur-rentabilite-airbnb",
    priority: 0.8,
    freq: "monthly" as const,
  },
  { path: "/a-propos", priority: 0.6, freq: "monthly" as const },
  { path: "/tarifs", priority: 0.85, freq: "monthly" as const },
  {
    path: "/conciergerie-airbnb-douai",
    priority: 0.9,
    freq: "weekly" as const,
  },
  { path: "/mentions-legales", priority: 0.1, freq: "yearly" as const },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries = LOCALES.flatMap((locale) =>
    STATIC_PAGES.map(({ path, priority, freq }) => ({
      url:
        locale === "fr" ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
      alternates: alternates(path),
    })),
  );

  const blogEntries = LOCALES.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({
      url:
        locale === "fr"
          ? `${BASE_URL}/blog/${post.slug}`
          : `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: alternates(`/blog/${post.slug}`),
    })),
  );

  return [...staticEntries, ...blogEntries];
}
