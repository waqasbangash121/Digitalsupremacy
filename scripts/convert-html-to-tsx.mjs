import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const appDirectory = path.join(projectRoot, "app");
const voidElements = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

const jsxAttributeNames = new Map(
  [
    ["stroke-width", "strokeWidth"],
    ["stroke-linecap", "strokeLinecap"],
    ["stroke-linejoin", "strokeLinejoin"],
    ["stroke-miterlimit", "strokeMiterlimit"],
    ["stroke-dasharray", "strokeDasharray"],
    ["stroke-dashoffset", "strokeDashoffset"],
    ["stroke-opacity", "strokeOpacity"],
    ["fill-opacity", "fillOpacity"],
    ["fill-rule", "fillRule"],
    ["clip-rule", "clipRule"],
    ["clip-path", "clipPath"],
    ["stop-color", "stopColor"],
    ["stop-opacity", "stopOpacity"],
    ["flood-color", "floodColor"],
    ["flood-opacity", "floodOpacity"],
    ["color-interpolation-filters", "colorInterpolationFilters"],
    ["dominant-baseline", "dominantBaseline"],
    ["alignment-baseline", "alignmentBaseline"],
    ["baseline-shift", "baselineShift"],
    ["text-anchor", "textAnchor"],
    ["font-family", "fontFamily"],
    ["font-size", "fontSize"],
    ["letter-spacing", "letterSpacing"],
    ["word-spacing", "wordSpacing"],
    ["gradientunits", "gradientUnits"],
    ["gradienttransform", "gradientTransform"],
    ["patternunits", "patternUnits"],
    ["patterncontentunits", "patternContentUnits"],
    ["preserveaspectratio", "preserveAspectRatio"],
    ["viewbox", "viewBox"],
    ["markerwidth", "markerWidth"],
    ["markerheight", "markerHeight"],
    ["refx", "refX"],
    ["refy", "refY"],
    ["filterunits", "filterUnits"],
    ["xmlns:xlink", "xmlnsXlink"],
    ["xlink:href", "xlinkHref"],
  ].map(([htmlName, jsxName]) => [htmlName, jsxName]),
);

const kebabToCamelCase = (value) =>
  value.replace(/-([a-z])/g, (_, character) => character.toUpperCase());

function extract(source, expression, fallback = "") {
  return source.match(expression)?.[1]?.trim() ?? fallback;
}

function cssToReactStyle(styleText) {
  const declarations = {};

  for (const declaration of styleText.split(";")) {
    const separator = declaration.indexOf(":");

    if (separator === -1) {
      continue;
    }

    const property = declaration.slice(0, separator).trim();
    const value = declaration.slice(separator + 1).trim();

    if (!property || !value) {
      continue;
    }

    declarations[property.startsWith("--") ? property : kebabToCamelCase(property)] = value;
  }

  return JSON.stringify(declarations);
}

function convertLinks(markup) {
  return markup.replace(/\shref="([a-z0-9-]+)\.html([^\"]*)"/gi, (_, pageName, suffix) => {
    const route = pageName.toLowerCase() === "index" ? "/" : `/${pageName}`;
    return ` href="${route}${suffix}"`;
  });
}

function convertInteractions(markup) {
  return markup
    .replace(
      /onclick="document\.getElementById\('([^']+)'\)\.scrollIntoView\(\{\s*behavior:\s*'smooth'\s*\}\)"/gi,
      'data-scroll-target="$1"',
    )
    .replace(/onclick="goTo\((\d+)\)"/gi, 'data-review-index="$1"')
    .replace(/onclick="prev\(\)"/gi, 'data-review-action="previous"')
    .replace(/onclick="next\(\)"/gi, 'data-review-action="next"')
    .replace(
      /onclick="window\.open\('([^']+)'\s*,\s*'_blank'\)"/gi,
      'data-open-url="$1"',
    )
    .replace(/\sonclick="[^"]*"/gi, "");
}

function convertSvgAttributes(markup) {
  return markup.replace(/\s([a-zA-Z][\w:-]*)=/g, (match, attributeName) => {
    return ` ${jsxAttributeNames.get(attributeName.toLowerCase()) ?? attributeName}=`;
  });
}

function closeVoidTags(markup) {
  const pattern = new RegExp(`<(${voidElements.join("|")})(\\b[^>]*?)(?<!\\/)>`, "gi");
  return markup.replace(pattern, "<$1$2 />");
}

function convertMarkupToJsx(markup) {
  return closeVoidTags(
    convertSvgAttributes(
      convertLinks(convertInteractions(markup))
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/\sclass=/gi, " className=")
        .replace(/\sfor=/gi, " htmlFor=")
        .replace(/\stabindex=/gi, " tabIndex=")
        .replace(/\scolspan=/gi, " colSpan=")
        .replace(/\srowspan=/gi, " rowSpan=")
        .replace(/\smaxlength=/gi, " maxLength=")
        .replace(/\sreadonly(=|\s|>)/gi, " readOnly$1")
        .replace(/\sstyle="([^"]*)"/gi, (_, styleText) => ` style={${cssToReactStyle(styleText)}}`),
    ),
  );
}

function toSafeTemplateLiteral(value) {
  return value.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function pagePathFor(fileName) {
  const pageName = path.basename(fileName, ".html");

  if (pageName.toLowerCase() === "index") {
    return path.join(appDirectory, "page.tsx");
  }

  return path.join(appDirectory, pageName, "page.tsx");
}

function buildPageSource({ title, description, styles, markup }) {
  return `import type { Metadata } from "next";

import SiteInteractions from "@/components/site-interactions";

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
};

const pageStyles = String.raw\`${toSafeTemplateLiteral(styles)}\`;

export default function Page() {
  return (
    <>
      <style>{pageStyles}</style>
      <SiteInteractions />
      ${markup}
    </>
  );
}
`;
}

async function removeLegacyCompatibilityFiles() {
  const obsoleteFiles = [
    path.join(projectRoot, "app", "[slug]", "page.tsx"),
    path.join(projectRoot, "components", "legacy-page-client.tsx"),
    path.join(projectRoot, "lib", "legacy-page.ts"),
  ];

  await Promise.all(obsoleteFiles.map((filePath) => rm(filePath, { force: true })));
}

const rootEntries = await readdir(projectRoot, { withFileTypes: true });
const htmlFiles = rootEntries
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right));

if (htmlFiles.length === 0) {
  throw new Error("No top-level HTML files were found to convert.");
}

for (const htmlFile of htmlFiles) {
  const source = await readFile(path.join(projectRoot, htmlFile), "utf8");
  const body = extract(source, /<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!body) {
    throw new Error(`${htmlFile} does not contain a <body> element.`);
  }

  const styles = Array.from(source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    .map((match) => match[1])
    .join("\n");
  const title = extract(source, /<title>([\s\S]*?)<\/title>/i, "Digital Supremacy");
  const description = extract(
    source,
    /<meta\s+name=["']description["']\s+content=["']([^"']+)["'][^>]*>/i,
    "Digital Supremacy",
  );
  const outputPath = pagePathFor(htmlFile);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    buildPageSource({
      title,
      description,
      styles,
      markup: convertMarkupToJsx(body),
    }),
  );

  console.log(`Converted ${htmlFile} -> ${path.relative(projectRoot, outputPath)}`);
}

await removeLegacyCompatibilityFiles();

if (existsSync(path.join(projectRoot, "app", "legacy-pages.css"))) {
  await rm(path.join(projectRoot, "app", "legacy-pages.css"), { force: true });
}

console.log(`Converted ${htmlFiles.length} HTML page(s) into real TSX route files.`);
