import { getCaseStudies } from "@/lib/db";
import CaseStudyForm from "./case-study-form";
import {
  createCaseStudyAction,
  deleteCaseStudyAction,
  toggleCaseStudyAction,
  updateCaseStudyAction,
} from "./actions";
import "./case-studies-admin.css";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const items = await getCaseStudies(true);
  const { edit } = await searchParams;
  const editing = items.find((item) => item.id === edit);
  const published = items.filter((item) => item.is_active).length;

  return (
    <main className="admin-team-page admin-case-studies-page">
      <header className="admin-page-header">
        <div className="admin-heading-copy">
          <p className="admin-eyebrow"><span />Website content</p>
          <h1>Case studies that prove <strong>the work.</strong></h1>
          <p className="admin-page-intro">Create, organize, publish, and update client success stories from one place.</p>
        </div>
        <a className="admin-view-site" href="/case-studies" target="_blank" rel="noreferrer">View case studies <span>↗</span></a>
      </header>

      <section className="admin-stats-grid admin-case-stats">
        <article className="admin-stat-card admin-stat-card-primary"><div className="admin-stat-icon">CS</div><div><strong>{items.length}</strong><p>Total stories</p></div><small>All saved case studies.</small></article>
        <article className="admin-stat-card"><span className="admin-stat-dot published" /><div><strong>{published}</strong><p>Published</p></div><small>Ready for the public website.</small></article>
        <article className="admin-stat-card"><span className="admin-stat-dot hidden" /><div><strong>{items.length - published}</strong><p>Drafts</p></div><small>Hidden while work is in progress.</small></article>
      </section>

      <section className="admin-form-panel">
        <div className="admin-section-heading">
          <div><p>{editing ? "Editing story" : "New story"}</p><h2>{editing ? editing.title : "Add a case study"}</h2></div>
          <span>Fields marked by context should be concise and outcome-focused.</span>
        </div>
        <CaseStudyForm
          action={editing ? updateCaseStudyAction : createCaseStudyAction}
          caseStudy={editing}
          submitLabel={editing ? "Save changes" : "Create case study"}
        />
      </section>

      <section className="admin-directory-section">
        <div className="admin-directory-heading">
          <div><p>Content library</p><h2>Current case studies</h2></div>
          <span>{items.length} {items.length === 1 ? "story" : "stories"}</span>
        </div>

        <div className="admin-case-list">
          {items.length === 0 && (
            <div className="admin-card admin-empty">
              <strong>No case studies yet</strong>
              <p>Use the editor above to create the first client success story.</p>
            </div>
          )}

          {items.map((item) => (
            <article className="admin-case-row" key={item.id}>
              <div className="admin-case-cover">
                {item.cover_image_url ? <img src={item.cover_image_url} alt="" /> : <span>CS</span>}
              </div>
              <div className="admin-case-copy">
                <div className="admin-case-meta">{[item.industry, item.client_name].filter(Boolean).join(" · ") || "Case study"}</div>
                <h3>{item.title}</h3>
                <p>{item.excerpt || "No summary has been added yet."}</p>
                <div className="admin-case-badges">
                  <span className={`admin-status ${item.is_active ? "" : "draft"}`}>{item.is_active ? "Published" : "Draft"}</span>
                  {item.project_period && <span>{item.project_period}</span>}
                  <span>/{item.slug}</span>
                </div>
              </div>
              <div className="admin-row-actions">
                <a className="admin-secondary" href={`/admin/case-studies?edit=${item.id}`}>Edit</a>
                <form action={toggleCaseStudyAction}><input type="hidden" name="id" value={item.id} /><button className="admin-secondary" type="submit">{item.is_active ? "Unpublish" : "Publish"}</button></form>
                <form action={deleteCaseStudyAction}><input type="hidden" name="id" value={item.id} /><button className="admin-danger" type="submit" aria-label={`Delete ${item.title}`}>Delete</button></form>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
