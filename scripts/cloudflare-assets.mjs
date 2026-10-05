/*
 * Post-build step for the Cloudflare deploy: writes dist/_redirects from the
 * `redirects` in vercel.json, so both hosts share one list and can't drift.
 * (dist/_headers comes straight from public/_headers via Vite.)
 *
 * Cloudflare differences handled here:
 * - `:name*` wildcards become `*` in the source and `:splat` in the destination.
 * - Static sources are emitted with and without a trailing slash, since the
 *   legacy WordPress URLs all end in `/`.
 * - Every sitemap page also gets a `/page/ -> /page` 301 (see below).
 * - Cloudflare caps _redirects at 2000 static and 100 dynamic rules.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { redirects = [] } = JSON.parse(await readFile(join(ROOT, 'vercel.json'), 'utf8'));

const staticLines = [];
const dynamicLines = [];
let staticCount = 0;
let dynamicCount = 0;

for (const { source, destination, permanent = true } of redirects) {
  const status = permanent ? 301 : 302;
  const wildcard = /\/:\w+\*$/;
  if (wildcard.test(source)) {
    const src = source.replace(wildcard, '/*');
    const dest = destination.replace(/:\w+\*/g, ':splat');
    dynamicLines.push(`${src} ${dest} ${status}`);
    dynamicCount += 1;
  } else if (/:/.test(source)) {
    throw new Error(`Unsupported redirect pattern for Cloudflare: ${source}`);
  } else {
    staticLines.push(`${source} ${destination} ${status}`);
    staticCount += 1;
    if (source !== '/') {
      staticLines.push(`${source}/ ${destination} ${status}`);
      staticCount += 1;
    }
  }
}

// Trailing-slash variants of every real page get an explicit 301. Without
// these, html_handling answers /about/ with a temporary 307, and indexed
// WordPress URLs like /about/ or /contact/ wouldn't pass their ranking on.
const sitemap = await readFile(join(ROOT, 'dist', 'sitemap.xml'), 'utf8');
const sources = new Set(staticLines.map((line) => line.split(' ')[0]));
for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = new URL(url).pathname.replace(/\/$/, '');
  if (!path || sources.has(`${path}/`)) continue;
  staticLines.push(`${path}/ ${path} 301`);
  staticCount += 1;
}

if (staticCount > 2000 || dynamicCount > 100) {
  throw new Error(`Too many redirects for Cloudflare: ${staticCount} static, ${dynamicCount} dynamic`);
}

// Static rules first, then wildcards (Cloudflare matches static rules faster).
// Safe here because no static source falls under an earlier wildcard.
const lines = [
  '# Generated from vercel.json by scripts/cloudflare-assets.mjs. Do not edit.',
  ...staticLines,
  ...dynamicLines,
];
await writeFile(join(ROOT, 'dist', '_redirects'), `${lines.join('\n')}\n`, 'utf8');
console.log(`Wrote dist/_redirects: ${staticCount} static + ${dynamicCount} dynamic rules.`);
