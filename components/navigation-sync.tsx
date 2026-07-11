"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavigationSync() {
  const pathname = usePathname();

  useEffect(() => {
    const syncNavigation = () => {
      document.querySelectorAll<HTMLUListElement>(".nav-links").forEach((list) => {
        if (list.querySelector('a[href="/templates"]')) return;

        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = "/templates";
        link.textContent = "Templates";
        if (pathname === "/templates" || pathname.startsWith("/templates/")) link.className = "active";
        item.appendChild(link);

        const caseStudies = list.querySelector('a[href="/case-studies"]')?.closest("li");
        if (caseStudies?.nextSibling) {
          list.insertBefore(item, caseStudies.nextSibling);
        } else if (caseStudies) {
          list.appendChild(item);
        } else {
          list.appendChild(item);
        }
      });
    };

    syncNavigation();
    const observer = new MutationObserver(syncNavigation);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
