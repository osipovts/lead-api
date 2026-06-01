import { EntityValidator } from '../entity/entity.validator';
import type {
  RequireOnly,
  ValidationDetails,
  ValidationResult,
  ValidationRow,
} from '../entity/entity-validator.types';
import type { LeadProperties } from './lead.entity';

type LeadField = keyof LeadProperties;

export class LeadValidator extends EntityValidator<LeadProperties> {
  private readonly limits = {
    username: { min: 1, max: 128 },
    contact: { min: 1, max: 256 },
    message: { min: 1, max: 1024 },
  } as const;

  validate(properties: LeadProperties): ValidationResult<LeadProperties>;
  validate<F extends readonly LeadField[]>(
    entity: RequireOnly<LeadProperties, F[number]>,
    fields: F,
  ): ValidationResult<LeadProperties>;

  validate(
    properties: LeadProperties,
    fields?: readonly LeadField[],
  ): ValidationResult<LeadProperties> {
    const details: ValidationDetails<LeadProperties> = [];

    if (this.shouldValidate('username', fields)) {
      details.push(this.validateUsername(properties.username));
    }

    if (this.shouldValidate('contact', fields)) {
      details.push(this.validateContact(properties.contact));
    }

    if (this.shouldValidate('message', fields)) {
      details.push(this.validateMessage(properties.message));
    }

    return {
      valid: details.every((v) => v.valid),
      details,
    };
  }

  private validateUsername(data: string): ValidationRow<LeadProperties> {
    const { min, max } = this.limits.username;
    return this.validateLength('username', data, min, max);
  }

  private validateContact(data: string): ValidationRow<LeadProperties> {
    const { min, max } = this.limits.contact;
    return this.validateLength('contact', data, min, max);
  }

  private validateMessage(data: string): ValidationRow<LeadProperties> {
    const { min, max } = this.limits.message;
    return this.validateLength('message', data, min, max);
  }
}
