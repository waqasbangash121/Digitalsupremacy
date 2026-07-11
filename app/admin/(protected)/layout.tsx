import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "../actions";
import AdminNav from "./admin-nav";
import "../admin.css";
import "../admin-nav.css";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/"><img src="/image/logo.png" alt="Digital Supremacy" /></a>
        <AdminNav />
        <div className="admin-account">
          <p>{admin.email}</p>
          <form action={logoutAction}><button type="submit">Sign out</button></form>
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
