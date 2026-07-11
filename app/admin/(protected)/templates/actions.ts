"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import { ensureTemplatesSchema } from "@/lib/templates-db";

const MAX_IMAGE_SIZE = 1_500_000;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90);
}

function safeUrl(value: string) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

async function imageValue(formData: FormData) {
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error("Use a JPG, PNG, WebP, or GIF image.");
    if (file.size > MAX_IMAGE_SIZE) throw new Error("Template images must be 1.5 MB or smaller.");
    const buffer = Buffer.from(await file.arrayBuffer());
    return `data:${file.type};base64,${buffer.toString("base64")}`;
  }
  return text(formData, "imageUrl") || text(formData, "existingImage");
}

async function templateData(formData: FormData) {
  const title = text(formData, "title");
  if (!title) throw new Error("Template title is required.");
  const slug = slugify(text(formData, "slug") || title);
  if (!slug) throw new Error("A valid template slug is required.");

  return {
    title,
    slug,
    category: text(formData, "category") || "Email Template",
    description: text(formData, "description"),
    imageUrl: await imageValue(formData),
    previewUrl: safeUrl(text(formData, "previewUrl")),
    downloadUrl: safeUrl(text(formData, "downloadUrl")),
    sortOrder: Number.parseInt(text(formData, "sortOrder") || "0", 10) || 0,
    isFeatured: formData.get("isFeatured") === "on",
    isActive: formData.get("isActive") === "on",
  };
}

function refreshTemplates() {
  revalidatePath("/admin/templates");
  revalidatePath("/templates");
}

export async function createTemplateAction(formData: FormData) {
  await requireAdmin();
  await ensureTemplatesSchema();
  const item = await templateData(formData);
  await sql`
    insert into templates (id, slug, title, category, description, image_url, preview_url, download_url, sort_order, is_featured, is_active)
    values (${randomUUID()}, ${item.slug}, ${item.title}, ${item.category}, ${item.description}, ${item.imageUrl}, ${item.previewUrl}, ${item.downloadUrl}, ${item.sortOrder}, ${item.isFeatured}, ${item.isActive})
  `;
  refreshTemplates();
  redirect("/admin/templates");
}

export async function updateTemplateAction(formData: FormData) {
  await requireAdmin();
  await ensureTemplatesSchema();
  const id = text(formData, "id");
  const item = await templateData(formData);
  await sql`
    update templates set slug=${item.slug}, title=${item.title}, category=${item.category}, description=${item.description},
      image_url=${item.imageUrl}, preview_url=${item.previewUrl}, download_url=${item.downloadUrl}, sort_order=${item.sortOrder},
      is_featured=${item.isFeatured}, is_active=${item.isActive}, updated_at=now()
    where id=${id}
  `;
  refreshTemplates();
  redirect("/admin/templates");
}

export async function toggleTemplateAction(formData: FormData) {
  await requireAdmin();
  await ensureTemplatesSchema();
  const id = text(formData, "id");
  await sql`update templates set is_active = not is_active, updated_at=now() where id=${id}`;
  refreshTemplates();
}

export async function deleteTemplateAction(formData: FormData) {
  await requireAdmin();
  await ensureTemplatesSchema();
  const id = text(formData, "id");
  await sql`delete from templates where id=${id}`;
  refreshTemplates();
}
