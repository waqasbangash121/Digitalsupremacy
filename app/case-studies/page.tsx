import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getCaseStudies } from "@/lib/db";
import { withCaseStudyImages } from "@/lib/case-study-images";
import CaseStudyPortfolio from "./case-study-portfolio";
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Case Studies — Digital Supremacy",
  description: "Real dashboards. Measurable growth. Explore the retention systems behind our ecommerce client results.",
};
export const dynamic = "force-dynamic";
const pillars = [
  ["01", "Deliverability & list health", "Build the foundation", "We audit list quality, sending reputation, and engagement. Clean segments and a healthy inbox create the foundation for every campaign that follows.", "Better inbox placement"],
  ["02", "Lifecycle automations", "Make every moment count", "From the first welcome to abandoned checkout and winback, we build behavioral flows that reach customers at the moments they are ready to act.", "Revenue beyond the next send"],
  ["03", "Campaigns & optimization", "Turn attention into growth", "Brand-led creative, thoughtful segmentation, and ongoing testing turn your campaign calendar into a consistent engine for repeat purchases.", "Continuous improvement"],
];
export default async function Page() {
  const items = await getCaseStudies();
  return <div className="cs-portfolio">
    <Link className="cp-skip" href="#main">Skip to content</Link>
    <SiteHeader />
    <main id="main" className="cp-shell">
      <section className="cp-hero">
        <p className="cp-badge"><span />Real results. Real case studies.</p>
        <h1>Turning Shopify email lists into <em>compounding revenue.</em></h1>
        <p className="cp-lead">Real dashboards. Measurable growth. See how we turn your existing audience into a retention system that keeps working.</p>
        <div className="cp-stats">{[["Client revenue generated", "$50M+", "Across our client portfolio"], ["Average revenue from email", "45%", "A channel built to perform"], ["Client ROI", "90%", "In as little as 60 days"], ["DTC brands", "50+", "Brands scaled. And counting."]].map(([label, value, detail]) => <div key={label}><p>{label}</p><strong>{value}</strong><span>{detail}</span></div>)}</div>
        <p className="cp-fine">Aggregated client results. Individual outcomes vary by brand and engagement.</p>
      </section>
      <CaseStudyPortfolio items={items.map(withCaseStudyImages)} />
      <section className="cp-protocol cp-section">
        <p className="cp-eyebrow">Engineered for repeat purchases</p>
        <h2>Our three-pillar retention<br />engineering process.</h2>
        <p className="cp-description">The system behind the numbers: a stronger foundation, more relevant customer journeys, and a steady rhythm of improvement.</p>
        <div className="cp-pillars">{pillars.map(([num, label, title, text, foot]) => <article key={num}><span className="cp-icon">{num}</span><p className="cp-eyebrow">{label}</p><h3>{title}</h3><p>{text}</p><div className="cp-pillar-foot">✓ {foot}</div></article>)}</div>
      </section>
      <section className="cp-comparison cp-section">
        <p className="cp-eyebrow">A more intentional approach</p>
        <h2>What changes when email<br />has a system behind it.</h2>
        <p className="cp-description">From isolated sends to a connected customer journey.</p>
        <div className="cp-table-wrap"><table><thead><tr><th>Retention capability</th><th>One-off email activity</th><th>A managed retention system</th></tr></thead><tbody>{[["Campaign strategy", "Send when there is a promotion", "A calendar built around customer behavior"], ["Customer journeys", "Generic messages to the whole list", "Segmented flows across the customer lifecycle"], ["Deliverability", "Review when performance drops", "Ongoing list hygiene and inbox monitoring"], ["Creative & testing", "Repeat the same templates", "Brand-led creative and continuous testing"], ["Performance", "Track individual sends", "Measure revenue, engagement, and repeat purchases"]].map(([label, before, after]) => <tr key={label}><th scope="row">{label}</th><td>{before}</td><td>{after}</td></tr>)}</tbody></table></div>
      </section>
      <section className="cp-audit cp-section" id="audit">
        <div><p className="cp-badge"><span />Your next stage of growth</p><h2>Ready to turn your email list into your most profitable growth asset?</h2><p className="cp-description">Let&apos;s find the opportunities already sitting in your account. Get a clear view of what to improve first, and how to build a stronger retention system.</p><ul className="cp-checks"><li>Review your campaigns, flows, and list health</li><li>Identify gaps in the customer journey</li><li>Leave with practical next steps for your brand</li></ul></div>
        <aside className="cp-audit-card"><span className="cp-icon">↗</span><h3>Your free retention audit</h3><p>A focused 15-minute conversation about your brand, your goals, and where email can work harder.</p><div className="cp-audit-step"><span>01</span>Walk us through your current setup</div><div className="cp-audit-step"><span>02</span>Explore your biggest opportunities</div><div className="cp-audit-step"><span>03</span>Map out your next steps</div><Link className="cp-button" href="https://calendly.com/addyawan57/15min">Book my free audit <span>↗</span></Link><small>No obligation. Just a useful conversation.</small></aside>
      </section>
    </main><SiteFooter />
  </div>;
}
