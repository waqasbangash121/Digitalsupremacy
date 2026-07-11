import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import MarkdownContent from "@/components/markdown-content";
import { getBlogPostBySlug } from "@/lib/blogs-db";
import "../blog.css";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdigitalsupremacy.com";
  return new URL(path, base).toString();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const canonical = post.canonical_url || absoluteUrl(`/blog/${post.slug}`);
  const image = post.og_image_url || post.banner_image_url || undefined;
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.focus_keyword ? [post.focus_keyword, ...post.tags] : post.tags,
    alternates: { canonical },
    robots: { index: !post.noindex, follow: !post.nofollow },
    openGraph: {
      type: "article",
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      url: canonical,
      publishedTime: post.published_at?.toISOString(),
      modifiedTime: post.updated_at.toISOString(),
      authors: [post.author_name],
      tags: post.tags,
      images: image ? [{ url: image, alt: post.banner_image_alt || post.title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

function formatDate(value: Date | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();
  const canonical = post.canonical_url || absoluteUrl(`/blog/${post.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.og_image_url || post.banner_image_url || undefined,
    datePublished: post.published_at?.toISOString(),
    dateModified: post.updated_at.toISOString(),
    author: { "@type": "Person", name: post.author_name },
    publisher: { "@type": "Organization", name: "Digital Supremacy", url: absoluteUrl("/") },
    mainEntityOfPage: canonical,
    keywords: [post.focus_keyword, ...post.tags].filter(Boolean).join(", "),
  };

  return (
    <div className="page page--blog page--blog-post">
      <div className="nav-wrap"><nav className="nav"><a href="/" className="logo"><img src="/image/logo.png" alt="Digital Supremacy" className="logo-img" /></a><ul className="nav-links"><li><a href="/services">Services</a></li><li><a href="/case-studies">Case Studies</a></li><li><a href="/templates">Templates</a></li><li><a href="/blog" className="active">Blog</a></li><li><a href="/why-us">Why Us</a></li><li><a href="/team">Our Team</a></li></ul><a className="nav-cta" href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a Call</a></nav></div>
      <main>
        <article>
          <header className="blog-post-hero container"><a className="blog-back" href="/blog">← All articles</a><div className="blog-post-meta"><span>{post.category}</span><span>{formatDate(post.published_at)}</span><span>{post.author_name}</span></div><h1>{post.title}</h1><p>{post.excerpt}</p>{post.tags.length > 0 && <div className="blog-tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}</header>
          {post.banner_image_url && <div className="blog-post-banner container"><img src={post.banner_image_url} alt={post.banner_image_alt || post.title} /></div>}
          <div className="blog-post-content container"><MarkdownContent content={post.content_markdown} /></div>
        </article>
        <section className="blog-post-cta container"><div><p>Want a stronger retention system?</p><h2>Turn your email channel into a more consistent source of revenue.</h2></div><a href="https://calendly.com/addyawan57/15min" target="_blank" rel="noreferrer">Book a call</a></section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
