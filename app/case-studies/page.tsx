import type { Metadata } from "next";
import Image from "next/image";

import SiteInteractions from "@/components/site-interactions";
import "./page.css";

export const metadata: Metadata = {
  title: "Case Studies — Digital Supremacy",
  description:
    "Real Digital Supremacy case studies covering email revenue growth, customer retention, lead generation, and full-funnel marketing systems.",
};

type Stat = {
  value: string;
  label: string;
  variant?: "highlight" | "positive";
};

type Phase = {
  title: string;
  description: string;
};

type Result = {
  label: string;
  value: string;
  description: string;
  tone?: "red" | "green";
};

type CaseStudy = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  period: string;
  stats: Stat[];
  situationTitle: string;
  situationHeading: string;
  situationPoints: string[];
  changeTitle: string;
  changeHeading: string;
  changePoints: string[];
  phases: Phase[];
  results: Result[];
  difference: string[];
  closing: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "wellness",
    tag: "Health & Wellness · Physician-led Brand",
    title:
      "From Stagnant to +325% Growth — Email Revenue Rebuilt for a 60+ Wellness Audience",
    subtitle:
      "A full rebuild from inconsistent messaging to a structured, revenue-driving system that matched the brand and its audience.",
    period: "Nov 2025 → Apr 2026",
    stats: [
      {
        value: "$197K",
        label: "Attributed email revenue",
        variant: "highlight",
      },
      {
        value: "+325%",
        label: "Revenue growth vs previous period",
        variant: "positive",
      },
      {
        value: "771K",
        label: "Total recipients reached",
        variant: "highlight",
      },
      {
        value: "+946%",
        label: "Growth in audience reach",
        variant: "positive",
      },
    ],
    situationTitle: "Where they were",
    situationHeading: "A strong brand with a broken email channel",
    situationPoints: [
      "The core audience was 60+, but the content did not feel designed for them.",
      "Emails were visually inconsistent and outdated.",
      "Messaging did not match the calm, physician-guided tone of the brand.",
      "Campaigns were sent without a clear journey or lifecycle structure.",
      "Lead generation was stagnant because capture forms were too generic.",
    ],
    changeTitle: "What needed to change",
    changeHeading: "Align the email experience with the actual customer",
    changePoints: [
      "Design for clarity, readability, and trust, especially for an older audience.",
      "Simplify messaging and align it with the brand voice.",
      "Structure how users enter, move, and convert within email.",
      "Fix lead generation with intent-based capture systems.",
      "Build campaigns as a journey instead of isolated email blasts.",
    ],
    phases: [
      {
        title: "Understand before changing anything",
        description:
          "Before strategy or design, we focused on alignment with stakeholders and brand owners so the email system reflected the long-term vision, audience needs, and trust standards.",
      },
      {
        title: "Fix the entry point: lead generation",
        description:
          "We introduced always-on signup forms, campaign-specific forms tied to seasonal moments, and event-triggered forms so the system adapted to why users were visiting.",
      },
      {
        title: "Rebuild the visual experience",
        description:
          "We created clean, minimal branded templates with strong visual hierarchy, better spacing, mobile-friendly structure, and readability for older audiences.",
      },
      {
        title: "Build the strategy, not just the sends",
        description:
          "Monthly campaign planning, lifecycle flows, and messaging around real user needs helped every email serve a specific purpose.",
      },
      {
        title: "Turn campaigns into journeys",
        description:
          "Pre-launch, launch, reminder, and final-call sequences made campaigns feel like guided experiences instead of marketing noise.",
      },
    ],
    results: [
      {
        label: "Revenue",
        value: "$197,395",
        description: "Attributed email revenue",
        tone: "red",
      },
      {
        label: "Growth",
        value: "+325.78%",
        description: "Compared with the previous period",
        tone: "green",
      },
      {
        label: "Campaigns",
        value: "$144K+",
        description: "Campaign-driven revenue",
        tone: "red",
      },
      {
        label: "Audience reach",
        value: "771,422",
        description: "Total recipients reached",
        tone: "green",
      },
      {
        label: "Click rate",
        value: "1.97%",
        description: "Campaigns rated excellent",
        tone: "green",
      },
      {
        label: "Flow click rate",
        value: "8.62%",
        description: "Improved from near zero",
        tone: "green",
      },
    ],
    difference: [
      "Strategy came before design, so the emails supported real customer behavior.",
      "Templates were rebuilt for clarity instead of decoration.",
      "Campaigns were planned as sequences instead of disconnected sends.",
      "Lead capture was matched to intent, timing, and campaign context.",
    ],
    closing:
      "The result was not just a better-looking email channel. It became a structured revenue system that felt aligned with the brand and easier for the customer to trust.",
  },
  {
    id: "retention",
    tag: "Consumer Brand · Email Strategy & Retention",
    title:
      "Revenue, Reach, and Retention Rebuilt Through a Cleaner Lifecycle System",
    subtitle:
      "A practical email marketing system that improved campaign consistency, customer follow-up, and retention without adding unnecessary complexity.",
    period: "Dec 2025 → Apr 2026",
    stats: [
      {
        value: "+98.2%",
        label: "Conversion growth",
        variant: "positive",
      },
      {
        value: "650K",
        label: "Recipients reached",
        variant: "highlight",
      },
      {
        value: "$10.7K",
        label: "Flow revenue",
        variant: "highlight",
      },
      {
        value: "75",
        label: "Deliverability score",
        variant: "positive",
      },
    ],
    situationTitle: "Where they were",
    situationHeading: "A growing brand with disconnected retention activity",
    situationPoints: [
      "The business had customer interest, but the email journey was not structured.",
      "Campaigns were inconsistent and often disconnected from customer behavior.",
      "Follow-up after the first interaction relied too heavily on manual work.",
      "There was no clear rhythm for nurturing leads or re-engaging past buyers.",
      "The team needed a system that could scale without becoming hard to manage.",
    ],
    changeTitle: "What needed to change",
    changeHeading: "Create a simple system for repeatable communication",
    changePoints: [
      "Organize the customer journey around lifecycle stages.",
      "Create a clearer campaign calendar and retention rhythm.",
      "Improve follow-up so interested customers were not lost after the first touch.",
      "Use email content to educate, reassure, and guide buyers.",
      "Track the right performance indicators so the system could keep improving.",
    ],
    phases: [
      {
        title: "Map the customer journey",
        description:
          "We identified the main stages from first contact to repeat purchase and clarified what each stage needed from the email experience.",
      },
      {
        title: "Create the campaign structure",
        description:
          "We organized campaigns around product education, customer timing, seasonal moments, and conversion intent.",
      },
      {
        title: "Improve follow-up flows",
        description:
          "We built practical lifecycle flows that gave leads and buyers a clearer path after their first interaction.",
      },
      {
        title: "Refine copy and messaging",
        description:
          "Email copy was rewritten to feel clearer, more useful, and more connected to customer needs.",
      },
      {
        title: "Measure and improve",
        description:
          "We focused on revenue, reach, clicks, flow performance, deliverability, and customer re-engagement to guide future improvements.",
      },
    ],
    results: [
      {
        label: "Conversion growth",
        value: "+98.2%",
        description: "Improvement in conversions",
        tone: "green",
      },
      {
        label: "Recipients reached",
        value: "650,709",
        description: "+304.2% compared with the previous period",
        tone: "green",
      },
      {
        label: "Flow revenue",
        value: "$10,769",
        description: "From near zero to a measurable revenue channel",
        tone: "red",
      },
      {
        label: "Deliverability score",
        value: "75",
        description: "Rated good with a 1.81% click rate",
        tone: "green",
      },
      {
        label: "Lifecycle system",
        value: "Built",
        description: "Campaigns and flows became easier to manage",
        tone: "green",
      },
      {
        label: "Manual work",
        value: "Reduced",
        description: "Follow-up became more consistent",
        tone: "green",
      },
    ],
    difference: [
      "The system was built around the way customers moved through the business.",
      "Retention work became more consistent and less dependent on manual reminders.",
      "Email strategy was tied to measurable outcomes, not just sends and open rates.",
      "The brand gained a practical foundation for future growth.",
    ],
    closing:
      "The biggest improvement was structure. Once the business had a clearer lifecycle system, the email channel became easier to manage, measure, and scale.",
  },
];

