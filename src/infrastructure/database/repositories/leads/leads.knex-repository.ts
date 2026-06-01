import type { Knex } from 'knex';

import { LeadEntity } from '../../../../domain/lead/lead.entity';
import { KnexRepository } from '../../knex.repository';
import { TableEnum } from '../../table.enum';
import { getLeadsKnexMapper } from './leads.knex-mapper';

export class LeadsKnexRepository extends KnexRepository<LeadEntity> {
  constructor(knex: Knex) {
    super(knex, getLeadsKnexMapper(), LeadEntity.name, TableEnum.LEADS);
  }
}
