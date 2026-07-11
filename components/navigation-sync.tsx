"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const requiredLinks = [
  { href: "/templates", label: "Templates" },
  { href: "/blog", label: "Blog" },
] as const;

export default function NavigationSync() {
  const pathname = usePathname();

  useEffect(() => {
    const syncNavigation = () => {
      document.querySelectorAll<HTMLUListElement>(".nav-links").forEach((list) => {
        requiredLinks.forEach(({ href, label }) => {
          let link = list.querySelector<HTMLAnchorElement>(`a[href="${href}"]`);
          if (!link) {
            const item = document.createElement("li");
            link = document.createElement("a");
            link.href = href;
            link.textContent = label;
            item.appendChild(link);

            const caseStudies = list.querySelector('a[href="/case-studies"]')?.closest("li");
            const templates = list.querySelector('a[href="/templates"]')?.closest("li");
            const anchor = href === "/templates" ? caseStudies : templates ?? caseStudies;
            if (anchor?.nextSibling) list.insertBefore(item, anchor.nextSibling);
            else list.appendChild(item);
          }

          const active = pathname === href || pathname.startsWith(`${href}/`);
          link.classList.toggle("active", active);
        });
      });
    };

    syncNavigation();
    const observer = new MutationObserver(syncNavigation);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
