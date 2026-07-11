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

export type TeamSocialLinks = {
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
};

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  tag: string;
  bio: string;
  tone: string;
  image_url: string;
  facebook_url: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  sort_order: number;
  is_founder: boolean;
  is_active: boolean;
};

type TeamMemberRow = Omit<TeamMember, "facebook_url" | "linkedin_url" | "twitter_url" | "instagram_url">;

type StoredProfileMedia = {
  image?: string;
  social?: Partial<TeamSocialLinks>;
};

export function encodeTeamProfileMedia(image: string, social: TeamSocialLinks) {
  return JSON.stringify({ image, social } satisfies StoredProfileMedia);
}

function decodeTeamProfileMedia(value: string) {
  if (!value.trim().startsWith("{")) {
    return { image: value, social: {} as Partial<TeamSocialLinks> };
  }

  try {
    const parsed = JSON.parse(value) as StoredProfileMedia;
    return {
      image: typeof parsed.image === "string" ? parsed.image : "",
      social: parsed.social ?? {},
    };
  } catch {
    return { image: value, social: {} as Partial<TeamSocialLinks> };
  }
}

function hydrateTeamMember(row: TeamMemberRow): TeamMember {
  const media = decodeTeamProfileMedia(row.image_url);
  return {
    ...row,
    image_url: media.image,
    facebook_url: media.social.facebook ?? "",
    linkedin_url: media.social.linkedin ?? "",
    twitter_url: media.social.twitter ?? "",
    instagram_url: media.social.instagram ?? "",
  };
}

export async function getTeamMembers(includeInactive = false) {
  const rows = includeInactive
    ? await sql<TeamMemberRow[]>`select * from team_members order by is_founder desc, sort_order asc, created_at asc`
    : await sql<TeamMemberRow[]>`select * from team_members where is_active = true order by is_founder desc, sort_order asc, created_at asc`;

  return rows.map(hydrateTeamMember);
}
