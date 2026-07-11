import type { BlogPost } from "@/lib/blogs-db";
import BlogEditor from "./blog-editor";

export default function BlogForm({ action, post }: { action: (formData: FormData) => void | Promise<void>; post?: BlogPost }) {
  const publishedValue = post?.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : "";
  return (
    <form action={action} className="admin-blog-form">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="existingBanner" value={post?.banner_image_url ?? ""} />

      <section className="admin-blog-main admin-card">
        <div className="admin-section-heading"><div><p>Article</p><h2>Content and presentation</h2></div><span>Write, format, preview, and add images without leaving the editor.</span></div>
        <div className="admin-field full"><label htmlFor="blog-title">Post title</label><input id="blog-title" name="title" defaultValue={post?.title ?? ""} required placeholder="How retention marketing turns first orders into repeat revenue" /></div>
        <div className="admin-field full"><label htmlFor="blog-excerpt">Excerpt</label><textarea id="blog-excerpt" name="excerpt" defaultValue={post?.excerpt ?? ""} required placeholder="A concise summary used on the blog listing and in search previews." /><small>Recommended: 140–180 characters.</small></div>
        <div className="admin-field full"><label>Article body</label><BlogEditor defaultValue={post?.content_markdown ?? ""} /></div>
      </section>

      <aside className="admin-blog-sidebar">
        <section className="admin-card blog-settings-card">
          <div className="admin-section-heading"><div><p>Publishing</p><h2>Status</h2></div></div>
          <label className="admin-checkbox-card"><input name="isPublished" type="checkbox" defaultChecked={post?.is_published ?? false} /><span><strong>Published</strong><small>Visible publicly when the publish date is reached.</small></span></label>
          <label className="admin-checkbox-card"><input name="isFeatured" type="checkbox" defaultChecked={post?.is_featured ?? false} /><span><strong>Featured</strong><small>Prioritize this post on the blog page.</small></span></label>
          <div className="admin-field full"><label htmlFor="published-at">Publish date</label><input id="published-at" name="publishedAt" type="datetime-local" defaultValue={publishedValue} /><small>Leave blank to publish immediately when enabled.</small></div>
          <div className="admin-field full"><label htmlFor="author-name">Author</label><input id="author-name" name="authorName" defaultValue={post?.author_name ?? "Digital Supremacy"} /></div>
          <div className="admin-field full"><label htmlFor="category">Category</label><input id="category" name="category" defaultValue={post?.category ?? "Email Marketing"} /></div>
          <div className="admin-field full"><label htmlFor="tags">Tags</label><input id="tags" name="tags" defaultValue={post?.tags.join(", ") ?? ""} placeholder="Klaviyo, Retention, Ecommerce" /><small>Comma-separated.</small></div>
        </section>

        <section className="admin-card blog-settings-card">
          <div className="admin-section-heading"><div><p>Banner</p><h2>Featured image</h2></div></div>
          <div className="admin-field full"><label htmlFor="banner-file">Upload banner image</label><input id="banner-file" name="bannerFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" /><small>Maximum 2 MB. Recommended 1600 × 900.</small></div>
          <div className="admin-field full"><label htmlFor="banner-url">Or image URL</label><input id="banner-url" name="bannerUrl" type="url" placeholder="https://..." /></div>
          <div className="admin-field full"><label htmlFor="banner-alt">Banner alt text</label><input id="banner-alt" name="bannerAlt" defaultValue={post?.banner_image_alt ?? ""} placeholder="Describe the image for accessibility and SEO" /></div>
          {post?.banner_image_url && <img className="admin-blog-banner-preview" src={post.banner_image_url} alt="Current banner" />}
        </section>

        <section className="admin-card blog-settings-card seo-card">
          <div className="admin-section-heading"><div><p>SEO</p><h2>Search appearance</h2></div></div>
          <div className="admin-field full"><label htmlFor="slug">URL slug</label><input id="slug" name="slug" defaultValue={post?.slug ?? ""} placeholder="retention-marketing-guide" /><small>Leave blank to generate from the title.</small></div>
          <div className="admin-field full"><label htmlFor="focus-keyword">Focus keyword</label><input id="focus-keyword" name="focusKeyword" defaultValue={post?.focus_keyword ?? ""} /></div>
          <div className="admin-field full"><label htmlFor="meta-title">Meta title</label><input id="meta-title" name="metaTitle" maxLength={70} defaultValue={post?.meta_title ?? ""} /><small>Recommended: 50–60 characters.</small></div>
          <div className="admin-field full"><label htmlFor="meta-description">Meta description</label><textarea id="meta-description" name="metaDescription" maxLength={180} defaultValue={post?.meta_description ?? ""} /><small>Recommended: 140–160 characters.</small></div>
          <div className="admin-field full"><label htmlFor="canonical-url">Canonical URL</label><input id="canonical-url" name="canonicalUrl" type="url" defaultValue={post?.canonical_url ?? ""} placeholder="https://yourdigitalsupremacy.com/blog/..." /></div>
          <div className="admin-field full"><label htmlFor="og-image">Open Graph image URL</label><input id="og-image" name="ogImageUrl" type="url" defaultValue={post?.og_image_url ?? ""} placeholder="Uses the banner when left blank" /></div>
          <div className="admin-publish-options full">
            <label className="admin-checkbox-card"><input name="noindex" type="checkbox" defaultChecked={post?.noindex ?? false} /><span><strong>Noindex</strong><small>Prevent search engines from indexing this post.</small></span></label>
            <label className="admin-checkbox-card"><input name="nofollow" type="checkbox" defaultChecked={post?.nofollow ?? false} /><span><strong>Nofollow</strong><small>Ask crawlers not to follow links on this page.</small></span></label>
          </div>
        </section>
      </aside>

      <div className="admin-blog-actions">
        {post && <a className="admin-secondary" href="/admin/blogs">Cancel</a>}
        <button className="admin-primary" type="submit"><span>{post ? "Save post" : "Create post"}</span><i aria-hidden="true">→</i></button>
      </div>
    </form>
  );
}
