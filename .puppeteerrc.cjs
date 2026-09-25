// Keep Puppeteer's Chromium inside the project so it survives between the
// install and build steps on Vercel/CI (default ~/.cache is not persisted).
const { join } = require('node:path');

module.exports = {
  cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
};
