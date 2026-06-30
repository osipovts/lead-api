import { injectable } from 'inversify';

import { LeadEntity } from '../../../../domain/lead/lead.entity';
import { KnexMapper } from '../../knex.mapper';

@injectable()
export class LeadsKnexMapper extends KnexMapper<LeadEntity> {
  private static readonly entityFactory = (
    id: LeadEntity['id'],
    properties: LeadEntity['properties'],
    createdAt?: Date,
    _?: Date,
  ): LeadEntity => new LeadEntity(id, properties, createdAt);

  constructor() {
    super(LeadsKnexMapper.entityFactory);
  }
}
