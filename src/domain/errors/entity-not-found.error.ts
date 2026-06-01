export class EntityNotFoundError extends Error {
  constructor(public readonly entityName: string) {
    super(`${entityName} not found`);
  }
}
