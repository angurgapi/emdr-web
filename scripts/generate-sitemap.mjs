import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { SitemapStream, streamToPromise } from "sitemap";
import { writeFile } from "node:fs/promises";

const hostname = "https://spoko.help";
const appDir = path.resolve("./src/app");
const publicDir = path.resolve("./public");
const routes = [];

/**
 * Recursively scans /app for route folders that contain page.tsx/jsx.
 * Ignores API and layout/route folders.
 */
function scan(dir, prefix = "") {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      const pageFile = readdirSync(fullPath).find((f) =>
        /^page\.(t|j)sx?$/.test(f)
      );
      if (pageFile) {
        const route =
          prefix + "/" + entry === "/page" || entry === "page"
            ? "/"
            : `${prefix}/${entry === "page" ? "" : entry}`.replace(/\/+/g, "/");
        // Exclude API and special folders
        if (!route.startsWith("/api") && !route.includes("(")) {
          routes.push(route);
        }
      }
      // Continue scanning nested folders
      scan(fullPath, `${prefix}/${entry}`);
    }
  }
}

scan(appDir);

// Always include root if not present
if (!routes.includes("/")) routes.unshift("/");

console.log("🔍 Found routes:", routes);

const sitemapStream = new SitemapStream({ hostname });
for (const url of routes) sitemapStream.write({ url });
sitemapStream.end();

const xml = (await streamToPromise(sitemapStream)).toString();
await writeFile(path.join(publicDir, "sitemap.xml"), xml);

console.log("✅ Sitemap generated at public/sitemap.xml");
