import { getTeamMembers } from "@/lib/db";
import MemberForm from "./member-form";
import { createMemberAction, deleteMemberAction, toggleMemberAction, updateMemberAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const members = await getTeamMembers(true);
  const { edit } = await searchParams;
  const editing = members.find((member) => member.id === edit);

  return (
    <main>
      <header className="admin-page-header">
        <div><p>Website content</p><h1>Team</h1></div>
        <p>{members.filter((member) => member.is_active).length} published members</p>
      </header>

      {editing ? (
        <>
          <h2 className="admin-section-title">Edit {editing.name}</h2>
          <MemberForm action={updateMemberAction} member={editing} submitLabel="Save changes" />
        </>
      ) : (
        <>
          <h2 className="admin-section-title">Add team member</h2>
          <MemberForm action={createMemberAction} submitLabel="Add member" />
        </>
      )}

      <h2 className="admin-section-title">Current team</h2>
      <div className="admin-member-list">
        {members.length === 0 && <div className="admin-card admin-empty">No team members yet.</div>}
        {members.map((member) => (
          <article className="admin-member-row" key={member.id}>
            <div className="admin-member-avatar">{member.initials}</div>
            <div><h2>{member.name}</h2><p>{member.tag}{member.is_founder ? " · Founder" : ""}</p></div>
            <div><p>{member.role}</p><span className={`admin-status ${member.is_active ? "" : "draft"}`}>{member.is_active ? "Published" : "Hidden"}</span></div>
            <div className="admin-row-actions">
              <a className="admin-secondary" href={`/admin/team?edit=${member.id}`}>Edit</a>
              <form action={toggleMemberAction}><input type="hidden" name="id" value={member.id} /><button className="admin-secondary" type="submit">{member.is_active ? "Hide" : "Publish"}</button></form>
              <form action={deleteMemberAction}><input type="hidden" name="id" value={member.id} /><button className="admin-danger" type="submit">Delete</button></form>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
