import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/site-settings";
import "./site-footer.css";

export default async function SiteFooter() {
  const settings = await getSiteSettings();
  const socialLinks = [
    ["LinkedIn", settings.linkedin_url, settings.linkedin_enabled],
    ["Instagram", settings.instagram_url, settings.instagram_enabled],
    ["YouTube", settings.youtube_url, settings.youtube_enabled],
    ["Facebook", settings.facebook_url, settings.facebook_enabled],
    ["X / Twitter", settings.twitter_url, settings.twitter_enabled],
    ["TikTok", settings.tiktok_url, settings.tiktok_enabled],
  ].filter(([, url, enabled]) => Boolean(url) && Boolean(enabled));

  return (
    <footer className="ds-footer">
      <div className="ds-footer-container">
        <div className="ds-footer-cta">
          <div className="ds-footer-cta-left">
            <h2>Ready to turn email into a revenue channel?</h2>
            <p>Book a call and we&apos;ll show you where your retention system can work harder.</p>
          </div>
          <Link className="ds-footer-cta-btn" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Schedule a Meeting</Link>
        </div>

        <div className="ds-footer-cols">
          <div>
            <Link className="ds-footer-brand-name" href="/" aria-label="Digital Supremacy home"><Image src="/image/logo.png" width={210} height={50} alt="Digital Supremacy" /></Link>
            <p className="ds-footer-brand-desc">Retention marketing for DTC ecommerce brands. We build email systems that turn traffic, subscribers, and customers into consistent revenue.</p>
            <div className="ds-footer-brand-email"><Link href="mailto:addy@yourdigitalsupremacy.com">addy@yourdigitalsupremacy.com</Link></div>
          </div>
          <div>
            <div className="ds-footer-col-title">Services</div>
            <ul className="ds-footer-col-links">
              <li><Link href="/services/email-marketing#strategy">Email Strategy</Link></li>
              <li><Link href="/services/email-marketing#flows">Flows</Link></li>
              <li><Link href="/services/email-marketing#campaigns">Campaigns</Link></li>
              <li><Link href="/services/email-marketing#deliverability">Deliverability</Link></li>
              <li><Link href="/services/email-marketing#leadgen">Lead Generation</Link></li>
              <li><Link href="/services/shopify-management#shopify">Shopify Management</Link></li>
              <li><Link href="/services/email-marketing#platform">Platform Management</Link></li>
              <li><Link href="/services/social-media-marketing">Social Media Marketing</Link></li>
            </ul>
          </div>
          <div>
            <div className="ds-footer-col-title">Company</div>
            <ul className="ds-footer-col-links">
              <li><Link href="/why-us">Why Us</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/templates">Templates</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/team">Our Team</Link></li>
              <li><Link href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</Link></li>
            </ul>
          </div>
          <div>
            <div className="ds-footer-col-title">Legal</div>
            <ul className="ds-footer-col-links">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <div className="ds-footer-col-title">Social</div>
            <ul className="ds-footer-col-links">
              {socialLinks.map(([label, url]) => <li key={String(label)}><Link href={String(url)} target="_blank" rel="noreferrer">{label}</Link></li>)}
            </ul>
          </div>
        </div>

        <div className="ds-footer-bottom-bar"><p>© 2026 Digital Supremacy LTD. All rights reserved.</p><p>Company number: 17183960</p></div>
      </div>
    </footer>
  );
}
