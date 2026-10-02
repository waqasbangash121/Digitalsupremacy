import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import type { ReactNode } from "react";
import "@/app/services/page.css";

export default function ServicesShell({ children }: { children: ReactNode }) {
  return <div className="page--services">
    <SiteHeader />
    <main>{children}</main>
    <SiteFooter />
  </div>;
}
