"use server";

import { redirect } from "next/navigation";
import {
  authenticateAdmin,
  createFirstAdmin,
  createSession,
  destroySession,
  hasAdminUsers,
} from "@/lib/auth";

export type AuthState = { error: string };

function credentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function loginAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = credentials(formData);
  if (!email || !password) return { error: "Enter your email and password." };
  const adminId = await authenticateAdmin(email, password);
  if (!adminId) return { error: "Email or password is incorrect." };
  await createSession(adminId);
  redirect("/admin/team");
}

export async function setupAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = credentials(formData);
  const confirmation = String(formData.get("confirmation") ?? "");
  if (!email.includes("@")) return { error: "Enter a valid email address." };
  if (password.length < 12) return { error: "Use at least 12 characters for the password." };
  if (password !== confirmation) return { error: "Passwords do not match." };
  if (await hasAdminUsers()) return { error: "Admin setup has already been completed." };

  const adminId = await createFirstAdmin(email, password);
  await createSession(adminId);
  redirect("/admin/team");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
