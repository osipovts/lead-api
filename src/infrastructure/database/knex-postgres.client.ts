import { inject, injectable } from 'inversify';
import { type Knex, knex } from 'knex';

import type { PostgresConfigPort } from '../../application/ports/config/postgres-config.port';
import { INJECT } from '../../composition-root/container/injection-tokens';

@injectable()
export class KnexPostgresClient {
  private readonly knex: Knex;

  constructor(@inject(INJECT.CONFIG.POSTGRES) postgresConfig: PostgresConfigPort) {
    this.knex = knex({
      client: 'pg',
      connection: { ...postgresConfig },
    });
  }

  get instance(): Knex {
    return this.knex;
  }
}
