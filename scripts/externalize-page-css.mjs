import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";

import caseStudiesOverrides from "./case-studies-overrides.mjs";

const appDirectory = path.join(process.cwd(), "app");
const cssDeclarationPattern = /\nconst\s+(pageStyles|caseStudiesOverrides)\s*=\s*String\.raw`([\s\S]*?)`;\n/g;

async function findPageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findPageFiles(entryPath)));
    } else if (entry.isFile() && entry.name === "page.tsx") {
      files.push(entryPath);
    }
  }

  return files;
}

function pageSlugFromPath(pagePath) {
  const relativeDirectory = path.relative(appDirectory, path.dirname(pagePath));
  return relativeDirectory ? relativeDirectory.replaceAll(path.sep, "-") : "home";
}

function scopeSelector(selector, scope) {
  const trimmed = selector.trim();

  if (!trimmed) return trimmed;
  if (["*", "*:before", "*::before", "*:after", "*::after"].includes(trimmed)) return `${scope} ${trimmed}`;
  if ([":root", "html", "body"].includes(trimmed)) return scope;
  if (/^(html|body|:root)(?=[\s>+~.#[:]|$)/.test(trimmed)) return trimmed.replace(/^(html|body|:root)/, scope);

  return `${scope} ${trimmed}`;
}

function scopeCss(sourceCss, slug) {
  const scope = `.page--${slug}`;
  const root = postcss.parse(sourceCss);
  const keyframeNames = new Map();

  root.walkAtRules((atRule) => {
    if (/keyframes$/i.test(atRule.name)) {
      const originalName = atRule.params.trim();
      const scopedName = `${slug}-${originalName}`;
      keyframeNames.set(originalName, scopedName);
      atRule.params = scopedName;
    }
  });

  root.walkDecls((declaration) => {
    if (declaration.prop !== "animation" && declaration.prop !== "animation-name") return;

    for (const [originalName, scopedName] of keyframeNames) {
      declaration.value = declaration.value.replace(
        new RegExp(`\\b${originalName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g"),
        scopedName,
      );
    }
  });

  root.walkRules((rule) => {
    if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;

    rule.selector = postcss.list
      .comma(rule.selector)
      .map((selector) => scopeSelector(selector, scope))
      .join(", ");
  });

  return `/* Generated once from legacy page styles. Edit this file directly. */\n${root.toString()}\n`;
}

function removeInlineStyles(source) {
  return source
    .replace(cssDeclarationPattern, "\n")
    .replace(/\s*<style>\{pageStyles\}<\/style>/g, "")
    .replace(/\s*<style>\{caseStudiesOverrides\}<\/style>/g, "");
}

function addCssImport(source) {
  if (source.includes('import "./page.css";')) return source;

  return source.replace(/(import[^\n]+;\n)(?![\s\S]*import "\.\/page\.css";)/, '$1import "./page.css";\n');
}

function addPageWrapper(source, slug) {
  const wrapperClass = `page page--${slug}`;

  if (source.includes('className="case-studies-page"')) {
    return source.replace('className="case-studies-page"', `className="${wrapperClass}"`);
  }

  if (source.includes(`className="${wrapperClass}"`)) return source;
  if (!source.includes("<SiteInteractions />")) throw new Error(`Could not find SiteInteractions in ${slug}.`);

  const withOpeningWrapper = source.replace(
    "<SiteInteractions />",
    `<SiteInteractions />\n      <div className="${wrapperClass}">`,
  );
  const closingFragment = "\n    </>\n  );\n}\n";

  if (!withOpeningWrapper.endsWith(closingFragment)) {
    throw new Error(`Could not place the closing wrapper in ${slug}.`);
  }

  return `${withOpeningWrapper.slice(0, -closingFragment.length)}      </div>${closingFragment}`;
}

for (const pagePath of await findPageFiles(appDirectory)) {
  const slug = pageSlugFromPath(pagePath);
  const source = await readFile(pagePath, "utf8");
  const cssParts = [];
  let hasCaseStudiesOverrides = false;
  let match;

  while ((match = cssDeclarationPattern.exec(source)) !== null) {
    cssParts.push(match[2]);
    hasCaseStudiesOverrides ||= match[1] === "caseStudiesOverrides";
  }

  if (slug === "case-studies" && !hasCaseStudiesOverrides) cssParts.push(caseStudiesOverrides);
  if (cssParts.length === 0) continue;

  const cssPath = path.join(path.dirname(pagePath), "page.css");
  const externalCss = scopeCss(cssParts.join("\n\n"), slug);
  let nextSource = removeInlineStyles(source);

  nextSource = addCssImport(nextSource);
  nextSource = addPageWrapper(nextSource, slug);

  await writeFile(cssPath, externalCss);
  await writeFile(pagePath, nextSource);
  console.log(`Externalized ${slug}: ${path.relative(process.cwd(), cssPath)}`);
}
