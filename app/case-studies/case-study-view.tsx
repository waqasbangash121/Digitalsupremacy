import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/db";

export default function CaseStudyView({ item, standalone = false }: { item: CaseStudy; standalone?: boolean }) {
  const sections = [
    ...(item.challenge || item.solution ? [["situation", "The situation"]] : []),
    ...(item.phases.length ? [["approach", "The approach"]] : []),
    ...(item.results || item.images.length ? [["results", "The results"]] : []),
  ];
  return <article className="cd-story">
    <header className="cd-hero">
      <p className="cp-badge"><span />Client success story</p>
      <p className="cp-eyebrow cd-client">{[item.industry, item.client_name].filter(Boolean).join(" · ") || "Case study"}</p>
      {standalone ? <h1>{item.title}</h1> : <h2><Link href={`/case-studies/${item.slug}`}>{item.title}</Link></h2>}
      {item.excerpt && <p className="cd-lead">{item.excerpt}</p>}
      {item.project_period && <p className="cd-period"><span>Project period</span><strong>{item.project_period}</strong></p>}
    </header>
    {item.metrics.length > 0 && <dl className="cd-metrics">{item.metrics.map((metric, index) => <div key={`${metric.label}-${index}`}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>}
    {item.cover_image_url && <figure className="cd-evidence cd-cover"><figcaption><span className="cp-icon" aria-hidden="true">↗</span>Project overview</figcaption><Image src={item.cover_image_url} alt={`${item.title} overview`} width={1400} height={900} sizes="(max-width: 700px) 100vw, 1160px" unoptimized priority /></figure>}
    {sections.length > 0 && <nav className="cd-contents" aria-label="Case study sections"><span>Inside the case study</span>{sections.map(([id, label]) => <Link key={id} href={`#${id}`}>{label} <span aria-hidden="true">↓</span></Link>)}</nav>}
    {(item.challenge || item.solution) && <section className="cd-section" id="situation"><div className="cp-section-heading"><div><p className="cp-eyebrow">The starting point</p><h2>A clearer path to growth.</h2></div></div><div className="cd-situation">{item.challenge && <div className="cd-panel"><p className="cp-eyebrow">Where they were</p><h3>The challenge</h3><p className="cd-body">{item.challenge}</p></div>}{item.solution && <div className="cd-panel cd-panel-accent"><p className="cp-eyebrow">What needed to change</p><h3>The solution</h3><p className="cd-body">{item.solution}</p></div>}</div></section>}
    {item.phases.length > 0 && <section className="cd-section" id="approach"><p className="cp-eyebrow">The work behind the growth</p><h2>How we built the system.</h2><ol className="cd-phases">{item.phases.map((phase, index) => <li key={`${phase.title}-${index}`}><span className="cp-icon" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{phase.title}</h3><p className="cd-body">{phase.description}</p></div></li>)}</ol></section>}
    {(item.results || item.images.length > 0) && <section className="cd-section" id="results"><p className="cp-eyebrow">The impact</p><h2>The results. The evidence.</h2>{item.results && <div className="cd-result"><span className="cp-icon" aria-hidden="true">↗</span><p className="cd-body">{item.results}</p></div>}<div className="cd-gallery">{item.images.map((image, index) => <figure className="cd-evidence" key={`${image.url}-${index}`}><Image src={image.url} alt={image.caption || `${item.title} results ${index + 1}`} width={1400} height={900} sizes="(max-width: 700px) 100vw, 1160px" unoptimized />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div></section>}
    {item.closing && <aside className="cd-closing"><p className="cp-eyebrow">Looking ahead</p><p>{item.closing}</p></aside>}
  </article>;
}
