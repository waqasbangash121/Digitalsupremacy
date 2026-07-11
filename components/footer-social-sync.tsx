"use client";

import { useEffect } from "react";

type Settings = {
  linkedin_url: string;
  instagram_url: string;
  youtube_url: string;
};

const labels: Array<[keyof Settings, string]> = [
  ["linkedin_url", "LinkedIn"],
  ["instagram_url", "Instagram"],
  ["youtube_url", "YouTube"],
];

export default function FooterSocialSync() {
  useEffect(() => {
    let cancelled = false;

    async function sync() {
      try {
        const response = await fetch("/api/site-settings", { cache: "no-store" });
        if (!response.ok) return;
        const settings = (await response.json()) as Settings;
        if (cancelled) return;

        const titles = Array.from(document.querySelectorAll<HTMLElement>(".footer-col-title"));
        const socialTitle = titles.find((node) => node.textContent?.trim() === "Social");
        const links = socialTitle?.parentElement?.querySelectorAll<HTMLAnchorElement>(".footer-col-links a");
        if (!links) return;

        labels.forEach(([key, label], index) => {
          const link = links[index];
          if (!link) return;
          const url = settings[key]?.trim();
          link.textContent = label;
          if (url) {
            link.href = url;
            link.target = "_blank";
            link.rel = "noreferrer";
            link.closest("li")?.removeAttribute("hidden");
          } else {
            link.closest("li")?.setAttribute("hidden", "");
          }
        });
      } catch {
        // Keep the existing footer unchanged if settings cannot be loaded.
      }
    }

    sync();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
