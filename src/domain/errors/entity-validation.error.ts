import type { ValidationDetails } from '../entity/entity-validator.types';

export class EntityValidationError<T extends object> extends Error {
  constructor(
    public readonly entityName: string,
    public readonly details: ValidationDetails<T>,
  ) {
    super(`${entityName} validation error`);
  }
}
