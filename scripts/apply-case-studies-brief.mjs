import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import caseStudiesOverrides from "./case-studies-overrides.mjs";

const pagePath = path.join(process.cwd(), "app", "case-studies", "page.tsx");
const importStatement = 'import SiteInteractions from "@/components/site-interactions";\n';
const componentStart = "      <style>{pageStyles}</style>\n      <SiteInteractions />\n";
const componentEnd = "\n    </>\n  );\n}\n";

function toSafeTemplateLiteral(value) {
  return value.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

let source = await readFile(pagePath, "utf8");

if (source.includes("const caseStudiesOverrides")) {
  console.log("Case studies design brief is already applied.");
  process.exit(0);
}

if (!source.includes(importStatement) || !source.includes(componentStart) || !source.endsWith(componentEnd)) {
  throw new Error("Unable to locate the generated case studies page structure.");
}

const overrideDeclaration = `\nconst caseStudiesOverrides = String.raw\`${toSafeTemplateLiteral(caseStudiesOverrides)}\`;\n`;
const patchedComponentStart = `      <style>{pageStyles}</style>\n      <style>{caseStudiesOverrides}</style>\n      <SiteInteractions />\n      <div className="case-studies-page">\n`;

source = source.replace(importStatement, `${importStatement}${overrideDeclaration}`);
source = source.replace(componentStart, patchedComponentStart);
source = `${source.slice(0, -componentEnd.length)}      </div>${componentEnd}`;

await writeFile(pagePath, source);
console.log("Applied the case studies design brief to app/case-studies/page.tsx.");
