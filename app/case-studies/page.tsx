import type { Metadata } from "next";
import SiteInteractions from "@/components/site-interactions";
import { getCaseStudies } from "@/lib/db";
import CaseStudyView from "./case-study-view";
import "./page.css";

export const metadata: Metadata = {
  title: "Case Studies — Digital Supremacy",
  description: "See how Digital Supremacy builds email systems that drive measurable ecommerce growth.",
};
export const dynamic = "force-dynamic";

export default async function Page() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      <SiteInteractions />
      <div className="page page--case-studies">
        <div className="nav-wrap"><nav className="nav"><a href="/" className="logo"><img src="/image/logo.png" alt="Digital Supremacy" className="logo-img" /></a><ul className="nav-links"><li><a href="/services">Services</a></li><li><a href="/case-studies" className="active">Case Studies</a></li><li><a href="/why-us">Why Us</a></li><li><a href="/team">Our Team</a></li></ul><a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a></nav></div>
        <main>
          <div className="container"><section className="page-hero"><p className="page-label">Case Studies</p><h1>Proof your email can become one of your biggest revenue channels.</h1><p>We break down the work behind the numbers — what we did, why we did it, and what changed.</p></section></div>
          {caseStudies.map((item)=><div className="container" key={item.id}><CaseStudyView item={item} /></div>)}
          {caseStudies.length === 0 && <div className="container"><div className="cs-closing">New case studies are being prepared.</div></div>}
          <div className="container"><section className="cta-band"><div className="cta-inner"><h2>Want results like these?</h2><p>Book a free 15-minute call and we’ll show you what we would improve first.</p><a className="btn-primary" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a></div></section></div>
        </main>
      </div>
    </>
  );
}
