import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type LegacyPage = {
  markup: string;
  styles: string;
  title: string;
};

const projectRoot = process.cwd();

function extractFirstMatch(source: string, expression: RegExp, fallback = "") {
  return source.match(expression)?.[1]?.trim() ?? fallback;
}

function normalizeMarkup(markup: string) {
  return markup
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(
      /onclick="document\.getElementById\('([^']+)'\)\.scrollIntoView\(\{behavior:'smooth'\}\)"/gi,
      'data-scroll-target="$1"',
    )
    .replace(/onclick="goTo\((\d+)\)"/gi, 'data-review-index="$1"')
    .replace(/onclick="prev\(\)"/gi, 'data-review-action="previous"')
    .replace(/onclick="next\(\)"/gi, 'data-review-action="next"')
    .replace(
      /onclick="window\.open\('([^']+)'\s*,\s*'_blank'\)"/gi,
      'data-open-url="$1"',
    )
    .replace(/\shref="index\.html/gi, ' href="/')
    .replace(/\shref="([a-z0-9-]+)\.html/gi, ' href="/$1')
    .replace(/\sonclick="[^"]*"/gi, "");
}

export function getLegacyPage(pageName: string): LegacyPage | null {
  const safePageName = pageName === "index" ? "index" : pageName.replace(/[^a-z0-9-]/gi, "");

  if (!safePageName) {
    return null;
  }

  const filePath = path.join(projectRoot, `${safePageName}.html`);

  if (!existsSync(filePath)) {
    return null;
  }

  const source = readFileSync(filePath, "utf8");
  const body = extractFirstMatch(source, /<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!body) {
    return null;
  }

  const styles = Array.from(source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    .map((match) => match[1])
    .join("\n");

  return {
    title: extractFirstMatch(source, /<title>([\s\S]*?)<\/title>/i, "Digital Supremacy"),
    styles,
    markup: normalizeMarkup(body),
  };
}
