import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ensureSchema, sql } from "@/lib/db";

const COOKIE_NAME = "ds_admin_session";
const SESSION_DAYS = 14;

function sessionHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function hasAdminUsers() {
  await ensureSchema();
  const [{ count }] = await sql<{ count: number }[]>`select count(*)::int as count from admin_users`;
  return count > 0;
}

export async function createFirstAdmin(email: string, password: string) {
  await ensureSchema();
  return sql.begin(async (transaction) => {
    const [{ count }] = await transaction<{ count: number }[]>`select count(*)::int as count from admin_users`;
    if (count > 0) throw new Error("Admin setup has already been completed.");
    const id = randomUUID();
    await transaction`insert into admin_users (id, email, password_hash) values (${id}, ${email.toLowerCase()}, ${hashPassword(password)})`;
    return id;
  });
}

export async function authenticateAdmin(email: string, password: string) {
  await ensureSchema();
  const users = await sql<{ id: string; password_hash: string }[]>`
    select id, password_hash from admin_users where email = ${email.toLowerCase()} limit 1
  `;
  const user = users[0];
  return user && verifyPassword(password, user.password_hash) ? user.id : null;
}

export async function createSession(adminId: string) {
  await ensureSchema();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000);
  await sql`insert into admin_sessions (token_hash, admin_id, expires_at) values (${sessionHash(token)}, ${adminId}, ${expiresAt})`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentAdmin() {
  await ensureSchema();
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const rows = await sql<{ id: string; email: string }[]>`
    select users.id, users.email
    from admin_sessions sessions
    join admin_users users on users.id = sessions.admin_id
    where sessions.token_hash = ${sessionHash(token)} and sessions.expires_at > now()
    limit 1
  `;
  return rows[0] ?? null;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) await sql`delete from admin_sessions where token_hash = ${sessionHash(token)}`;
  cookieStore.delete(COOKIE_NAME);
}
