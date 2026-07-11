"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/team", label: "Team", icon: "TM" },
  { href: "/admin/case-studies", label: "Case Studies", icon: "CS" },
  { href: "/admin/templates", label: "Templates", icon: "TP" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav>
      {links.map((link) => (
        <a className={pathname.startsWith(link.href) ? "active" : undefined} href={link.href} key={link.href}>
          <span>{link.icon}</span>{link.label}
        </a>
      ))}
      <a href="/" target="_blank" rel="noreferrer"><span>↗</span>View website</a>
    </nav>
  );
}
