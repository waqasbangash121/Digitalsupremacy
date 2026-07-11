import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import { getTemplates } from "@/lib/templates-db";
import "./page.css";

export const metadata: Metadata = {
  title: "Email Templates — Digital Supremacy",
  description: "Browse conversion-focused email and campaign templates from Digital Supremacy.",
};

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const templates = await getTemplates();
  const categories = [...new Set(templates.map((item) => item.category).filter(Boolean))];

  return (
    <div className="page page--templates">
      <div className="nav-wrap">
        <nav className="nav">
          <a href="/" className="logo"><img src="/image/logo.png" alt="Digital Supremacy" className="logo-img" /></a>
          <ul className="nav-links"><li><a href="/services">Services</a></li><li><a href="/case-studies">Case Studies</a></li><li><a href="/templates" className="active">Templates</a></li><li><a href="/why-us">Why Us</a></li><li><a href="/team">Our Team</a></li></ul>
          <a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a>
        </nav>
      </div>

      <main>
        <section className="templates-hero container">
          <p className="templates-label">Our Templates</p>
          <h1>Conversion-ready email design, built from real campaign experience.</h1>
          <p>Explore polished templates for launches, promotions, lifecycle flows, and retention campaigns. Each design is built to make the message clearer and the next action easier.</p>
          {categories.length > 0 && <div className="templates-categories">{categories.map((category) => <span key={category}>{category}</span>)}</div>}
        </section>

        <section className="templates-library container">
          <div className="templates-library-head"><div><p>Template library</p><h2>Browse the collection</h2></div><span>{templates.length} {templates.length === 1 ? "template" : "templates"}</span></div>

          {templates.length === 0 ? (
            <div className="templates-empty"><strong>Templates are coming soon.</strong><p>We are preparing a curated collection of campaign and flow designs.</p></div>
          ) : (
            <div className="templates-grid">
              {templates.map((template) => (
                <article className={`template-card ${template.is_featured ? "featured" : ""}`} key={template.id}>
                  <div className="template-image">
                    {template.is_featured && <span className="template-featured">Featured</span>}
                    {template.image_url ? <img src={template.image_url} alt={`${template.title} template`} /> : <div className="template-placeholder">DS</div>}
                  </div>
                  <div className="template-card-content">
                    <div className="template-category">{template.category || "Email Template"}</div>
                    <h2>{template.title}</h2>
                    {template.description && <p>{template.description}</p>}
                    <div className="template-actions">
                      {template.preview_url && <a href={template.preview_url} target="_blank" rel="noreferrer">Preview <span>↗</span></a>}
                      {template.download_url ? <a className="template-primary" href={template.download_url} target="_blank" rel="noreferrer">Get template</a> : <a className="template-primary" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Request access</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="templates-cta container"><div><p>Need something custom?</p><h2>We can build a template system around your brand, products, and campaign calendar.</h2></div><a href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a call</a></section>
      </main>
      <SiteFooter />
    </div>
  );
}
