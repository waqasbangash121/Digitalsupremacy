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

export async function saveSiteSettingsAction(formData: FormData) {
  const linkedinUrl = cleanUrl(formData.get("linkedinUrl"));
  const instagramUrl = cleanUrl(formData.get("instagramUrl"));
  const youtubeUrl = cleanUrl(formData.get("youtubeUrl"));

  await sql`
    insert into site_settings (id, linkedin_url, instagram_url, youtube_url, updated_at)
    values ('default', ${linkedinUrl}, ${instagramUrl}, ${youtubeUrl}, now())
    on conflict (id) do update set
      linkedin_url = excluded.linkedin_url,
      instagram_url = excluded.instagram_url,
      youtube_url = excluded.youtube_url,
      updated_at = now()
  `;

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  revalidatePath("/api/site-settings");
}
