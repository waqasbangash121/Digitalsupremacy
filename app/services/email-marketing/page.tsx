import type { Metadata } from "next";
import ServicesShell from "@/components/services-shell";
import { ServiceHero, ServiceCapabilities, ServiceClosing } from "@/components/service-detail";
import Capabilities from "@/components/email-capabilities";
export const metadata: Metadata = { title: "Email Marketing — Digital Supremacy", description: "Every capability is designed to compound — strategy informs flows, flows support campaigns, and everything works together to grow your revenue." };
export default function Page() {
  return <ServicesShell><div className="service-detail">
    <ServiceHero label="Email Marketing" title="Make email your most reliable revenue channel." description="Every capability is designed to compound — strategy informs flows, flows support campaigns, and everything works together to grow your revenue." />
    <nav className="sd-capability-nav" aria-label="Email Marketing capabilities"><div className="sd-container">{[["strategy", "Email Strategy"], ["flows", "Flows"], ["campaigns", "Campaigns"], ["deliverability", "Deliverability"], ["leadgen", "Lead Generation"], ["platform", "Platform Management"]].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>
    <ServiceCapabilities label="Email Marketing capabilities"><Capabilities /></ServiceCapabilities>
    <ServiceClosing />
  </div></ServicesShell>;
}
