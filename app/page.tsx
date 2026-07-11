import type { Metadata } from "next";
import "./page.css";

import SiteInteractions from "@/components/site-interactions";

export const metadata: Metadata = {
  title: "Digital Supremacy — Email Marketing for DTC Brands",
  description: "Digital Supremacy",
};


export default function Page() {
  return (
    <>
      <SiteInteractions />
      <div className="page page--home">
      
<div className="nav-wrap">
  <nav className="nav">
    <div className="logo">
    <img src="image/logo.png" alt="Digital Supremacy Logo" className="logo-img" />
    </div>
            <ul className="nav-links">
      <li><a href="/services">Services</a></li>
      <li><a href="/case-studies">Case Studies</a></li>
      <li><a href="/why-us">Why Us</a></li>
      <li><a href="/team">Our Team</a></li>
    </ul>
    <button className="btn-primary" data-scroll-target="calendly">Get my audit</button>
  </nav>
</div>


<div className="container">
  <section className="hero">
    <p className="hero-label fade-up d1">For DTC e-commerce brands</p>
    <h1 className="fade-up d2">
      Turn email into your<br /><span className="accent">highest-performing</span> revenue channel.
    </h1>
    <p className="hero-sub fade-up d3">Running ads without a retention system is burning money. We build the system that turns your traffic into consistent revenue.</p>
    <div className="hero-btns fade-up d4">
      <button className="btn-primary" data-scroll-target="calendly">Get my audit</button>
      <button className="btn-secondary" data-scroll-target="cases">See our work</button>
    </div>
  </section>
</div>


<div className="brands-section">
  <p className="brands-label">Brands we've worked with</p>
  <div className="slider-outer">
    <div className="slider-track">
      <div className="brand-logo"><img src="/brands/Logo_8.avif" alt="Logo 8" /></div>
      <div className="brand-logo"><img src="/brands/milkmaid-logo-removebg-preview.avif" alt="Milkmaid Goods" /></div>
      <div className="brand-logo"><img src="/brands/rb-beauty-logo-202212.avif" alt="RB Beauty" /></div>
      <div className="brand-logo"><img src="/brands/SH_Logo_Horizontal_550x.avif" alt="Soraya Hennessy" /></div>
      <div className="brand-logo"><img src="/brands/tutublue-logo-blue_UPF_e3912560-1957-4f87-a803-de8c3f59f88c.avif" alt="Tutublue" /></div>
      <div className="brand-logo"><img src="/brands/Black_2b09822c-f14c-4677-b141-81badfee1e77.avif" alt="Brand logo" /></div>
      <div className="brand-logo"><img src="/brands/opolis-white.webp" alt="Opolis" /></div>
      <div className="brand-logo"><img src="/brands/logo.webp" alt="PicturesOnGold" /></div>
      <div className="brand-logo"><img src="/brands/Logo_8.avif" alt="Logo 8" /></div>
      <div className="brand-logo"><img src="/brands/milkmaid-logo-removebg-preview.avif" alt="Milkmaid Goods" /></div>
      <div className="brand-logo"><img src="/brands/rb-beauty-logo-202212.avif" alt="RB Beauty" /></div>
      <div className="brand-logo"><img src="/brands/SH_Logo_Horizontal_550x.avif" alt="Soraya Hennessy" /></div>
      <div className="brand-logo"><img src="/brands/tutublue-logo-blue_UPF_e3912560-1957-4f87-a803-de8c3f59f88c.avif" alt="Tutublue" /></div>
      <div className="brand-logo"><img src="/brands/Black_2b09822c-f14c-4677-b141-81badfee1e77.avif" alt="Brand logo" /></div>
      <div className="brand-logo"><img src="/brands/opolis-white.webp" alt="Opolis" /></div>
      <div className="brand-logo"><img src="/brands/logo.webp" alt="PicturesOnGold" /></div>
    </div>
  </div>
</div>

<div className="divider"></div>


<div className="container">
  <section className="section">
    <p className="sec-label">Our Mission</p>
    <h2>Email isn't a nice-to-have.<br />It's your biggest revenue lever.</h2>
    <p style={{"fontSize":"16px","color":"var(--text-muted)","marginTop":"16px","maxWidth":"520px","lineHeight":"1.7"}}>Most DTC brands are sitting on a goldmine and barely scratching the surface. <strong style={{"color":"var(--text)","fontWeight":"600"}}>We fix that.</strong> Automations that run 24/7, campaigns built with intent, and deliverability that protects your list as you grow.</p>

    <div style={{"marginTop":"32px","display":"flex","alignItems":"center","gap":"16px","flexWrap":"wrap"}}>
      <div className="mission-stamp"><span className="stamp-dot"></span>Actively taking on new clients</div>
      <button className="btn-primary" data-scroll-target="calendly">Schedule a call</button>
    </div>

    <div className="mission-cards">
      <div className="mc mc-dark">
        <div className="mc-tag">DTC brands — and counting</div>
        <div className="mc-num">50+</div>
        <div className="mc-val">Brands scaled. Not just onboarded.</div>
        <div className="mc-desc">Every account gets a dedicated strategist. No juniors, no handoffs.</div>
      </div>
      <div className="mc mc-red">
        <div className="mc-tag">Return on investment</div>
        <div className="mc-val">Email is your <span style={{"color":"#C1121F"}}>highest-margin</span> channel. Full stop.</div>
        <div className="mc-desc">We make the numbers impossible to ignore.</div>
      </div>
      <div className="mc mc-dark">
        <div className="mc-tag">Inbox placement</div>
        <div className="mc-val">We get you seen — not filtered.</div>
        <div className="mc-desc">Proven on retention accounts where inbox placement meant the difference between growth and churn.</div>
      </div>
    </div>
  </section>
</div>

<div className="divider"></div>


<div className="container">
  <section className="section" id="why">
    <p className="sec-label">Why clients trust us</p>
    <h2>No fluff. Just execution.</h2>
    <div className="why-grid">
      <div className="why-item"><div className="why-dot"></div><div className="why-title">Clear execution</div><div className="why-desc">A clear plan, fast turnaround, and weekly momentum. No chaos, no last-minute scrambles.</div></div>
      <div className="why-item"><div className="why-dot"></div><div className="why-title">Data-led strategy</div><div className="why-desc">Every send has a reason. Built and iterated based on performance, customer behaviour, and real results.</div></div>
      <div className="why-item"><div className="why-dot"></div><div className="why-title">Inbox protection</div><div className="why-desc">Deliverability is built in. List hygiene, engagement rules, and smart sending so performance holds as you scale.</div></div>
      <div className="why-item"><div className="why-dot"></div><div className="why-title">Real partnership</div><div className="why-desc">We operate like an extension of your team. Clear communication, honest feedback, and shared goals.</div></div>
    </div>
  </section>
</div>

<div className="divider"></div>


<div className="container">
  <section className="section" id="process">
    <p className="sec-label">How it works</p>
    <h2>From day one to done deal.</h2>
    <div className="process-steps">
      <div className="step"><div><div className="step-num">1</div></div><div><div className="step-title">Discovery & Audit</div><div className="step-desc">We deep-dive your existing setup, audience, and goals — then map out a strategy built around your brand.</div></div></div>
      <div className="step"><div><div className="step-num">2</div></div><div><div className="step-title">Build & Launch</div><div className="step-desc">Our team designs, writes, and deploys your campaigns and automations with speed and precision.</div></div></div>
      <div className="step"><div><div className="step-num">3</div></div><div><div className="step-title">Optimise & Scale</div><div className="step-desc">We analyse every send, run tests, and push performance higher — month after month.</div></div></div>
    </div>
  </section>
</div>

<div className="divider"></div>


<div className="container">
  <section className="section">
    <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"48px","alignItems":"end","marginBottom":"40px"}}>
      <div>
        <p className="sec-label">Trusted by satisfied clients</p>
        <h2>Earned trust.<br />Not just claimed.</h2>
      </div>
      <p style={{"fontSize":"15px","color":"var(--text-muted)","lineHeight":"1.7"}}>No quick wins. Just work that holds. Clients stay because we execute — and come back for more.</p>
    </div>

    <div className="review-slider-outer">
      <div className="review-track" id="reviewTrack">
        <div className="review-card">
          <div>
            <div className="stars">★★★★★</div>
            <p className="review-text">"Working with Addy was nothing short of amazing! She came on board and things were already moving quickly. She met all of our deadlines and allowed my team to launch a successful online business. Communication was superb — when we needed changes, she was polite, understanding and effective. Highly recommend!"</p>
          </div>
          <div className="review-author"><div className="r-avatar av-e">EJ</div><div className="r-name">Eric Jamal</div><div className="r-biz">Godit</div></div>
        </div>
        <div className="review-card">
          <div>
            <div className="stars">★★★★★</div>
            <p className="review-text">"So glad to have found Addy! She's made my life so much easier handling our email marketing and collaborating on pushing our email performance to its max potential. Highly recommend her!"</p>
          </div>
          <div className="review-author"><div className="r-avatar av-r">RU</div><div className="r-name">Ruma</div><div className="r-biz">á La Couture</div></div>
        </div>
        <div className="review-card">
          <div>
            <div className="stars">★★★★★</div>
            <p className="review-text">"I've been working with Addy and her team for about six months. My sales increased significantly from the start and have been performing consistently ever since. They have my brand's language down to a T — they speak to my customers as if they were looking through my own eyes."</p>
          </div>
          <div className="review-author"><div className="r-avatar av-ro">RO</div><div className="r-name">Robert</div><div className="r-biz">Mowe Clothing</div></div>
        </div>
      </div>
    </div>

    <div className="slider-controls">
      <div className="sdots" id="sdots">
        <button className="sdot active" data-review-index="0"></button>
        <button className="sdot" data-review-index="1"></button>
        <button className="sdot" data-review-index="2"></button>
      </div>
      <div className="sarrows">
        <button className="sarrow" data-review-action="previous">←</button>
        <button className="sarrow" data-review-action="next">→</button>
      </div>
    </div>

    <div className="trust-tags">
      <span className="ttag">DTC E-commerce</span>
      <span className="ttag">Klaviyo</span>
      <span className="ttag">Retention-first</span>
      <span className="ttag">Long-term partnerships</span>
      <span className="ttag">Email Systems</span>
    </div>
  </section>
