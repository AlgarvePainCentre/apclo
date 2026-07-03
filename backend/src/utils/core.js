import crypto from 'node:crypto';
import xss from 'xss';

export class AppError extends Error {
  constructor(message, statusCode = 500, details = undefined) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function asyncHandler(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export function getNestedValue(input, path) {
  return path.split('.').reduce((accumulator, segment) => {
    if (accumulator && typeof accumulator === 'object' && segment in accumulator) {
      return accumulator[segment];
    }
    return undefined;
  }, input);
}

export function deepSanitize(input) {
  if (Array.isArray(input)) {
    return input.map(deepSanitize);
  }

  if (input && typeof input === 'object') {
    return Object.entries(input).reduce((accumulator, [key, value]) => {
      const safeKey = key.replaceAll('$', '').replaceAll('.', '_');
      accumulator[safeKey] = deepSanitize(value);
      return accumulator;
    }, {});
  }

  if (typeof input === 'string') {
    return xss(input).trim();
  }

  return input;
}

export function generateRequestId() {
  return crypto.randomUUID();
}

export function createCsrfToken() {
  return crypto.randomBytes(24).toString('hex');
}

export function sendSuccess(res, payload, meta = {}) {
  return res.status(200).json({
    ok: true,
    payload,
    meta,
  });
}
