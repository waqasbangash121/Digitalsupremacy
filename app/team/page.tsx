import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import Link from "next/link";
import type { Metadata } from "next";
import { getTeamMembers, type TeamMember } from "@/lib/db";
import "./page.css";

export const metadata: Metadata = {
  title: "Our Team — Digital Supremacy",
  description: "Meet the senior strategists, copywriters, designers, and Klaviyo specialists behind Digital Supremacy’s retention systems.",
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

const principles = [
  { icon: "chart", title: "Revenue over vanity metrics", text: "Open rates don’t pay your bills. We build around incremental revenue, repeat purchases, and the long-term value of your customers.", focus: "Revenue, repeat purchases, and customer lifetime value" },
  { icon: "chat", title: "Direct senior communication", text: "Work directly with the people building your retention system. Clear updates, honest answers, and a dedicated strategist who knows your brand.", focus: "Dedicated strategists and clear communication" },
  { icon: "test", title: "Obsessive data rigor", text: "Every send has a reason. We test creative, segmentation, and timing, then use customer behavior and performance to decide what comes next.", focus: "Testing, segmentation, and continuous improvement" },
  { icon: "shield", title: "A partnership built to last", text: "We operate like an extension of your team. Your goals shape our strategy, and consistent execution keeps your retention system moving forward.", focus: "Shared goals and long-term partnerships" },
];

function PrincipleIcon({ type }: { type: string }) {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{type === "chart" ? <><path d="M4 20h16M6 16v-5m6 5V5m6 11V8" /></> : type === "chat" ? <><path d="M20 15a2 2 0 0 1-2 2H9l-5 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" /><path d="M8 8h8M8 12h5" /></> : type === "test" ? <><path d="M9 3h6m-5 0v7L4 19a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-9V3M8 15h8" /></> : <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" /><path d="m8 12 3 3 5-6" /></>}</g></svg>;
}

function Portrait({ member, large = false }: { member: TeamMember; large?: boolean }) {
  return <div className={`tp-portrait${large ? " tp-portrait-large" : ""}`}>
    {member.image_url ? <img src={member.image_url} alt={`${member.name}, ${member.role}`} /> : <span aria-label={member.name}>{member.initials}</span>}
  </div>;
}

export default async function TeamPage() {
  const members = await getTeamMembers();
  const founder = members.find(member => member.is_founder);
  const team = members.filter(member => member.id !== founder?.id);
  return <div className="team-page">
    <Link className="tp-skip" href="#main">Skip to content</Link>
    <SiteHeader />
    <main id="main">
      <section className="tp-hero">
        <div className="tp-shell">
          <p className="tp-badge"><span />The retention specialists</p>
          <h1>Built by Operators.<br /><span>Run by Growth Architects.</span></h1>
          <p className="tp-intro">Meet the strategists, Klaviyo specialists, copywriters, and designers building retention systems that turn customers into consistent revenue.</p>
          <div className="tp-proof" aria-label="Our approach and results">
            {[["Senior", "Talent on every account"], ["Direct", "Access to your strategist"], ["$50M+", "Generated for clients"], ["50+", "DTC brands served"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>
      {founder && <section className="tp-shell tp-founder-section" aria-labelledby="founder-title">
        <article className="tp-founder">
          <div className="tp-founder-photo"><Portrait member={founder} large /><span className="tp-photo-label"><i />Founder spotlight</span></div>
          <div className="tp-founder-copy">
            <p className="tp-eyebrow">Founder spotlight <span>· Digital Supremacy</span></p>
            <h2 id="founder-title">{founder.name}</h2>
            <p className="tp-founder-role">{founder.role}</p>
            <p className="tp-body">{founder.bio || "Leading a team built around strategy, thoughtful creative, and consistent execution. Every account gets a clear plan and a hands-on partnership from day one."}</p>
            <div className="tp-founder-tags">{[["Strategy", "Built around your brand"], ["Execution", "Hands-on from day one"], ["Retention", "Long-term growth"]].map(([title, detail]) => <div key={title}><strong>{title}</strong><span>{detail}</span></div>)}</div>
            <div className="tp-founder-note"><span aria-hidden="true">“</span><p>Our focus is simple: build email systems that turn traffic, subscribers, and customers into consistent revenue.</p><small>The Digital Supremacy approach</small></div>
            <MemberSocialLinks member={founder} compact />
          </div>
        </article>
      </section>}
      {team.length > 0 && <section className="tp-section tp-band" aria-labelledby="squad-title">
        <div className="tp-shell">
          <div className="tp-heading tp-split"><div><p className="tp-eyebrow">The core squad</p><h2 id="squad-title">Leadership & Specialized Execution</h2></div><p>Strategy, copy, design, and Klaviyo execution — handled end to end by people who know their craft.</p></div>
          <div className="tp-team-grid">{team.map(member => <article className="tp-member" key={member.id}>
            <div className="tp-member-top"><Portrait member={member} /><span className="tp-member-tag">{member.tag || "Retention specialist"}</span></div>
            <h3>{member.name}</h3><p className="tp-member-role">{member.role}</p>
            {member.bio && <p className="tp-member-bio">{member.bio}</p>}
            <div className="tp-member-foot"><span>Specialization</span><strong>{member.tag || member.role}</strong></div>
            <MemberSocialLinks member={member} compact />
          </article>)}</div>
        </div>
      </section>}
      <section className="tp-section" aria-labelledby="principles-title"><div className="tp-shell">
        <div className="tp-heading tp-centered"><p className="tp-eyebrow">How we operate</p><h2 id="principles-title">Core Operating Principles</h2><p>A focused retention playbook and a hands-on partnership, built around clear results.</p></div>
        <div className="tp-principles">{principles.map((principle, index) => <article className="tp-principle" key={principle.title}>
          <div className="tp-principle-head"><span className="tp-icon"><PrincipleIcon type={principle.icon} /></span><div><p className="tp-eyebrow">Principle 0{index + 1}</p><h3>{principle.title}</h3></div></div>
          <p className="tp-body">{principle.text}</p><div className="tp-focus"><span aria-hidden="true">◎</span> Focus: {principle.focus}</div>
        </article>)}</div>
      </div></section>
      <section className="tp-section tp-band" aria-labelledby="talent-title"><div className="tp-shell tp-talent">
        <div><p className="tp-eyebrow">Our talent</p><h2 id="talent-title">A Dedicated Team of<br />Retention Operators</h2><p className="tp-body">A small, senior team built for speed and quality. We bring strategy, creative, and technical execution together so your brand keeps moving forward.</p><ul className="tp-checks"><li>A dedicated strategist on every account</li><li>Copy, design, and Klaviyo execution under one roof</li><li>Deliverability built in from day one</li></ul></div>
        <div className="tp-talent-grid">{[["50+", "DTC brands", "Brands scaled. Not just onboarded."], ["45%", "Email revenue", "Average client revenue from email marketing."], ["24/7", "Support", "Questions, tweaks, or fires — we’re here."], ["End to end", "Execution", "One team, from strategy through launch."]].map(([value, title, text]) => <div key={title}><strong>{value}</strong><h3>{title}</h3><p>{text}</p></div>)}</div>
      </div></section>
      <section className="tp-shell tp-cta-section"><div className="tp-cta">
        <p className="tp-badge"><span />Let’s build your retention system</p>
        <h2>Work With A Dedicated Senior Retention Team</h2><p>Book a free call. We’ll look at your setup and tell you exactly what we’d fix first.</p>
        <div className="tp-actions"><Link className="tp-button" href="https://calendly.com/addyawan57/15min">Book Your Free Strategy Call <span aria-hidden="true">→</span></Link><Link className="tp-case-link" href="/case-studies">View Client Case Studies <span aria-hidden="true">↗</span></Link></div>
        <div className="tp-cta-details"><span>✓ No sales reps</span><span>✓ A clear plan</span><span>✓ Actionable insights</span></div>
      </div></section>
    </main>
    <SiteFooter />
  </div>;
}
