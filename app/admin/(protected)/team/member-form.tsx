import type { TeamMember } from "@/lib/db";
import "../../team-enhancements.css";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  member?: TeamMember;
  submitLabel: string;
};

export default function MemberForm({ action, member, submitLabel }: Props) {
  return (
    <form action={action} className="admin-card admin-form-grid admin-edit-form">
      {member && <input type="hidden" name="id" value={member.id} />}
      <input type="hidden" name="existingImage" value={member?.image_url ?? ""} />

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

      <section className="admin-profile-media full">
        <div className="admin-subsection-heading">
          <div><span>Profile media</span><h3>Portrait image</h3></div>
          <p>Upload an optimized image or use a hosted image URL.</p>
        </div>
        <div className="admin-image-fields">
          <div className="admin-image-preview">
            {member?.image_url ? <img src={member.image_url} alt={`${member.name} preview`} /> : <span>{member?.initials || "IMG"}</span>}
          </div>
          <div className="admin-image-inputs">
            <div className="admin-field">
              <label htmlFor="member-image-file">Upload portrait</label>
              <input id="member-image-file" name="imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
              <small>JPG, PNG, WebP, or GIF. Maximum file size: 750 KB.</small>
            </div>
            <div className="admin-field">
              <label htmlFor="member-image">Or use an image URL</label>
              <input id="member-image" name="imageUrl" type="url" placeholder="https://example.com/portrait.jpg" />
              <small>Uploading a file takes priority over the URL.</small>
            </div>
          </div>
        </div>
      </section>

      <div className="admin-field full">
        <label htmlFor="member-bio">Biography</label>
        <textarea id="member-bio" name="bio" defaultValue={member?.bio ?? ""} placeholder="Write a short introduction focused on expertise, responsibilities, and impact." />
      </div>

      <section className="admin-social-section full">
        <div className="admin-subsection-heading">
          <div><span>Optional</span><h3>Social profiles</h3></div>
          <p>Only completed links will appear on the public Team page.</p>
        </div>
        <div className="admin-social-grid">
          <div className="admin-field"><label htmlFor="member-linkedin">LinkedIn</label><input id="member-linkedin" name="linkedinUrl" type="url" defaultValue={member?.linkedin_url ?? ""} placeholder="https://linkedin.com/in/..." /></div>
          <div className="admin-field"><label htmlFor="member-instagram">Instagram</label><input id="member-instagram" name="instagramUrl" type="url" defaultValue={member?.instagram_url ?? ""} placeholder="https://instagram.com/..." /></div>
          <div className="admin-field"><label htmlFor="member-twitter">Twitter / X</label><input id="member-twitter" name="twitterUrl" type="url" defaultValue={member?.twitter_url ?? ""} placeholder="https://x.com/..." /></div>
          <div className="admin-field"><label htmlFor="member-facebook">Facebook</label><input id="member-facebook" name="facebookUrl" type="url" defaultValue={member?.facebook_url ?? ""} placeholder="https://facebook.com/..." /></div>
        </div>
      </section>

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
