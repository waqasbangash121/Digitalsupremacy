import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/db";
import "./page.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item) return { title: "Case Study — Digital Supremacy" };
  return {
    title: `${item.title} — Digital Supremacy`,
    description: item.excerpt || `Read the ${item.title} case study from Digital Supremacy.`,
  };
}

export default async function ManagedCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item) notFound();

  return (
    <div className="managed-case-page">
      <header className="managed-case-nav">
        <a href="/"><img src="/image/logo.png" alt="Digital Supremacy" /></a>
        <a href="/case-studies">All case studies</a>
      </header>

      <main>
        <section className="managed-case-hero">
          <div className="managed-case-kicker">{[item.industry, item.client_name].filter(Boolean).join(" · ") || "Case Study"}</div>
          <h1>{item.title}</h1>
          {item.excerpt && <p>{item.excerpt}</p>}
          {item.project_period && <div className="managed-case-period"><span>Project period</span><strong>{item.project_period}</strong></div>}
        </section>

        {item.cover_image_url && <div className="managed-case-cover"><img src={item.cover_image_url} alt={`${item.title} cover`} /></div>}

        {item.metrics.length > 0 && (
          <section className="managed-case-metrics">
            {item.metrics.map((metric, index) => <article key={`${metric.label}-${index}`}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}
          </section>
        )}

        <section className="managed-case-story">
          {item.challenge && <article><p>01 · The challenge</p><h2>Where the business started</h2><div>{item.challenge}</div></article>}
          {item.solution && <article><p>02 · What we did</p><h2>The strategy and execution</h2><div>{item.solution}</div></article>}
          {item.results && <article><p>03 · The results</p><h2>What changed</h2><div>{item.results}</div></article>}
        </section>

        <section className="managed-case-cta">
          <p>Ready to build a stronger retention channel?</p>
          <h2>Let’s find the next growth opportunity in your email program.</h2>
          <a href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a call</a>
        </section>
      </main>
    </div>
  );
}
