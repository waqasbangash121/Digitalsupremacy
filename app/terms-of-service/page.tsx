import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import type { Metadata } from "next";
import "./page.css";
import "../legal-pages.css";

import SiteInteractions from "@/components/site-interactions";

export const metadata: Metadata = {
  title: "Terms of Service — Digital Supremacy",
  description: "Digital Supremacy",
};


export default function Page() {
  return (
    <>
      <SiteInteractions />
      <div className="page page--terms-of-service">
      
<SiteHeader />

<div className="container">
  <div className="page-wrap">

    
    <aside className="sidebar">
      <div className="sidebar-label">On this page</div>
      <ul className="sidebar-links" id="sidebarLinks">
        <li><a href="#introduction" className="active">1. Introduction</a></li>
        <li><a href="#services">2. Services</a></li>
        <li><a href="#responsibilities">3. Client Responsibilities</a></li>
        <li><a href="#payments">4. Payments</a></li>
        <li><a href="#disclaimer">5. Results Disclaimer</a></li>
        <li><a href="#ip">6. Intellectual Property</a></li>
        <li><a href="#confidentiality">7. Confidentiality</a></li>
        <li><a href="#liability">8. Limitation of Liability</a></li>
        <li><a href="#termination">9. Termination</a></li>
        <li><a href="#changes">10. Changes to Services</a></li>
        <li><a href="#law">11. Governing Law</a></li>
        <li><a href="#contact">12. Contact Details</a></li>
      </ul>
    </aside>

    
    <main className="policy-content">

      <div className="policy-header">
        <p className="policy-label">Legal</p>
        <h1>Terms of Service</h1>
        <p className="policy-meta">Last updated: 15 May 2026</p>
      </div>

      <div className="policy-section" id="introduction">
        <div className="section-num">01</div>
        <h2>Introduction</h2>
        <p>These Terms of Service (&quot;Terms&quot;) govern your use of the website and services provided by <strong style={{"color":"var(--text)"}}>Digital Supremacy LTD</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).</p>
        <p>By using our website or engaging our services, you agree to these Terms.</p>
      </div>

      <div className="policy-section" id="services">
        <div className="section-num">02</div>
        <h2>Services</h2>
        <p>We provide email marketing, retention strategy, and related digital marketing services for eCommerce brands.</p>
        <p>All services are agreed upon in advance and may vary depending on the scope of work.</p>
      </div>

      <div className="policy-section" id="responsibilities">
        <div className="section-num">03</div>
        <h2>Client Responsibilities</h2>
        <p>You agree to:</p>
        <ul className="policy-list">
          <li>Provide accurate and complete information</li>
          <li>Give timely access to required platforms (e.g. Shopify, email platforms)</li>
          <li>Respond to requests and approvals in a reasonable timeframe</li>
        </ul>
        <p>Delays in communication or access may affect delivery timelines.</p>
      </div>

      <div className="policy-section" id="payments">
        <div className="section-num">04</div>
        <h2>Payments</h2>
        <ul className="policy-list">
          <li>Payment terms are agreed in advance</li>
          <li>Invoices must be paid by the stated due date</li>
          <li>Late payments may result in paused work or delayed delivery</li>
        </ul>
        <div className="callout">
          <p><strong>All fees are non-refundable</strong> unless otherwise agreed in writing.</p>
        </div>
      </div>

      <div className="policy-section" id="disclaimer">
        <div className="section-num">05</div>
        <h2>Results Disclaimer</h2>
        <p>We do not guarantee specific results, revenue, or performance outcomes.</p>
        <p>Results depend on multiple factors including your product, audience, market conditions, and implementation.</p>
        <p>We provide strategy and execution based on best practices and experience.</p>
      </div>

      <div className="policy-section" id="ip">
        <div className="section-num">06</div>
        <h2>Intellectual Property</h2>
        <p>Unless agreed otherwise:</p>
        <ul className="policy-list">
          <li>You retain ownership of your brand and assets</li>
          <li>We retain rights to any frameworks, systems, or methodologies used</li>
        </ul>
        <p>We may showcase non-confidential work in our portfolio unless requested otherwise.</p>
      </div>

      <div className="policy-section" id="confidentiality">
        <div className="section-num">07</div>
        <h2>Confidentiality</h2>
        <p>We respect your business information and will not share confidential data without your consent.</p>
      </div>

      <div className="policy-section" id="liability">
        <div className="section-num">08</div>
        <h2>Limitation of Liability</h2>
        <p>We are not liable for:</p>
        <ul className="policy-list">
          <li>Indirect or consequential losses</li>
          <li>Loss of revenue or business opportunities</li>
          <li>Issues caused by third-party platforms (e.g. Shopify, Klaviyo)</li>
        </ul>
        <div className="callout">
          <p>Our liability is limited to the amount paid for the services provided.</p>
        </div>
      </div>

      <div className="policy-section" id="termination">
        <div className="section-num">09</div>
        <h2>Termination</h2>
        <p>Either party may terminate the agreement with reasonable notice.</p>
        <p>Any work completed up to the termination date must be paid for.</p>
      </div>

      <div className="policy-section" id="changes">
        <div className="section-num">10</div>
        <h2>Changes to Services</h2>
        <p>We reserve the right to modify or update our services at any time.</p>
        <p>Any significant changes will be communicated in advance.</p>
      </div>

      <div className="policy-section" id="law">
        <div className="section-num">11</div>
        <h2>Governing Law</h2>
        <p>These Terms are governed by the laws of the United Kingdom.</p>
      </div>

      <div className="policy-section" id="contact">
        <div className="section-num">12</div>
        <h2>Contact Details</h2>
        <p>For any questions regarding these Terms, contact:</p>
        <div className="contact-block">
          <p><strong>Digital Supremacy LTD</strong></p>
          <p>Email: <a href="mailto:addy@yourdigitalsupremacy.com">addy@yourdigitalsupremacy.com</a></p>
          <p>Registered Address: 2 Discovery Tower, London, United Kingdom</p>
        </div>
      </div>

    </main>
  </div>
</div>


<SiteFooter />
      </div>
    </>
  );
}