const deliverabilityRows = [
  ["Campaign click rate", "1.97%", "Excellent"],
  ["Flow click rate", "8.62%", "Strong"],
  ["Deliverability score", "75", "Good"],
  ["Audience growth", "+304.2%", "Improved"],
];

function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="stat-strip">
      {stats.map((stat) => (
        <div className="stat-item" key={`${stat.value}-${stat.label}`}>
          <div className="stat-item-val">
            {stat.variant ? (
              <span className={stat.variant}>{stat.value}</span>
            ) : (
              stat.value
            )}
          </div>
          <div className="stat-item-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function PointList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function CaseStudySection({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="container">
      <article className="case-study" id={caseStudy.id}>
        <div className="cs-header">
          <div>
            <div className="cs-tag">{caseStudy.tag}</div>
            <h2 className="cs-title">{caseStudy.title}</h2>
            <p className="cs-subtitle">{caseStudy.subtitle}</p>
          </div>
          <div className="cs-period">
            <div className="cs-period-label">Project period</div>
            <div className="cs-period-val">{caseStudy.period}</div>
          </div>
        </div>

        <StatStrip stats={caseStudy.stats} />

        <section className="cs-story">
          <div className="cs-story-title">The situation</div>
          <div className="two-col">
            <div className="col-block">
              <div className="col-block-label">{caseStudy.situationTitle}</div>
              <h3>{caseStudy.situationHeading}</h3>
              <PointList items={caseStudy.situationPoints} />
            </div>
            <div className="col-block solution">
              <div className="col-block-label">{caseStudy.changeTitle}</div>
              <h3>{caseStudy.changeHeading}</h3>
              <PointList items={caseStudy.changePoints} />
            </div>
          </div>
        </section>

        <section className="cs-story">
          <div className="cs-story-title">How we did it</div>
          <div className="phases">
            {caseStudy.phases.map((phase, index) => (
              <div className="phase" key={phase.title}>
                <div className="phase-num">{index + 1}</div>
                <div className="phase-content">
                  <div className="phase-title">{phase.title}</div>
                  <div className="phase-desc">{phase.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-story">
          <div className="cs-story-title">The results</div>
          <div className="results-grid">
            {caseStudy.results.map((result) => (
              <div className="result-card" key={`${result.label}-${result.value}`}>
                <div className="result-card-label">{result.label}</div>
                <div className={`result-card-num ${result.tone ?? "red"}`}>
                  {result.value}
                </div>
                <div className="result-card-sub">{result.description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-story">
          <div className="cs-story-title">What made the difference</div>
          <div className="diff-block">
            <h3>Why the system worked</h3>
            <ul className="diff-list">
              {caseStudy.difference.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="cs-closing">
          <strong>Bottom line:</strong> {caseStudy.closing}
        </div>
      </article>
    </div>
  );
}

function DeliverabilityTable() {
  return (
    <div className="container">
      <section className="case-study" aria-labelledby="deliverability-title">
        <div className="cs-story">
          <div className="cs-story-title">Performance quality</div>
          <h2 className="cs-title" id="deliverability-title">
            Deliverability and engagement stayed healthy while reach expanded.
          </h2>
          <p className="cs-subtitle">
            Growth only matters when the channel remains trustworthy. These
            indicators showed the email system was not just sending more, but
            also becoming more useful.
          </p>
        </div>

        <table className="deliv-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Result</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliverabilityRows.map(([metric, result, status]) => (
              <tr key={metric}>
                <td>{metric}</td>
                <td>{result}</td>
                <td className="good">{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-cta">
          <div className="footer-cta-left">
            <h2>Want results like these for your business?</h2>
            <p>
              Let us turn your marketing activity into a structured system for
              leads, sales, retention, and email revenue.
            </p>
          </div>
          <a
            className="footer-cta-btn"
            href="https://calendly.com/addyawan57/15min"
            target="_blank"
            rel="noreferrer"
          >
            Book a Call
          </a>
        </div>

        <div className="footer-cols">
          <div>
            <div className="footer-brand-name">Digital Supremacy</div>
            <p className="footer-brand-desc">
              Marketing systems, email strategy, automation, and digital growth
              support for businesses that want clearer growth infrastructure.
            </p>
            <p className="footer-brand-email">
              <a href="mailto:hello@digitalsupremacy.co">
                hello@digitalsupremacy.co
              </a>
            </p>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-col-links">
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/case-studies">Case Studies</a>
              </li>
              <li>
                <a href="/why-us">Why Us</a>
              </li>
              <li>
                <a href="/team">Our Team</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-col-links">
              <li>
                <a href="/services">Email Marketing</a>
              </li>
              <li>
                <a href="/services">Funnels</a>
              </li>
              <li>
                <a href="/services">Automation</a>
              </li>
              <li>
                <a href="/services">Retention</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Social</div>
            <ul className="footer-col-links">
              <li>
                <a
                  href="https://www.instagram.com/digital_supremacyy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1Bh3E86WuY/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Start</div>
            <ul className="footer-col-links">
              <li>
                <a
                  href="https://calendly.com/addyawan57/15min"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a Call
                </a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 Digital Supremacy. All rights reserved.</p>
          <p>Growth systems for modern businesses.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <>
      <SiteInteractions />
      <main className="page page--case-studies">
        <div className="case-studies-page">
          <div className="nav-wrap">
            <nav className="nav" aria-label="Primary navigation">
              <a href="/" className="logo" aria-label="Digital Supremacy home">
                <Image
                  src="/image/logo.png"
                  alt="Digital Supremacy Logo"
                  className="logo-img"
                  width={190}
                  height={50}
                  priority
                />
              </a>

              <ul className="nav-links">
                <li>
                  <a href="/services">Services</a>
                </li>
                <li>
                  <a href="/case-studies" className="active">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="/why-us">Why Us</a>
                </li>
                <li>
                  <a href="/team">Our Team</a>
                </li>
              </ul>

              <a
                className="nav-cta"
                href="https://calendly.com/addyawan57/15min"
                target="_blank"
                rel="noreferrer"
              >
                Book a Call
              </a>
            </nav>
          </div>

          <div className="container">
            <section className="page-hero">
              <p className="page-label">Case Studies</p>
              <h1>
                Proof your email can become one of your biggest revenue
                channels.
              </h1>
              <p>
                We break down the work behind the numbers, what we did, why we
                did it, and what changed.
              </p>
            </section>
          </div>

          {caseStudies.map((caseStudy) => (
            <CaseStudySection caseStudy={caseStudy} key={caseStudy.id} />
          ))}

          <DeliverabilityTable />

          <section className="cta-band">
            <div className="container">
              <div className="cta-inner">
                <h2>Build an email system that actually supports growth.</h2>
                <p>
                  Digital Supremacy helps businesses turn scattered marketing
                  activity into a clear system for acquisition, retention, and
                  revenue.
                </p>
                <div className="cta-btns">
                  <a
                    className="btn-primary"
                    href="https://calendly.com/addyawan57/15min"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Book a Call
                  </a>
                  <a className="btn-secondary" href="/services">
                    View Services
                  </a>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
