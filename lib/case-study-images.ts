import type { CaseStudy } from "./db";

// Original evidence recovered from the legacy case-studies page.
const legacyImages: Record<string, CaseStudy["images"]> = {
  "wellness": [
    {
      "url": "/case-studies/wellness-1.png",
      "caption": "Klaviyo dashboard — Conversion Summary (Nov 2025 – Apr 2026)"
    },
    {
      "url": "/case-studies/wellness-2.png",
      "caption": "Top performing metrics"
    },
    {
      "url": "/case-studies/wellness-3.png",
      "caption": "Email deliverability — 771,422 total recipients"
    }
  ],
  "full-funnel": [
    {
      "url": "/case-studies/full-funnel-1.png",
      "caption": "Klaviyo Business Review — Growth overview (Dec 2025 – Apr 2026)"
    },
    {
      "url": "/case-studies/full-funnel-2.png",
      "caption": "Campaign performance summary"
    },
    {
      "url": "/case-studies/full-funnel-3.png",
      "caption": "Flow performance summary"
    },
    {
      "url": "/case-studies/full-funnel-4.png",
      "caption": "Deliverability score — Good (75)"
    }
  ]
};

export function withCaseStudyImages(item: CaseStudy): CaseStudy {
  if (item.images.length || !legacyImages[item.slug]) return item;
  return { ...item, images: legacyImages[item.slug] };
}
