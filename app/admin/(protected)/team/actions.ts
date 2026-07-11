"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { encodeTeamProfileMedia, sql, type TeamSocialLinks } from "@/lib/db";

const MAX_IMAGE_SIZE = 750_000;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

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

async function resolveImage(formData: FormData) {
  const upload = formData.get("imageFile");
  if (upload instanceof File && upload.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.has(upload.type)) {
      throw new Error("Upload a JPG, PNG, WebP, or GIF image.");
    }
    if (upload.size > MAX_IMAGE_SIZE) {
      throw new Error("Portrait images must be smaller than 750 KB.");
    }
    const base64 = Buffer.from(await upload.arrayBuffer()).toString("base64");
    return `data:${upload.type};base64,${base64}`;
  }

  const remoteUrl = cleanUrl(formData.get("imageUrl"));
  if (remoteUrl) return remoteUrl;
  return String(formData.get("existingImage") ?? "").trim();
}

async function memberData(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  if (!name || !role) throw new Error("Name and role are required.");

  const social: TeamSocialLinks = {
    facebook: cleanUrl(formData.get("facebookUrl")),
    linkedin: cleanUrl(formData.get("linkedinUrl")),
    twitter: cleanUrl(formData.get("twitterUrl")),
    instagram: cleanUrl(formData.get("instagramUrl")),
  };

  const image = await resolveImage(formData);

  return {
    name,
    initials: String(formData.get("initials") ?? "").trim().toUpperCase().slice(0, 4) || name.slice(0, 2).toUpperCase(),
    role,
    tag: String(formData.get("tag") ?? "").trim() || "Team",
    bio: String(formData.get("bio") ?? "").trim(),
    tone: String(formData.get("tone") ?? "default").trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "default",
    profileMedia: encodeTeamProfileMedia(image, social),
    sortOrder: Number.parseInt(String(formData.get("sortOrder") ?? "0"), 10) || 0,
    isFounder: formData.get("isFounder") === "on",
    isActive: formData.get("isActive") === "on",
  };
}

function refreshTeam() {
  revalidatePath("/team");
  revalidatePath("/admin/team");
}

export async function createMemberAction(formData: FormData) {
  await requireAdmin();
  const member = await memberData(formData);
  await sql`
    insert into team_members (id, name, initials, role, tag, bio, tone, image_url, sort_order, is_founder, is_active)
    values (${randomUUID()}, ${member.name}, ${member.initials}, ${member.role}, ${member.tag}, ${member.bio}, ${member.tone}, ${member.profileMedia}, ${member.sortOrder}, ${member.isFounder}, ${member.isActive})
  `;
  refreshTeam();
  redirect("/admin/team");
}

export async function updateMemberAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const member = await memberData(formData);
  await sql`
    update team_members set
      name = ${member.name}, initials = ${member.initials}, role = ${member.role},
      tag = ${member.tag}, bio = ${member.bio}, tone = ${member.tone},
      image_url = ${member.profileMedia}, sort_order = ${member.sortOrder},
      is_founder = ${member.isFounder}, is_active = ${member.isActive}, updated_at = now()
    where id = ${id}
  `;
  refreshTeam();
  redirect("/admin/team");
}

export async function toggleMemberAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await sql`update team_members set is_active = not is_active, updated_at = now() where id = ${id}`;
  refreshTeam();
}

export async function deleteMemberAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await sql`delete from team_members where id = ${id}`;
  refreshTeam();
}
