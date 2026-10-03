"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { PortfolioBrand, PortfolioProject } from "./portfolio-data";

export function EmailPreview({ project, priority = false }: { project: PortfolioProject; priority?: boolean }) {
  return <div className="pf-email pf-email-image"><Image src={project.src} alt={`${project.title} email design`} width={project.width} height={project.height} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 600px" priority={priority} /></div>;
}

export default function PortfolioGallery({ brands }: { brands: PortfolioBrand[] }) {
  const [brandId, setBrandId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All designs");
  const [limit, setLimit] = useState(6);
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const brand = brands.find(item => item.id === brandId);
  const visibleBrands = brands.filter(item => item.name.toLowerCase().includes(query.trim().toLowerCase()));
  const categories = ["All designs", ...new Set(brand?.projects.map(item => item.type) ?? [])];
  const filtered = brand?.projects.filter(item => category === "All designs" || item.type === category) ?? [];
  function open(project: PortfolioProject) { setSelected(project); dialog.current?.showModal(); }
  function changeBrand(id: string | null) { setBrandId(id); setCategory("All designs"); setLimit(6); }
  function navigate(direction: number) {
    const index = filtered.findIndex(item => item.id === selected?.id);
    setSelected(filtered[(index + direction + filtered.length) % filtered.length]);
    dialog.current?.scrollTo({ top: 0 });
  }

  return <section className="pf-gallery" id="projects" aria-labelledby="projects-title">
    <div className="pf-section-heading"><div><p className="pf-eyebrow">The creative collection</p><h2 id="projects-title">Different brands.<br />Distinct creative worlds.</h2></div><p>Explore by brand. Discover campaigns, welcome sequences, and the details that make each email feel like them.</p></div>
    <div className="pf-library-bar"><p>{brands.length} brands <span> / </span>{brands.reduce((sum, item) => sum + item.projects.length, 0)} designs</p><label className="pf-search">Search brands<input type="search" value={query} placeholder="Find a brand…" onChange={event => { setQuery(event.target.value); changeBrand(null); }} /></label></div>
    {!brand ? <><div className="pf-brand-grid">{visibleBrands.map((item, index) => <button className="pf-brand-card" key={item.id} onClick={() => changeBrand(item.id)}><div className="pf-brand-art"><div className="pf-brand-monogram" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div><div className="pf-brand-stack">{item.projects.slice(0, 3).map(project => <EmailPreview key={project.id} project={project} />)}</div><span className="pf-brand-open">Explore collection ↗</span></div><div className="pf-brand-info"><div><h3>{item.name}</h3><p>Email campaigns & lifecycle creative</p></div><span>{item.projects.length} designs ↗</span></div></button>)}</div>{!visibleBrands.length && <p className="pf-empty" role="status">No brands match “{query}”. Try another name.</p>}</> : <>
      <div className="pf-collection-head"><button className="pf-back" onClick={() => changeBrand(null)}>← All brands</button><div><h3>{brand.name}</h3><p>{brand.projects.length} designs in this collection</p></div><label className="pf-brand-select">Switch brand<select value={brand.id} onChange={event => changeBrand(event.target.value)}>{brands.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label></div>
      <div className="pf-filters" aria-label="Filter by email type">{categories.map(item => <button key={item} aria-pressed={category === item} className={category === item ? "selected" : ""} onClick={() => { setCategory(item); setLimit(6); }}>{item}</button>)}</div>
      <p className="pf-gallery-caption" role="status">Showing {Math.min(limit, filtered.length)} of {filtered.length} designs · {brand.name}</p>
      <div className="pf-project-grid">{filtered.slice(0, limit).map(project => <article className="pf-project" key={project.id}><button className="pf-project-preview" onClick={() => open(project)} aria-label={`View ${brand.name} — ${project.title}`}><span className="pf-project-tag">{project.type}<span>{brand.name}</span></span><EmailPreview project={project} /></button><div className="pf-project-content"><p className="pf-eyebrow">{project.type}</p><h3>{project.title}</h3><button className="pf-inspect" onClick={() => open(project)}>View full design <span>↗</span></button></div></article>)}</div>
      {limit < filtered.length && <button className="pf-load-more" onClick={() => setLimit(value => value + 6)}>Show more designs <span>↓</span></button>}
    </>}
    <dialog ref={dialog} className="pf-dialog" onClose={() => setSelected(null)} onKeyDown={event => { if (event.key === "ArrowLeft") navigate(-1); if (event.key === "ArrowRight") navigate(1); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-labelledby="creative-title"><div className="pf-dialog-head"><div><p className="pf-eyebrow">{brand?.name} · {selected?.type}</p><h2 id="creative-title">{selected?.title}</h2></div><button onClick={() => dialog.current?.close()} aria-label="Close creative preview">×</button></div>{selected && <><div className="pf-preview-navigation"><button onClick={() => navigate(-1)} aria-label="Previous design">← Previous</button><span aria-live="polite">{filtered.findIndex(item => item.id === selected.id) + 1} / {filtered.length}</span><button onClick={() => navigate(1)} aria-label="Next design">Next →</button></div><EmailPreview project={selected} /></>}</dialog>
  </section>;
}
