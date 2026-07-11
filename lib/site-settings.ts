import { sql } from "@/lib/db";

export type SiteSettings = {
  linkedin_url: string;
  instagram_url: string;
  youtube_url: string;
  updated_at?: Date;
};

export const defaultSiteSettings: SiteSettings = {
  linkedin_url: "",
  instagram_url: "",
  youtube_url: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await sql<SiteSettings[]>`
      select linkedin_url, instagram_url, youtube_url, updated_at
      from site_settings
      where id = 'default'
      limit 1
    `;
    return rows[0] ?? defaultSiteSettings;
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error.code === "42P01") {
      return defaultSiteSettings;
    }
    throw error;
  }
}