</div>

<div className="divider"></div>


<div className="container">
  <section className="section" id="calendly">
    <div className="cal-box">
      <div className="cal-header">
        <div>
          <p className="sec-label">Book a call</p>
          <div className="cal-title">Let's talk about your email.</div>
          <p className="cal-sub">Short call. We'll ask a few questions, then tell you exactly what we'd fix first.</p>
        </div>
        <a className="btn-primary" href="https://calendly.com/addyawan57/15min" target="_blank">Open in Calendly</a>
      </div>
      
    </div>
  </section>
</div>


<div className="pf-banner">
  <div className="pf-title">Get your free<br />Klaviyo audit.</div>
  <button className="pf-btn" data-open-url="https://calendly.com/addyawan57/15min">Book the call →</button>
</div>


<div className="footer-wrap">
  <div className="container">

    
    <div className="footer-cta">
      <div className="footer-cta-left">
        <h2>Ready to turn email into a revenue channel?</h2>
        <p>Book a call and we'll show you where your retention system can work harder.</p>
      </div>
      <a className="footer-cta-btn" href="https://calendly.com/addyawan57/15min" target="_blank">Schedule a Meeting</a>
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
          <li><a href="https://calendly.com/addyawan57/15min" target="_blank">Book a Call</a></li>
          <li><a href="mailto:addy@yourdigitalsupremacy.com">Contact</a></li>
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
          <li><a href="#" target="_blank">LinkedIn</a></li>
          <li><a href="#" target="_blank">Instagram</a></li>
          <li><a href="#" target="_blank">YouTube</a></li>
        </ul>
      </div>

    </div>

    
    <div className="footer-bottom-bar">
      <p>© 2026 Digital Supremacy LTD. All rights reserved.</p>
      <p>Company number: 17183960</p>
    </div>

  </div>
</div>
      </div>
    </>
  );
}
