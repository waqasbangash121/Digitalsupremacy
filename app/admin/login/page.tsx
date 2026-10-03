import Link from "next/link";
import BrandLogo from "@/components/brand-logo";
import { redirect } from "next/navigation";
import { getCurrentAdmin, hasAdminUsers } from "@/lib/auth";
import AuthForm from "./auth-form";
import "../admin.css";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getCurrentAdmin()) redirect("/admin/team");
  const setup = !(await hasAdminUsers());

  return (
    <main className="admin-auth-page">
      <Link className="admin-auth-brand" href="/">
        <BrandLogo width={205} />
      </Link>
      <section className="admin-auth-card">
        <p className="admin-kicker">Admin</p>
        <h1>{setup ? "Create the first admin" : "Welcome back"}</h1>
        <p>{setup ? "Set up the account that will manage website content." : "Sign in to manage the Digital Supremacy website."}</p>
        <AuthForm setup={setup} />
      </section>
    </main>
  );
}
