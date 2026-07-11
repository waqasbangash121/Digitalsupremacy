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
              <img
                src="image/logo.png"
                alt="Digital Supremacy Logo"
                className="logo-img"
              />
            </div>
            <ul className="nav-links">
              <li><a href="/services">Services</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
              <li><a href="/templates">Templates</a></li>
              <li><a href="/why-us">Why Us</a></li>
              <li><a href="/team">Our Team</a></li>
            </ul>
            <button className="btn-primary" data-scroll-target="calendly">Get my audit</button>
          </nav>
        </div>

        <div className="container">
          <section className="hero">
            <p className="hero-label fade-up d1">For DTC e-commerce brands</p>
            <h1 className="fade-up d2">Turn email into your<br /><span className="accent">highest-performing</span> revenue channel.</h1>
            <p className="hero-sub fade-up d3">Running ads without a retention system is burning money. We build the system that turns your traffic into consistent revenue.</p>
            <div className="hero-btns fade-up d4"><button className="btn-primary" data-scroll-target="calendly">Get my audit</button><a className="btn-secondary" href="/case-studies">See our work</a></div>
          </section>
        </div>

        <div className="brands-section">
          <p className="brands-label">Brands we've worked with</p>
          <div className="slider-outer"><div className="slider-track">
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
          </div></div>
        </div>
      </div>
    </>
  );
}
