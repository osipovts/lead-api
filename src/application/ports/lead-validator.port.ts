import type { LeadProperties } from '../../domain/lead/lead.entity';
import type { EntityValidatorPort } from './entity-validator.port';

export type LeadValidatorPort = EntityValidatorPort<LeadProperties>;
