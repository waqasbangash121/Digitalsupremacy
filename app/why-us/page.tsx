import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import Link from "next/link";
import type { Metadata } from "next";
import "../retention-home.css";
import "./page.css";

export const metadata: Metadata = {
  title: "Why Us — Digital Supremacy",
  description: "Digital Supremacy",
};

const reasons = [
  { title: "Built around revenue, not just sending more emails", text: "Every flow, campaign, and send is tied to a specific revenue outcome. We don't fill calendars. We drive results.", icon: "revenue" },
  { title: "Systems that run consistently, not one-off efforts", text: "We build infrastructure that works 24/7 — automations, segmentation, and campaigns that compound over time without constant intervention.", icon: "system" },
  { title: "Strategy and execution working together", text: "Most agencies do one or the other. We do both. Strategy shapes every decision, and execution follows through — no gaps, no handoffs.", icon: "strategy" },
  { title: "Focused on long-term customer value", text: "We're not chasing open rates. We're building retention — repeat buyers, higher LTV, and a list that actually wants to hear from you.", icon: "value" },
];

function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ReasonIcon({ type }: { type: string }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {type === "revenue" ? <><path d="M4 18V6m0 12h16M8 14l4-4 3 2 5-7m-5 0h5v5" /></> : type === "system" ? <><rect x="8" y="3" width="8" height="5" rx="1" /><rect x="2" y="16" width="7" height="5" rx="1" /><rect x="15" y="16" width="7" height="5" rx="1" /><path d="M12 8v4M5 16v-4h14v4" /></> : type === "strategy" ? <><path d="m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7Z" /><path d="m8 12 3 3 5-6" /></> : <><path d="M20 8a5 5 0 0 0-8-4 5 5 0 0 0-8 4c0 5 8 12 8 12s8-7 8-12Z" /><path d="M8 11h3l1-3 2 6 1-3h2" /></>}
  </g></svg>;
}

export default function Page() {
  return <div className="retention-home why-us">
    <Link className="rh-skip" href="#main">Skip to content</Link>
    <SiteHeader />
    <main id="main">
      <section className="wu-hero rh-shell">
        <p className="rh-badge"><span />Why Us</p>
        <h1>Stop treating email<br /><span>like an afterthought.</span></h1>
        <p className="wu-lead">Done right, email can become one of your biggest revenue channels.</p>
        <div className="rh-actions">
          <Link className="rh-button" href="https://calendly.com/addyawan57/15min">Book a Call <Arrow /></Link>
          <Link className="rh-button rh-button-secondary" href="/case-studies">See the results <Arrow /></Link>
        </div>
      </section>

      <section className="rh-section rh-band">
        <div className="rh-shell">
          <div className="rh-heading rh-centered">
            <h2>Why brands work with us</h2>
            <p>Not just another email agency. A system built around what actually drives revenue.</p>
          </div>
          <div className="wu-reasons">{reasons.map((reason, index) => <article className="wu-reason" key={reason.title}>
            <div className="wu-card-top"><span className="rh-icon"><ReasonIcon type={reason.icon} /></span><span className="wu-number">0{index + 1}</span></div>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
            <span className="wu-card-rule" aria-hidden="true" />
          </article>)}</div>
        </div>
      </section>

      <section className="rh-section rh-shell">
        <div className="wu-feature">
          <div className="wu-video" id="videoWrap">
            <div className="wu-video-placeholder" id="videoPlaceholder">
              <span className="wu-play" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
              <p>Watch — how we turn email into a consistent revenue channel</p>
            </div>
          </div>
          <div className="wu-feature-copy">
            <h2>Most brands already have the audience.</h2>
            <p>What&apos;s missing is how <strong>everything works together</strong> — strategy, flows, and campaigns all aligned toward one thing: revenue.</p>
            <p>That&apos;s what we build.</p>
            <div className="wu-statement">A system that makes email consistent, structured, and worth the attention it gets.</div>
          </div>
        </div>
      </section>

      <section className="wu-scale">
        <div className="rh-shell"><h2>READY TO SCALE?</h2><Link className="rh-button" href="https://calendly.com/addyawan57/15min">BOOK A CALL <Arrow /></Link></div>
      </section>

      <section className="rh-section wu-booking" id="calendly">
        <div className="wu-booking-card">
          <div><h2>Ready to make email a <span>real</span> part of your revenue?</h2><p>Book a free 15-minute call. We&apos;ll look at your setup and tell you exactly what we&apos;d fix first — no pitch, no fluff.</p></div>
          <div className="wu-booking-actions"><Link className="rh-button" href="https://calendly.com/addyawan57/15min">Book a Call <Arrow /></Link><Link className="rh-button rh-button-secondary" href="/case-studies">See the results <Arrow /></Link></div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
