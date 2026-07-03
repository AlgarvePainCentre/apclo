import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from '../config/env.js';
import { databaseScaffold } from '../config/database.js';
import { getNestedValue } from '../utils/core.js';

const cache = new Map();

function resolveLocale(candidate) {
  if (candidate && env.supportedLocales.includes(candidate)) {
    return candidate;
  }
  return env.defaultLocale;
}

async function loadNamespace(locale, namespace = 'common') {
  const safeLocale = resolveLocale(locale);
  const cacheKey = `${safeLocale}:${namespace}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const filePath = path.join(env.projectRoot, 'src', 'i18n', safeLocale, `${namespace}.json`);
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  cache.set(cacheKey, parsed);
  return parsed;
}

export async function translate(locale, key) {
  const [namespace = 'common', nestedKey = ''] = key.split(':');
  const messages = await loadNamespace(locale, namespace);
  return getNestedValue(messages, nestedKey) ?? key;
}

export async function getMessages(locale, namespace = 'common') {
  const safeLocale = resolveLocale(locale);
  const messages = await loadNamespace(safeLocale, namespace);
  return {
    locale: safeLocale,
    namespace,
    messages,
  };
}

export async function getHealthSnapshot() {
  return {
    service: env.appName,
    env: env.nodeEnv,
    uptimeSeconds: process.uptime(),
    locales: env.supportedLocales,
    database: {
      client: env.dbClient,
      orm: env.dbOrm,
      supportedModes: databaseScaffold,
    },
  };
}

export function detectLocale(req) {
  const requested =
    req.query.locale ||
    req.query.lang ||
    req.headers['x-locale'] ||
    req.headers['accept-language']?.split(',')[0]?.split('-')[0];

  return resolveLocale(requested);
}
