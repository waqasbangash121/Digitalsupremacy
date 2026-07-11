import postgres from "postgres";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");

const sourceUrl = "https://raw.githubusercontent.com/waqasbangash121/Digitalsupremacy/fd7b92c40bdb00424b47ce8abe9a95e13c888c70/app/case-studies/page.tsx";
const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Could not download legacy case studies: ${response.status}`);
const source = await response.text();
const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });

function extractStudy(id, nextId) {
  const start = source.indexOf(`className="case-study" id="${id}"`);
  if (start < 0) return [];
  const next = nextId ? source.indexOf(`className="case-study" id="${nextId}"`, start + 1) : source.length;
  const block = source.slice(start, next > start ? next : source.length);
  const captions = [...block.matchAll(/className="screenshot-label">\s*([\s\S]*?)\s*<\/div>/g)].map((match) => match[1].replace(/\s+/g, " ").trim());
  const urls = [...block.matchAll(/src="(data:image\/(?:png|jpeg|webp|gif);base64,[^"]+)"/g)].map((match) => match[1]);
  return urls.map((url, index) => ({ url, caption: captions[index] ?? `Case study evidence ${index + 1}` }));
}

const migrations = [
  { slug: "wellness", images: extractStudy("wellness", "full-funnel") },
  { slug: "full-funnel", images: extractStudy("full-funnel") },
];

for (const item of migrations) {
  await sql`
    update case_studies
    set images_json = ${JSON.stringify(item.images.slice(0, 6))}, updated_at = now()
    where slug = ${item.slug}
  `;
  console.log(`Migrated ${item.images.length} image(s) for ${item.slug}`);
}

await sql.end();
console.log("Legacy case study image migration complete.");
