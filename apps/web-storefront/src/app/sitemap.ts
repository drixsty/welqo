import { MetadataRoute } from "next";
import { BLOG_POSTS } from "../lib/blog";

const BASE_URL = "https://welqo.fr";

const STATIC_PAGES = [
  { path: "",                                    priority: 1.0, freq: "weekly"  },
  { path: "/proprietaires",                      priority: 0.9, freq: "monthly" },
  { path: "/blog",                               priority: 0.8, freq: "weekly"  },
  { path: "/logements",                          priority: 0.8, freq: "weekly"  },
  { path: "/logements/appartement-bordelais",    priority: 0.7, freq: "monthly" },
  { path: "/mentions-legales",                   priority: 0.1, freq: "yearly"  },
  { path: "/politique-de-confidentialite",       priority: 0.1, freq: "yearly"  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now     = new Date();
  const locales = ["fr", "en"] as const;

  const staticEntries = locales.flatMap((locale) =>
    STATIC_PAGES.map(({ path, priority, freq }) => ({
      url:             `${BASE_URL}/${locale}${path}`,
      lastModified:    now,
      changeFrequency: freq as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority,
    }))
  );

  const blogEntries = locales.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({
      url:             `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified:    new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority:        0.75,
    }))
  );

  return [...staticEntries, ...blogEntries];
}
