import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env.js';
import { openapiSpec } from './config/openapi.js';
import { apiRouter } from './routes/index.js';
import {
  apiLimiter,
  csrfTokenIssuer,
  errorHandler,
  localeMiddleware,
  notFoundHandler,
  requestContext,
  requestLogger,
  sanitizeInput,
} from './middleware/core.js';

export const app = express();

app.disable('x-powered-by');
app.use(requestLogger);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  }),
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigin.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', env.csrfHeaderName, 'Accept-Language', 'X-Locale'],
    exposedHeaders: ['X-Request-Id'],
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: env.bodyLimit }));
app.use(express.urlencoded({ extended: true, limit: env.bodyLimit }));
app.use(requestContext);
app.use(csrfTokenIssuer);
app.use(localeMiddleware);
app.use(sanitizeInput);
app.use(apiLimiter);

app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    payload: {
      service: env.appName,
      docsUrl: '/api-docs',
      locale: req.locale,
    },
  });
});

app.get('/openapi.json', (_req, res) => {
  res.status(200).json(openapiSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.use(env.apiPrefix, apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
