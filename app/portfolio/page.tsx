import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PortfolioGallery from "./portfolio-gallery";
import { getPortfolioBrands } from "./portfolio-data";
import "./page.css";

export const metadata: Metadata = {
  title: "Portfolio — Digital Supremacy",
  description: "Explore conversion-focused email creative, campaigns, and lifecycle flows for DTC brands from Digital Supremacy.",
};

const auditUrl = "https://calendly.com/addyawan57/15min";
const principles = [
  ["01", "Mobile-first hierarchy", "One clear story, a readable layout, and a call to action that’s easy to find. Built for the way your customers actually read."],
  ["02", "Email-ready design", "Thoughtful layouts that account for email client limitations, accessible text, and responsive behaviour."],
  ["03", "Copy with a purpose", "Benefit-led headlines, relevant objections, and a reason to take the next step. Every word earns its place."],
  ["04", "Connected lifecycle", "Campaigns and flows that work together, from the first introduction to the next purchase."],
];

export default async function PortfolioPage() {
  const brands = await getPortfolioBrands();
  return <div className="portfolio-page">
    <Link className="pf-skip" href="#main">Skip to content</Link>
    <SiteHeader />
    <main id="main">
      <section className="pf-hero pf-shell">
        <p className="pf-badge"><span />Retention strategy. Conversion-focused creative.</p>
        <h1>An inbox full of<br /><em>brand personality.</em></h1>
        <p>Explore the email creative behind the brands. From a first hello to the next launch, every collection tells a different story.</p>
        <a className="pf-button pf-hero-link" href="#projects">Explore the collections <span>↓</span></a>
      </section>
      <div className="pf-shell">
        <PortfolioGallery brands={brands} />
      </div>
      <section className="pf-standards">
        <div className="pf-shell"><div className="pf-centered"><p className="pf-eyebrow">Designed for the customer</p><h2>The Digital Supremacy standard:<br />creative with a job to do.</h2><p>A beautiful email is the beginning. Clear messaging, thoughtful execution, and a connected journey make it work harder.</p></div><div className="pf-principles">{principles.map(([number, title, copy]) => <article key={number}><span>{number}</span><p className="pf-eyebrow">Design principle</p><h3>{title}</h3><p>{copy}</p><div>Built into every brief <span>↗</span></div></article>)}</div></div>
      </section>
      <section className="pf-shell pf-comparison"><div className="pf-centered"><p className="pf-eyebrow">The difference is in the details</p><h2>From generic sends<br />to purposeful email creative.</h2><p>Give every touchpoint a role in your customer’s journey.</p></div><div className="pf-comparison-grid"><article><p className="pf-eyebrow">The familiar approach</p><h3>Design first. Strategy later.</h3><ul><li>The same promotional layout for every audience.</li><li>Competing messages and too many calls to action.</li><li>Product features without a clear customer benefit.</li><li>Isolated campaigns with no follow-up journey.</li></ul><p>A send on the calendar.</p></article><article><p className="pf-eyebrow">The Digital Supremacy approach</p><h3>Every email has a purpose.</h3><ul><li>Creative shaped around customer intent and lifecycle stage.</li><li>One focused message with a clear next step.</li><li>Benefit-led copy that answers real objections.</li><li>Campaigns connected to a thoughtful retention system.</li></ul><p>A step toward the next purchase.</p></article></div></section>
      <section className="pf-shell pf-cta-section"><aside className="pf-cta-aside"><p className="pf-eyebrow">More than a pretty inbox</p><h3>Your brand.<br />Our next great brief.</h3><p>Bring your products, your goals, and your current emails. We’ll help you see what your retention system could do next.</p><Link href="/case-studies">Explore real client results ↗</Link></aside><div className="pf-cta"><p className="pf-eyebrow">Let’s build your next chapter</p><h2>Want to rethink your<br />brand’s email creative?</h2><p>Book a free creative audit. We’ll look at your current setup and talk through the opportunities in your campaigns and flows.</p><div className="pf-audit-points"><span>✓ Campaign & flow review</span><span>✓ Creative opportunities</span><span>✓ Clear next steps</span><span>✓ Built around your brand</span></div><Link className="pf-button" href={auditUrl}>Get my free creative audit <span>↗</span></Link><small>A short conversation. Practical direction.</small></div></section>
    </main>
    <SiteFooter />
  </div>;
}
