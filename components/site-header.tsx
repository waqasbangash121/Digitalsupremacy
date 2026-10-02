"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesDropdown from "./services-dropdown";
import "./site-header.css";

const links = [
  ["/case-studies", "Case Studies"],
  ["/templates", "Templates"],
  ["/reviews", "Reviews"],
  ["/why-us", "Why Us"],
  ["/team", "Our Team"],
] as const;

export default function SiteHeader() {
  const pathname = usePathname();

  return <header className="site-header">
    <nav className="site-header-nav" aria-label="Main navigation">
      <Link className="site-header-logo" href="/" aria-label="Digital Supremacy home">
        <Image src="/image/logo.png" width={232} height={55} alt="Digital Supremacy" priority />
      </Link>
      <ul className="nav-links site-header-links">
        <li><ServicesDropdown /></li>
        {links.map(([href, label]) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return <li key={href}><Link href={href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>{label}</Link></li>;
        })}
      </ul>
      <Link className="site-header-cta" href="https://calendly.com/addyawan57/15min">
        Get my audit
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </nav>
  </header>;
}
