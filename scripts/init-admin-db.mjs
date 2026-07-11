import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import postgres from "postgres";

function loadEnvFile(filename) {
  const filepath = resolve(process.cwd(), filename);
  if (!existsSync(filepath)) return;

  for (const line of readFileSync(filepath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;

    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else {
      value = value.replace(/\s+#.*$/, "").trim();
    }

    process.env[key] = value.replace(/\\n/g, "\n");
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not configured. Add it to .env.local or export it before running pnpm db:init.",
  );
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });
const members = [
  ["addy", "Addy", "AD", "Founder, Digital Supremacy", "Founder", "Leads strategy and sets the standard for every client relationship — built on results, not promises. Hands-on with every account from day one.", "founder", 0, true],
  ["safa", "Safa", "SA", "Senior Strategist and Team Lead", "Strategy", "", "safa", 1, false],
  ["layla", "Layla", "LA", "Success Manager", "Client Success", "", "layla", 2, false],
  ["sila", "Sila", "SI", "Success Manager", "Client Success", "", "sila", 3, false],
  ["somal", "Somal", "SO", "Accounts Manager", "Client Success", "", "somal", 4, false],
  ["roosh", "Roosh", "RO", "Graphic Designer", "Creative", "", "roosh", 5, false],
  ["usama", "Usama", "US", "Copywriter", "Copy", "", "usama", 6, false],
  ["hadiya", "Hadiya", "HA", "Full Stack Email Marketer", "Email", "", "hadiya", 7, false],
];
await sql`create table if not exists admin_users (id text primary key, email text not null unique, password_hash text not null, created_at timestamptz not null default now())`;
await sql`create table if not exists admin_sessions (token_hash text primary key, admin_id text not null references admin_users(id) on delete cascade, expires_at timestamptz not null, created_at timestamptz not null default now())`;
await sql`create table if not exists team_members (id text primary key, name text not null, initials text not null, role text not null, tag text not null, bio text not null default '', tone text not null default 'default', image_url text not null default '', sort_order integer not null default 0, is_founder boolean not null default false, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now())`;
await sql`create table if not exists case_studies (id text primary key, slug text not null unique, title text not null, client_name text not null default '', industry text not null default '', excerpt text not null default '', project_period text not null default '', challenge text not null default '', solution text not null default '', results text not null default '', cover_image_url text not null default '', metrics_json text not null default '[]', sort_order integer not null default 0, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now())`;
await sql`create table if not exists templates (id text primary key, slug text not null unique, title text not null, category text not null default '', description text not null default '', image_url text not null default '', preview_url text not null default '', download_url text not null default '', sort_order integer not null default 0, is_featured boolean not null default false, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now())`;
await sql`create table if not exists blog_posts (id text primary key, slug text not null unique, title text not null, excerpt text not null default '', content_markdown text not null default '', banner_image_url text not null default '', banner_image_alt text not null default '', author_name text not null default 'Digital Supremacy', category text not null default 'Email Marketing', tags_json text not null default '[]', focus_keyword text not null default '', meta_title text not null default '', meta_description text not null default '', canonical_url text not null default '', og_image_url text not null default '', noindex boolean not null default false, nofollow boolean not null default false, is_featured boolean not null default false, is_published boolean not null default false, published_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now())`;
await sql`create index if not exists blog_posts_published_idx on blog_posts (is_published, published_at desc)`;
await sql`create table if not exists site_settings (id text primary key, linkedin_url text not null default '', linkedin_enabled boolean not null default true, instagram_url text not null default '', instagram_enabled boolean not null default true, youtube_url text not null default '', youtube_enabled boolean not null default true, facebook_url text not null default '', facebook_enabled boolean not null default false, twitter_url text not null default '', twitter_enabled boolean not null default false, tiktok_url text not null default '', tiktok_enabled boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now())`;
await sql`alter table site_settings add column if not exists linkedin_enabled boolean not null default true`;
await sql`alter table site_settings add column if not exists instagram_enabled boolean not null default true`;
await sql`alter table site_settings add column if not exists youtube_enabled boolean not null default true`;
await sql`alter table site_settings add column if not exists facebook_url text not null default ''`;
await sql`alter table site_settings add column if not exists facebook_enabled boolean not null default false`;
await sql`alter table site_settings add column if not exists twitter_url text not null default ''`;
await sql`alter table site_settings add column if not exists twitter_enabled boolean not null default false`;
await sql`alter table site_settings add column if not exists tiktok_url text not null default ''`;
await sql`alter table site_settings add column if not exists tiktok_enabled boolean not null default false`;
await sql`insert into site_settings (id) values ('default') on conflict (id) do nothing`;
const [{ count }] = await sql`select count(*)::int as count from team_members`;
if (count === 0) {
  for (const member of members) await sql`insert into team_members (id, name, initials, role, tag, bio, tone, sort_order, is_founder) values (${member[0]}, ${member[1]}, ${member[2]}, ${member[3]}, ${member[4]}, ${member[5]}, ${member[6]}, ${member[7]}, ${member[8]})`;
}
await sql.end();
console.log("Admin database initialized.");
