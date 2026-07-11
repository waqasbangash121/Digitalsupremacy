import { sql } from "@/lib/db";

export type SiteSettings = {
  linkedin_url: string;
  linkedin_enabled: boolean;
  instagram_url: string;
  instagram_enabled: boolean;
  youtube_url: string;
  youtube_enabled: boolean;
  facebook_url: string;
  facebook_enabled: boolean;
  twitter_url: string;
  twitter_enabled: boolean;
  tiktok_url: string;
  tiktok_enabled: boolean;
  updated_at?: Date;
};

export const defaultSiteSettings: SiteSettings = {
  linkedin_url: "",
  linkedin_enabled: true,
  instagram_url: "",
  instagram_enabled: true,
  youtube_url: "",
  youtube_enabled: true,
  facebook_url: "",
  facebook_enabled: false,
  twitter_url: "",
  twitter_enabled: false,
  tiktok_url: "",
  tiktok_enabled: false,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await sql<SiteSettings[]>`
      select
        linkedin_url, linkedin_enabled,
        instagram_url, instagram_enabled,
        youtube_url, youtube_enabled,
        facebook_url, facebook_enabled,
        twitter_url, twitter_enabled,
        tiktok_url, tiktok_enabled,
        updated_at
      from site_settings
      where id = 'default'
      limit 1
    `;
    return rows[0] ?? defaultSiteSettings;
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && (error.code === "42P01" || error.code === "42703")) {
      return defaultSiteSettings;
    }
    throw error;
  }
}
