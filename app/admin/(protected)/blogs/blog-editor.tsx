"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function markdownToHtml(markdown: string) {
  if (!markdown.trim()) return "<p><br></p>";
  if (/^\s*</.test(markdown)) return markdown;

  return markdown
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => {
      const safe = escapeHtml(line)
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, "<code>$1</code>");
      if (!safe.trim()) return "<p><br></p>";
      if (safe.startsWith("### ")) return `<h3>${safe.slice(4)}</h3>`;
      if (safe.startsWith("## ")) return `<h2>${safe.slice(3)}</h2>`;
      if (safe.startsWith("# ")) return `<h1>${safe.slice(2)}</h1>`;
      if (safe.startsWith("> ")) return `<blockquote>${safe.slice(2)}</blockquote>`;
      if (/^[-*]\s+/.test(safe)) return `<ul><li>${safe.replace(/^[-*]\s+/, "")}</li></ul>`;
      return `<p>${safe}</p>`;
    })
    .join("");
}

export default function BlogEditor({ defaultValue = "" }: { defaultValue?: string }) {
  const initialHtml = useMemo(() => markdownToHtml(defaultValue), [defaultValue]);
  const [html, setHtml] = useState(initialHtml);
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== initialHtml) editor.innerHTML = initialHtml;
  }, [initialHtml]);

  function rememberSelection() {
    const selection = window.getSelection();
    if (!selection?.rangeCount || !editorRef.current?.contains(selection.anchorNode)) return;
    savedRange.current = selection.getRangeAt(0).cloneRange();
  }

  function restoreSelection() {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection) return;
    editor.focus();
    selection.removeAllRanges();
    if (savedRange.current) selection.addRange(savedRange.current);
  }

  function syncHtml() {
    const next = editorRef.current?.innerHTML ?? "";
    setHtml(next);
    rememberSelection();
  }

  function command(name: string, value?: string) {
    restoreSelection();
    document.execCommand(name, false, value);
    syncHtml();
  }

  function insertLink() {
    const url = window.prompt("Enter the destination URL");
    if (!url) return;
    command("createLink", url);
  }

  async function insertImage(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 1_500_000) {
      window.alert("Inline images must be 1.5 MB or smaller.");
      return;
    }

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const alt = window.prompt("Describe this image for accessibility", file.name.replace(/\.[^.]+$/, "")) ?? "";
    restoreSelection();
    document.execCommand("insertHTML", false, `<figure><img src="${dataUrl}" alt="${escapeHtml(alt)}"><figcaption>${escapeHtml(alt)}</figcaption></figure><p><br></p>`);
    syncHtml();
  }

  const toolbarMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    rememberSelection();
  };

  return (
    <div className="blog-editor-shell">
      <div className="blog-editor-toolbar" onMouseDown={toolbarMouseDown}>
        <select aria-label="Text style" defaultValue="p" onChange={(event) => command("formatBlock", event.target.value)}>
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="blockquote">Quote</option>
        </select>
        <span className="blog-editor-divider" />
        <button type="button" title="Bold" onClick={() => command("bold")}><strong>B</strong></button>
        <button type="button" title="Italic" onClick={() => command("italic")}><em>I</em></button>
        <button type="button" title="Underline" onClick={() => command("underline")}><u>U</u></button>
        <button type="button" title="Bullet list" onClick={() => command("insertUnorderedList")}>• List</button>
        <button type="button" title="Numbered list" onClick={() => command("insertOrderedList")}>1. List</button>
        <button type="button" title="Add link" onClick={insertLink}>Link</button>
        <button type="button" title="Remove formatting" onClick={() => command("removeFormat")}>Clear</button>
        <label className="blog-editor-image">Add image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => { const file = event.target.files?.[0]; if (file) void insertImage(file); event.currentTarget.value = ""; }} /></label>
      </div>

      <div
        ref={editorRef}
        className="blog-rich-editor"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        data-placeholder="Start writing your article…"
        onInput={syncHtml}
        onKeyUp={rememberSelection}
        onMouseUp={rememberSelection}
        onFocus={rememberSelection}
        dangerouslySetInnerHTML={{ __html: initialHtml }}
      />
      <textarea name="contentMarkdown" value={html} readOnly hidden required />
      <div className="blog-editor-status"><span>Rich text editor</span><span>{html.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length} words</span></div>
    </div>
  );
}
