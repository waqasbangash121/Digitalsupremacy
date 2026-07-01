import type { Metadata } from "next";

import SiteInteractions from "@/components/site-interactions";

export const metadata: Metadata = {
  title: "Services — Digital Supremacy",
  description: "Digital Supremacy",
};

const pageStyles = String.raw`
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --red: #C1121F;
  --red-dark: #A00E19;
  --bg: #0F0F10;
  --bg-card: #1A1A1C;
  --bg-raised: #222225;
  --border: #2A2A2E;
  --text: #F0F0F0;
  --text-muted: #A1A1A6;
  --text-dim: #6B6B70;
  --font: 'Inter', sans-serif;
}
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* NAV */
.nav-wrap {
  position: sticky; top: 0; z-index: 100;
  background: rgba(15,15,16,0.97);
  backdrop-filter: blur(8px);
  
}
.nav {
  max-width: 1200px; margin: 0 auto;
  padding: 0 24px; height: 64px;
  display: flex; align-items: center;
  justify-content: space-between; gap: 24px;
}
.logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
.logo-img {
  height: 50px;
  width: auto;
  display: block;
}

.nav-links { display: flex; gap: 24px; list-style: none; }
.nav-links a { font-size: 13px; font-weight: 500; color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.nav-links a:hover, .nav-links a.active { color: var(--text); }
.nav-cta {
  background: var(--red); color: #fff;
  font-family: var(--font); font-size: 13px; font-weight: 600;
  letter-spacing: 0.5px; border: none; border-radius: 7px;
  padding: 9px 18px; cursor: pointer; transition: background 0.2s; white-space: nowrap;
}
.nav-cta:hover { background: var(--red-dark); }

/* CONTAINER */
.container { max-width: 1200px; width: 100%; margin: 0 auto; padding: 0 24px; }

/* PAGE HERO */
.page-hero {
  padding: 80px 0 64px;
  
}
.page-hero-inner { max-width: 640px; }
.page-label {
  font-size: 12px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--red); margin-bottom: 16px;
}
.page-hero h1 {
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 800; line-height: 1.1;
  letter-spacing: -0.56px; color: var(--text);
  margin-bottom: 20px;
}
.page-hero p {
  font-size: 18px; color: var(--text-muted);
  line-height: 1.6; max-width: 520px;
}

/* SERVICE NAV */
.service-nav {
  padding: 24px 0;
  
  position: sticky; top: 64px; z-index: 90;
  background: rgba(15,15,16,0.97);
  backdrop-filter: blur(8px);
}
.service-nav-inner {
  display: flex; gap: 8px; overflow-x: auto;
  scrollbar-width: none; -ms-overflow-style: none;
}
.service-nav-inner::-webkit-scrollbar { display: none; }
.snav-btn {
  background: transparent; border: 1px solid var(--border);
  color: var(--text-muted); font-family: var(--font);
  font-size: 13px; font-weight: 500;
  padding: 7px 16px; border-radius: 100px;
  cursor: pointer; white-space: nowrap;
  transition: all 0.2s; flex-shrink: 0;
}
.snav-btn:hover { border-color: #555; color: var(--text); }
.snav-btn.active { background: var(--red); border-color: var(--red); color: #fff; }

/* SERVICES LAYOUT */
.services-wrap { padding: 80px 0; }
.service-block {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  padding: 64px 0;
  
  align-items: start;
}
.service-block:first-child { padding-top: 0; }
.service-block:last-child { border-bottom: none; }

/* LEFT COLUMN */
.service-left { position: sticky; top: 160px; }
.service-number {
  font-size: 12px; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--red); margin-bottom: 16px;
}
.service-title {
  font-size: 26px; font-weight: 700;
  line-height: 1.2; color: var(--text);
  margin-bottom: 12px; letter-spacing: -0.3px;
}
.service-tagline {
  font-size: 14px; color: var(--text-muted);
  line-height: 1.6; font-style: italic;
  margin-bottom: 24px;
}
.service-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--red); color: #fff;
  font-family: var(--font); font-size: 13px; font-weight: 600;
  letter-spacing: 0.5px; border: none; border-radius: 7px;
  padding: 10px 20px; cursor: pointer;
  text-decoration: none; transition: background 0.2s;
}
.service-cta:hover { background: var(--red-dark); }
.service-cta svg { width: 14px; height: 14px; }

/* RIGHT COLUMN */
.service-right { display: flex; flex-direction: column; gap: 32px; }
.service-intro {
  font-size: 17px; color: var(--text-muted);
  line-height: 1.7; max-width: 580px;
}
.service-intro strong { color: var(--text); font-weight: 600; }

/* LIST GROUPS */
.list-group { }
.list-group-title {
  font-size: 12px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--text-dim); margin-bottom: 16px;
  padding-bottom: 12px; 
}
.service-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 32px;
  list-style: none;
}
.service-list.single-col { grid-template-columns: 1fr; }
.service-list li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 14px; color: var(--text-muted); line-height: 1.5;
}
.service-list li::before {
  content: '';
  width: 5px; height: 5px; background: var(--red);
  border-radius: 50%; flex-shrink: 0; margin-top: 7px;
}

/* TAG CHIPS */
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.tag {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 6px; padding: 5px 12px;
  font-size: 13px; color: var(--text-muted); font-weight: 500;
}

/* CLOSING NOTE */
.service-note {
  background: var(--bg-card); border: 1px solid var(--border);
  border-left: 3px solid var(--red);
  border-radius: 0 8px 8px 0;
  padding: 16px 20px;
  font-size: 14px; color: var(--text-muted);
  line-height: 1.6; font-style: italic;
}
.service-note strong { color: var(--text); font-style: normal; }

/* CTA BAND */
.cta-band {
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  
  padding: 80px 0;
}
.cta-band-inner {
  max-width: 600px; margin: 0 auto;
  text-align: center;
}
.cta-band h2 {
  font-size: 36px; font-weight: 700;
  letter-spacing: -0.3px; line-height: 1.2;
  margin-bottom: 16px;
}
.cta-band p {
  font-size: 16px; color: var(--text-muted);
  line-height: 1.6; margin-bottom: 32px;
}
.cta-band-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn-primary {
  background: var(--red); color: #fff;
  font-family: var(--font); font-size: 15px; font-weight: 600;
  letter-spacing: 0.5px; border: none; border-radius: 8px;
  padding: 14px 28px; cursor: pointer;
  text-decoration: none; display: inline-block;
  transition: background 0.2s;
}
.btn-primary:hover { background: var(--red-dark); }
.btn-secondary {
  background: transparent; color: var(--text);
  font-family: var(--font); font-size: 15px; font-weight: 600;
  letter-spacing: 0.5px; border: 1px solid var(--border);
  border-radius: 8px; padding: 14px 28px; cursor: pointer;
  text-decoration: none; display: inline-block;
  transition: border-color 0.2s;
}
.btn-secondary:hover { border-color: #666; }

@media (max-width: 900px) {
  .service-block { grid-template-columns: 1fr; gap: 32px; }
  .service-left { position: static; }
  .service-list { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .container { padding: 0 16px; }
  .page-hero { padding: 56px 0 48px; }
  .services-wrap { padding: 48px 0; }
  .service-block { padding: 48px 0; gap: 24px; }
  .nav-links { display: none; }
  .cta-band h2 { font-size: 28px; }
}

@media (max-width: 640px) {
  .footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
  .footer-copy { text-align: left; }
}

/* FOOTER */
.footer-wrap { border-top: 1px solid var(--border); }

/* CTA BAND */
.footer-cta {
  padding: 72px 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}
.footer-cta-left { max-width: 520px; }
.footer-cta-left h2 {
  font-size: clamp(22px, 3.5vw, 32px);
  font-weight: 700;
  letter-spacing: -0.3px;
  line-height: 1.2;
  color: var(--text);
  margin-bottom: 10px;
}
.footer-cta-left p {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
}
.footer-cta-btn {
  background: var(--red);
  color: #fff;
  font-family: var(--font);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border: none;
  border-radius: 8px;
  padding: 14px 28px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  transition: background 0.2s;
  flex-shrink: 0;
}
.footer-cta-btn:hover { background: var(--red-dark, #A00E19); }

/* FOOTER COLUMNS */
.footer-cols {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 48px;
  padding: 56px 0;
  border-bottom: 1px solid var(--border);
}
.footer-col-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--text);
  margin-bottom: 18px;
}
.footer-brand-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.2px;
  margin-bottom: 12px;
}
.footer-brand-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 16px;
}
.footer-brand-email a {
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-brand-email a:hover { color: var(--text); }
.footer-col-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-col-links a {
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-col-links a:hover { color: var(--text); }

/* BOTTOM BAR */
.footer-bottom-bar {
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
.footer-bottom-bar p { font-size: 12px; color: var(--text-dim); }

@media (max-width: 900px) {
  .footer-cols { grid-template-columns: 1fr 1fr; gap: 36px; }
  .footer-cta { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 560px) {
  .footer-cols { grid-template-columns: 1fr; gap: 32px; }
  .footer-cta { padding: 48px 0; }
  .footer-bottom-bar { flex-direction: column; align-items: flex-start; gap: 4px; }
}

`;

