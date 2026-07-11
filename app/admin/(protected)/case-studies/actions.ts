"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { ensureCaseStudiesSchema, sql, type CaseStudyMetric } from "@/lib/db";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function metricsFromForm(formData: FormData): CaseStudyMetric[] {
  return [1, 2, 3, 4]
    .map((index) => ({
      value: text(formData, `metric${index}Value`),
      label: text(formData, `metric${index}Label`),
    }))
    .filter((metric) => metric.value || metric.label);
}

function caseStudyData(formData: FormData) {
  const title = text(formData, "title");
  if (!title) throw new Error("A case study title is required.");

  const slug = slugify(text(formData, "slug") || title);
  if (!slug) throw new Error("A valid slug is required.");

  return {
    title,
    slug,
    clientName: text(formData, "clientName"),
    industry: text(formData, "industry"),
    excerpt: text(formData, "excerpt"),
    projectPeriod: text(formData, "projectPeriod"),
    challenge: text(formData, "challenge"),
    solution: text(formData, "solution"),
    results: text(formData, "results"),
    coverImageUrl: text(formData, "coverImageUrl"),
    metricsJson: JSON.stringify(metricsFromForm(formData)),
    sortOrder: Number.parseInt(text(formData, "sortOrder") || "0", 10) || 0,
    isActive: formData.get("isActive") === "on",
  };
}

function refreshCaseStudies() {
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
}

export async function createCaseStudyAction(formData: FormData) {
  await requireAdmin();
  await ensureCaseStudiesSchema();
  const item = caseStudyData(formData);

  await sql`
    insert into case_studies (
      id, slug, title, client_name, industry, excerpt, project_period,
      challenge, solution, results, cover_image_url, metrics_json,
      sort_order, is_active
    ) values (
      ${randomUUID()}, ${item.slug}, ${item.title}, ${item.clientName},
      ${item.industry}, ${item.excerpt}, ${item.projectPeriod},
      ${item.challenge}, ${item.solution}, ${item.results},
      ${item.coverImageUrl}, ${item.metricsJson}, ${item.sortOrder}, ${item.isActive}
    )
  `;

  refreshCaseStudies();
  redirect("/admin/case-studies");
}

export async function updateCaseStudyAction(formData: FormData) {
  await requireAdmin();
  await ensureCaseStudiesSchema();
  const id = text(formData, "id");
  const item = caseStudyData(formData);

  await sql`
    update case_studies set
      slug = ${item.slug}, title = ${item.title}, client_name = ${item.clientName},
      industry = ${item.industry}, excerpt = ${item.excerpt},
      project_period = ${item.projectPeriod}, challenge = ${item.challenge},
      solution = ${item.solution}, results = ${item.results},
      cover_image_url = ${item.coverImageUrl}, metrics_json = ${item.metricsJson},
      sort_order = ${item.sortOrder}, is_active = ${item.isActive}, updated_at = now()
    where id = ${id}
  `;

  refreshCaseStudies();
  redirect("/admin/case-studies");
}

export async function toggleCaseStudyAction(formData: FormData) {
  await requireAdmin();
  await ensureCaseStudiesSchema();
  const id = text(formData, "id");
  await sql`update case_studies set is_active = not is_active, updated_at = now() where id = ${id}`;
  refreshCaseStudies();
}

export async function deleteCaseStudyAction(formData: FormData) {
  await requireAdmin();
  await ensureCaseStudiesSchema();
  const id = text(formData, "id");
  await sql`delete from case_studies where id = ${id}`;
  refreshCaseStudies();
}
