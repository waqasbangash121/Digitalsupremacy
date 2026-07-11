import type { TeamMember } from "@/lib/db";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  member?: TeamMember;
  submitLabel: string;
};

export default function MemberForm({ action, member, submitLabel }: Props) {
  return (
    <form action={action} className="admin-card admin-form-grid admin-edit-form">
      {member && <input type="hidden" name="id" value={member.id} />}

      <div className="admin-field">
        <label htmlFor="member-name">Full name</label>
        <input id="member-name" name="name" defaultValue={member?.name} placeholder="e.g. Alex Morgan" required />
      </div>
      <div className="admin-field admin-field-compact">
        <label htmlFor="member-initials">Initials</label>
        <input id="member-initials" name="initials" defaultValue={member?.initials} maxLength={4} placeholder="AM" />
      </div>
      <div className="admin-field">
        <label htmlFor="member-role">Role</label>
        <input id="member-role" name="role" defaultValue={member?.role} placeholder="e.g. Creative Director" required />
      </div>
      <div className="admin-field">
        <label htmlFor="member-tag">Department</label>
        <input id="member-tag" name="tag" defaultValue={member?.tag} placeholder="e.g. Design" />
      </div>
      <div className="admin-field">
        <label htmlFor="member-tone">Color style</label>
        <input id="member-tone" name="tone" defaultValue={member?.tone ?? "default"} placeholder="default" />
        <small>Used by the public profile card theme.</small>
      </div>
      <div className="admin-field admin-field-compact">
        <label htmlFor="member-order">Display order</label>
        <input id="member-order" name="sortOrder" type="number" defaultValue={member?.sort_order ?? 0} />
        <small>Lower numbers appear first.</small>
      </div>
      <div className="admin-field full">
        <label htmlFor="member-image">Portrait image URL</label>
        <input id="member-image" name="imageUrl" type="url" defaultValue={member?.image_url ?? ""} placeholder="https://example.com/portrait.jpg" />
      </div>
      <div className="admin-field full">
        <label htmlFor="member-bio">Biography</label>
        <textarea id="member-bio" name="bio" defaultValue={member?.bio ?? ""} placeholder="Write a short introduction focused on expertise, responsibilities, and impact." />
      </div>

      <div className="admin-publish-options full">
        <label className="admin-checkbox-card">
          <input name="isFounder" type="checkbox" defaultChecked={member?.is_founder} />
          <span><strong>Feature as founder</strong><small>Adds a founder label to this profile.</small></span>
        </label>
        <label className="admin-checkbox-card">
          <input name="isActive" type="checkbox" defaultChecked={member?.is_active ?? true} />
          <span><strong>Publish profile</strong><small>Make this person visible on the website.</small></span>
        </label>
      </div>

      <div className="admin-form-actions">
        {member && <a className="admin-secondary" href="/admin/team">Cancel</a>}
        <button className="admin-primary" type="submit"><span>{submitLabel}</span><i aria-hidden="true">→</i></button>
      </div>
    </form>
  );
}
