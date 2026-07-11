import { getTemplates } from "@/lib/templates-db";
import TemplateForm from "./template-form";
import { createTemplateAction, deleteTemplateAction, toggleTemplateAction, updateTemplateAction } from "./actions";
import "./templates-admin.css";

export const dynamic = "force-dynamic";

export default async function AdminTemplatesPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const items = await getTemplates(true);
  const { edit } = await searchParams;
  const editing = items.find((item) => item.id === edit);
  const published = items.filter((item) => item.is_active).length;

  return (
    <main className="admin-team-page admin-templates-page">
      <header className="admin-page-header">
        <div className="admin-heading-copy"><p className="admin-eyebrow"><span />Website content</p><h1>Templates built to <strong>convert.</strong></h1><p className="admin-page-intro">Upload, organize, feature, and publish your email and campaign templates from one place.</p></div>
        <a className="admin-view-site" href="/templates" target="_blank" rel="noreferrer">View templates <span>↗</span></a>
      </header>

      <section className="admin-stats-grid admin-template-stats">
        <article className="admin-stat-card admin-stat-card-primary"><div className="admin-stat-icon">TP</div><div><strong>{items.length}</strong><p>Total templates</p></div><small>Every saved template.</small></article>
        <article className="admin-stat-card"><span className="admin-stat-dot published" /><div><strong>{published}</strong><p>Published</p></div><small>Visible on the website.</small></article>
        <article className="admin-stat-card"><span className="admin-stat-dot founder" /><div><strong>{items.filter((item) => item.is_featured).length}</strong><p>Featured</p></div><small>Shown first in the gallery.</small></article>
      </section>

      <section className="admin-form-panel">
        <div className="admin-section-heading"><div><p>{editing ? "Editing template" : "New template"}</p><h2>{editing ? editing.title : "Add a template"}</h2></div><span>Use a tall, clear image that shows the full email design.</span></div>
        <TemplateForm action={editing ? updateTemplateAction : createTemplateAction} template={editing} submitLabel={editing ? "Save changes" : "Create template"} />
      </section>

      <section className="admin-directory-section">
        <div className="admin-directory-heading"><div><p>Template library</p><h2>Current templates</h2></div><span>{items.length} {items.length === 1 ? "template" : "templates"}</span></div>
        <div className="admin-template-list">
          {items.length === 0 && <div className="admin-card admin-empty"><strong>No templates yet</strong><p>Upload the first template using the editor above.</p></div>}
          {items.map((item) => (
            <article className="admin-template-row" key={item.id}>
              <div className="admin-template-thumb">{item.image_url ? <img src={item.image_url} alt="" /> : <span>TP</span>}</div>
              <div className="admin-template-copy"><div className="admin-case-meta">{item.category || "Template"}</div><h3>{item.title}</h3><p>{item.description || "No description added yet."}</p><div className="admin-case-badges"><span className={`admin-status ${item.is_active ? "" : "draft"}`}>{item.is_active ? "Published" : "Draft"}</span>{item.is_featured && <span>Featured</span>}<span>/{item.slug}</span></div></div>
              <div className="admin-row-actions"><a className="admin-secondary" href={`/admin/templates?edit=${item.id}`}>Edit</a><form action={toggleTemplateAction}><input type="hidden" name="id" value={item.id} /><button className="admin-secondary" type="submit">{item.is_active ? "Unpublish" : "Publish"}</button></form><form action={deleteTemplateAction}><input type="hidden" name="id" value={item.id} /><button className="admin-danger" type="submit" aria-label={`Delete ${item.title}`}>Delete</button></form></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
