import pino from 'pino';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import { validationResult } from 'express-validator';
import { env } from '../config/env.js';
import { AppError, createCsrfToken, deepSanitize, generateRequestId } from '../utils/core.js';
import { detectLocale, translate } from '../services/systemService.js';

const logger = pino({
  level: env.logLevel,
  enabled: !env.isTest,
  base: {
    service: 'apc-backend',
    env: env.nodeEnv,
  },
});

export const requestLogger = pinoHttp({
  logger,
  quietReqLogger: env.isTest,
});

export const apiLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  limit: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: 'Too many requests',
  },
});

export function requestContext(req, res, next) {
  const requestId = req.headers['x-request-id'] || generateRequestId();
  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
}

export function sanitizeInput(req, _res, next) {
  if (req.body) req.body = deepSanitize(req.body);
  if (req.query) req.query = deepSanitize(req.query);
  if (req.params) req.params = deepSanitize(req.params);
  next();
}

export async function localeMiddleware(req, res, next) {
  try {
    const locale = detectLocale(req);
    req.locale = locale;
    req.t = (key) => translate(locale, key);
    res.locals.locale = locale;
    next();
  } catch (error) {
    next(error);
  }
}

export function csrfTokenIssuer(req, res, next) {
  const existingToken = req.cookies[env.csrfCookieName];
  const token = existingToken || createCsrfToken();

  res.cookie(env.csrfCookieName, token, {
    httpOnly: false,
    sameSite: 'lax',
    secure: env.isProduction,
  });

  req.csrfToken = token;
  next();
}

export function requireCsrf(req, _res, next) {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    next();
    return;
  }

  const provided = req.headers[env.csrfHeaderName];
  const expected = req.cookies[env.csrfCookieName];

  if (!provided || !expected || provided !== expected) {
    next(new AppError('Invalid or missing CSRF token', 403));
    return;
  }

  next();
}

export function optionalAuth(req, _res, next) {
  const authHeader = req.headers.authorization;
  req.isAuthenticated = false;

  if (!authHeader) {
    next();
    return;
  }

  const [, token] = authHeader.split(' ');
  req.isAuthenticated = token === env.authBearerToken;
  next();
}

export function requireAuth(req, _res, next) {
  if (!req.isAuthenticated) {
    next(new AppError('Unauthorized', 401));
    return;
  }
  next();
}

export function validateRequest(req, _res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    next(new AppError('Validation failed', 422, result.array()));
    return;
  }
  next();
}

export function notFoundHandler(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

export function errorHandler(error, req, res, _next) {
  const statusCode = error.statusCode || 500;
  if (req.log) {
    req.log.error({ err: error, requestId: req.requestId }, 'Request failed');
  }
  res.status(statusCode).json({
    ok: false,
    error: error.message || 'Internal server error',
    details: error.details,
    requestId: req.requestId,
  });
}
