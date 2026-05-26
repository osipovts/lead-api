import { EntityValidator } from '../entity.validator';
import type {
  RequireOnly,
  ValidationDetails,
  ValidationResult,
  ValidationRow,
} from '../entity-validator.types';
import type { LeadEntity } from './lead.entity';

type LeadField = keyof LeadEntity;

export class LeadValidator extends EntityValidator<LeadEntity> {
  private readonly idRegexp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  private readonly limits = {
    username: { min: 1, max: 128 },
    contact: { min: 1, max: 256 },
    message: { min: 1, max: 1024 },
  } as const;

  validate(entity: LeadEntity): ValidationResult<LeadEntity>;
  validate<F extends readonly LeadField[]>(
    entity: RequireOnly<LeadEntity, F[number]>,
    fields: F,
  ): ValidationResult<LeadEntity>;

  validate(entity: LeadEntity, fields?: readonly LeadField[]): ValidationResult<LeadEntity> {
    const details: ValidationDetails<LeadEntity> = [];

    if (this.shouldValidate('id', fields)) {
      details.push(this.validateId(entity.id));
    }

    if (this.shouldValidate('username', fields)) {
      details.push(this.validateUsername(entity.username));
    }

    if (this.shouldValidate('contact', fields)) {
      details.push(this.validateContact(entity.contact));
    }

    if (this.shouldValidate('message', fields)) {
      details.push(this.validateMessage(entity.message));
    }

    if (this.shouldValidate('createdAt', fields)) {
      details.push(this.validateCreatedAt(entity.createdAt));
    }

    return {
      valid: details.every((v) => v.valid),
      details,
    };
  }

  private validateId(data: string): ValidationRow<LeadEntity> {
    return this.validateRegexp('id', data, this.idRegexp);
  }

  private validateUsername(data: string): ValidationRow<LeadEntity> {
    const { min, max } = this.limits.username;
    return this.validateLength('username', data, min, max);
  }

  private validateContact(data: string): ValidationRow<LeadEntity> {
    const { min, max } = this.limits.contact;
    return this.validateLength('contact', data, min, max);
  }

  private validateMessage(data: string): ValidationRow<LeadEntity> {
    const { min, max } = this.limits.message;
    return this.validateLength('message', data, min, max);
  }

  private validateCreatedAt(data: Date): ValidationRow<LeadEntity> {
    return this.validateClass('createdAt', data, Date);
  }
}
