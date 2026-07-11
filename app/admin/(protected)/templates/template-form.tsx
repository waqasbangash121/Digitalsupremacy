import type { Template } from "@/lib/templates-db";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  template?: Template;
  submitLabel: string;
};

export default function TemplateForm({ action, template, submitLabel }: Props) {
  return (
    <form action={action} className="admin-card admin-template-form">
      {template && <input type="hidden" name="id" value={template.id} />}
      <input type="hidden" name="existingImage" value={template?.image_url ?? ""} />

      <div className="admin-field full"><label htmlFor="template-title">Template title</label><input id="template-title" name="title" defaultValue={template?.title ?? ""} placeholder="Black Friday product launch email" required /></div>
      <div className="admin-field"><label htmlFor="template-slug">URL slug</label><input id="template-slug" name="slug" defaultValue={template?.slug ?? ""} placeholder="black-friday-product-launch" /><small>Leave blank to generate it from the title.</small></div>
      <div className="admin-field"><label htmlFor="template-order">Display order</label><input id="template-order" name="sortOrder" type="number" defaultValue={template?.sort_order ?? 0} /></div>
      <div className="admin-field full"><label htmlFor="template-category">Category</label><input id="template-category" name="category" defaultValue={template?.category ?? ""} placeholder="Campaign, Flow, Welcome Series, Promotional" /></div>
      <div className="admin-field full"><label htmlFor="template-description">Description</label><textarea id="template-description" name="description" defaultValue={template?.description ?? ""} placeholder="Explain the purpose, layout, and ideal use case for this template." /></div>

      <div className="admin-template-media full">
        <div className="admin-field"><label htmlFor="template-image-file">Upload template image</label><input id="template-image-file" name="imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" /><small>JPG, PNG, WebP, or GIF. Maximum 1.5 MB.</small></div>
        <div className="admin-field"><label htmlFor="template-image-url">Or use an image URL</label><input id="template-image-url" name="imageUrl" type="url" placeholder="https://..." /></div>
        {template?.image_url && <div className="admin-template-preview"><img src={template.image_url} alt={`${template.title} preview`} /></div>}
      </div>

      <div className="admin-field"><label htmlFor="template-preview-url">Live preview URL</label><input id="template-preview-url" name="previewUrl" type="url" defaultValue={template?.preview_url ?? ""} placeholder="https://..." /></div>
      <div className="admin-field"><label htmlFor="template-download-url">Download or access URL</label><input id="template-download-url" name="downloadUrl" type="url" defaultValue={template?.download_url ?? ""} placeholder="https://..." /></div>

      <div className="admin-publish-options full">
        <label className="admin-checkbox-card"><input name="isFeatured" type="checkbox" defaultChecked={template?.is_featured} /><span><strong>Featured template</strong><small>Show this template before standard entries.</small></span></label>
        <label className="admin-checkbox-card"><input name="isActive" type="checkbox" defaultChecked={template?.is_active ?? true} /><span><strong>Publish template</strong><small>Make this template visible on the public page.</small></span></label>
      </div>

      <div className="admin-form-actions full">{template && <a className="admin-secondary" href="/admin/templates">Cancel</a>}<button className="admin-primary" type="submit"><span>{submitLabel}</span><i aria-hidden="true">→</i></button></div>
    </form>
  );
}
