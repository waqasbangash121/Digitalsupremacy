import { sql } from "@/lib/db";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_markdown: string;
  banner_image_url: string;
  banner_image_alt: string;
  author_name: string;
  category: string;
  tags: string[];
  focus_keyword: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_image_url: string;
  noindex: boolean;
  nofollow: boolean;
  is_featured: boolean;
  is_published: boolean;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type BlogPostRow = Omit<BlogPost, "tags"> & { tags_json: string };

function parseTags(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function hydrate(row: BlogPostRow): BlogPost {
  const { tags_json, ...post } = row;
  return { ...post, tags: parseTags(tags_json) };
}

export async function getBlogPosts(includeDrafts = false) {
  const rows = includeDrafts
    ? await sql<BlogPostRow[]>`select * from blog_posts order by is_featured desc, coalesce(published_at, created_at) desc`
    : await sql<BlogPostRow[]>`select * from blog_posts where is_published = true and (published_at is null or published_at <= now()) order by is_featured desc, coalesce(published_at, created_at) desc`;
  return rows.map(hydrate);
}

export async function getBlogPostBySlug(slug: string, includeDrafts = false) {
  const rows = includeDrafts
    ? await sql<BlogPostRow[]>`select * from blog_posts where slug = ${slug} limit 1`
    : await sql<BlogPostRow[]>`select * from blog_posts where slug = ${slug} and is_published = true and (published_at is null or published_at <= now()) limit 1`;
  return rows[0] ? hydrate(rows[0]) : null;
}

export async function getBlogPostById(id: string) {
  const rows = await sql<BlogPostRow[]>`select * from blog_posts where id = ${id} limit 1`;
  return rows[0] ? hydrate(rows[0]) : null;
}
