import { getBlogPosts, getBlogPostById } from "@/lib/blogs-db";
import BlogForm from "./blog-form";
import { createBlogPostAction, deleteBlogPostAction, toggleBlogPostAction, updateBlogPostAction } from "./actions";
import "./blogs-admin.css";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams;
  const posts = await getBlogPosts(true);
  const editing = edit ? await getBlogPostById(edit) : undefined;
  const published = posts.filter((post) => post.is_published).length;
  const scheduled = posts.filter((post) => post.is_published && post.published_at && new Date(post.published_at) > new Date()).length;

  return (
    <main className="admin-team-page admin-blogs-page">
      <header className="admin-page-header">
        <div className="admin-heading-copy"><p className="admin-eyebrow"><span />Content studio</p><h1>Publish content that <strong>earns attention.</strong></h1><p className="admin-page-intro">Create SEO-ready articles, manage drafts, schedule publishing, and control every search-facing detail.</p></div>
        <a className="admin-view-site" href="/blog" target="_blank" rel="noreferrer">View blog <span>↗</span></a>
      </header>

      <section className="admin-stats-grid admin-blog-stats">
        <article className="admin-stat-card admin-stat-card-primary"><div className="admin-stat-icon">BL</div><div><strong>{posts.length}</strong><p>Total posts</p></div><small>Drafts and published content.</small></article>
        <article className="admin-stat-card"><span className="admin-stat-dot published" /><div><strong>{published}</strong><p>Published</p></div><small>Currently available publicly.</small></article>
        <article className="admin-stat-card"><span className="admin-stat-dot founder" /><div><strong>{scheduled}</strong><p>Scheduled</p></div><small>Queued for a future date.</small></article>
      </section>

      <BlogForm action={editing ? updateBlogPostAction : createBlogPostAction} post={editing ?? undefined} />

      <section className="admin-directory-section admin-blog-directory">
        <div className="admin-directory-heading"><div><p>Editorial library</p><h2>All blog posts</h2></div><span>{posts.length} {posts.length === 1 ? "post" : "posts"}</span></div>
        <div className="admin-blog-list">
          {posts.length === 0 && <div className="admin-card admin-empty"><strong>No blog posts yet</strong><p>Create the first article using the editor above.</p></div>}
          {posts.map((post) => (
            <article className="admin-blog-row" key={post.id}>
              <div className="admin-blog-thumb">{post.banner_image_url ? <img src={post.banner_image_url} alt="" /> : <span>BL</span>}</div>
              <div className="admin-blog-row-copy"><div className="admin-case-meta">{post.category} · {post.author_name}</div><h3>{post.title}</h3><p>{post.excerpt}</p><div className="admin-case-badges"><span className={`admin-status ${post.is_published ? "" : "draft"}`}>{post.is_published ? "Published" : "Draft"}</span>{post.is_featured && <span>Featured</span>}<span>/blog/{post.slug}</span></div></div>
              <div className="admin-row-actions"><a className="admin-secondary" href={`/admin/blogs?edit=${post.id}`}>Edit</a>{post.is_published && <a className="admin-secondary" href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">View</a>}<form action={toggleBlogPostAction}><input type="hidden" name="id" value={post.id} /><button className="admin-secondary" type="submit">{post.is_published ? "Unpublish" : "Publish"}</button></form><form action={deleteBlogPostAction}><input type="hidden" name="id" value={post.id} /><button className="admin-danger" type="submit" aria-label={`Delete ${post.title}`}>Delete</button></form></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
