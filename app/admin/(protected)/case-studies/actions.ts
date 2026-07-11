"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { ensureCaseStudiesSchema, sql, type CaseStudyImage, type CaseStudyMetric, type CaseStudyPhase } from "@/lib/db";

const MAX_IMAGE_BYTES = 1_500_000;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90);
}
function text(formData: FormData, key: string) { return String(formData.get(key) ?? "").trim(); }
function metricsFromForm(formData: FormData): CaseStudyMetric[] {
  return [1,2,3,4].map((index) => ({ value: text(formData, `metric${index}Value`), label: text(formData, `metric${index}Label`) })).filter((item) => item.value || item.label);
}
function phasesFromForm(formData: FormData): CaseStudyPhase[] {
  return [1,2,3,4,5,6].map((index) => ({ title: text(formData, `phase${index}Title`), description: text(formData, `phase${index}Description`) })).filter((item) => item.title || item.description);
}
async function imageFromForm(formData: FormData, fileKey: string, urlKey: string, existingKey: string) {
  const url = text(formData, urlKey);
  if (url) return url;
  const file = formData.get(fileKey);
  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error("Images must be JPG, PNG, WebP, or GIF.");
    if (file.size > MAX_IMAGE_BYTES) throw new Error("Each image must be 1.5 MB or smaller.");
    return `data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`;
  }
  return text(formData, existingKey);
}
async function imagesFromForm(formData: FormData): Promise<CaseStudyImage[]> {
  const images: CaseStudyImage[] = [];
  for (const index of [1,2,3,4]) {
    const url = await imageFromForm(formData, `image${index}File`, `image${index}Url`, `existingImage${index}`);
    const caption = text(formData, `image${index}Caption`);
    if (url) images.push({ url, caption });
  }
  return images;
}
async function caseStudyData(formData: FormData) {
  const title = text(formData, "title");
  if (!title) throw new Error("A case study title is required.");
  const slug = slugify(text(formData, "slug") || title);
  if (!slug) throw new Error("A valid slug is required.");
  return {
    title, slug,
    clientName: text(formData, "clientName"), industry: text(formData, "industry"), excerpt: text(formData, "excerpt"),
    projectPeriod: text(formData, "projectPeriod"), challenge: text(formData, "challenge"), solution: text(formData, "solution"),
    results: text(formData, "results"), closing: text(formData, "closing"),
    coverImageUrl: await imageFromForm(formData, "coverImageFile", "coverImageUrl", "existingCoverImage"),
    metricsJson: JSON.stringify(metricsFromForm(formData)), phasesJson: JSON.stringify(phasesFromForm(formData)),
    imagesJson: JSON.stringify(await imagesFromForm(formData)),
    sortOrder: Number.parseInt(text(formData, "sortOrder") || "0", 10) || 0,
    isActive: formData.get("isActive") === "on",
  };
}
function refreshCaseStudies(slug?: string) {
  revalidatePath("/admin/case-studies"); revalidatePath("/case-studies");
  if (slug) revalidatePath(`/case-studies/${slug}`);
}
export async function createCaseStudyAction(formData: FormData) {
  await requireAdmin(); await ensureCaseStudiesSchema(); const item = await caseStudyData(formData);
  await sql`insert into case_studies (id,slug,title,client_name,industry,excerpt,project_period,challenge,solution,results,closing,cover_image_url,metrics_json,phases_json,images_json,sort_order,is_active)
    values (${randomUUID()},${item.slug},${item.title},${item.clientName},${item.industry},${item.excerpt},${item.projectPeriod},${item.challenge},${item.solution},${item.results},${item.closing},${item.coverImageUrl},${item.metricsJson},${item.phasesJson},${item.imagesJson},${item.sortOrder},${item.isActive})`;
  refreshCaseStudies(item.slug); redirect("/admin/case-studies");
}
export async function updateCaseStudyAction(formData: FormData) {
  await requireAdmin(); await ensureCaseStudiesSchema(); const id = text(formData, "id"); const item = await caseStudyData(formData);
  await sql`update case_studies set slug=${item.slug},title=${item.title},client_name=${item.clientName},industry=${item.industry},excerpt=${item.excerpt},project_period=${item.projectPeriod},challenge=${item.challenge},solution=${item.solution},results=${item.results},closing=${item.closing},cover_image_url=${item.coverImageUrl},metrics_json=${item.metricsJson},phases_json=${item.phasesJson},images_json=${item.imagesJson},sort_order=${item.sortOrder},is_active=${item.isActive},updated_at=now() where id=${id}`;
  refreshCaseStudies(item.slug); redirect("/admin/case-studies");
}
export async function toggleCaseStudyAction(formData: FormData) { await requireAdmin(); await ensureCaseStudiesSchema(); const id=text(formData,"id"); await sql`update case_studies set is_active=not is_active,updated_at=now() where id=${id}`; refreshCaseStudies(); }
export async function deleteCaseStudyAction(formData: FormData) { await requireAdmin(); await ensureCaseStudiesSchema(); const id=text(formData,"id"); await sql`delete from case_studies where id=${id}`; refreshCaseStudies(); }
