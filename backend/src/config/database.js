import pino from 'pino';
import { env } from './env.js';
import { AppError } from '../utils/core.js';

const logger = pino({
  level: env.logLevel,
  enabled: !env.isTest,
  base: {
    service: 'apc-backend',
    env: env.nodeEnv,
  },
});

function createNoopAdapter() {
  return {
    name: 'noop',
    async connect() {
      return { connected: false, reason: 'DB_CLIENT=none' };
    },
    async disconnect() {
      return true;
    },
  };
}

async function createNativeSqlAdapter() {
  if (!['postgres', 'mysql'].includes(env.dbClient)) return createNoopAdapter();

  const driver =
    env.dbClient === 'postgres'
      ? await import('pg').then((module) => module.Client)
      : await import('mysql2/promise').then((module) => module.default);

  let client;

  return {
    name: `${env.dbClient}-native`,
    async connect() {
      if (env.dbClient === 'postgres') {
        client = new driver({
          host: env.dbHost,
          port: env.dbPort ? Number(env.dbPort) : 5432,
          database: env.dbName,
          user: env.dbUser,
          password: env.dbPassword,
        });
        await client.connect();
      } else {
        client = await driver.createConnection({
          host: env.dbHost,
          port: env.dbPort ? Number(env.dbPort) : 3306,
          database: env.dbName,
          user: env.dbUser,
          password: env.dbPassword,
        });
      }

      return { connected: true };
    },
    async disconnect() {
      if (!client) return true;
      if (env.dbClient === 'postgres') {
        await client.end();
      } else {
        await client.end();
      }
      return true;
    },
  };
}

async function createSequelizeAdapter() {
  const { Sequelize } = await import('sequelize');
  const dialect = env.dbClient;
  let sequelize;

  return {
    name: `${dialect}-sequelize`,
    async connect() {
      sequelize = new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
        host: env.dbHost,
        port: env.dbPort ? Number(env.dbPort) : dialect === 'postgres' ? 5432 : 3306,
        dialect,
        logging: false,
      });
      await sequelize.authenticate();
      return { connected: true };
    },
    async disconnect() {
      if (sequelize) await sequelize.close();
      return true;
    },
  };
}

async function createMongoAdapter() {
  if (env.dbOrm === 'mongoose') {
    const mongoose = await import('mongoose').then((module) => module.default);
    return {
      name: 'mongodb-mongoose',
      async connect() {
        if (!env.dbUri) throw new AppError('DB_URI is required for mongoose connections', 500);
        await mongoose.connect(env.dbUri);
        return { connected: true };
      },
      async disconnect() {
        await mongoose.disconnect();
        return true;
      },
    };
  }

  const { MongoClient } = await import('mongodb');
  let client;

  return {
    name: 'mongodb-native',
    async connect() {
      if (!env.dbUri) throw new AppError('DB_URI is required for MongoDB connections', 500);
      client = new MongoClient(env.dbUri);
      await client.connect();
      return { connected: true };
    },
    async disconnect() {
      if (client) await client.close();
      return true;
    },
  };
}

async function createAdapter() {
  if (env.dbClient === 'none') return createNoopAdapter();
  if (env.dbClient === 'mongodb') return createMongoAdapter();
  if (env.dbOrm === 'sequelize') return createSequelizeAdapter();
  return createNativeSqlAdapter();
}

let adapterPromise;

export async function connectDatabase() {
  adapterPromise ||= createAdapter();
  const adapter = await adapterPromise;
  try {
    const result = await adapter.connect();
    logger.info({ adapter: adapter.name, result }, 'Database layer initialized');
    return adapter;
  } catch (error) {
    logger.error({ err: error, adapter: adapter.name }, 'Database initialization failed');
    throw error;
  }
}

export async function disconnectDatabase() {
  if (!adapterPromise) return true;
  const adapter = await adapterPromise;
  return adapter.disconnect();
}

export const databaseScaffold = {
  relational: ['postgres-native', 'mysql-native', 'postgres-sequelize', 'mysql-sequelize'],
  noSql: ['mongodb-native', 'mongodb-mongoose'],
};
