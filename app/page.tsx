import BrandLogo from "@/components/brand-logo";
import SiteFooter from "@/components/site-footer";
import HomeReviews from "@/components/home-reviews";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import "./retention-home.css";

export const metadata: Metadata = {
  title: "Digital Supremacy — Email Marketing for DTC Brands",
  description: "Retention marketing for DTC ecommerce brands. Digital Supremacy builds email systems that turn traffic, subscribers, and customers into consistent revenue.",
};

const brands = [
  ["/brands/Logo_8.avif", "Client brand"],
  ["/brands/milkmaid-logo-removebg-preview.avif", "Milkmaid Goods"],
  ["/brands/rb-beauty-logo-202212.avif", "RB Beauty"],
  ["/brands/SH_Logo_Horizontal_550x.avif", "Soraya Hennessy"],
  ["/brands/tutublue-logo-blue_UPF_e3912560-1957-4f87-a803-de8c3f59f88c.avif", "Tutublue"],
  ["/brands/Black_2b09822c-f14c-4677-b141-81badfee1e77.avif", "Client brand"],
  ["/brands/opolis-white.webp", "Opolis"],
  ["/brands/logo.webp", "PicturesOnGold"],
];
const capabilities = [
  { icon: "flow", title: "Automations that convert", text: "Flows that sell while you sleep, from welcome to winback, every touchpoint earns its place.", label: "Flows", href: "/services/email-marketing#flows" },
  { icon: "mail", title: "Campaigns that drive revenue", text: "Weekly sends built to move product, not just fill the calendar.", label: "Campaigns", href: "/services/email-marketing#campaigns" },
  { icon: "shield", title: "Deliverability that holds", text: "Cleaner lists, better inbox placement, stronger engagement, built in from day one.", label: "Deliverability", href: "/services/email-marketing#deliverability" },
  { icon: "support", title: "24/7 support", text: "We don't clock out. Questions, tweaks, or fires, we're on it around the clock.", label: "Platform Management", href: "/services/email-marketing#platform" },
];
const cases = [
  { image: 1, industry: "Hair & Beauty · Last 6 months", metric: "$696K", title: "in last 6 months for a hair and beauty brand.", period: "Nov 2025 – Apr 2026", detail: "↑ 5.83% vs. previous period", alt: "Hair brand Klaviyo dashboard" },
  { image: 2, industry: "Health & Wellness · Last 6 months", metric: "379%", title: "growth in attributed revenue. Same list. Better system.", period: "Oct 2025 – Apr 2026", detail: "↑ 379.03% vs. previous period", alt: "Wellness brand dashboard" },
  { image: 3, industry: "Fashion & Lifestyle · Jun 2025 – Apr 2026", metric: "$1.1M", title: "in total email revenue. 7.7M sends. 120K subscribers built.", period: "Jun 1, 2025 – Apr 17, 2026", detail: "Key metrics", alt: "Apparel brand metrics" },
];
const reasons = [
  ["Clear execution", "A clear plan, fast turnaround, and weekly momentum. No chaos, no last-minute scrambles."],
  ["Data-led strategy", "Every send has a reason. Built and iterated based on performance, customer behaviour, and real results."],
  ["Inbox protection", "Deliverability is built in. List hygiene, engagement rules, and smart sending so performance holds as you scale."],
  ["Real partnership", "We operate like an extension of your team. Clear communication, honest feedback, and shared goals."],
];
const steps = [
  ["Discovery & Audit", "We deep-dive your existing setup, audience, and goals then map out a strategy built around your brand."],
  ["Build & Launch", "Our team designs, writes, and deploys your campaigns and automations with speed and precision."],
  ["Optimise & Scale", "We analyse every send, run tests, and push performance higher month after month."],
];

function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
function Icon({ type }: { type: string }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{type === "mail" ? <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" /></> : type === "shield" ? <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
        <path d="m8 12 3 3 5-6" /></> : type === "support" ? <>
          <path d="M4 13v-1a8 8 0 0 1 16 0v1M20 17v2l-6 2" />
          <rect x="2" y="11" width="5" height="7" rx="2" />
          <rect x="17" y="11" width="5" height="7" rx="2" /></> : <>
      <rect x="9" y="2" width="6" height="5" rx="1" />
      <rect x="2" y="17" width="6" height="5" rx="1" />
      <rect x="16" y="17" width="6" height="5" rx="1" />
      <path d="M12 7v5M5 17v-5h14v5" /></>}</g>
  </svg>;
}
function AuditLink({ children = "Get my audit" }: { children?: React.ReactNode }) {
  return <Link className="rh-button" href="https://calendly.com/addyawan57/15min">{children}<Arrow />
  </Link>;
}

