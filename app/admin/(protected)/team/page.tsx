import { getTeamMembers } from "@/lib/db";
import MemberForm from "./member-form";
import { createMemberAction, deleteMemberAction, toggleMemberAction, updateMemberAction } from "./actions";

export const dynamic = "force-dynamic";

function MemberAvatar({ name, initials, imageUrl }: { name: string; initials: string; imageUrl: string | null }) {
  return (
    <div className="admin-member-avatar">
      {imageUrl ? <img src={imageUrl} alt="" /> : <span>{initials}</span>}
      <i aria-hidden="true" />
      <span className="sr-only">{name}</span>
    </div>
  );
}

export default async function AdminTeamPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const members = await getTeamMembers(true);
  const { edit } = await searchParams;
  const editing = members.find((member) => member.id === edit);
  const publishedCount = members.filter((member) => member.is_active).length;
  const founderCount = members.filter((member) => member.is_founder).length;
  const hiddenCount = members.length - publishedCount;

  return (
    <main className="admin-team-page">
      <header className="admin-page-header admin-team-hero">
        <div className="admin-heading-copy">
          <p className="admin-eyebrow"><span />Website content</p>
          <h1>Meet the people<br /><strong>behind the work.</strong></h1>
          <p className="admin-page-intro">Create, organize, and publish the team profiles shown on your public website.</p>
        </div>
        <a className="admin-view-site" href="/team" target="_blank" rel="noreferrer">
          View live page <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="admin-stats-grid" aria-label="Team overview">
        <article className="admin-stat-card admin-stat-card-primary">
          <span className="admin-stat-icon">TM</span>
          <div><strong>{members.length}</strong><p>Total profiles</p></div>
          <small>Everyone added to the team directory</small>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-dot published" />
          <div><strong>{publishedCount}</strong><p>Published</p></div>
          <small>Visible on the public team page</small>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-dot founder" />
          <div><strong>{founderCount}</strong><p>Founders</p></div>
          <small>Highlighted leadership profiles</small>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-dot hidden" />
          <div><strong>{hiddenCount}</strong><p>Hidden</p></div>
          <small>Saved but not currently published</small>
        </article>
      </section>

      <section className="admin-workspace-grid">
        <div className="admin-form-panel">
          <div className="admin-section-heading">
            <div>
              <p>{editing ? "Editing profile" : "New profile"}</p>
              <h2>{editing ? editing.name : "Add team member"}</h2>
            </div>
            <span>{editing ? "Update the selected profile" : "Build a complete public profile"}</span>
          </div>
          <MemberForm
            action={editing ? updateMemberAction : createMemberAction}
            member={editing}
            submitLabel={editing ? "Save changes" : "Add team member"}
          />
        </div>

        <aside className="admin-guidance-card">
          <span className="admin-guidance-number">01</span>
          <p>Profile quality</p>
          <h2>Make every introduction feel intentional.</h2>
          <ul>
            <li><span>01</span>Use a clear, role-specific job title.</li>
            <li><span>02</span>Keep biographies concise and outcome-focused.</li>
            <li><span>03</span>Use consistent portrait dimensions.</li>
          </ul>
        </aside>
      </section>

      <section className="admin-directory-section">
        <div className="admin-section-heading admin-directory-heading">
          <div>
            <p>Team directory</p>
            <h2>Current profiles</h2>
          </div>
          <span>{members.length} {members.length === 1 ? "profile" : "profiles"} in your workspace</span>
        </div>

        <div className="admin-member-list">
          {members.length === 0 && (
            <div className="admin-card admin-empty">
              <span>DS</span>
              <h2>Your team directory is ready.</h2>
              <p>Add the first team member using the form above.</p>
            </div>
          )}
          {members.map((member, index) => (
            <article className={`admin-member-row ${member.is_active ? "" : "is-hidden"}`} key={member.id}>
              <span className="admin-member-index">{String(index + 1).padStart(2, "0")}</span>
              <MemberAvatar name={member.name} initials={member.initials} imageUrl={member.image_url} />
              <div className="admin-member-identity">
                <div className="admin-member-name-line">
                  <h3>{member.name}</h3>
                  {member.is_founder && <span className="admin-founder-badge">Founder</span>}
                </div>
                <p>{member.role}</p>
              </div>
              <div className="admin-member-meta">
                <span className="admin-department-tag">{member.tag}</span>
                <span className={`admin-status ${member.is_active ? "" : "draft"}`}>
                  <i />{member.is_active ? "Published" : "Hidden"}
                </span>
              </div>
              <div className="admin-row-actions">
                <a className="admin-secondary" href={`/admin/team?edit=${member.id}`}>Edit</a>
                <form action={toggleMemberAction}>
                  <input type="hidden" name="id" value={member.id} />
                  <button className="admin-secondary" type="submit">{member.is_active ? "Hide" : "Publish"}</button>
                </form>
                <form action={deleteMemberAction}>
                  <input type="hidden" name="id" value={member.id} />
                  <button className="admin-danger" type="submit" aria-label={`Delete ${member.name}`}>Delete</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
