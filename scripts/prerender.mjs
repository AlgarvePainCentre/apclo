/*
 * Post-build prerender (SEO snapshots).
 *
 * The site is a client-only Vite SPA, so crawlers and link-preview bots see an
 * empty shell. This script serves the built `dist/` locally, visits every URL
 * listed in `dist/sitemap.xml` with a real headless browser, and writes the
 * fully-rendered HTML back to `dist/<route>/index.html`. On Vercel, static
 * files are served before the SPA rewrite, so these snapshots are what bots get
 * while users still load the interactive app.
 *
 * Run: `node scripts/prerender.mjs` (after `vite build`).
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import puppeteer from 'puppeteer';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ORIGIN = 'https://www.algarvepaincentre.com';
const PORT = 4180;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.otf': 'font/otf',
  '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.txt': 'text/plain', '.xml': 'application/xml',
};

async function readSitemapPaths() {
  const xml = await readFile(join(DIST, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const paths = locs
    .map((u) => u.replace(ORIGIN, '').replace(/\/$/, '') || '/')
    // never prerender preview/param/api routes
    .filter((p) => !/(^\/api)|(-v2\/)|(-template)|(:)/.test(p));
  return [...new Set(paths)];
}

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = join(DIST, url);
      let ext = extname(filePath);
      // no extension → treat as a route: serve the SPA shell
      if (!ext) {
        filePath = join(DIST, 'index.html');
        ext = '.html';
      }
      let body;
      try {
        body = await readFile(filePath);
      } catch {
        body = await readFile(join(DIST, 'index.html'));
        ext = '.html';
      }
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(body);
    } catch (e) {
      res.writeHead(500);
      res.end(String(e));
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function snapshot(browser, path) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle0', timeout: 45000 });
  // wait until the SPA has painted real content and set a real <title>
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      return root && root.textContent && root.textContent.trim().length > 200 && !!document.title;
    },
    { timeout: 20000 },
  );
  // let head-managing effects (meta / canonical / JSON-LD) settle
  await new Promise((r) => setTimeout(r, 350));
  const html = await page.content();
  await page.close();
  return html;
}

async function main() {
  const paths = await readSitemapPaths();
  const server = await startServer();

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
  } catch (e) {
    // If the build environment can't launch Chromium, don't break the deploy —
    // ship the normal SPA (no prerender) rather than failing the build.
    server.close();
    console.warn(`\n⚠ Prerender skipped — could not launch a browser: ${e.message}\n  The SPA still deploys; prerendered snapshots are just absent.`);
    process.exit(0);
  }

  let ok = 0;
  const failed = [];
  for (const path of paths) {
    try {
      const html = await snapshot(browser, path);
      const outDir = path === '/' ? DIST : join(DIST, path);
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, 'index.html'), html, 'utf8');
      ok += 1;
      process.stdout.write(`  ✓ ${path}\n`);
    } catch (e) {
      failed.push(path);
      process.stdout.write(`  ✗ ${path} — ${e.message}\n`);
    }
  }

  await browser.close();
  server.close();
  console.log(`\nPrerendered ${ok}/${paths.length} routes.` + (failed.length ? ` Failed: ${failed.join(', ')}` : ''));
  // Don't fail the build over a few flaky routes, but do fail if nothing worked.
  if (ok === 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
