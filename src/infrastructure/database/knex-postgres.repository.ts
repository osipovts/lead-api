import type { MapperPort } from '../../application/ports/database/mapper.port';
import type { RepositoryPort } from '../../application/ports/database/repository.port';
import type { EntityInterface } from '../../domain/entity/entity.interface';
import { EntityNotFoundError } from '../../domain/errors/entity-not-found.error';
import { EntitySaveError } from '../../domain/errors/entity-save.error';
import type { EntityLikeRowType } from '../knex.types';
import type { KnexPostgresClient } from './knex-postgres.client';

/**
 * Very basic knex repository
 */
export abstract class KnexPostgresRepository<
  TEntity extends EntityInterface,
> implements RepositoryPort<TEntity> {
  abstract readonly entityName: string;
  abstract readonly tableName: string;

  constructor(
    protected readonly client: KnexPostgresClient,
    protected readonly mapper: MapperPort<TEntity, EntityLikeRowType>,
    protected readonly idColumn = 'id',
  ) {}

  get table() {
    return this.client.instance<EntityLikeRowType>(this.tableName);
  }

  async save(entity: TEntity): Promise<TEntity> {
    const row = this.mapper.toRow(entity);

    const [savedRow] = await this.table
      .insert(row)
      .onConflict(this.idColumn)
      .merge()
      .returning('*');

    if (!savedRow) {
      throw new EntitySaveError(this.entityName);
    }

    return this.mapper.toEntity(savedRow);
  }

  async get(id: string): Promise<TEntity> {
    const row = await this.table.where(this.idColumn, id).first();

    if (!row) {
      throw new EntityNotFoundError(this.entityName);
    }

    return this.mapper.toEntity(row);
  }

  async delete(id: string): Promise<number> {
    return this.table.where(this.idColumn, id).del();
  }
}
