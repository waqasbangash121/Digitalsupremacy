import Link from "next/link";
import ServicesDropdown from "@/components/services-dropdown";
import type { ReactNode } from "react";
import "@/app/services/page.css";

export default function ServicesShell({ children }: { children: ReactNode }) {
return <div className="page page--services">
<div className="nav-wrap">
  <nav className="nav">
<Link href="/" className="logo">
    <img src="/image/logo.png" alt="Digital Supremacy Logo" className="logo-img" />
</Link>
            <ul className="nav-links">
      <li><ServicesDropdown /></li>
      <li><Link href="/case-studies">Case Studies</Link></li>
      <li><Link href="/why-us">Why Us</Link></li>
      <li><Link href="/team">Our Team</Link></li>
    </ul>
    <a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank">Book a Call</a>
  </nav>
</div>


<main>{children}</main>
<div className="footer-wrap">
  <div className="container">

    
    <div className="footer-cta">
      <div className="footer-cta-left">
        <h2>Ready to turn email into a revenue channel?</h2>
        <p>Book a call and we&apos;ll show you where your retention system can work harder.</p>
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
          <li><Link href="/services/email-marketing#strategy">Email Strategy</Link></li>
          <li><Link href="/services/email-marketing#flows">Flows</Link></li>
          <li><Link href="/services/email-marketing#campaigns">Campaigns</Link></li>
          <li><Link href="/services/email-marketing#deliverability">Deliverability</Link></li>
          <li><Link href="/services/email-marketing#leadgen">Lead Generation</Link></li>
          <li><Link href="/services/shopify-management#shopify">Shopify Management</Link></li>
          <li><Link href="/services/email-marketing#platform">Platform Management</Link></li>
        </ul>
      </div>

      
      <div>
        <div className="footer-col-title">Company</div>
        <ul className="footer-col-links">
          <li><Link href="/why-us">Why Us</Link></li>
          <li><Link href="/case-studies">Case Studies</Link></li>
          <li><a href="https://calendly.com/addyawan57/15min" target="_blank">Book a Call</a></li>
          <li><a href="mailto:addy@yourdigitalsupremacy.com">Contact</a></li>
        </ul>
      </div>

      
      <div>
        <div className="footer-col-title">Legal</div>
        <ul className="footer-col-links">
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          <li><Link href="/terms-of-service">Terms of Service</Link></li>
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
</div>;
}
