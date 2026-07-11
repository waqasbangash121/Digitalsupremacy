import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/db";
import CaseStudyView from "../case-study-view";
import "../page.css";
import "../database-case-studies.css";

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
    <div className="page page--case-studies">
      <div className="nav-wrap"><nav className="nav"><a href="/" className="logo"><img src="/image/logo.png" alt="Digital Supremacy" className="logo-img" /></a><ul className="nav-links"><li><a href="/services">Services</a></li><li><a href="/case-studies" className="active">Case Studies</a></li><li><a href="/why-us">Why Us</a></li><li><a href="/team">Our Team</a></li></ul><a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a></nav></div>
      <main><div className="container"><a className="case-back-link" href="/case-studies">← All case studies</a><CaseStudyView item={item} standalone /><section className="cta-band"><div className="cta-inner"><h2>Ready to build a stronger retention channel?</h2><p>Let’s identify the next growth opportunity in your email program.</p><a className="btn-primary" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a></div></section></div></main>
    </div>
  );
}
