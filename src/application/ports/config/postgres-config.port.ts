import type { Pojo } from '../../../types';
import { has, isPojo } from '../../../types';

export interface PostgresConfigPort extends Pojo {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly database: string;
}

export function isPostgresConfigPort(obj: unknown): obj is PostgresConfigPort {
  return (
    isPojo(obj) &&
    has(obj, 'host', 'string') &&
    has(obj, 'port', 'number') &&
    has(obj, 'user', 'string') &&
    has(obj, 'password', 'string') &&
    has(obj, 'database', 'string')
  );
}
