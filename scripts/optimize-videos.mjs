import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const videosDir = path.join(projectRoot, 'public', 'assets', 'videos');

function toPosixPath(value) {
  return value.split(path.sep).join('/');
}

async function listVideoSources() {
  const entries = await fs.readdir(videosDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(videosDir, entry.name))
    .filter((file) => /\.(mp4|mov)$/i.test(file))
    .filter((file) => !/\.av1\.mp4$/i.test(file))
    .filter((file) => !/\.h264\.mp4$/i.test(file));
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`${command} ${args.join(' ')}\n${stderr || stdout}`));
    });
  });
}

async function detectAv1Encoder() {
  const { stdout, stderr } = await run(ffmpegPath, ['-hide_banner', '-encoders']);
  const output = `${stdout}\n${stderr}`;
  if (output.includes('libsvtav1')) return 'libsvtav1';
  if (output.includes('libaom-av1')) return 'libaom-av1';
  return null;
}

async function ensureEncodedVideos(inputPath, av1Encoder) {
  const parsed = path.parse(inputPath);
  const baseName = path.join(parsed.dir, parsed.name);
  const av1Output = `${baseName}.av1.mp4`;
  const h264Output = `${baseName}.h264.mp4`;

  await fs.rm(av1Output, { force: true });
  await fs.rm(h264Output, { force: true });

  const scaleFilter = "scale='min(1920,iw)':-2";

  if (!av1Encoder) {
    throw new Error('AV1 encoder not available in ffmpeg-static build.');
  }

  await run(ffmpegPath, [
    '-y',
    '-i',
    inputPath,
    '-vf',
    scaleFilter,
    '-c:v',
    av1Encoder,
    '-crf',
    '32',
    '-b:v',
    '0',
    '-pix_fmt',
    'yuv420p',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-movflags',
    '+faststart',
    av1Output,
  ]);

  await run(ffmpegPath, [
    '-y',
    '-i',
    inputPath,
    '-vf',
    scaleFilter,
    '-c:v',
    'libx264',
    '-crf',
    '23',
    '-preset',
    'medium',
    '-pix_fmt',
    'yuv420p',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-movflags',
    '+faststart',
    h264Output,
  ]);

  return { av1Output, h264Output };
}

async function fileSize(absPath) {
  const stat = await fs.stat(absPath);
  return stat.size;
}

async function main() {
  if (!ffmpegPath) {
    throw new Error('ffmpeg-static did not resolve an ffmpeg binary for this platform.');
  }

  const encoder = await detectAv1Encoder();
  const sources = await listVideoSources();

  let processed = 0;
  for (const file of sources) {
    const { av1Output, h264Output } = await ensureEncodedVideos(file, encoder);
    const [sourceSize, av1Size, h264Size] = await Promise.all([fileSize(file), fileSize(av1Output), fileSize(h264Output)]);
    await fs.unlink(file);
    processed += 1;
    process.stdout.write(
      [
        `Converted: ${toPosixPath(path.relative(projectRoot, file))}`,
        `  source: ${sourceSize} bytes`,
        `  av1:    ${av1Size} bytes`,
        `  h264:   ${h264Size} bytes`,
      ].join('\n') + '\n'
    );
  }

  process.stdout.write(`Videos processed: ${processed}\n`);
}

main().catch((err) => {
  process.stderr.write(`${err?.stack || err}\n`);
  process.exitCode = 1;
});

