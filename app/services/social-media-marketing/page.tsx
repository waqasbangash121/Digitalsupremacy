import type { Metadata } from "next";
import ServicesShell from "@/components/services-shell";

export const metadata: Metadata = {
  title: "Social Media Marketing — Digital Supremacy",
  description: "Social strategy, content planning, and community management for ecommerce brands.",
};

const capabilities = [
  { title: "Social Strategy", tagline: "A clear direction for your brand.", description: "Build a social presence around your audience, your positioning, and your business goals.", items: ["Audience and channel planning", "Brand voice and content pillars", "Content calendar planning", "Campaign direction"] },
  { title: "Content & Campaigns", tagline: "Give your audience a reason to engage.", description: "Bring your brand to life with thoughtful content and coordinated campaigns across your social channels.", items: ["Content planning and creative direction", "Social copy and publishing", "Product launch campaigns", "Seasonal content and promotions"] },
  { title: "Community Management", tagline: "Turn attention into relationships.", description: "Keep the conversation moving with consistent community engagement that reflects your brand.", items: ["Comment and message management", "Audience engagement", "Community feedback", "Brand voice consistency"] },
  { title: "Reporting & Optimisation", tagline: "Learn from every campaign.", description: "Use performance insights to refine your content, strengthen engagement, and guide your next steps.", items: ["Channel performance reporting", "Content and engagement analysis", "Campaign reviews", "Ongoing optimisation"] },
];

export default function Page() {
  return <ServicesShell>
    <div className="container"><header className="page-hero">
      <p className="page-label">Social Media Marketing</p>
      <h1>A brand your audience wants to follow.</h1>
      <div className="hero-bottom"><p>Build a consistent presence with a clear strategy, thoughtful content, and conversations that bring your audience closer.</p><a className="btn-primary" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a free call ↗</a></div>
    </header>
    <p className="capabilities-label">Social Media Marketing capabilities</p>
    <div className="services-wrap">{capabilities.map((capability, index) => <section className="service-block" key={capability.title}>
      <div className="service-left"><p className="service-number">0{index + 1}</p><h2 className="service-title">{capability.title}</h2><p className="service-tagline">{capability.tagline}</p></div>
      <div className="service-right"><p className="service-intro">{capability.description}</p><ul className="service-list">{capability.items.map(item => <li key={item}>{item}</li>)}</ul></div>
    </section>)}</div></div>
  </ServicesShell>;
}
