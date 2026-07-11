import type { ReactNode } from "react";

function sanitizeRichText(html: string) {
  return html
    .replace(/<\/?(?:script|style|iframe|object|embed|form|input|button|meta|link)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi, "")
    .replace(/\s(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, ' $1="#"');
}

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(!?\[[^\]]*\]\([^\s)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g);
  return tokens.map((token, index) => {
    const image = token.match(/^!\[([^\]]*)\]\(([^\s)]+)\)$/);
    if (image) return <img key={index} src={image[2]} alt={image[1]} loading="lazy" />;
    const link = token.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target={link[2].startsWith("http") ? "_blank" : undefined} rel={link[2].startsWith("http") ? "noreferrer" : undefined}>{link[1]}</a>;
    if (token.startsWith("**") && token.endsWith("**")) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (token.startsWith("`") && token.endsWith("`")) return <code key={index}>{token.slice(1, -1)}</code>;
    return token;
  });
}

function MarkdownFallback({ content }: { content: string }) {
  const lines = content.replace(/\r/g, "").split("\n");
  const nodes: ReactNode[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let inCode = false;

  const flushList = () => {
    if (!list.length) return;
    nodes.push(<ul key={`list-${nodes.length}`}>{list.map((item, index) => <li key={index}>{inline(item)}</li>)}</ul>);
    list = [];
  };
  const flushCode = () => {
    nodes.push(<pre key={`code-${nodes.length}`}><code>{code.join("\n")}</code></pre>);
    code = [];
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) { flushList(); if (inCode) flushCode(); inCode = !inCode; return; }
    if (inCode) { code.push(line); return; }
    if (/^[-*]\s+/.test(line)) { list.push(line.replace(/^[-*]\s+/, "")); return; }
    flushList();
    if (!line.trim()) return;
    if (line.startsWith("### ")) nodes.push(<h3 key={nodes.length}>{inline(line.slice(4))}</h3>);
    else if (line.startsWith("## ")) nodes.push(<h2 key={nodes.length}>{inline(line.slice(3))}</h2>);
    else if (line.startsWith("# ")) nodes.push(<h1 key={nodes.length}>{inline(line.slice(2))}</h1>);
    else if (line.startsWith("> ")) nodes.push(<blockquote key={nodes.length}>{inline(line.slice(2))}</blockquote>);
    else if (/^!\[[^\]]*\]\([^\s)]+\)$/.test(line.trim())) nodes.push(<div className="blog-inline-image" key={nodes.length}>{inline(line.trim())}</div>);
    else nodes.push(<p key={nodes.length}>{inline(line)}</p>);
  });

  flushList();
  if (inCode && code.length) flushCode();
  return <>{nodes}</>;
}

export default function MarkdownContent({ content }: { content: string }) {
  const isRichText = /^\s*</.test(content);
  return (
    <div className="markdown-content rich-article-content">
      {isRichText ? <div dangerouslySetInnerHTML={{ __html: sanitizeRichText(content) }} /> : <MarkdownFallback content={content} />}
    </div>
  );
}
