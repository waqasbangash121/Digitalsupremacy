import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import { getTemplateBySlug } from "@/lib/templates-db";
import "../page.css";
import "./page.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template) return { title: "Template — Digital Supremacy" };
  return {
    title: `${template.title} — Digital Supremacy`,
    description: template.description || `View the ${template.title} email template from Digital Supremacy.`,
  };
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template) notFound();

  return (
    <div className="page page--templates template-detail-page">
      <div className="nav-wrap">
        <nav className="nav">
          <a href="/" className="logo"><img src="/image/logo.png" alt="Digital Supremacy" className="logo-img" /></a>
          <ul className="nav-links"><li><a href="/services">Services</a></li><li><a href="/case-studies">Case Studies</a></li><li><a href="/templates" className="active">Templates</a></li><li><a href="/why-us">Why Us</a></li><li><a href="/team">Our Team</a></li></ul>
          <a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a>
        </nav>
      </div>

      <main className="container template-detail-main">
        <a className="template-back-link" href="/templates">← All templates</a>
        <section className="template-detail-hero">
          <div className="template-detail-copy">
            <p className="templates-label">{template.category || "Email Template"}</p>
            <h1>{template.title}</h1>
            {template.description && <p>{template.description}</p>}
            <div className="template-detail-actions">
              {template.preview_url && <a href={template.preview_url} target="_blank" rel="noreferrer">Open live preview <span>↗</span></a>}
              {template.download_url && <a className="template-primary" href={template.download_url} target="_blank" rel="noreferrer">Get template</a>}
            </div>
          </div>
        </section>

        <section className="template-detail-preview">
          {template.image_url ? <img src={template.image_url} alt={`${template.title} full template preview`} /> : <div className="template-detail-placeholder">Template preview coming soon.</div>}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}