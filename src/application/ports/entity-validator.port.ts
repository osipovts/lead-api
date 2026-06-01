import type { RequireOnly, ValidationResult } from '../../domain/entity/entity-validator.types';

export interface EntityValidatorPort<T extends object> {
  validate(properties: T): ValidationResult<T>;
  validate<F extends ReadonlyArray<keyof T>>(
    properties: RequireOnly<T, F[number]>,
    fields: F,
  ): ValidationResult<T>;
  validateOrThrow(properties: T): void;
  validateOrThrow<F extends ReadonlyArray<keyof T>>(
    properties: RequireOnly<T, F[number]>,
    fields: F,
  ): void;
}
