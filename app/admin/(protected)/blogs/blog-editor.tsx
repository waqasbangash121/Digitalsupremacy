"use client";

import { useRef, useState } from "react";
import MarkdownContent from "@/components/markdown-content";

export default function BlogEditor({ defaultValue = "" }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function wrap(before: string, after = before, placeholder = "text") {
    const field = textareaRef.current;
    if (!field) return;
    const start = field.selectionStart;
    const end = field.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
    setValue(next);
    requestAnimationFrame(() => {
      field.focus();
      field.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function prefix(prefixValue: string) {
    const field = textareaRef.current;
    if (!field) return;
    const start = value.lastIndexOf("\n", field.selectionStart - 1) + 1;
    setValue(`${value.slice(0, start)}${prefixValue}${value.slice(start)}`);
    requestAnimationFrame(() => field.focus());
  }

  async function insertImage(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 1_500_000) {
      alert("Inline images must be 1.5 MB or smaller.");
      return;
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const field = textareaRef.current;
    const start = field?.selectionStart ?? value.length;
    const markdown = `\n![${file.name.replace(/\.[^.]+$/, "")}](${dataUrl})\n`;
    setValue(`${value.slice(0, start)}${markdown}${value.slice(start)}`);
  }

  return (
    <div className="blog-editor-shell">
      <div className="blog-editor-toolbar">
        <button type="button" onClick={() => wrap("**", "**", "bold text")}><strong>B</strong></button>
        <button type="button" onClick={() => wrap("`", "`", "code")}>Code</button>
        <button type="button" onClick={() => prefix("## ")}>H2</button>
        <button type="button" onClick={() => prefix("### ")}>H3</button>
        <button type="button" onClick={() => prefix("- ")}>List</button>
        <button type="button" onClick={() => wrap("[", "](https://)", "link text")}>Link</button>
        <label className="blog-editor-image">Image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => { const file = event.target.files?.[0]; if (file) void insertImage(file); event.currentTarget.value = ""; }} /></label>
        <button className="blog-editor-preview-toggle" type="button" onClick={() => setPreview((current) => !current)}>{preview ? "Write" : "Preview"}</button>
      </div>
      {preview ? (
        <div className="blog-editor-preview"><MarkdownContent content={value} /></div>
      ) : (
        <textarea ref={textareaRef} name="contentMarkdown" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Write the article in Markdown..." required />
      )}
      {preview && <input type="hidden" name="contentMarkdown" value={value} />}
      <small>Use the toolbar or Markdown. Inline images are embedded directly into the article.</small>
    </div>
  );
}