export default function Page() {
  return <div className="retention-home">
    <Link className="rh-skip" href="#main">Skip to content</Link>
    <SiteHeader />
    <main id="main">
      <section className="rh-hero rh-shell">
        <div className="rh-hero-copy">
          <p className="rh-badge">
            <span />For DTC e-commerce brands</p>
          <h1>Turn email into your <span>highest-performing</span> revenue channel.</h1>
          <p className="rh-lead">Running ads without a retention system is burning money. We build the system that turns your traffic into consistent revenue.</p>
          <div className="rh-actions">
            <AuditLink />
            <Link className="rh-button rh-button-secondary" href="/case-studies">See our work <Arrow />
            </Link>
          </div>
          <div className="rh-hero-proof">
            <div className="rh-avatars">
              <Image src="/reviews/eric-jamal.png" width={34} height={34} alt="Eric Jamal" />
              <Image src="/reviews/ruma.png" width={34} height={34} alt="Ruma" />
              <Image src="/reviews/robert.png" width={34} height={34} alt="Client" />
            </div>
            <div>
              <strong>50+ DTC brands — and counting</strong>
              <span>Brands scaled. Not just onboarded.</span>
            </div>
          </div>
        </div>
        <aside className="rh-dashboard" aria-label="Client results overview">
          <div className="rh-dashboard-head">
            <span>
              <i />Real Klaviyo dashboards.<br />
              <strong>Real results.</strong>
            </span>
            <span className="rh-small-tag">Hair & Beauty</span>
          </div>
          <div className="rh-dashboard-numbers">
            <div>
              <p>Email revenue</p>
              <strong>$696K</strong>
              <small>Nov 2025 – Apr 2026</small>
            </div>
            <div>
              <p>Previous period</p>
              <strong className="rh-red">↑ 5.83%</strong>
              <small>Last 6 months</small>
            </div>
          </div>
          <div className="rh-dashboard-image">
            <Image src="/results/client-1.jpg" width={900} height={400} alt="Hair brand Klaviyo dashboard" priority />
          </div>
          <div className="rh-dashboard-bottom">
            <span>Average client revenue from email marketing</span>
            <strong>45%</strong>
          </div>
        </aside>
      </section>
      <section className="rh-brand-section">
        <div className="rh-shell">
          <p className="rh-eyebrow">Brands we&apos;ve worked with</p>
          <div className="rh-brand-grid">{brands.map(([src, alt]) => <Image src={src} alt={alt} width={140} height={48} key={src} />)}</div>
        </div>
      </section>
      <section className="rh-metrics rh-shell" aria-label="Client performance">
        <div className="rh-metric-grid">{[["Average client revenue from email marketing", "45%", "Email marketing"], ["Generated for clients", "$50M+", "Client revenue"], ["Return on investment (ROI)", "90%", "In as little as 60 days"], ["DTC brands — and counting", "50+", "Brands scaled. Not just onboarded."]].map(([label, value, detail]) => <div className="rh-metric" key={label}>
          <p>{label}<Arrow />
          </p>
          <strong>{value}</strong>
          <span>{detail}</span>
        </div>)}</div>
        <p className="rh-fine">Figures are based on aggregated client results. See <Link href="/case-studies">case studies</Link> for examples.</p>
      </section>
      <section className="rh-section rh-band" id="services">
        <div className="rh-shell">
          <div className="rh-heading rh-centered">
            <p className="rh-eyebrow">What we deliver</p>
            <h2>Results your list is<br />already capable of.</h2>
            <p>We don&apos;t change your audience. We change what you do with them.</p>
          </div>
          <div className="rh-capability-grid">{capabilities.map(item => <article className="rh-capability" key={item.title}>
            <span className="rh-icon">
              <Icon type={item.icon} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link href={item.href} className="rh-card-foot">
              <span>{item.label}</span>
              <Arrow />
            </Link>
          </article>)}</div>
        </div>
      </section>
      <section className="rh-section rh-shell" id="mission">
        <div className="rh-mission-panel">
          <div>
            <p className="rh-eyebrow">Our Mission</p>
            <h2>Email isn&apos;t a nice-to-have.<br />It&apos;s your biggest<br />
              <span>revenue lever.</span>
            </h2>
            <p className="rh-body-copy">Most DTC brands are sitting on a goldmine and barely scratching the surface. <strong>We fix that.</strong> Automations that run 24/7, campaigns built with intent, and deliverability that protects your list as you grow.</p>
            <span className="rh-availability">
              <i />Actively taking on new clients</span>
          </div>
          <div className="rh-mission-details">
            <p className="rh-eyebrow">Return on investment</p>
            <h3>Email is your <span>highest-margin</span> channel. Full stop.</h3>
            <p>We make the numbers impossible to ignore.</p>
            <div className="rh-inbox">
              <Icon type="shield" />
              <div>
                <strong>We get you seen — not filtered.</strong>
                <p>Proven on retention accounts where inbox placement meant the difference between growth and churn.</p>
              </div>
            </div>
            <AuditLink>Schedule a call</AuditLink>
          </div>
        </div>
      </section>
      <section className="rh-section rh-band" id="cases">
        <div className="rh-shell">
          <div className="rh-heading rh-split-heading">
            <div>
              <p className="rh-eyebrow">Case Studies</p>
              <h2>The numbers speak.<br />We build the system.</h2>
              <p>Real Klaviyo dashboards. Real results.</p>
            </div>
            <Link className="rh-inline-link" href="/case-studies">See our work <Arrow />
            </Link>
          </div>
          <div className="rh-cases-grid">{cases.map(item => <article className="rh-case" key={item.image}>
            <div className="rh-case-top">
              <p className="rh-eyebrow">{item.industry}</p>
              <span className="rh-small-tag">{item.detail}</span>
            </div>
            <h3>
              <strong>{item.metric}</strong> {item.title}</h3>
            <p className="rh-case-period">{item.period}</p>
            <div className="rh-case-image">
              <Image src={`/results/client-${item.image}.jpg`} width={1100} height={500} alt={item.alt} />
            </div>
            <Link className="rh-card-foot" href="/case-studies">
              <span>{item.detail}</span>
              <span>Case Studies <Arrow />
              </span>
            </Link>
          </article>)}</div>
        </div>
      </section>
      <section className="rh-section rh-shell" id="why">
        <div className="rh-partnership-panel">
          <div className="rh-partnership-proof">
            <BrandLogo width={290} />
            <div>
              <strong>50<span>+</span>
              </strong>
              <p>DTC brands — and counting</p>
            </div>
            <p>Brands scaled.<br />Not just onboarded.</p>
          </div>
          <div className="rh-partnership-copy">
            <p className="rh-eyebrow">Why clients trust us</p>
            <h2>No fluff.<br />Just execution.</h2>
            <p>Every account gets a dedicated strategist. No juniors, no handoffs.</p>
            <div className="rh-reasons-grid">{reasons.map(([title, text]) => <div key={title}>
              <h3>
                <span aria-hidden="true">✓</span>{title}</h3>
              <p>{text}</p>
            </div>)}</div>
          </div>
        </div>
      </section>
      <section className="rh-section rh-process rh-shell" id="process">
        <div className="rh-heading rh-centered">
          <p className="rh-eyebrow">How it works</p>
          <h2>From day one to done deal.</h2>
        </div>
        <div className="rh-process-grid">{steps.map(([title, text], index) => <div key={title}>
          <span className="rh-step-number">0{index + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>)}</div>
      </section>
      <section className="rh-section rh-band" id="reviews">
        <div className="rh-shell">
          <div className="rh-heading rh-centered">
            <p className="rh-eyebrow">Trusted by satisfied clients</p>
            <h2>Earned trust. Not just claimed.</h2>
            <p>No quick wins. Just work that holds. Clients stay because we execute — and come back for more.</p>
          </div>
          <HomeReviews />
          <div className="rh-trust-tags">{["DTC E-commerce", "Klaviyo", "Retention-first", "Long-term partnerships", "Email Systems"].map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
      </section>
      <section className="rh-section rh-booking-section" id="calendly">
        <div className="rh-booking-card">
          <p className="rh-eyebrow">Book a call</p>
          <h2>Let&apos;s talk about your email.</h2>
          <p>Short call. We&apos;ll ask a few questions, then tell you exactly what we&apos;d fix first.</p>
          <div className="rh-booking-steps">{steps.map(([title], index) => <div key={title}>
            <span>0{index + 1}</span>{title}</div>)}</div>
          <AuditLink>Schedule a Meeting</AuditLink>
          <Link className="rh-booking-email" href="mailto:addy@yourdigitalsupremacy.com">addy@yourdigitalsupremacy.com</Link>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
