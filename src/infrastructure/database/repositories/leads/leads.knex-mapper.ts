import { LeadEntity } from '../../../../domain/lead/lead.entity';
import { KnexMapper } from '../../knex.mapper';

function leadEntityFactory(
  id: LeadEntity['id'],
  properties: LeadEntity['properties'],
  createdAt?: Date,
  _?: Date,
): LeadEntity {
  return new LeadEntity(id, properties, createdAt);
}

export const getLeadsKnexMapper = () => new KnexMapper<LeadEntity>(leadEntityFactory);
