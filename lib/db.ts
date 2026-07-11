import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const globalForDb = globalThis as unknown as { sql?: ReturnType<typeof postgres> };

export const sql =
  globalForDb.sql ??
  postgres(connectionString, {
    max: 5,
    prepare: false,
    idle_timeout: 20,
    connect_timeout: 15,
  });

if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;

let schemaPromise: Promise<void> | undefined;

const seedMembers = [
  ["addy", "Addy", "AD", "Founder, Digital Supremacy", "Founder", "Leads strategy and sets the standard for every client relationship — built on results, not promises. Hands-on with every account from day one.", "founder", 0, true],
  ["safa", "Safa", "SA", "Senior Strategist and Team Lead", "Strategy", "", "safa", 1, false],
  ["layla", "Layla", "LA", "Success Manager", "Client Success", "", "layla", 2, false],
  ["sila", "Sila", "SI", "Success Manager", "Client Success", "", "sila", 3, false],
  ["somal", "Somal", "SO", "Accounts Manager", "Client Success", "", "somal", 4, false],
  ["roosh", "Roosh", "RO", "Graphic Designer", "Creative", "", "roosh", 5, false],
  ["usama", "Usama", "US", "Copywriter", "Copy", "", "usama", 6, false],
  ["hadiya", "Hadiya", "HA", "Full Stack Email Marketer", "Email", "", "hadiya", 7, false],
] as const;

async function createSchema() {
  await sql`
    create table if not exists admin_users (
      id text primary key,
      email text not null unique,
      password_hash text not null,
      created_at timestamptz not null default now()
    )
  `;
  await sql`
    create table if not exists admin_sessions (
      token_hash text primary key,
      admin_id text not null references admin_users(id) on delete cascade,
      expires_at timestamptz not null,
      created_at timestamptz not null default now()
    )
  `;
  await sql`
    create table if not exists team_members (
      id text primary key,
      name text not null,
      initials text not null,
      role text not null,
      tag text not null,
      bio text not null default '',
      tone text not null default 'default',
      image_url text not null default '',
      sort_order integer not null default 0,
      is_founder boolean not null default false,
      is_active boolean not null default true,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  const [{ count }] = await sql<{ count: number }[]>`select count(*)::int as count from team_members`;
  if (count === 0) {
    for (const member of seedMembers) {
      await sql`
        insert into team_members (id, name, initials, role, tag, bio, tone, sort_order, is_founder)
        values (${member[0]}, ${member[1]}, ${member[2]}, ${member[3]}, ${member[4]}, ${member[5]}, ${member[6]}, ${member[7]}, ${member[8]})
      `;
    }
  }
}

export async function ensureSchema() {
  schemaPromise ??= createSchema().catch((error) => {
    schemaPromise = undefined;
    throw error;
  });
  return schemaPromise;
}

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  tag: string;
  bio: string;
  tone: string;
  image_url: string;
  sort_order: number;
  is_founder: boolean;
  is_active: boolean;
};

export async function getTeamMembers(includeInactive = false) {
  await ensureSchema();
  return includeInactive
    ? sql<TeamMember[]>`select * from team_members order by is_founder desc, sort_order asc, created_at asc`
    : sql<TeamMember[]>`select * from team_members where is_active = true order by is_founder desc, sort_order asc, created_at asc`;
}
