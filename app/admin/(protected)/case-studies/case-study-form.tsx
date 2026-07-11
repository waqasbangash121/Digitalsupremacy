import type { CaseStudy } from "@/lib/db";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  caseStudy?: CaseStudy;
  submitLabel: string;
};

export default function CaseStudyForm({ action, caseStudy, submitLabel }: Props) {
  const metrics = caseStudy?.metrics ?? [];

  return (
    <form action={action} className="admin-card admin-case-form">
      {caseStudy && <input type="hidden" name="id" value={caseStudy.id} />}

      <div className="admin-field full">
        <label htmlFor="case-title">Case study title</label>
        <input id="case-title" name="title" defaultValue={caseStudy?.title ?? ""} placeholder="From stagnant growth to a scalable retention engine" required />
      </div>

      <div className="admin-field">
        <label htmlFor="case-slug">URL slug</label>
        <input id="case-slug" name="slug" defaultValue={caseStudy?.slug ?? ""} placeholder="retention-growth-case-study" />
        <small>Leave blank to generate it from the title.</small>
      </div>
      <div className="admin-field">
        <label htmlFor="case-order">Display order</label>
        <input id="case-order" name="sortOrder" type="number" defaultValue={caseStudy?.sort_order ?? 0} />
      </div>

      <div className="admin-field">
        <label htmlFor="case-client">Client or brand</label>
        <input id="case-client" name="clientName" defaultValue={caseStudy?.client_name ?? ""} placeholder="Confidential wellness brand" />
      </div>
      <div className="admin-field">
        <label htmlFor="case-industry">Industry</label>
        <input id="case-industry" name="industry" defaultValue={caseStudy?.industry ?? ""} placeholder="Health & Wellness" />
      </div>

      <div className="admin-field">
        <label htmlFor="case-period">Project period</label>
        <input id="case-period" name="projectPeriod" defaultValue={caseStudy?.project_period ?? ""} placeholder="Nov 2025 → Apr 2026" />
      </div>
      <div className="admin-field">
        <label htmlFor="case-image">Cover image URL</label>
        <input id="case-image" name="coverImageUrl" type="url" defaultValue={caseStudy?.cover_image_url ?? ""} placeholder="https://..." />
      </div>

      <div className="admin-field full">
        <label htmlFor="case-excerpt">Short summary</label>
        <textarea id="case-excerpt" name="excerpt" defaultValue={caseStudy?.excerpt ?? ""} placeholder="Explain what changed and why this case study matters." />
      </div>

      <fieldset className="admin-case-metrics full">
        <legend>Headline metrics</legend>
        <p>Add up to four result highlights for the case-study card.</p>
        <div className="admin-case-metric-grid">
          {[1, 2, 3, 4].map((index) => (
            <div className="admin-case-metric" key={index}>
              <div className="admin-field">
                <label htmlFor={`metric-${index}-value`}>Metric {index} value</label>
                <input id={`metric-${index}-value`} name={`metric${index}Value`} defaultValue={metrics[index - 1]?.value ?? ""} placeholder="+325%" />
              </div>
              <div className="admin-field">
                <label htmlFor={`metric-${index}-label`}>Metric {index} label</label>
                <input id={`metric-${index}-label`} name={`metric${index}Label`} defaultValue={metrics[index - 1]?.label ?? ""} placeholder="Revenue growth" />
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="admin-field full">
        <label htmlFor="case-challenge">The challenge</label>
        <textarea id="case-challenge" name="challenge" defaultValue={caseStudy?.challenge ?? ""} placeholder="Describe the starting point, blockers, and commercial problem." />
      </div>
      <div className="admin-field full">
        <label htmlFor="case-solution">What we did</label>
        <textarea id="case-solution" name="solution" defaultValue={caseStudy?.solution ?? ""} placeholder="Describe the strategy, execution, and important decisions." />
      </div>
      <div className="admin-field full">
        <label htmlFor="case-results">The results</label>
        <textarea id="case-results" name="results" defaultValue={caseStudy?.results ?? ""} placeholder="Summarize the measurable outcome and business impact." />
      </div>

      <label className="admin-checkbox-card full">
        <input name="isActive" type="checkbox" defaultChecked={caseStudy?.is_active ?? true} />
        <span><strong>Publish case study</strong><small>Published case studies can be displayed on the website.</small></span>
      </label>

      <div className="admin-form-actions full">
        {caseStudy && <a className="admin-secondary" href="/admin/case-studies">Cancel</a>}
        <button className="admin-primary" type="submit"><span>{submitLabel}</span><i aria-hidden="true">→</i></button>
      </div>
    </form>
  );
}
