"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";

type CatalogTemplate = {
  id: string; slug: string; title: string; category: string; description: string;
  image_url: string; preview_url: string; download_url: string; is_featured: boolean;
};

export default function TemplatesCatalog({ templates, children }: { templates: CatalogTemplate[]; children?: ReactNode }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All templates");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const categories = ["All templates", ...new Set(templates.map(item => item.category).filter(Boolean))];
  const filtered = templates.filter(item => (category === "All templates" || item.category === category) && (!featuredOnly || item.is_featured) && `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(query.toLowerCase().trim()));

  return <>
    <div className="vault-search">
      <div className="vault-search-row">
        <label className="vault-search-input"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6"/><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.6"/></svg><input aria-label="Search templates" placeholder="Search by flow, industry, or occasion…" value={query} onChange={event => setQuery(event.target.value)}/></label>
        <button className={`vault-button ${featuredOnly ? "" : "vault-button-secondary"}`} onClick={() => setFeaturedOnly(value => !value)} aria-pressed={featuredOnly}>◇ Featured only</button>
      </div>
      <div className="vault-filters" aria-label="Template categories">{categories.map(value => <button key={value} className={category === value ? "selected" : ""} aria-pressed={category === value} onClick={() => setCategory(value)}>{value} <span>({templates.filter(item => value === "All templates" || item.category === value).length})</span></button>)}</div>
    </div>
    <div className="vault-proof">{["Built for DTC brands", "Retention-first strategy", "Responsive email design", "Preview & export"].map((value, index) => <span key={value}><i aria-hidden="true">{["✓", "↗", "▣", "↓"][index]}</i>{value}</span>)}</div>
    {children}
    <section className="vault-library" id="catalog" aria-labelledby="catalog-title">
      <div className="vault-section-heading"><div><p className="vault-eyebrow">Performance-driven assets</p><h2 id="catalog-title">Direct Response Master Catalog</h2></div><p>Explore campaign and lifecycle designs built to turn attention into action. Find your next welcome, recovery, or retention email.</p></div>
      <p className="vault-result-count" role="status">{filtered.length} {filtered.length === 1 ? "template" : "templates"}{category !== "All templates" ? ` in ${category}` : " in the collection"}</p>
      {filtered.length > 0 ? <div className="vault-grid">{filtered.map(template => <article className="vault-card" key={template.id}>
        <a className="vault-card-image" href={`/templates/${template.slug}`} aria-label={`Inspect ${template.title}`}>{template.image_url ? <Image src={template.image_url} alt={`${template.title} email design`} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" unoptimized/> : <div className="vault-placeholder"><span>DS / TEMPLATE KIT</span><strong>{template.title}</strong><div/><div/><div/><span>Designed for your next conversion ↗</span></div>}{template.is_featured && <span className="vault-featured">Featured kit</span>}</a>
        <div className="vault-card-content"><p className="vault-eyebrow">{template.category || "Email template"}</p><h3><a href={`/templates/${template.slug}`}>{template.title}</a></h3><p className="vault-card-description">{template.description || "Explore this conversion-focused email design and make it your own."}</p><div className="vault-card-meta"><span>Responsive design</span><span>{template.download_url ? "Export available" : "Email inspiration"}</span></div><div className="vault-card-actions"><a className="vault-button vault-button-secondary" href={template.preview_url || `/templates/${template.slug}`} target={template.preview_url ? "_blank" : undefined} rel={template.preview_url ? "noreferrer" : undefined}>Inspect copy ↗</a><a className="vault-button" href={template.download_url || `/templates/${template.slug}`} target={template.download_url ? "_blank" : undefined} rel={template.download_url ? "noreferrer" : undefined}>↓ Use kit</a></div></div>
      </article>)}</div> : <div className="vault-empty"><h3>{templates.length ? "No matching templates" : "The collection is coming soon"}</h3><p>{templates.length ? "Try another keyword or category to find your next design." : "We’re preparing our campaign and flow designs. Get a free audit to find out what your brand needs first."}</p>{templates.length ? <button className="vault-button" onClick={() => { setQuery(""); setCategory("All templates"); setFeaturedOnly(false); }}>Reset filters</button> : <a className="vault-button" href="https://calendly.com/addyawan57/15min">Get my free audit ↗</a>}</div>}
    </section>
  </>;
}
