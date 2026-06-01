export class EntitySaveError extends Error {
  constructor(public readonly entityName: string) {
    super(`An error occured while saving ${entityName}`);
  }
}
