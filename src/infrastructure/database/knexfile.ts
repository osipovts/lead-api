import 'dotenv/config';

import type { Knex } from 'knex';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const migrationsDirectory = join(dirname(fileURLToPath(import.meta.url)), 'migrations');

const connection = {
  ...(process.env['POSTGRES_HOST'] ? { host: process.env['POSTGRES_HOST'] } : {}),
  ...(process.env['POSTGRES_PORT'] ? { port: Number(process.env['POSTGRES_PORT']) } : {}),
  database: process.env['POSTGRES_DB'] ?? '',
  user: process.env['POSTGRES_USER'] ?? '',
  password: process.env['POSTGRES_PASSWORD'] ?? '',
} satisfies Knex.PgConnectionConfig;

const config: Record<string, Knex.Config> = {
  development: {
    client: 'postgresql',
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: migrationsDirectory,
      extension: 'ts',
      loadExtensions: ['.ts'],
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: migrationsDirectory,
      extension: 'js',
      loadExtensions: ['.js'],
      tableName: 'knex_migrations',
    },
  },
};

export default config;
