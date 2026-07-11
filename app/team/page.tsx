import type { Metadata } from "next";
import "./page.css";
import "./social.css";
import { getTeamMembers, type TeamMember } from "@/lib/db";

export const metadata: Metadata = {
  title: "Our Team — Digital Supremacy",
  description: "Meet the team behind Digital Supremacy.",
};

export const dynamic = "force-dynamic";

const socialLabels = {
  linkedin_url: "LinkedIn",
  instagram_url: "Instagram",
  twitter_url: "Twitter / X",
  facebook_url: "Facebook",
} as const;

type SocialKey = keyof typeof socialLabels;

function MemberSocialLinks({ member, compact = false }: { member: TeamMember; compact?: boolean }) {
  const links = (Object.keys(socialLabels) as SocialKey[])
    .map((key) => ({ key, label: socialLabels[key], url: member[key] }))
    .filter((link) => Boolean(link.url));

  if (links.length === 0) return null;

  return (
    <div className={`member-socials${compact ? " compact" : ""}`} aria-label={`${member.name} social profiles`}>
      {links.map((link) => (
        <a key={link.key} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on ${link.label}`} title={link.label}>
          <span aria-hidden="true">{link.label === "LinkedIn" ? "in" : link.label === "Instagram" ? "ig" : link.label === "Facebook" ? "f" : "x"}</span>
        </a>
      ))}
    </div>
  );
}

export default async function TeamPage() {
  const members = await getTeamMembers();
  const founder = members.find((member) => member.is_founder);
  const team = members.filter((member) => !member.is_founder);
  return (
    <div className="page page--team">
      <div className="nav-wrap">
        <nav className="nav">
          <a href="/" className="logo">
            <img src="/image/logo.png" alt="Digital Supremacy" className="logo-img" />
          </a>
          <ul className="nav-links">
            <li><a href="/services">Services</a></li>
            <li><a href="/case-studies">Case Studies</a></li>
            <li><a href="/why-us">Why Us</a></li>
            <li><a href="/team" className="active">Our Team</a></li>
          </ul>
          <a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a>
        </nav>
      </div>

      <main>
        <div className="container">
          <section className="page-hero">
            <p className="page-label">Our Team</p>
            <h1>The minds behind your <span>Digital Supremacy.</span></h1>
            <p>A small, senior team built for speed and quality. Strategy, copy, design, and Klaviyo execution — handled end to end, so you&apos;re not juggling multiple freelancers to get one campaign out.</p>
          </section>
        </div>

        <div className="container">
          <section className="team-section">
            {founder && <article className="founder-card">
              <div className={"founder-avatar " + (founder.image_url ? "has-image" : "")}>
                {founder.image_url ? <img src={founder.image_url} alt={`${founder.name}, ${founder.role}`} /> : founder.initials}
              </div>
              <div className="founder-info">
                <div className="founder-tag">Founder</div>
                <h2 className="founder-name">{founder.name}</h2>
                <div className="founder-role">{founder.role}</div>
                {founder.bio && <p className="founder-bio">{founder.bio}</p>}
                <MemberSocialLinks member={founder} />
              </div>
            </article>}

            <div className="team-grid">
              {team.map((member, index) => (
                <article className="team-card" key={member.id}>
                  <div className={"team-avatar av-" + member.tone + (member.image_url ? " has-image" : "")}>
                    {member.image_url ? <img src={member.image_url} alt={`${member.name}, ${member.role}`} /> : <span>{member.initials}</span>}
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </div>
                  <div className="team-card-info">
                    <div className="team-card-copy">
                      <h2 className="team-card-name">{member.name}</h2>
                      <div className="team-card-role">{member.role}</div>
                      <span className="team-card-tag">{member.tag}</span>
                    </div>
                    <MemberSocialLinks member={member} compact />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="container">
          <section className="cta-band">
            <div className="cta-inner">
              <h2>Want this team on your account?</h2>
              <p>Book a free 15-minute call. We&apos;ll look at your setup and tell you exactly what we&apos;d fix first.</p>
              <a className="btn-primary" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a>
            </div>
          </section>
        </div>
      </main>

      <div className="footer-wrap">
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
                <li><a href="/services#strategy">Email Strategy</a></li><li><a href="/services#flows">Flows</a></li><li><a href="/services#campaigns">Campaigns</a></li><li><a href="/services#deliverability">Deliverability</a></li><li><a href="/services#leadgen">Lead Generation</a></li><li><a href="/services#shopify">Shopify Management</a></li><li><a href="/services#platform">Platform Management</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-col-links"><li><a href="/why-us">Why Us</a></li><li><a href="/case-studies">Case Studies</a></li><li><a href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a></li><li><a href="mailto:addy@yourdigitalsupremacy.com">Contact</a></li></ul>
            </div>
            <div>
              <div className="footer-col-title">Legal</div>
              <ul className="footer-col-links"><li><a href="/privacy-policy">Privacy Policy</a></li><li><a href="/terms-of-service">Terms of Service</a></li></ul>
            </div>
            <div>
              <div className="footer-col-title">Social</div>
              <ul className="footer-col-links"><li><a href="#">LinkedIn</a></li><li><a href="#">Instagram</a></li><li><a href="#">YouTube</a></li></ul>
            </div>
          </div>

          <div className="footer-bottom-bar"><p>© 2026 Digital Supremacy LTD. All rights reserved.</p><p>Company number: 17183960</p></div>
        </div>
      </div>
    </div>
  );
}
