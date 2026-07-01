import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const pagePath = path.join(process.cwd(), "app", "case-studies", "page.tsx");
const source = await readFile(pagePath, "utf8");
const normalized = source.replace(
  /From near zero → >999% increase/g,
  "From near zero → &gt;999% increase",
);

if (normalized !== source) {
  await writeFile(pagePath, normalized);
}
