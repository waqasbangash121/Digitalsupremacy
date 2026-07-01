import type { Metadata } from "next";
import "./page.css";

import SiteInteractions from "@/components/site-interactions";

export const metadata: Metadata = {
  title: "Why Us — Digital Supremacy",
  description: "Digital Supremacy",
};


export default function Page() {
  return (
    <>
      <SiteInteractions />
      <div className="page page--why-us">
      
<div className="nav-wrap">
  <nav className="nav">
<a href="/" className="logo">
    <img src="image/logo.png" alt="Digital Supremacy Logo" className="logo-img" />
</a>
            <ul className="nav-links">
      <li><a href="/services">Services</a></li>
      <li><a href="/case-studies">Case Studies</a></li>
      <li><a href="/why-us" className="active">Why Us</a></li>
      <li><a href="/team">Our Team</a></li>
    </ul>
    <a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank">Book a Call</a>
  </nav>
</div>


<div className="container">
  <section className="hero">
    <p className="hero-label">Why Us</p>
    <h1>Stop treating email<br /><span className="dim">like an afterthought.</span></h1>
    <p className="hero-sub">Done right, email can become one of your biggest revenue channels.</p>
  </section>
</div>


<div className="container">
  <section className="video-section">
    <div className="video-wrap" id="videoWrap">
      <div className="video-placeholder" id="videoPlaceholder">
        <div className="video-play-btn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <p className="video-label">Watch — how we turn email into a consistent revenue channel</p>
      </div>
    </div>
    
  </section>
</div>


<div className="container">
  <section className="copy-section">
    <div className="copy-inner">
      <h2>Most brands already have the audience.</h2>
      <p>What's missing is how <strong>everything works together</strong> — strategy, flows, and campaigns all aligned toward one thing: revenue.</p>
      <p>That's what we build.</p>
      <div className="statement">
        A system that makes email consistent, structured, and worth the attention it gets.
      </div>
    </div>
  </section>
</div>


<div className="container">
  <section className="why-section">
    <div className="why-header">
      <h2>Why brands work with us</h2>
      <p>Not just another email agency. A system built around what actually drives revenue.</p>
    </div>
    <div className="why-grid">

      <div className="why-card">
        <div className="why-card-num">01</div>
        <h3>Built around revenue, not just sending more emails</h3>
        <p>Every flow, campaign, and send is tied to a specific revenue outcome. We don't fill calendars. We drive results.</p>
      </div>

      <div className="why-card">
        <div className="why-card-num">02</div>
        <h3>Systems that run consistently, not one-off efforts</h3>
        <p>We build infrastructure that works 24/7 — automations, segmentation, and campaigns that compound over time without constant intervention.</p>
      </div>

      <div className="why-card">
        <div className="why-card-num">03</div>
        <h3>Strategy and execution working together</h3>
        <p>Most agencies do one or the other. We do both. Strategy shapes every decision, and execution follows through — no gaps, no handoffs.</p>
      </div>

      <div className="why-card">
        <div className="why-card-num">04</div>
        <h3>Focused on long-term customer value</h3>
        <p>We're not chasing open rates. We're building retention — repeat buyers, higher LTV, and a list that actually wants to hear from you.</p>
      </div>

    </div>
  </section>
</div>


<div className="container">
  <section className="cta-section">
    <div className="cta-inner">
      <h2>Ready to make email a <span className="accent">real</span> part of your revenue?</h2>
      <p>Book a free 15-minute call. We'll look at your setup and tell you exactly what we'd fix first — no pitch, no fluff.</p>
      <div className="cta-btns">
        <a className="btn-primary" href="https://calendly.com/addyawan57/15min" target="_blank">👉 Book a Call</a>
        <a className="btn-secondary" href="/case-studies">See the results</a>
      </div>
    </div>
  </section>
</div>


<div className="footer-wrap">
  <div className="container">

    
    <div className="footer-cta">
      <div className="footer-cta-left">
        <h2>Ready to turn email into a revenue channel?</h2>
        <p>Book a call and we'll show you where your retention system can work harder.</p>
      </div>
      <a className="footer-cta-btn" href="https://calendly.com/addyawan57/15min" target="_blank">Schedule a Meeting</a>
    </div>

    
    <div className="footer-cols">

      
      <div>
        <div className="footer-brand-name">Digital Supremacy</div>
        <p className="footer-brand-desc">Retention marketing for DTC ecommerce brands. We build email systems that turn traffic, subscribers, and customers into consistent revenue.</p>
        <div className="footer-brand-email"><a href="mailto:addy@yourdigitalsupremacy.com">addy@yourdigitalsupremacy.com</a></div>
      </div>

      
      <div>
        <div className="footer-col-title">Services</div>
        <ul className="footer-col-links">
          <li><a href="/services#strategy">Email Strategy</a></li>
          <li><a href="/services#flows">Flows</a></li>
          <li><a href="/services#campaigns">Campaigns</a></li>
          <li><a href="/services#deliverability">Deliverability</a></li>
          <li><a href="/services#leadgen">Lead Generation</a></li>
          <li><a href="/services#shopify">Shopify Management</a></li>
          <li><a href="/services#platform">Platform Management</a></li>
        </ul>
      </div>

      
      <div>
        <div className="footer-col-title">Company</div>
        <ul className="footer-col-links">
          <li><a href="/why-us">Why Us</a></li>
          <li><a href="/case-studies">Case Studies</a></li>
          <li><a href="https://calendly.com/addyawan57/15min" target="_blank">Book a Call</a></li>
          <li><a href="mailto:addy@yourdigitalsupremacy.com">Contact</a></li>
        </ul>
      </div>

      
      <div>
        <div className="footer-col-title">Legal</div>
        <ul className="footer-col-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
        </ul>
      </div>

      
      <div>
        <div className="footer-col-title">Social</div>
        <ul className="footer-col-links">
          <li><a href="#" target="_blank">LinkedIn</a></li>
          <li><a href="#" target="_blank">Instagram</a></li>
          <li><a href="#" target="_blank">YouTube</a></li>
        </ul>
      </div>

    </div>

    
    <div className="footer-bottom-bar">
      <p>© 2026 Digital Supremacy LTD. All rights reserved.</p>
      <p>Company number: 17183960</p>
    </div>

  </div>
</div>
      </div>
    </>
  );
}
