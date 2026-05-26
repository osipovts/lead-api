import type { RequireOnly, ValidationResult, ValidationRow } from './entity-validator.types';
import { EntityValidationError } from './errors/entity-validation.error';

export abstract class EntityValidator<T extends object> {
  constructor(private readonly entityName: string) {}

  abstract validate(entity: T): ValidationResult<T>;
  abstract validate<F extends ReadonlyArray<keyof T>>(
    entity: RequireOnly<T, F[number]>,
    fields: F,
  ): ValidationResult<T>;

  validateOrThrow(entity: T): void;
  validateOrThrow<F extends ReadonlyArray<keyof T>>(
    entity: RequireOnly<T, F[number]>,
    fields: F,
  ): void;

  validateOrThrow(entity: T, fields?: ReadonlyArray<keyof T>): void {
    const result = fields ? this.validate(entity as never, fields as never) : this.validate(entity);

    if (!result.valid) {
      throw new EntityValidationError<T>(this.entityName, result.details);
    }
  }

  protected shouldValidate(targetField: keyof T, requiredFields?: ReadonlyArray<keyof T>): boolean {
    return !requiredFields || requiredFields.includes(targetField);
  }

  protected validateLength(
    property: keyof T,
    value: string,
    minLength: number,
    maxLength: number,
  ): ValidationRow<T> {
    if (value.length < minLength) {
      return {
        property,
        valid: false,
        message: `${String(property)} is too short. Min length is ${String(minLength)} characters`,
      };
    }

    if (value.length > maxLength) {
      return {
        property,
        valid: false,
        message: `${String(property)} is too long. Max length is ${String(maxLength)} characters`,
      };
    }

    return { property, valid: true };
  }

  protected validateRegexp(property: keyof T, value: string, regexp: RegExp): ValidationRow<T> {
    if (!regexp.test(value)) {
      return {
        property,
        valid: false,
        message: 'Invalid format',
      };
    }

    return { property, valid: true };
  }

  protected validateClass(
    property: keyof T,
    value: unknown,
    ctor: new (...args: unknown[]) => unknown,
  ): ValidationRow<T> {
    if (!(value instanceof ctor)) {
      return {
        property,
        valid: false,
        message: `Invalid class: expected ${ctor.name}`,
      };
    }

    return { property, valid: true };
  }
}
