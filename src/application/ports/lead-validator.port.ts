import type { ValidationResult } from '../../domain/entity-validator.types';
import type { LeadEntity } from '../../domain/lead/lead.entity';

export interface LeadValidatorPort {
  validate(
    entity: LeadEntity,
    fields?: ReadonlyArray<keyof LeadEntity>,
  ): ValidationResult<LeadEntity>;
  validateOrThrow(entity: LeadEntity, fields?: ReadonlyArray<keyof LeadEntity>): void;
}
