import type { CaseStudy } from "@/lib/db";

type Props = { action: (formData: FormData) => void | Promise<void>; caseStudy?: CaseStudy; submitLabel: string };

export default function CaseStudyForm({ action, caseStudy, submitLabel }: Props) {
  const metrics = caseStudy?.metrics ?? [];
  const phases = caseStudy?.phases ?? [];
  const images = caseStudy?.images ?? [];
  return (
    <form action={action} className="admin-card admin-case-form" encType="multipart/form-data">
      {caseStudy && <input type="hidden" name="id" value={caseStudy.id} />}
      <input type="hidden" name="existingCoverImage" value={caseStudy?.cover_image_url ?? ""} />
      {images.map((image, index) => <input key={index} type="hidden" name={`existingImage${index + 1}`} value={image.url} />)}

      <div className="admin-field full"><label htmlFor="case-title">Case study title</label><input id="case-title" name="title" defaultValue={caseStudy?.title ?? ""} required /></div>
      <div className="admin-field"><label htmlFor="case-slug">URL slug</label><input id="case-slug" name="slug" defaultValue={caseStudy?.slug ?? ""} /></div>
      <div className="admin-field"><label htmlFor="case-order">Display order</label><input id="case-order" name="sortOrder" type="number" defaultValue={caseStudy?.sort_order ?? 0} /></div>
      <div className="admin-field"><label htmlFor="case-client">Client or brand</label><input id="case-client" name="clientName" defaultValue={caseStudy?.client_name ?? ""} /></div>
      <div className="admin-field"><label htmlFor="case-industry">Industry</label><input id="case-industry" name="industry" defaultValue={caseStudy?.industry ?? ""} /></div>
      <div className="admin-field"><label htmlFor="case-period">Project period</label><input id="case-period" name="projectPeriod" defaultValue={caseStudy?.project_period ?? ""} /></div>
      <div className="admin-field full"><label htmlFor="case-excerpt">Short summary</label><textarea id="case-excerpt" name="excerpt" defaultValue={caseStudy?.excerpt ?? ""} /></div>

      <fieldset className="admin-case-metrics full"><legend>Headline metrics</legend><div className="admin-case-metric-grid">{[1,2,3,4].map((index)=><div className="admin-case-metric" key={index}><div className="admin-field"><label>Metric {index} value</label><input name={`metric${index}Value`} defaultValue={metrics[index-1]?.value ?? ""} /></div><div className="admin-field"><label>Metric {index} label</label><input name={`metric${index}Label`} defaultValue={metrics[index-1]?.label ?? ""} /></div></div>)}</div></fieldset>

      <div className="admin-field full"><label htmlFor="case-challenge">The situation / challenge</label><textarea id="case-challenge" name="challenge" defaultValue={caseStudy?.challenge ?? ""} /></div>
      <div className="admin-field full"><label htmlFor="case-solution">What needed to change</label><textarea id="case-solution" name="solution" defaultValue={caseStudy?.solution ?? ""} /></div>

      <fieldset className="admin-case-metrics full"><legend>How we did it</legend><p>Add up to six implementation phases.</p><div className="admin-case-phase-grid">{[1,2,3,4,5,6].map((index)=><div className="admin-case-phase" key={index}><div className="admin-field"><label>Phase {index} title</label><input name={`phase${index}Title`} defaultValue={phases[index-1]?.title ?? ""} /></div><div className="admin-field"><label>Phase {index} description</label><textarea name={`phase${index}Description`} defaultValue={phases[index-1]?.description ?? ""} /></div></div>)}</div></fieldset>

      <div className="admin-field full"><label htmlFor="case-results">The results</label><textarea id="case-results" name="results" defaultValue={caseStudy?.results ?? ""} /></div>
      <div className="admin-field full"><label htmlFor="case-closing">Closing statement</label><textarea id="case-closing" name="closing" defaultValue={caseStudy?.closing ?? ""} /></div>

      <fieldset className="admin-case-metrics full"><legend>Images</legend><p>Upload JPG, PNG, WebP, or GIF files up to 1.5 MB each, or provide a hosted URL.</p>
        <div className="admin-field full"><label>Cover image upload</label><input name="coverImageFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" /><label>Or cover image URL</label><input name="coverImageUrl" type="url" />{caseStudy?.cover_image_url && <small>Current cover image will remain unless replaced.</small>}</div>
        {[1,2,3,4].map((index)=><div className="admin-case-upload" key={index}><div className="admin-field"><label>Evidence image {index}</label><input name={`image${index}File`} type="file" accept="image/jpeg,image/png,image/webp,image/gif" /><input name={`image${index}Url`} type="url" placeholder="Or paste image URL" /></div><div className="admin-field"><label>Image caption</label><input name={`image${index}Caption`} defaultValue={images[index-1]?.caption ?? ""} /></div></div>)}
      </fieldset>

      <label className="admin-checkbox-card full"><input name="isActive" type="checkbox" defaultChecked={caseStudy?.is_active ?? true} /><span><strong>Publish case study</strong><small>Show this case study on the public website.</small></span></label>
      <div className="admin-form-actions full">{caseStudy && <a className="admin-secondary" href="/admin/case-studies">Cancel</a>}<button className="admin-primary" type="submit"><span>{submitLabel}</span><i aria-hidden="true">→</i></button></div>
    </form>
  );
}
