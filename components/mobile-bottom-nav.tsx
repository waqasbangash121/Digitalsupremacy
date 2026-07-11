"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const primaryItems = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/services", label: "Services", icon: "services" },
  { href: "/case-studies", label: "Work", icon: "work" },
  { href: "/templates", label: "Templates", icon: "templates" },
  { href: "/blog", label: "Blog", icon: "blog" },
] as const;

function Icon({ name }: { name: string }) {
  if (name === "home") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.8 12 3l9 7.8v9.1a1.1 1.1 0 0 1-1.1 1.1H4.1A1.1 1.1 0 0 1 3 19.9Z"/><path d="M9 21v-7h6v7"/></svg>;
  if (name === "services") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/><circle cx="18" cy="18" r="2"/></svg>;
  if (name === "work") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M9 6V4h6v2M3 11h18"/></svg>;
  if (name === "templates") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>;
  if (name === "blog") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>;
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => setMoreOpen(false), [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {moreOpen && <button className="mobile-nav-backdrop" type="button" aria-label="Close mobile navigation" onClick={() => setMoreOpen(false)} />}
      <div className={`mobile-nav-more-panel${moreOpen ? " open" : ""}`} aria-hidden={!moreOpen}>
        <div className="mobile-nav-more-head"><strong>More</strong><button type="button" onClick={() => setMoreOpen(false)} aria-label="Close">×</button></div>
        <a href="/why-us">Why Us <span>→</span></a>
        <a href="/team">Our Team <span>→</span></a>
        <a className="mobile-nav-book" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call <span>↗</span></a>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {primaryItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return <a key={item.href} href={item.href} className={active ? "active" : undefined}><Icon name={item.icon} /><span>{item.label}</span></a>;
        })}
        <button type="button" className={moreOpen || pathname === "/why-us" || pathname.startsWith("/team") ? "active" : undefined} onClick={() => setMoreOpen((value) => !value)} aria-expanded={moreOpen}><Icon name="more" /><span>More</span></button>
      </nav>
    </>
  );
}
