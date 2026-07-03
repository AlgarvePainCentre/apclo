import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const publicDir = path.join(projectRoot, 'public');
const srcDir = path.join(projectRoot, 'src');

const excludedPublicFiles = new Set([
  'android-chrome-192x192.png',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
]);

function toPosixPath(value) {
  return value.split(path.sep).join('/');
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkFiles(fullPath);
      if (entry.isFile()) return [fullPath];
      return [];
    })
  );
  return files.flat();
}

function getRelativeFromPublic(absPath) {
  return toPosixPath(path.relative(publicDir, absPath));
}

function isAssetImage(absPath) {
  const rel = getRelativeFromPublic(absPath);
  if (excludedPublicFiles.has(rel)) return false;
  if (!rel.startsWith('assets/')) return false;
  if (rel.startsWith('assets/videos/')) return false;
  return /\.(png|jpe?g)$/i.test(rel);
}

function getWebpPath(absPath) {
  return absPath.replace(/\.(png|jpe?g)$/i, '.webp');
}

async function ensureWebp(absPath) {
  const rel = getRelativeFromPublic(absPath);
  const webpPath = getWebpPath(absPath);
  const ext = path.extname(absPath).toLowerCase();
  const webpRel = getRelativeFromPublic(webpPath);

  try {
    await fs.access(webpPath);
    return { input: rel, output: webpRel, created: false };
  } catch {}

  const transformer = sharp(absPath).rotate();
  const webpOptions = ext === '.png' ? { lossless: true } : { quality: 85 };
  await transformer.webp(webpOptions).toFile(webpPath);
  return { input: rel, output: webpRel, created: true };
}

const textFileExtensions = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.css',
  '.html',
  '.json',
  '.xml',
  '.txt',
  '.md',
]);

async function rewriteAssetReferencesInFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!textFileExtensions.has(ext)) return { filePath, changed: false };

  const before = await fs.readFile(filePath, 'utf8');
  const after = before
    .replace(/\/assets\/([^\s"'()]+?)\.(png|jpe?g)\b/gi, '/assets/$1.webp')
    .replace(/\bassets\/([^\s"'()]+?)\.(png|jpe?g)\b/gi, 'assets/$1.webp');

  if (after === before) return { filePath, changed: false };
  await fs.writeFile(filePath, after, 'utf8');
  return { filePath, changed: true };
}

async function scanForLegacyAssetImageReferences() {
  const scanFiles = [
    ...(await walkFiles(srcDir)),
    ...(await walkFiles(publicDir)),
    path.join(projectRoot, 'index.html'),
  ].filter((file) => textFileExtensions.has(path.extname(file).toLowerCase()));

  const results = [];
  for (const file of scanFiles) {
    const content = await fs.readFile(file, 'utf8');
    const matches = content.match(/\/assets\/[^\s"'()]+?\.(png|jpe?g)\b/gi) || [];
    if (matches.length) results.push({ file, count: matches.length });
  }
  return results;
}

async function main() {
  const publicFiles = await walkFiles(publicDir);
  const assetImages = publicFiles.filter(isAssetImage);

  const conversions = [];
  for (const file of assetImages) {
    conversions.push(await ensureWebp(file));
  }

  const rewriteTargets = [
    ...(await walkFiles(srcDir)),
    ...(await walkFiles(publicDir)),
    path.join(projectRoot, 'index.html'),
  ];

  let rewrittenFiles = 0;
  for (const file of rewriteTargets) {
    const result = await rewriteAssetReferencesInFile(file);
    if (result.changed) rewrittenFiles += 1;
  }

  const legacyRefs = await scanForLegacyAssetImageReferences();
  if (legacyRefs.length) {
    const sample = legacyRefs.slice(0, 10).map((r) => `${toPosixPath(path.relative(projectRoot, r.file))} (${r.count})`);
    throw new Error(`Legacy /assets/*.(png|jpg|jpeg) references remain:\n${sample.join('\n')}`);
  }

  let deletedOriginals = 0;
  for (const file of assetImages) {
    const webpPath = getWebpPath(file);
    try {
      await fs.access(webpPath);
    } catch {
      continue;
    }
    await fs.unlink(file);
    deletedOriginals += 1;
  }

  const createdCount = conversions.filter((c) => c.created).length;
  const existingCount = conversions.length - createdCount;
  process.stdout.write(
    [
      `Images found: ${assetImages.length}`,
      `WebP created: ${createdCount}`,
      `WebP already existed: ${existingCount}`,
      `Files rewritten: ${rewrittenFiles}`,
      `Original images deleted: ${deletedOriginals}`,
    ].join('\n') + '\n'
  );
}

main().catch((err) => {
  process.stderr.write(`${err?.stack || err}\n`);
  process.exitCode = 1;
});