export default function Page() {
  return (
    <>
      <style>{pageStyles}</style>
      <SiteInteractions />
      
<div className="nav-wrap">
  <nav className="nav">
<a href="/" className="logo">
    <img src="image/logo.png" alt="Digital Supremacy Logo" className="logo-img" />
</a>
            <ul className="nav-links">
      <li><a href="/services" className="active">Services</a></li>
      <li><a href="/case-studies">Case Studies</a></li>
      <li><a href="/why-us">Why Us</a></li>
      <li><a href="/team">Our Team</a></li>
    </ul>
    <a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank">Book a Call</a>
  </nav>
</div>


<div className="service-nav">
  <div className="container">
    <div className="service-nav-inner">
      <button className="snav-btn active">Email Strategy</button>
      <button className="snav-btn">Flows</button>
      <button className="snav-btn">Campaigns</button>
      <button className="snav-btn">Deliverability</button>
      <button className="snav-btn">Lead Generation</button>
      <button className="snav-btn">Shopify</button>
      <button className="snav-btn">Platform Management</button>
    </div>
  </div>
</div>


<div className="container">
  <div className="page-hero">
    <div className="page-hero-inner">
      <p className="page-label">What we do</p>
      <h1>Services built to make email your most reliable revenue channel.</h1>
      <p>Every service we offer is designed to compound — strategy informs flows, flows support campaigns, and everything works together to grow your revenue.</p>
    </div>
  </div>
</div>


<div className="container">
  <div className="services-wrap">

    
    <div className="service-block" id="strategy">
      <div className="service-left">
        <div className="service-number">01</div>
        <div className="service-title">Email Strategy</div>
        <div className="service-tagline">Everything starts here.</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
      <div className="service-right">
        <p className="service-intro">We don't send emails for the sake of it. We build a strategy that turns your email channel into a <strong>predictable revenue driver.</strong></p>
        <div className="list-group">
          <div className="list-group-title">What we do</div>
          <ul className="service-list">
            <li>Full account audit</li>
            <li>Revenue opportunity mapping</li>
            <li>Customer journey planning</li>
            <li>Segmentation strategy</li>
            <li>Campaign calendar planning</li>
            <li>Offer and positioning strategy</li>
            <li>AOV and LTV optimisation</li>
          </ul>
        </div>
        <div className="service-note">You're not getting random ideas. <strong>You're getting a system built to make money.</strong></div>
      </div>
    </div>

    
    <div className="service-block" id="flows">
      <div className="service-left">
        <div className="service-number">02</div>
        <div className="service-title">Flows &amp; Automations</div>
        <div className="service-tagline">Your highest ROI channel, built to run 24/7.</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
      <div className="service-right">
        <p className="service-intro">We design, write, and implement complete flow systems that <strong>capture revenue at every stage</strong> of the customer journey.</p>

        <div className="list-group">
          <div className="list-group-title">Core Flows</div>
          <ul className="service-list">
            <li>Welcome Flow</li>
            <li>Abandoned Cart</li>
            <li>Checkout Abandonment</li>
            <li>Browse Abandonment</li>
            <li>Post Purchase Flow</li>
            <li>Order Confirmation</li>
            <li>Shipping / Fulfilment Flow</li>
            <li>Review / UGC Request</li>
            <li>Cross-sell / Upsell Flow</li>
            <li>Repeat Purchase Flow</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Advanced &amp; Retention Flows</div>
          <ul className="service-list">
            <li>VIP / High Value Customer Flow</li>
            <li>Winback Flow</li>
            <li>Re-engagement Flow</li>
            <li>Sunset Flow (list cleaning)</li>
            <li>Loyalty / Rewards Flow</li>
            <li>Back in Stock Flow</li>
            <li>Price Drop Flow</li>
            <li>Product Education Flow</li>
            <li>Subscription Nurture Flow</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Subscription-Based Flows</div>
          <ul className="service-list">
            <li>Subscription Welcome Flow</li>
            <li>Refill Reminder Flow</li>
            <li>Renewal Reminder</li>
            <li>Subscription Upsell</li>
            <li>Subscription Cancellation Save Flow</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Platform Integrations</div>
          <div className="tags">
            <span className="tag">Klaviyo</span>
            <span className="tag">Omnisend</span>
            <span className="tag">Shopify</span>
            <span className="tag">Recharge</span>
            <span className="tag">Skio</span>
            <span className="tag">Yotpo</span>
            <span className="tag">Attentive</span>
            <span className="tag">Gorgias</span>
            <span className="tag">Postscript</span>
          </div>
          <p style={{"fontSize":"13px","color":"var(--text-dim)","marginTop":"12px"}}>Custom event tracking included where needed.</p>
        </div>
      </div>
    </div>

    
    <div className="service-block" id="campaigns">
      <div className="service-left">
        <div className="service-number">03</div>
        <div className="service-title">Campaigns</div>
        <div className="service-tagline">This is where we drive immediate revenue.</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
      <div className="service-right">
        <p className="service-intro">We plan, design, and execute campaigns that <strong>convert without burning your list.</strong></p>

        <div className="list-group">
          <div className="list-group-title">Campaign Types</div>
          <ul className="service-list">
            <li>Product launches</li>
            <li>Promotions and sales</li>
            <li>New arrivals</li>
            <li>Restocks</li>
            <li>Seasonal campaigns</li>
            <li>Holiday campaigns (BFCM, Christmas)</li>
            <li>Clearance campaigns</li>
            <li>Limited drops</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Engagement &amp; Brand Campaigns</div>
          <ul className="service-list">
            <li>Educational emails</li>
            <li>Founder story</li>
            <li>Social proof / reviews</li>
            <li>Community building</li>
            <li>Content-driven emails</li>
          </ul>
        </div>

        <div className="list-group">
          <div className="list-group-title">Segmentation Strategy</div>
          <ul className="service-list single-col">
            <li>Highly engaged audience targeting</li>
            <li>Behaviour-based sends</li>
            <li>Purchase-based targeting</li>
            <li>Lifecycle segmentation</li>
          </ul>
        </div>

        <div className="service-note"><strong>Every campaign has a purpose. Every send is tied to revenue.</strong></div>
      </div>
    </div>

    
    <div className="service-block" id="deliverability">
      <div className="service-left">
        <div className="service-number">04</div>
        <div className="service-title">Deliverability</div>
        <div className="service-tagline">If your emails don't land, nothing else matters.</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
      <div className="service-right">
        <p className="service-intro">We make sure your emails <strong>actually reach the inbox.</strong></p>

        <div className="list-group">
          <div className="list-group-title">What we handle</div>
          <ul className="service-list">
            <li>Domain authentication (SPF, DKIM, DMARC)</li>
            <li>Sending reputation management</li>
            <li>List hygiene and suppression strategy</li>
            <li>Engagement-based sending</li>
            <li>Warm-up strategies</li>
            <li>Spam trigger avoidance</li>
            <li>Inbox placement optimisation</li>
            <li>Monitoring open rates and deliverability health</li>
          </ul>
        </div>

        <div className="service-note"><strong>You stay out of spam. Your revenue stays intact.</strong></div>
      </div>
    </div>

    
    <div className="service-block" id="leadgen">
      <div className="service-left">
        <div className="service-number">05</div>
        <div className="service-title">Lead Generation</div>
        <div className="service-tagline">No list = no revenue.</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
      <div className="service-right">
        <p className="service-intro">We build systems that consistently turn <strong>traffic into subscribers and buyers.</strong></p>

        <div className="list-group">
          <div className="list-group-title">What we do</div>
          <ul className="service-list">
            <li>High-converting popups and forms</li>
            <li>Exit intent offers</li>
            <li>Discount and lead magnet strategy</li>
            <li>Landing pages</li>
            <li>Funnel optimisation</li>
            <li>Traffic to email capture flows</li>
            <li>Conversion optimisation</li>
          </ul>
        </div>

        <div className="service-note"><strong>Your list grows with intent, not just volume.</strong></div>
      </div>
    </div>

    
    <div className="service-block" id="shopify">
      <div className="service-left">
        <div className="service-number">06</div>
        <div className="service-title">Shopify Management</div>
        <div className="service-tagline">Your store and your email need to work together.</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
      <div className="service-right">
        <p className="service-intro">We optimise your Shopify setup to <strong>support higher conversions and retention.</strong></p>

        <div className="list-group">
          <div className="list-group-title">What we handle</div>
          <ul className="service-list">
            <li>Product page optimisation</li>
            <li>Checkout experience</li>
            <li>Conversion flow improvements</li>
            <li>App integrations</li>
            <li>Funnel alignment with email</li>
            <li>UX improvements</li>
            <li>Performance fixes where needed</li>
          </ul>
        </div>

        <div className="service-note"><strong>More conversions, less friction.</strong></div>
      </div>
    </div>

    
    <div className="service-block" id="platform">
      <div className="service-left">
        <div className="service-number">07</div>
        <div className="service-title">Platform Management</div>
        <div className="service-tagline">We handle your entire email platform so nothing breaks and everything performs.</div>
        <a className="service-cta" href="https://calendly.com/addyawan57/15min" target="_blank">
          Get started
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
      <div className="service-right">
        <p className="service-intro">You don't manage tools. <strong>We manage the system.</strong></p>

        <div className="list-group">
          <div className="list-group-title">Platforms we work with</div>
          <div className="tags">
            <span className="tag">Klaviyo</span>
            <span className="tag">Omnisend</span>
            <span className="tag">Mailchimp</span>
            <span className="tag">ActiveCampaign</span>
          </div>
        </div>

        <div className="list-group">
          <div className="list-group-title">What we manage</div>
          <ul className="service-list">
            <li>Full account setup</li>
            <li>Flow builds and maintenance</li>
            <li>Campaign execution</li>
            <li>Segmentation</li>
            <li>Analytics and reporting</li>
            <li>A/B testing</li>
            <li>Ongoing optimisation</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</div>


<div className="cta-band">
  <div className="container">
    <div className="cta-band-inner">
      <h2>Ready to build the system?</h2>
      <p>Book a free 15-minute call. We'll tell you exactly what we'd fix first — no pitch, no fluff.</p>
      <div className="cta-band-btns">
        <a className="btn-primary" href="https://calendly.com/addyawan57/15min" target="_blank">Book my free call</a>
        <a className="btn-secondary" href="/#cases">See case studies</a>
      </div>
    </div>
  </div>
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

    </>
  );
}
