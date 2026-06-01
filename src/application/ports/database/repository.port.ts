export interface RepositoryPort<TEntity> {
  save(entity: TEntity): Promise<TEntity>;
  get(id: string): Promise<TEntity>;
  delete(id: string): Promise<number>;
}
