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

const legacyStudies = [
  {
    id: "legacy-wellness", slug: "wellness", title: "From Stagnant to +325% Growth — Email Revenue Rebuilt for a 60+ Wellness Audience",
    client: "Physician-led Brand", industry: "Health & Wellness",
    excerpt: "A full rebuild from inconsistent messaging to a structured, revenue-driving system that matched the brand and its audience.",
    period: "Nov 2025 → Apr 2026",
    challenge: "A strong brand had a broken email channel. The 60+ audience was not reflected in the content, emails were visually inconsistent, messaging lacked the calm physician-guided tone, campaigns had no journey, and list growth was stagnant.",
    solution: "We aligned the email experience with the actual customer: clearer design, simpler messaging, structured lifecycle journeys, intent-based capture, and campaign sequences instead of isolated sends.",
    results: "Email generated $197,395 in attributed revenue, revenue grew 325.78%, campaigns drove more than $144K, audience reach grew to 771,422 recipients, campaign click rate reached 1.97%, and flow click rate reached 8.62%.",
    closing: "From inconsistent communication to a structured, audience-aware system. Email is no longer just a marketing channel. It is a revenue driver.",
    metrics: [{value:"$197K",label:"Attributed email revenue"},{value:"+325%",label:"Revenue growth"},{value:"771K",label:"Recipients reached"},{value:"+946%",label:"Audience reach growth"}],
    phases: [
      {title:"Understand before changing anything",description:"We aligned with stakeholders on brand vision, audience expectations, and the meaning of trust before changing strategy or design."},
      {title:"Fix the entry point",description:"We introduced always-on, campaign-specific, and event-triggered signup experiences tied to visitor intent."},
      {title:"Rebuild the visual experience",description:"We created clean branded templates with stronger hierarchy, readability, consistency, and mobile usability."},
      {title:"Build the strategy",description:"We introduced monthly planning, lifecycle flows, audience-led messaging, and a clear purpose for every send."},
      {title:"Turn campaigns into journeys",description:"Pre-launch, launch, reminder, and final-call sequences replaced disconnected promotional blasts."}
    ]
  },
  {
    id: "legacy-full-funnel", slug: "full-funnel", title: "From Outdated to Optimised — $310K Revenue and a Scalable Email System",
    client: "Confidential Brand", industry: "Health & Wellness · Full-Funnel Transformation",
    excerpt: "A full-funnel rebuild turned a reactive email approach into a structured, scalable revenue channel delivering consistent results.",
    period: "Dec 2025 → Apr 2026",
    challenge: "The email program looked acceptable but could not scale. Designs were outdated, brand identity was inconsistent, strategy was reactive, campaigns lacked cohesion, and the customer experience did not support long-term performance.",
    solution: "We slowed down to understand the brand, rebuilt the design system, created a monthly campaign structure, introduced bundle and use-case positioning, and built a continuous optimisation loop.",
    results: "The system generated $310,718 in total revenue, attributed revenue increased 113%, campaign revenue reached $144,168, 650,709 recipients were reached, flow revenue grew from near zero to $10,769, and deliverability scored 75.",
    closing: "The result was not a single winning campaign. It was a repeatable email system built to keep learning, improving, and compounding revenue.",
    metrics: [{value:"$310K",label:"Total revenue generated"},{value:"+113%",label:"Attributed revenue increase"},{value:"650K+",label:"Campaign recipients"},{value:"+999%",label:"Flow revenue growth"}],
    phases: [
      {title:"Strategy before execution",description:"We defined the email strategy, monthly campaign flow, messaging direction, and stakeholder review process first."},
      {title:"Fix the visual experience",description:"We rebuilt premium branded templates with consistent hierarchy, spacing, typography, and conversion-focused layouts."},
      {title:"Create smarter campaigns",description:"Campaign calendars, event-based promotions, storytelling, and segmentation gave every email a role in the journey."},
      {title:"Add product strategy",description:"Bundles, use cases, timed discounts, and ritual-based positioning made products easier to understand and choose."},
      {title:"Continuously iterate",description:"Engagement, messaging, conversion behaviour, positioning, and CTA placement became an ongoing feedback loop."}
    ]
  }
] as const;

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

  for (const [index, item] of legacyStudies.entries()) {
    await sql`
      insert into case_studies (id, slug, title, client_name, industry, excerpt, project_period, challenge, solution, results, closing, metrics_json, phases_json, images_json, sort_order, is_active)
      values (${item.id}, ${item.slug}, ${item.title}, ${item.client}, ${item.industry}, ${item.excerpt}, ${item.period}, ${item.challenge}, ${item.solution}, ${item.results}, ${item.closing}, ${JSON.stringify(item.metrics)}, ${JSON.stringify(item.phases)}, '[]', ${index}, true)
      on conflict (slug) do nothing
    `;
  }
}
export async function ensureCaseStudiesSchema() {
  globalForDb.caseStudiesSchemaPromise ??= createCaseStudiesSchema().catch((error) => { globalForDb.caseStudiesSchemaPromise = undefined; throw error; });
  return globalForDb.caseStudiesSchemaPromise;
}
function parseArray<T>(value: string): T[] { try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
function hydrateCaseStudy(row: CaseStudyRow): CaseStudy {
  const { metrics_json, phases_json, images_json, ...caseStudy } = row;
  return { ...caseStudy, metrics: parseArray<CaseStudyMetric>(metrics_json).slice(0, 4), phases: parseArray<CaseStudyPhase>(phases_json).slice(0, 8), images: parseArray<CaseStudyImage>(images_json).slice(0, 6) };
}
export async function getCaseStudies(includeInactive = false) {
  await ensureCaseStudiesSchema();
  const rows = includeInactive
    ? await sql<CaseStudyRow[]>`select * from case_studies order by sort_order asc, created_at desc`
    : await sql<CaseStudyRow[]>`select * from case_studies where is_active = true order by sort_order asc, created_at desc`;
  return rows.map(hydrateCaseStudy);
}
export async function getCaseStudyBySlug(slug: string, includeInactive = false) {
  await ensureCaseStudiesSchema();
  const rows = includeInactive
    ? await sql<CaseStudyRow[]>`select * from case_studies where slug = ${slug} limit 1`
    : await sql<CaseStudyRow[]>`select * from case_studies where slug = ${slug} and is_active = true limit 1`;
  return rows[0] ? hydrateCaseStudy(rows[0]) : null;
}
