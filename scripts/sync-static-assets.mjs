import { cp, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDirectory = path.join(root, "public");
const staticDirectories = ["image", "images", "assets", "fonts"];

await mkdir(publicDirectory, { recursive: true });

for (const directory of staticDirectories) {
  const source = path.join(root, directory);
  const destination = path.join(publicDirectory, directory);

  try {
    const sourceStats = await stat(source);

    if (sourceStats.isDirectory()) {
      await cp(source, destination, { recursive: true, force: true });
      console.log(`Synced ${directory}/ to public/${directory}/`);
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code !== "ENOENT") {
      throw error;
    }
  }
}
