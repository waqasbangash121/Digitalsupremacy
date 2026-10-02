import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import "@/app/services/service-detail.css";

export function ServiceHero({ label, title, description, social = false }: { label: string; title: string; description: string; social?: boolean }) {
  return <section className="sd-hero"><div className="sd-container sd-hero-grid">
    <header className="sd-hero-copy">
      <p className="sd-eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="sd-lead">{description}</p>
      <div className="sd-actions"><Link className="sd-button" href="https://calendly.com/addyawan57/15min">Book a free call ↗</Link><a className="sd-button sd-button-secondary" href="#capabilities">Explore capabilities ↓</a></div>
      <p className="sd-hero-caption"><span aria-hidden="true">✓</span> {social ? "Social strategy · Content planning · Community management" : "Klaviyo · Omnisend · Shopify"}</p>
    </header>
    {social ? <aside className="sd-social-preview" aria-label="Social media marketing approach">
      <p className="sd-eyebrow">Social Media Marketing</p><h2>A clear direction<br />for your brand.</h2>
      <div className="sd-social-grid">{["Social Strategy", "Content & Campaigns", "Community Management", "Reporting & Optimisation"].map((item, index) => <div key={item}><span aria-hidden="true">0{index + 1} ↗</span><strong>{item}</strong></div>)}</div>
      <p className="sd-preview-foot">Turn attention into relationships.</p>
    </aside> : <aside className="sd-result-preview" aria-label="Client email marketing results">
      <div className="sd-preview-top"><p className="sd-eyebrow">Email revenue</p><span>Hair & Beauty</span></div>
      <strong className="sd-result-number">$696K</strong><p className="sd-result-period">Nov 2025 – Apr 2026</p>
      <Image src="/results/client-1.jpg" alt="Hair and beauty client Klaviyo revenue dashboard" width={900} height={400} priority />
      <Link className="sd-preview-foot" href="/case-studies">Real Klaviyo dashboards. Real results. <span>↗</span></Link>
    </aside>}
  </div></section>;
}

export function ServiceCapabilities({ label, children }: { label: string; children: ReactNode }) {
  return <section className="sd-capabilities" id="capabilities"><div className="sd-container"><div className="sd-section-heading"><p className="sd-eyebrow">What we do</p><h2>{label}</h2></div>{children}</div></section>;
}

export function ServiceClosing({ social = false }: { social?: boolean }) {
  const steps = social ? [
    ["Social Strategy", "Build a social presence around your audience, your positioning, and your business goals."],
    ["Content & Campaigns", "Bring your brand to life with thoughtful content and coordinated campaigns across your social channels."],
    ["Reporting & Optimisation", "Use performance insights to refine your content, strengthen engagement, and guide your next steps."],
  ] : [
    ["Discovery & Audit", "We deep-dive your existing setup, audience, and goals then map out a strategy built around your brand."],
    ["Build & Launch", "Our team designs, writes, and deploys your campaigns and automations with speed and precision."],
    ["Optimise & Scale", "We analyse every send, run tests, and push performance higher month after month."],
  ];
  const included = social ? ["Content calendar planning", "Social copy and publishing", "Comment and message management", "Audience engagement", "Channel performance reporting", "Ongoing optimisation"] : ["Full account setup", "Flow builds and maintenance", "Campaign execution", "Segmentation", "Analytics and reporting", "A/B testing"];
  return <>
    <section className="sd-process sd-container"><div className="sd-section-heading sd-centered"><p className="sd-eyebrow">How it works</p><h2>{social ? "A consistent presence. A clear direction." : "From day one to done deal."}</h2></div><div className="sd-process-grid">{steps.map(([title, text], index) => <article key={title}><span className="sd-eyebrow">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="sd-included"><div className="sd-container"><div className="sd-section-heading"><p className="sd-eyebrow">Working together</p><h2>{social ? "Bring your brand to life." : "We manage the system."}</h2></div><div className="sd-included-grid">{included.map(item => <div key={item}><span aria-hidden="true">✓</span><h3>{item}</h3></div>)}</div></div></section>
    <section className="sd-container sd-cta-wrap"><div className="sd-cta"><p className="sd-eyebrow">{social ? "Social Media Marketing" : "Email Marketing"}</p><h2>{social ? "A brand your audience wants to follow." : "Make email your most reliable revenue channel."}</h2><p>{social ? "Build a consistent presence with a clear strategy, thoughtful content, and conversations that bring your audience closer." : "Every capability is designed to compound — strategy informs flows, flows support campaigns, and everything works together to grow your revenue."}</p><Link className="sd-button" href="https://calendly.com/addyawan57/15min">Book a free call ↗</Link></div></section>
  </>;
}
