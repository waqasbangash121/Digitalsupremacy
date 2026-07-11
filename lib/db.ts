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
  return includeInactive
    ? sql<TeamMember[]>`select * from team_members order by is_founder desc, sort_order asc, created_at asc`
    : sql<TeamMember[]>`select * from team_members where is_active = true order by is_founder desc, sort_order asc, created_at asc`;
}
