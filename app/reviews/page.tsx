import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ReviewVideo from "@/components/review-video";
import { reviews, type Review } from "@/lib/reviews";
import "./page.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Video Reviews — Digital Supremacy",
  description: "Hear directly from the founders and clients working with Digital Supremacy. Watch their original video testimonials.",
};

function Author({ review }: { review: Review }) {
  return <div className="rv-author">{review.image ? <Image src={review.image} width={42} height={42} alt={review.name} /> : <span className="rv-avatar" aria-hidden="true">{review.name.split(" ").map(part => part[0]).slice(0, 2).join("")}</span>}<div><strong>{review.name}</strong><span>{review.role}</span></div></div>;
}

export default function ReviewsPage() {
  const featured = reviews[0];
  return <div className="reviews-page">
    <a className="rv-skip" href="#reviews-main">Skip to content</a>
    <SiteHeader />
    <main className="rv-shell" id="reviews-main">
      <section className="rv-hero"><span className="rv-badge">● CLIENT STORIES</span><h1>Earned trust.<br /><span>Not just claimed.</span></h1><p>No quick wins. Just work that holds. Clients stay because we execute — and come back for more.</p><a className="rv-story-link" href="#client-stories">All Stories <span>↓</span></a></section>
      <section className="rv-featured" aria-labelledby="featured-title"><ReviewVideo review={featured} /><div className="rv-featured-copy"><p className="rv-eyebrow">FEATURED FOUNDER STORY</p><h2 id="featured-title">Working with Addy was nothing short of amazing.</h2><Author review={featured} /><blockquote>“{featured.quote}”</blockquote><div className="rv-tags"><span>Clear execution</span><span>Real partnership</span><span>Long-term trust</span></div><a className="rv-button" href={`https://drive.google.com/file/d/${featured.video}/view`} target="_blank" rel="noreferrer">Open full video review ↗</a></div></section>
      <section className="rv-stories" id="client-stories"><div className="rv-section-heading"><div><p className="rv-eyebrow">HEAR DIRECTLY FROM OUR CLIENTS</p><h2>Founder &amp; client video reviews</h2></div><p>Trusted by satisfied clients.<br />Their stories, in their own words.</p></div><div className="rv-grid">{reviews.map(review => <article className="rv-card" key={review.video}><ReviewVideo review={review} /><div className="rv-card-copy"><Author review={review} /><p>{review.quote}</p><a href={`https://drive.google.com/file/d/${review.video}/view`} target="_blank" rel="noreferrer">Watch full testimonial <span>↗</span></a></div></article>)}</div></section>
      <section className="rv-values" aria-label="Our approach"><div><span aria-hidden="true">✦</span><div><strong>Clear execution</strong><p>A clear plan, fast turnaround, and weekly momentum.</p></div></div><div><span aria-hidden="true">◇</span><div><strong>Real partnership</strong><p>We operate like an extension of your team.</p></div></div><div><span aria-hidden="true">↗</span><div><strong>Retention-first</strong><p>Email systems built for long-term customer value.</p></div></div></section>
      <section className="rv-brands" aria-label="Client brands"><p className="rv-eyebrow">TRUSTED BY DTC ECOMMERCE BRANDS</p><div>{[["/brands/milkmaid-logo-removebg-preview.avif", "Milkmaid Goods"], ["/brands/rb-beauty-logo-202212.avif", "RB Beauty"], ["/brands/SH_Logo_Horizontal_550x.avif", "Soraya Hennessy"], ["/brands/tutublue-logo-blue_UPF_e3912560-1957-4f87-a803-de8c3f59f88c.avif", "Tutublue"]].map(([src, name]) => <Image key={name} src={src} alt={name} width={140} height={50} />)}</div></section>
      <section className="rv-cta"><div><span className="rv-badge">● LET’S BUILD YOUR NEXT CHAPTER</span><h2>Ready to make email a real part of your revenue?</h2><p>Book a free 15-minute call. We&apos;ll look at your setup and tell you exactly what we&apos;d fix first — no pitch, no fluff.</p><div className="rv-cta-tags"><span>✓ Email strategy</span><span>✓ Flows &amp; campaigns</span><span>✓ Retention-first</span></div></div><div className="rv-booking"><p className="rv-eyebrow">YOUR NEXT STEP</p><h3>Let&apos;s talk about your email.</h3><p>Short call. We&apos;ll ask a few questions, then tell you exactly what we&apos;d fix first.</p><a className="rv-button" href="https://calendly.com/addyawan57/15min">Book Your Free Call →</a><small>Free 15-minute discovery call</small></div></section>
    </main>
    <SiteFooter />
  </div>;
}
