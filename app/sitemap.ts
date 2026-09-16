import type { MetadataRoute } from "next";

import { publishedPosts, siteUrl } from "./blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-09-16",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: "2026-09-16",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...publishedPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedDate ?? post.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
