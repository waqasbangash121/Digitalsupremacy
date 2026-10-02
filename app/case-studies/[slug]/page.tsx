import SiteHeader from "@/components/site-header";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import { getCaseStudyBySlug } from "@/lib/db";
import { withCaseStudyImages } from "@/lib/case-study-images";
import CaseStudyView from "../case-study-view";
import "../portfolio.css";
import "../detail.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item) return { title: "Case Study — Digital Supremacy" };
  return { title: `${item.title} — Digital Supremacy`, description: item.excerpt || `Read the ${item.title} case study from Digital Supremacy.` };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item) notFound();
  return (
    <div className="cs-portfolio cd-page">
      <Link className="cp-skip" href="#main">Skip to content</Link>
      <SiteHeader />
      <main id="main" className="cp-shell">
        <Link className="cd-back" href="/case-studies">← All case studies</Link>
        <CaseStudyView item={withCaseStudyImages(item)} standalone />
        <section className="cp-audit cp-section cd-audit">
          <div><p className="cp-badge"><span />Your next stage of growth</p><h2>Ready to build your own success story?</h2><p className="cp-description">Let’s identify the next growth opportunity in your email program and build a stronger retention system around your brand.</p><Link className="cd-more" href="/case-studies">Explore more client results <span aria-hidden="true">↗</span></Link></div>
          <aside className="cp-audit-card"><span className="cp-icon" aria-hidden="true">↗</span><h3>Your free retention audit</h3><p>A focused 15-minute conversation about your brand, your goals, and where email can work harder.</p><Link className="cp-button" href="https://calendly.com/addyawan57/15min">Book my free audit <span aria-hidden="true">↗</span></Link><small>No obligation. Just a useful conversation.</small></aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
