import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import { getBlogPosts } from "@/lib/blogs-db";
import "./blog.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Email Marketing Insights — Digital Supremacy",
  description: "Practical retention, lifecycle, Klaviyo, and ecommerce email marketing insights from Digital Supremacy.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Email Marketing Insights — Digital Supremacy", description: "Practical retention and ecommerce email marketing insights.", type: "website", url: "/blog" },
};

function formatDate(value: Date | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((post) => post.is_featured) ?? posts[0];
  const remaining = featured ? posts.filter((post) => post.id !== featured.id) : [];

  return (
    <div className="page page--blog">
      <div className="nav-wrap"><nav className="nav"><a href="/" className="logo"><img src="/image/logo.png" alt="Digital Supremacy" className="logo-img" /></a><ul className="nav-links"><li><a href="/services">Services</a></li><li><a href="/case-studies">Case Studies</a></li><li><a href="/templates">Templates</a></li><li><a href="/blog" className="active">Blog</a></li><li><a href="/why-us">Why Us</a></li><li><a href="/team">Our Team</a></li></ul><a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a></nav></div>
      <main>
        <section className="blog-hero container"><p className="blog-kicker">Insights & strategy</p><h1>Ideas that turn email into a stronger revenue channel.</h1><p>Practical guidance on lifecycle strategy, retention, creative, deliverability, and ecommerce growth—written by the team doing the work.</p></section>

        {posts.length === 0 ? <section className="blog-empty container"><strong>Insights are coming soon.</strong><p>We are preparing practical guides, teardown articles, and retention strategy resources.</p></section> : <>
          {featured && <section className="blog-featured container"><a className="blog-featured-media" href={`/blog/${featured.slug}`}>{featured.banner_image_url ? <img src={featured.banner_image_url} alt={featured.banner_image_alt} /> : <span>DS</span>}</a><div className="blog-featured-copy"><div className="blog-post-meta"><span>{featured.category}</span><span>{formatDate(featured.published_at)}</span></div><h2><a href={`/blog/${featured.slug}`}>{featured.title}</a></h2><p>{featured.excerpt}</p><div className="blog-author">By {featured.author_name}</div><a className="blog-read-link" href={`/blog/${featured.slug}`}>Read article <span>→</span></a></div></section>}
          {remaining.length > 0 && <section className="blog-library container"><div className="blog-section-head"><div><p>Latest articles</p><h2>Explore the library</h2></div><span>{posts.length} {posts.length === 1 ? "article" : "articles"}</span></div><div className="blog-grid">{remaining.map((post) => <article className="blog-card" key={post.id}><a className="blog-card-media" href={`/blog/${post.slug}`}>{post.banner_image_url ? <img src={post.banner_image_url} alt={post.banner_image_alt} loading="lazy" /> : <span>DS</span>}</a><div className="blog-card-copy"><div className="blog-post-meta"><span>{post.category}</span><span>{formatDate(post.published_at)}</span></div><h2><a href={`/blog/${post.slug}`}>{post.title}</a></h2><p>{post.excerpt}</p><a className="blog-read-link" href={`/blog/${post.slug}`}>Read article <span>→</span></a></div></article>)}</div></section>}
        </>}
      </main>
      <SiteFooter />
    </div>
  );
}
