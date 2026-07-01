import type { Metadata } from "next";
import "./page.css";

import SiteInteractions from "@/components/site-interactions";

export const metadata: Metadata = {
  title: "Privacy Policy — Digital Supremacy",
  description: "Digital Supremacy",
};


export default function Page() {
  return (
    <>
      <SiteInteractions />
      <div className="page page--privacy-policy">
      
<div className="nav-wrap">
  <nav className="nav">
    <a href="/" className="logo">
    <img src="image/logo.png" alt="Digital Supremacy Logo" className="logo-img" />
</a>
            <ul className="nav-links">
      <li><a href="/services">Services</a></li>
      <li><a href="/case-studies">Case Studies</a></li>
      <li><a href="/why-us">Why Us</a></li>
      <li><a href="/team">Our Team</a></li>
    </ul>
    <a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank">Book a Call</a>
  </nav>
</div>


<div className="container">
  <div className="page-wrap">

    
    <aside className="sidebar">
      <div className="sidebar-label">On this page</div>
      <ul className="sidebar-links" id="sidebarLinks">
        <li><a href="#introduction" className="active">1. Introduction</a></li>
        <li><a href="#information">2. Information We Collect</a></li>
        <li><a href="#how-we-use">3. How We Use It</a></li>
        <li><a href="#legal-basis">4. Legal Basis (UK GDPR)</a></li>
        <li><a href="#sharing">5. Sharing Your Data</a></li>
        <li><a href="#retention">6. Data Retention</a></li>
        <li><a href="#rights">7. Your Rights</a></li>
        <li><a href="#cookies">8. Cookies</a></li>
        <li><a href="#security">9. Data Security</a></li>
        <li><a href="#contact">10. Contact Details</a></li>
        <li><a href="#updates">11. Updates</a></li>
      </ul>
    </aside>

    
    <main className="policy-content">

      <div className="policy-header">
        <p className="policy-label">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="policy-meta">Last updated: 15 May 2026</p>
      </div>

      
      <div className="policy-section" id="introduction">
        <div className="section-num">01</div>
        <h2>Introduction</h2>
        <p>This Privacy Policy explains how <strong style={{"color":"var(--text)"}}>Digital Supremacy LTD</strong> ("we", "us", or "our") collects, uses, and protects your information when you visit our website or use our services.</p>
        <p>We are committed to protecting your privacy and handling your data in a transparent and secure way.</p>
      </div>

      

      
      <div className="policy-section" id="information">
        <div className="section-num">02</div>
        <h2>Information We Collect</h2>
        <p>We may collect and process the following data:</p>

        <div className="sub-section">
          <div className="sub-label">Information you provide</div>
          <ul className="policy-list">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Business information (submitted via forms or calls)</li>
          </ul>
        </div>

        <div className="sub-section">
          <div className="sub-label">Automatically collected data</div>
          <ul className="policy-list">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Website usage data (via cookies and analytics tools)</li>
          </ul>
        </div>
      </div>

      

      
      <div className="policy-section" id="how-we-use">
        <div className="section-num">03</div>
        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="policy-list">
          <li>Respond to enquiries</li>
          <li>Provide and manage our services</li>
          <li>Communicate with you</li>
          <li>Improve our website and services</li>
          <li>Send marketing communications (only if you opt in)</li>
        </ul>
      </div>

      

      
      <div className="policy-section" id="legal-basis">
        <div className="section-num">04</div>
        <h2>Legal Basis for Processing (UK GDPR)</h2>
        <p>We process your data based on:</p>
        <ul className="policy-list">
          <li>Your consent</li>
          <li>Contractual necessity</li>
          <li>Legitimate business interests</li>
        </ul>
      </div>

      

      
      <div className="policy-section" id="sharing">
        <div className="section-num">05</div>
        <h2>Sharing Your Information</h2>

        <div className="callout">
          <p><strong>We do not sell your data.</strong> Your information is never sold to third parties.</p>
        </div>

        <p>We may share your information with trusted third parties such as:</p>
        <ul className="policy-list">
          <li>Email service providers (e.g. Klaviyo, Mailchimp)</li>
          <li>Payment processors (e.g. PayPal, Wise)</li>
          <li>Analytics tools (e.g. Google Analytics)</li>
        </ul>
        <p>These providers only process data as necessary to perform their services.</p>
      </div>

      

      
      <div className="policy-section" id="retention">
        <div className="section-num">06</div>
        <h2>Data Retention</h2>
        <p>We retain your data only for as long as necessary to:</p>
        <ul className="policy-list">
          <li>Provide services</li>
          <li>Comply with legal obligations</li>
          <li>Resolve disputes</li>
        </ul>
      </div>

      

      
      <div className="policy-section" id="rights">
        <div className="section-num">07</div>
        <h2>Your Rights</h2>
        <p>Under UK data protection law, you have the right to:</p>
        <ul className="policy-list">
          <li>Access your data</li>
          <li>Request correction</li>
          <li>Request deletion</li>
          <li>Object to processing</li>
          <li>Withdraw consent</li>
        </ul>
        <p style={{"marginTop":"16px"}}>To exercise these rights, contact us using the details in Section 10.</p>
      </div>

      

      
      <div className="policy-section" id="cookies">
        <div className="section-num">08</div>
        <h2>Cookies</h2>
        <p>We may use cookies to:</p>
        <ul className="policy-list">
          <li>Improve user experience</li>
          <li>Analyse website performance</li>
        </ul>
        <p style={{"marginTop":"16px"}}>You can control or disable cookies through your browser settings at any time.</p>
      </div>

      

      
      <div className="policy-section" id="security">
        <div className="section-num">09</div>
        <h2>Data Security</h2>
        <p>We take reasonable measures to protect your data from unauthorised access, loss, and misuse.</p>
        <div className="callout">
          <p>However, no system is completely secure. If you have concerns about the security of your data, please contact us.</p>
        </div>
      </div>

      

      
      <div className="policy-section" id="contact">
        <div className="section-num">10</div>
        <h2>Contact Details</h2>
        <p>If you have any questions about this Privacy Policy or your data, you can contact us:</p>
        <div className="contact-block">
          <p><strong>Digital Supremacy LTD</strong></p>
          <p>Email: <a href="mailto:addy@yourdigitalsupremacy.com">addy@yourdigitalsupremacy.com</a></p>
          <p>Registered Address: 2 Discovery Tower, London, United Kingdom</p>
        </div>
      </div>

      

      
      <div className="policy-section" id="updates">
        <div className="section-num">11</div>
        <h2>Updates to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>
        <p>We encourage you to review this page periodically to stay informed about how we protect your information.</p>
      </div>

    </main>
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
