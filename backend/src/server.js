import pino from 'pino';
import { app } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

const logger = pino({
  level: env.logLevel,
  enabled: !env.isTest,
});

let server;

async function bootstrap() {
  try {
    await connectDatabase();
    server = app.listen(env.port, () => {
      logger.info({ port: env.port, env: env.nodeEnv }, 'Backend server listening');
    });
  } catch (error) {
    logger.error({ err: error }, 'Backend bootstrap failed');
    process.exitCode = 1;
  }
}

async function shutdown(signal) {
  logger.info({ signal }, 'Shutting down backend server');
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
  await disconnectDatabase();
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    try {
      await shutdown(signal);
    } finally {
      process.exit(0);
    }
  });
}

bootstrap();
