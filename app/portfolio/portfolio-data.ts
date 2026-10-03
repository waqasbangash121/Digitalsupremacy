import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export type PortfolioProject = { id: string; src: string; title: string; type: string; width: number; height: number };
export type PortfolioBrand = { id: string; name: string; projects: PortfolioProject[] };

const brandNames: Record<string, string> = {
  cruecosmetics: "Crue Cosmetics",
  duke: "Duke & D'or",
  ericajewels: "Erica Jewels",
  hairsofab: "Hair So Fab",
  ladyprimrose: "Lady Primrose",
  ojaiswellness: "Ojais Wellness",
  trendytransfers: "Trendy Transfers",
};

// Each directory containing artwork is a brand, including legacy nested folders.
export async function getPortfolioBrands(): Promise<PortfolioBrand[]> {
  const root = path.join(process.cwd(), "public", "portfolio");
  const brands: PortfolioBrand[] = [];
  async function visit(directory: string) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = entries.filter(entry => entry.isFile() && /\.(png|jpe?g|webp|avif)$/i.test(entry.name));
    if (files.length) {
      const relative = path.relative(root, directory);
      const projects = await Promise.all(files.map(async file => {
        const title = file.name.replace(/\.[^.]+$/, "").replace(/[_.]+/g, " ").trim();
        const metadata = await sharp(path.join(directory, file.name)).metadata();
        return { id: `${relative}/${file.name}`, src: `/portfolio/${relative.split(path.sep).map(encodeURIComponent).join("/")}/${encodeURIComponent(file.name)}`, title,
          type: /welcome/i.test(title) ? "Welcome flow" : /abandon|cart/i.test(title) ? "Abandonment flow" : /confirmation/i.test(title) ? "Transactional" : "Campaign",
          width: metadata.width ?? 1200, height: metadata.height ?? 1200 };
      }));
      projects.sort((a, b) => Number(/welcome/i.test(b.title)) - Number(/welcome/i.test(a.title)) || a.title.localeCompare(b.title));
      const name = brandNames[path.basename(directory).toLowerCase()]
        ?? path.basename(directory).replace(/[-_]/g, " ").toUpperCase();
      brands.push({ id: relative, name, projects });
    }
    for (const entry of entries.filter(entry => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) await visit(path.join(directory, entry.name));
  }
  await visit(root);
  return brands.sort((a, b) => a.name.localeCompare(b.name));
}
