import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blogs-db";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdigitalsupremacy.com";
const staticRoutes = ["/", "/services", "/case-studies", "/templates", "/blog", "/why-us", "/team", "/privacy-policy", "/terms-of-service"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    posts = await getBlogPosts();
  } catch {
    posts = [];
  }

  return [
    ...staticRoutes.map((path) => ({
      url: new URL(path, siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: path === "/" || path === "/blog" ? "weekly" as const : "monthly" as const,
      priority: path === "/" ? 1 : path === "/blog" ? 0.9 : 0.7,
    })),
    ...posts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
      lastModified: post.updated_at,
      changeFrequency: "monthly" as const,
      priority: post.is_featured ? 0.85 : 0.75,
    })),
  ];
}
