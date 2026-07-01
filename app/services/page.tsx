import type { Metadata } from "next";
import "./page.css";

import SiteInteractions from "@/components/site-interactions";

export const metadata: Metadata = {
  title: "Services — Digital Supremacy",
  description: "Digital Supremacy",
};


export default function Page() {
  return (
    <>
      <SiteInteractions />
      <div className="page page--services">
      
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
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
      </div>
    </>
  );
}
