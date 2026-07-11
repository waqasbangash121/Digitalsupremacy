"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { ensureSchema, sql } from "@/lib/db";

function memberData(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  if (!name || !role) throw new Error("Name and role are required.");
  return {
    name,
    initials: String(formData.get("initials") ?? "").trim().toUpperCase().slice(0, 4) || name.slice(0, 2).toUpperCase(),
    role,
    tag: String(formData.get("tag") ?? "").trim() || "Team",
    bio: String(formData.get("bio") ?? "").trim(),
    tone: String(formData.get("tone") ?? "default").trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "default",
    imageUrl: String(formData.get("imageUrl") ?? "").trim(),
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
  await ensureSchema();
  const member = memberData(formData);
  await sql`
    insert into team_members (id, name, initials, role, tag, bio, tone, image_url, sort_order, is_founder, is_active)
    values (${randomUUID()}, ${member.name}, ${member.initials}, ${member.role}, ${member.tag}, ${member.bio}, ${member.tone}, ${member.imageUrl}, ${member.sortOrder}, ${member.isFounder}, ${member.isActive})
  `;
  refreshTeam();
  redirect("/admin/team");
}

export async function updateMemberAction(formData: FormData) {
  await requireAdmin();
  await ensureSchema();
  const id = String(formData.get("id") ?? "");
  const member = memberData(formData);
  await sql`
    update team_members set
      name = ${member.name}, initials = ${member.initials}, role = ${member.role},
      tag = ${member.tag}, bio = ${member.bio}, tone = ${member.tone},
      image_url = ${member.imageUrl}, sort_order = ${member.sortOrder},
      is_founder = ${member.isFounder}, is_active = ${member.isActive}, updated_at = now()
    where id = ${id}
  `;
  refreshTeam();
  redirect("/admin/team");
}

export async function toggleMemberAction(formData: FormData) {
  await requireAdmin();
  await ensureSchema();
  const id = String(formData.get("id") ?? "");
  await sql`update team_members set is_active = not is_active, updated_at = now() where id = ${id}`;
  refreshTeam();
}

export async function deleteMemberAction(formData: FormData) {
  await requireAdmin();
  await ensureSchema();
  const id = String(formData.get("id") ?? "");
  await sql`delete from team_members where id = ${id}`;
  refreshTeam();
}
