"use client";

import { useEffect } from "react";

const channels = [
  ["linkedin", "LinkedIn"],
  ["instagram", "Instagram"],
  ["youtube", "YouTube"],
  ["facebook", "Facebook"],
  ["twitter", "X / Twitter"],
  ["tiktok", "TikTok"],
] as const;

type Settings = Record<`${(typeof channels)[number][0]}_url`, string> &
  Record<`${(typeof channels)[number][0]}_enabled`, boolean>;

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
        const list = socialTitle?.parentElement?.querySelector<HTMLUListElement>(".footer-col-links");
        if (!list) return;

        list.innerHTML = "";
        channels.forEach(([key, label]) => {
          const url = settings[`${key}_url`]?.trim();
          const enabled = settings[`${key}_enabled`];
          if (!enabled || !url) return;

          const item = document.createElement("li");
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.rel = "noreferrer";
          link.textContent = label;
          item.appendChild(link);
          list.appendChild(item);
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
