import { sql } from "@/lib/db";

const globalForTemplates = globalThis as unknown as {
  templatesSchemaPromise?: Promise<void>;
};

export type Template = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  preview_url: string;
  download_url: string;
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

async function createTemplatesSchema() {
  const [{ exists }] = await sql<{ exists: boolean }[]>`
    select to_regclass('public.templates') is not null as exists
  `;

  if (!exists) {
    await sql`
      create table templates (
        id text primary key,
        slug text not null unique,
        title text not null,
        category text not null default '',
        description text not null default '',
        image_url text not null default '',
        preview_url text not null default '',
        download_url text not null default '',
        sort_order integer not null default 0,
        is_featured boolean not null default false,
        is_active boolean not null default true,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )
    `;
  }
}

export async function ensureTemplatesSchema() {
  globalForTemplates.templatesSchemaPromise ??= createTemplatesSchema().catch((error) => {
    globalForTemplates.templatesSchemaPromise = undefined;
    throw error;
  });
  return globalForTemplates.templatesSchemaPromise;
}

export async function getTemplates(includeInactive = false) {
  await ensureTemplatesSchema();
  return includeInactive
    ? sql<Template[]>`select * from templates order by is_featured desc, sort_order asc, created_at desc`
    : sql<Template[]>`select * from templates where is_active = true order by is_featured desc, sort_order asc, created_at desc`;
}

export async function getTemplateBySlug(slug: string, includeInactive = false) {
  await ensureTemplatesSchema();
  const rows = includeInactive
    ? await sql<Template[]>`select * from templates where slug = ${slug} limit 1`
    : await sql<Template[]>`select * from templates where slug = ${slug} and is_active = true limit 1`;
  return rows[0] ?? null;
}
