import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured");

const globalForDb = globalThis as unknown as {
  sql?: ReturnType<typeof postgres>;
  caseStudiesSchemaPromise?: Promise<void>;
};

export const sql = globalForDb.sql ?? postgres(connectionString, {
  max: 5,
  prepare: false,
  idle_timeout: 20,
  connect_timeout: 15,
});
if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;

export type TeamSocialLinks = { facebook: string; linkedin: string; twitter: string; instagram: string };
export type TeamMember = {
  id: string; name: string; initials: string; role: string; tag: string; bio: string; tone: string;
  image_url: string; facebook_url: string; linkedin_url: string; twitter_url: string; instagram_url: string;
  sort_order: number; is_founder: boolean; is_active: boolean;
};
type TeamMemberRow = Omit<TeamMember, "facebook_url" | "linkedin_url" | "twitter_url" | "instagram_url">;
type StoredProfileMedia = { image?: string; social?: Partial<TeamSocialLinks> };
export function encodeTeamProfileMedia(image: string, social: TeamSocialLinks) { return JSON.stringify({ image, social } satisfies StoredProfileMedia); }
function decodeTeamProfileMedia(value: string) {
  if (!value.trim().startsWith("{")) return { image: value, social: {} as Partial<TeamSocialLinks> };
  try {
    const parsed = JSON.parse(value) as StoredProfileMedia;
    return { image: typeof parsed.image === "string" ? parsed.image : "", social: parsed.social ?? {} };
  } catch { return { image: value, social: {} as Partial<TeamSocialLinks> }; }
}
function hydrateTeamMember(row: TeamMemberRow): TeamMember {
  const media = decodeTeamProfileMedia(row.image_url);
  return { ...row, image_url: media.image, facebook_url: media.social.facebook ?? "", linkedin_url: media.social.linkedin ?? "", twitter_url: media.social.twitter ?? "", instagram_url: media.social.instagram ?? "" };
}
export async function getTeamMembers(includeInactive = false) {
  const rows = includeInactive
    ? await sql<TeamMemberRow[]>`select * from team_members order by is_founder desc, sort_order asc, created_at asc`
    : await sql<TeamMemberRow[]>`select * from team_members where is_active = true order by is_founder desc, sort_order asc, created_at asc`;
  return rows.map(hydrateTeamMember);
}

export type CaseStudyMetric = { value: string; label: string };
export type CaseStudyPhase = { title: string; description: string };
export type CaseStudyImage = { url: string; caption: string };
export type CaseStudy = {
  id: string; slug: string; title: string; client_name: string; industry: string; excerpt: string;
  project_period: string; challenge: string; solution: string; results: string; closing: string;
  cover_image_url: string; metrics: CaseStudyMetric[]; phases: CaseStudyPhase[]; images: CaseStudyImage[];
  sort_order: number; is_active: boolean; created_at: Date; updated_at: Date;
};
type CaseStudyRow = Omit<CaseStudy, "metrics" | "phases" | "images"> & {
  metrics_json: string; phases_json: string; images_json: string;
};

async function createCaseStudiesSchema() {
  await sql`
    create table if not exists case_studies (
      id text primary key, slug text not null unique, title text not null,
      client_name text not null default '', industry text not null default '', excerpt text not null default '',
      project_period text not null default '', challenge text not null default '', solution text not null default '',
      results text not null default '', closing text not null default '', cover_image_url text not null default '',
      metrics_json text not null default '[]', phases_json text not null default '[]', images_json text not null default '[]',
      sort_order integer not null default 0, is_active boolean not null default true,
      created_at timestamptz not null default now(), updated_at timestamptz not null default now()
    )
  `;
  await sql`alter table case_studies add column if not exists closing text not null default ''`;
  await sql`alter table case_studies add column if not exists phases_json text not null default '[]'`;
  await sql`alter table case_studies add column if not exists images_json text not null default '[]'`;
}

export async function ensureCaseStudiesSchema() {
  if (process.env.ALLOW_RUNTIME_SCHEMA_INIT !== "true") return;
  globalForDb.caseStudiesSchemaPromise ??= createCaseStudiesSchema().catch((error) => {
    globalForDb.caseStudiesSchemaPromise = undefined;
    throw error;
  });
  return globalForDb.caseStudiesSchemaPromise;
}

function parseArray<T>(value: string): T[] { try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
function hydrateCaseStudy(row: CaseStudyRow): CaseStudy {
  const { metrics_json, phases_json, images_json, ...caseStudy } = row;
  return { ...caseStudy, metrics: parseArray<CaseStudyMetric>(metrics_json).slice(0, 4), phases: parseArray<CaseStudyPhase>(phases_json).slice(0, 8), images: parseArray<CaseStudyImage>(images_json).slice(0, 6) };
}
export async function getCaseStudies(includeInactive = false) {
  const rows = includeInactive
    ? await sql<CaseStudyRow[]>`select * from case_studies order by sort_order asc, created_at desc`
    : await sql<CaseStudyRow[]>`select * from case_studies where is_active = true order by sort_order asc, created_at desc`;
  return rows.map(hydrateCaseStudy);
}
export async function getCaseStudyBySlug(slug: string, includeInactive = false) {
  const rows = includeInactive
    ? await sql<CaseStudyRow[]>`select * from case_studies where slug = ${slug} limit 1`
    : await sql<CaseStudyRow[]>`select * from case_studies where slug = ${slug} and is_active = true limit 1`;
  return rows[0] ? hydrateCaseStudy(rows[0]) : null;
}
