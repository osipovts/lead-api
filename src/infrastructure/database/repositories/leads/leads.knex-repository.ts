import { inject } from 'inversify';

import { LeadEntity } from '../../../../domain/lead/lead.entity';
import { KnexPostgresClient } from '../../knex-postgres.client';
import { KnexPostgresRepository } from '../../knex-postgres.repository';
import { TableEnum } from '../../table.enum';
import { LeadsKnexMapper } from './leads.knex-mapper';

export class LeadsKnexRepository extends KnexPostgresRepository<LeadEntity> {
  readonly entityName = LeadEntity.name;
  readonly tableName = TableEnum.LEADS;

  constructor(
    @inject(KnexPostgresClient) client: KnexPostgresClient,
    @inject(LeadsKnexMapper) mapper: LeadsKnexMapper,
  ) {
    super(client, mapper);
  }
}
