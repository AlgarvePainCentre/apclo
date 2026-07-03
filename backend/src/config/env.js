import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');
const nodeEnv = process.env.NODE_ENV || 'development';

for (const candidate of [`.env.${nodeEnv}.local`, `.env.${nodeEnv}`, '.env']) {
  const filePath = path.join(projectRoot, candidate);
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath, override: false });
  }
}

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toList(value, fallback) {
  return (value || fallback)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  isTest: nodeEnv === 'test',
  projectRoot,
  port: toNumber(process.env.PORT, 4000),
  appName: process.env.APP_NAME || 'APC Backend',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: toList(process.env.CORS_ORIGIN, 'http://localhost:5173'),
  bodyLimit: process.env.BODY_LIMIT || '1mb',
  rateLimitWindowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: toNumber(process.env.RATE_LIMIT_MAX, 100),
  defaultLocale: process.env.DEFAULT_LOCALE || 'en',
  supportedLocales: toList(process.env.SUPPORTED_LOCALES, 'en,pt,es'),
  authBearerToken: process.env.AUTH_BEARER_TOKEN || 'change-me',
  csrfCookieName: process.env.CSRF_COOKIE_NAME || 'apc.csrf-token',
  csrfHeaderName: process.env.CSRF_HEADER_NAME || 'x-csrf-token',
  dbClient: process.env.DB_CLIENT || 'none',
  dbOrm: process.env.DB_ORM || 'native',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '',
  dbName: process.env.DB_NAME || 'apc',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbUri: process.env.DB_URI || '',
  swaggerServerUrl: process.env.SWAGGER_SERVER_URL || `http://localhost:${process.env.PORT || 4000}`,
};
