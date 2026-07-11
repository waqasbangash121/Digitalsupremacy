"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";

function cleanUrl(value: FormDataEntryValue | null) {
  const url = String(value ?? "").trim();
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : "";
  } catch {
    return "";
  }
}

function isEnabled(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

export async function saveSiteSettingsAction(formData: FormData) {
  const linkedinUrl = cleanUrl(formData.get("linkedinUrl"));
  const instagramUrl = cleanUrl(formData.get("instagramUrl"));
  const youtubeUrl = cleanUrl(formData.get("youtubeUrl"));
  const facebookUrl = cleanUrl(formData.get("facebookUrl"));
  const twitterUrl = cleanUrl(formData.get("twitterUrl"));
  const tiktokUrl = cleanUrl(formData.get("tiktokUrl"));

  await sql`
    insert into site_settings (
      id,
      linkedin_url, linkedin_enabled,
      instagram_url, instagram_enabled,
      youtube_url, youtube_enabled,
      facebook_url, facebook_enabled,
      twitter_url, twitter_enabled,
      tiktok_url, tiktok_enabled,
      updated_at
    )
    values (
      'default',
      ${linkedinUrl}, ${isEnabled(formData, "linkedinEnabled")},
      ${instagramUrl}, ${isEnabled(formData, "instagramEnabled")},
      ${youtubeUrl}, ${isEnabled(formData, "youtubeEnabled")},
      ${facebookUrl}, ${isEnabled(formData, "facebookEnabled")},
      ${twitterUrl}, ${isEnabled(formData, "twitterEnabled")},
      ${tiktokUrl}, ${isEnabled(formData, "tiktokEnabled")},
      now()
    )
    on conflict (id) do update set
      linkedin_url = excluded.linkedin_url,
      linkedin_enabled = excluded.linkedin_enabled,
      instagram_url = excluded.instagram_url,
      instagram_enabled = excluded.instagram_enabled,
      youtube_url = excluded.youtube_url,
      youtube_enabled = excluded.youtube_enabled,
      facebook_url = excluded.facebook_url,
      facebook_enabled = excluded.facebook_enabled,
      twitter_url = excluded.twitter_url,
      twitter_enabled = excluded.twitter_enabled,
      tiktok_url = excluded.tiktok_url,
      tiktok_enabled = excluded.tiktok_enabled,
      updated_at = now()
  `;

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  revalidatePath("/api/site-settings");
}
