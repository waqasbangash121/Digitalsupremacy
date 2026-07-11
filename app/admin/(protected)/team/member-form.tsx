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
      <div className="admin-field"><label>Name<input name="name" defaultValue={member?.name} required /></label></div>
      <div className="admin-field"><label>Initials<input name="initials" defaultValue={member?.initials} maxLength={4} /></label></div>
      <div className="admin-field"><label>Role<input name="role" defaultValue={member?.role} required /></label></div>
      <div className="admin-field"><label>Department tag<input name="tag" defaultValue={member?.tag} /></label></div>
      <div className="admin-field"><label>Color style<input name="tone" defaultValue={member?.tone ?? "default"} placeholder="safa" /></label></div>
      <div className="admin-field"><label>Display order<input name="sortOrder" type="number" defaultValue={member?.sort_order ?? 0} /></label></div>
      <div className="admin-field full"><label>Image URL<input name="imageUrl" type="url" defaultValue={member?.image_url} placeholder="https://..." /></label></div>
      <div className="admin-field full"><label>Biography<textarea name="bio" defaultValue={member?.bio} /></label></div>
      <div className="admin-field"><label className="admin-checkbox"><input name="isFounder" type="checkbox" defaultChecked={member?.is_founder} />Feature as founder</label></div>
      <div className="admin-field"><label className="admin-checkbox"><input name="isActive" type="checkbox" defaultChecked={member?.is_active ?? true} />Published</label></div>
      <div className="admin-form-actions"><button className="admin-primary" type="submit">{submitLabel}</button></div>
    </form>
  );
}
