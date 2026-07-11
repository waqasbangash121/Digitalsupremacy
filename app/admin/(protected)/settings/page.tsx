import { getSiteSettings } from "@/lib/site-settings";
import { saveSiteSettingsAction } from "./actions";
import "./settings.css";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <main className="admin-team-page admin-settings-page">
      <header className="admin-page-header">
        <div className="admin-heading-copy">
          <p className="admin-eyebrow"><span />Website settings</p>
          <h1>Manage your <strong>social links.</strong></h1>
          <p className="admin-page-intro">Update the social profiles shown in the footer across the public website.</p>
        </div>
        <a className="admin-view-site" href="/" target="_blank" rel="noreferrer">View website <span>↗</span></a>
      </header>

      <section className="admin-form-panel">
        <div className="admin-section-heading">
          <div><p>Footer settings</p><h2>Social media profiles</h2></div>
          <span>Leave a field blank to hide that social link from the footer.</span>
        </div>

        <form action={saveSiteSettingsAction} className="admin-card admin-settings-form">
          <div className="admin-field full">
            <label htmlFor="linkedin-url">LinkedIn URL</label>
            <input id="linkedin-url" name="linkedinUrl" type="url" defaultValue={settings.linkedin_url} placeholder="https://www.linkedin.com/company/..." />
          </div>
          <div className="admin-field full">
            <label htmlFor="instagram-url">Instagram URL</label>
            <input id="instagram-url" name="instagramUrl" type="url" defaultValue={settings.instagram_url} placeholder="https://www.instagram.com/..." />
          </div>
          <div className="admin-field full">
            <label htmlFor="youtube-url">YouTube URL</label>
            <input id="youtube-url" name="youtubeUrl" type="url" defaultValue={settings.youtube_url} placeholder="https://www.youtube.com/@..." />
          </div>
          <div className="admin-form-actions full">
            <button className="admin-primary" type="submit"><span>Save settings</span><i aria-hidden="true">→</i></button>
          </div>
        </form>
      </section>
    </main>
  );
}
