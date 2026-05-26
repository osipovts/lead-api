import type { RequireOnly, ValidationResult } from '../../domain/entity-validator.types';

export interface EntityValidatorPort<T extends object> {
  validate(entity: T): ValidationResult<T>;
  validate<F extends ReadonlyArray<keyof T>>(
    entity: RequireOnly<T, F[number]>,
    fields: F,
  ): ValidationResult<T>;
  validateOrThrow(entity: T): void;
  validateOrThrow<F extends ReadonlyArray<keyof T>>(
    entity: RequireOnly<T, F[number]>,
    fields: F,
  ): void;
}
