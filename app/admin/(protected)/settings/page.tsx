import { getSiteSettings } from "@/lib/site-settings";
import { saveSiteSettingsAction } from "./actions";
import "./settings.css";

export const dynamic = "force-dynamic";

const channels = [
  { key: "linkedin", label: "LinkedIn", initials: "in", placeholder: "https://www.linkedin.com/company/...", description: "Company updates, thought leadership, and professional content." },
  { key: "instagram", label: "Instagram", initials: "IG", placeholder: "https://www.instagram.com/...", description: "Creative work, brand visuals, and behind-the-scenes content." },
  { key: "youtube", label: "YouTube", initials: "YT", placeholder: "https://www.youtube.com/@...", description: "Long-form video, case studies, and educational content." },
  { key: "facebook", label: "Facebook", initials: "f", placeholder: "https://www.facebook.com/...", description: "Community updates, campaigns, and company announcements." },
  { key: "twitter", label: "X / Twitter", initials: "X", placeholder: "https://x.com/...", description: "Short updates, ideas, and conversations with your audience." },
  { key: "tiktok", label: "TikTok", initials: "TT", placeholder: "https://www.tiktok.com/@...", description: "Short-form video, trends, and educational clips." },
] as const;

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  const enabledCount = channels.filter((channel) => settings[`${channel.key}_enabled`]).length;

  return (
    <main className="admin-team-page admin-settings-page">
      <header className="admin-page-header">
        <div className="admin-heading-copy">
          <p className="admin-eyebrow"><span />Website settings</p>
          <h1>Control your <strong>social presence.</strong></h1>
          <p className="admin-page-intro">Manage every social channel shown in the website footer, including its destination and visibility.</p>
        </div>
        <a className="admin-view-site" href="/" target="_blank" rel="noreferrer">View website <span>↗</span></a>
      </header>

      <section className="admin-settings-summary">
        <article><span>Connected channels</span><strong>{enabledCount}</strong><p>Currently enabled in the footer.</p></article>
        <article><span>Available channels</span><strong>{channels.length}</strong><p>Supported social platforms.</p></article>
        <article><span>Display rule</span><strong>Enabled + URL</strong><p>Both are required for a link to appear.</p></article>
      </section>

      <form action={saveSiteSettingsAction} className="admin-settings-form">
        <div className="admin-settings-toolbar">
          <div><p>Footer settings</p><h2>Social media channels</h2></div>
          <button className="admin-primary" type="submit"><span>Save settings</span><i aria-hidden="true">→</i></button>
        </div>

        <div className="admin-channel-grid">
          {channels.map((channel) => {
            const urlKey = `${channel.key}_url` as const;
            const enabledKey = `${channel.key}_enabled` as const;
            const inputName = `${channel.key}Url`;
            const enabledName = `${channel.key}Enabled`;

            return (
              <article className="admin-channel-card" key={channel.key}>
                <div className="admin-channel-card-head">
                  <div className={`admin-channel-icon ${channel.key}`}>{channel.initials}</div>
                  <div className="admin-channel-title"><h3>{channel.label}</h3><p>{channel.description}</p></div>
                  <label className="admin-switch">
                    <input type="checkbox" name={enabledName} defaultChecked={settings[enabledKey]} />
                    <span className="admin-switch-track"><span /></span>
                    <em>Enable</em>
                  </label>
                </div>
                <div className="admin-channel-url">
                  <label htmlFor={`${channel.key}-url`}>Profile URL</label>
                  <input id={`${channel.key}-url`} name={inputName} type="url" defaultValue={settings[urlKey]} placeholder={channel.placeholder} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="admin-settings-footer-actions">
          <p>Disabled channels remain saved but are hidden from the public footer.</p>
          <button className="admin-primary" type="submit"><span>Save settings</span><i aria-hidden="true">→</i></button>
        </div>
      </form>
    </main>
  );
}
