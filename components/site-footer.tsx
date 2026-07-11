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
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-cta">
          <div className="footer-cta-left">
            <h2>Ready to turn email into a revenue channel?</h2>
            <p>Book a call and we&apos;ll show you where your retention system can work harder.</p>
          </div>
          <a className="footer-cta-btn" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Schedule a Meeting</a>
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
              <li><a href="/templates">Templates</a></li>
              <li><a href="/team">Our Team</a></li>
              <li><a href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a></li>
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
              {socialLinks.map(([label, url]) => <li key={String(label)}><a href={String(url)} target="_blank" rel="noreferrer">{label}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar"><p>© 2026 Digital Supremacy LTD. All rights reserved.</p><p>Company number: 17183960</p></div>
      </div>
    </footer>
  );
}
