import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";
import { getTemplates } from "@/lib/templates-db";
import TemplatesCatalog from "./templates-catalog";
import "./page.css";

export const metadata: Metadata = {
  title: "Email & SMS Template Vault — Digital Supremacy",
  description: "Explore conversion-focused email templates, lifecycle flows, and retention campaign designs for DTC ecommerce brands.",
};
export const dynamic = "force-dynamic";

const sequence = [
  ["Welcome & introduce your brand", "Immediately · Give subscribers a reason to stay"],
  ["Tell the story behind the product", "Day 2 · Build trust and answer objections"],
  ["Show the benefits that matter", "Day 4 · Bring products and social proof together"],
  ["Follow up with a timely reminder", "Day 7 · Make the next step easy"],
];
const kit = [
  ["✧", "Brand-ready layouts", "Clear hierarchy, thoughtful spacing, and product-led layouts that adapt to your brand.", "Make it your own"],
  ["▣", "Mobile-first design", "Readable copy and clear calls to action built for the way your customers actually browse.", "Designed for every screen"],
  ["≋", "Conversion-focused copy", "Benefit-led messaging, strong hooks, and a clear next step throughout the customer journey.", "Every word has a purpose"],
  ["〈〉", "Lifecycle flow inspiration", "Welcome, cart recovery, replenishment, and winback ideas to build a stronger retention system.", "Built around your customer"],
];

export default async function TemplatesPage() {
  const templates = await getTemplates();
  const catalog = templates.map(({ id, slug, title, category, description, image_url, preview_url, download_url, is_featured }) => ({ id, slug, title, category, description, image_url, preview_url, download_url, is_featured }));
  const featured = templates.find(template => template.is_featured);
  return <div className="page page--templates">
    <SiteHeader/>
    <main className="vault-shell" id="main">
      <section className="vault-hero"><p className="vault-badge"><span/>The retention vault · Built for DTC brands</p><h1>Email & SMS templates<br/>built to turn <em>attention</em><br/>into your next sale.</h1><p>Conversion-focused designs, thoughtful lifecycle flows, and persuasive copy. The building blocks of a higher-performing retention system.</p></section>
      <TemplatesCatalog templates={catalog}>
      <section className="vault-spotlight" aria-labelledby="spotlight-title"><div><p className="vault-badge"><span/>Flagship retention engine</p><h2 id="spotlight-title">The High-AOV Welcome & Introduction Architecture</h2><p>Make a strong first impression with a welcome series that introduces your brand, answers objections, and guides subscribers toward their first purchase.</p><div className="vault-stats"><div><span>Client email revenue</span><strong>45%</strong><small>Average across clients</small></div><div><span>Generated for clients</span><strong>$50M+</strong><small>Retention that delivers</small></div><div><span>DTC brands</span><strong>50+</strong><small>And counting</small></div></div><div className="vault-spotlight-actions"><a className="vault-button" href="https://calendly.com/addyawan57/15min">Build my welcome flow ↗</a><a className="vault-button vault-button-secondary" href={featured ? `/templates/${featured.slug}` : "#catalog"}>{featured ? "Preview featured kit" : "Explore the catalog"} →</a></div></div><aside className="vault-sequence"><div className="vault-sequence-heading"><span>Lifecycle sequence logic</span><span>Welcome flow</span></div>{sequence.map(([title, description], index) => <div className="vault-sequence-step" key={title}><span>{index + 1}</span><div><strong>{title}</strong><p>{description}</p></div><i aria-hidden="true">{index === 3 ? "✓" : "↓"}</i></div>)}<p className="vault-sequence-note">A connected journey. One clear next step at a time.</p></aside></section>
      </TemplatesCatalog>
      <section className="vault-kit" aria-labelledby="kit-title"><div className="vault-centered"><p className="vault-eyebrow">Engineered for better retention</p><h2 id="kit-title">What’s Inside Every Digital Supremacy Kit</h2><p>More than a good-looking email. A thoughtful foundation for your customer journey.</p></div><div className="vault-kit-grid">{kit.map(([icon, title, text, foot]) => <article key={title}><span className="vault-kit-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{text}</p><small>{foot}</small></article>)}</div></section>
      <section className="vault-audit" aria-labelledby="audit-title"><div><p className="vault-badge"><span/>Free retention audit</p><h2 id="audit-title">Want Our Team To<br/>Implement These In<br/>Your Account?</h2><p>Let’s look at your store, your customer journey, and your existing email setup. We’ll show you what to fix first and where your next opportunity sits.</p><div className="vault-team-proof"><div><Image src="/reviews/eric-jamal.png" alt="" width={30} height={30}/><Image src="/reviews/ruma.png" alt="" width={30} height={30}/><Image src="/reviews/robert.png" alt="" width={30} height={30}/></div><span><strong>Trusted by 50+ DTC brands</strong><small>A dedicated strategist. A clear plan.</small></span></div></div><div className="vault-audit-panel"><p className="vault-eyebrow">Your next step</p><h3>A fresh perspective on your retention system.</h3><ol><li>Share your store and current goals</li><li>Walk through your email setup</li><li>Get a clear plan for what to improve</li></ol><a className="vault-button" href="https://calendly.com/addyawan57/15min">Claim my free 15-minute audit ↗</a><small>No pressure. Just a useful conversation.</small></div></section>
    </main><SiteFooter/>
  </div>;
}
