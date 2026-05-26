import type { LeadEntity } from '../../domain/lead/lead.entity';
import type { EntityValidatorPort } from './entity-validator.port';

export type LeadValidatorPort = EntityValidatorPort<LeadEntity>;
