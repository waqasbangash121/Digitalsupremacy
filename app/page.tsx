import LegacyPageClient from "@/components/legacy-page-client";
import { getLegacyPage } from "@/lib/legacy-page";

export default function HomePage() {
  const page = getLegacyPage("index");

  if (!page) {
    throw new Error("Unable to load index.html from the project root.");
  }

  return <LegacyPageClient {...page} />;
}
