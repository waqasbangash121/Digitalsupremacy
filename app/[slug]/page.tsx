import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LegacyPageClient from "@/components/legacy-page-client";
import { getLegacyPage } from "@/lib/legacy-page";

type LegacyRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: LegacyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegacyPage(slug);

  return {
    title: page?.title ?? "Digital Supremacy",
  };
}

export default async function LegacyRoute({ params }: LegacyRouteProps) {
  const { slug } = await params;
  const page = getLegacyPage(slug);

  if (!page) {
    notFound();
  }

  return <LegacyPageClient {...page} />;
}
