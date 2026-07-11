"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";

const MAX_BANNER_SIZE = 2_000_000;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function text(formData: FormData, key: string) { return String(formData.get(key) ?? "").trim(); }
function checked(formData: FormData, key: string) { return formData.get(key) === "on"; }
function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100); }
function safeUrl(value: string) {
  if (!value) return "";
  try { const url = new URL(value); return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : ""; } catch { return ""; }
}
function parseTags(value: string) { return [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))].slice(0, 20); }

async function bannerValue(formData: FormData) {
  const file = formData.get("bannerFile");
  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error("Use a JPG, PNG, WebP, or GIF banner.");
    if (file.size > MAX_BANNER_SIZE) throw new Error("Banner images must be 2 MB or smaller.");
    const buffer = Buffer.from(await file.arrayBuffer());
    return `data:${file.type};base64,${buffer.toString("base64")}`;
  }
  return safeUrl(text(formData, "bannerUrl")) || text(formData, "existingBanner");
}

async function postData(formData: FormData) {
  const title = text(formData, "title");
  const excerpt = text(formData, "excerpt");
  const contentMarkdown = text(formData, "contentMarkdown");
  if (!title || !excerpt || !contentMarkdown) throw new Error("Title, excerpt, and article content are required.");
  const slug = slugify(text(formData, "slug") || title);
  if (!slug) throw new Error("A valid slug is required.");
  const publishedInput = text(formData, "publishedAt");
  const publishedAt = publishedInput ? new Date(publishedInput) : checked(formData, "isPublished") ? new Date() : null;
  if (publishedAt && Number.isNaN(publishedAt.getTime())) throw new Error("Publish date is invalid.");
  const banner = await bannerValue(formData);
  return {
    slug, title, excerpt, contentMarkdown, banner,
    bannerAlt: text(formData, "bannerAlt") || title,
    authorName: text(formData, "authorName") || "Digital Supremacy",
    category: text(formData, "category") || "Email Marketing",
    tagsJson: JSON.stringify(parseTags(text(formData, "tags"))),
    focusKeyword: text(formData, "focusKeyword"),
    metaTitle: text(formData, "metaTitle") || title,
    metaDescription: text(formData, "metaDescription") || excerpt,
    canonicalUrl: safeUrl(text(formData, "canonicalUrl")),
    ogImageUrl: safeUrl(text(formData, "ogImageUrl")),
    noindex: checked(formData, "noindex"), nofollow: checked(formData, "nofollow"),
    isFeatured: checked(formData, "isFeatured"), isPublished: checked(formData, "isPublished"), publishedAt,
  };
}

function refreshBlog(slug?: string) {
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createBlogPostAction(formData: FormData) {
  await requireAdmin();
  const post = await postData(formData);
  await sql`insert into blog_posts (id, slug, title, excerpt, content_markdown, banner_image_url, banner_image_alt, author_name, category, tags_json, focus_keyword, meta_title, meta_description, canonical_url, og_image_url, noindex, nofollow, is_featured, is_published, published_at) values (${randomUUID()}, ${post.slug}, ${post.title}, ${post.excerpt}, ${post.contentMarkdown}, ${post.banner}, ${post.bannerAlt}, ${post.authorName}, ${post.category}, ${post.tagsJson}, ${post.focusKeyword}, ${post.metaTitle}, ${post.metaDescription}, ${post.canonicalUrl}, ${post.ogImageUrl}, ${post.noindex}, ${post.nofollow}, ${post.isFeatured}, ${post.isPublished}, ${post.publishedAt})`;
  refreshBlog(post.slug);
  redirect("/admin/blogs");
}

export async function updateBlogPostAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const oldRows = await sql<{ slug: string }[]>`select slug from blog_posts where id=${id} limit 1`;
  const post = await postData(formData);
  await sql`update blog_posts set slug=${post.slug}, title=${post.title}, excerpt=${post.excerpt}, content_markdown=${post.contentMarkdown}, banner_image_url=${post.banner}, banner_image_alt=${post.bannerAlt}, author_name=${post.authorName}, category=${post.category}, tags_json=${post.tagsJson}, focus_keyword=${post.focusKeyword}, meta_title=${post.metaTitle}, meta_description=${post.metaDescription}, canonical_url=${post.canonicalUrl}, og_image_url=${post.ogImageUrl}, noindex=${post.noindex}, nofollow=${post.nofollow}, is_featured=${post.isFeatured}, is_published=${post.isPublished}, published_at=${post.publishedAt}, updated_at=now() where id=${id}`;
  refreshBlog(post.slug);
  if (oldRows[0]?.slug && oldRows[0].slug !== post.slug) revalidatePath(`/blog/${oldRows[0].slug}`);
  redirect("/admin/blogs");
}

export async function toggleBlogPostAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  await sql`update blog_posts set is_published = not is_published, published_at = case when is_published = false and published_at is null then now() else published_at end, updated_at=now() where id=${id}`;
  refreshBlog();
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  await sql`delete from blog_posts where id=${id}`;
  refreshBlog();
}
