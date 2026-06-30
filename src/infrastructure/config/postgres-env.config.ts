import {
  isPostgresConfigPort,
  type PostgresConfigPort,
} from '../../application/ports/config/postgres-config.port';
import type { Pojo, Unknownify } from '../../types';

export function postgresEnvConfig(env: Pojo = process.env): PostgresConfigPort {
  const config: Unknownify<PostgresConfigPort> = {
    host: env['POSTGRES_HOST'],
    port: Number(env['POSTGRES_PORT']),
    user: env['POSTGRES_USER'],
    password: env['POSTGRES_PASSWORD'],
    database: env['POSTGRES_DB'],
  };

  if (!isPostgresConfigPort(config)) {
    throw new Error('Postgres config error');
  }

  return Object.freeze(config);
}
