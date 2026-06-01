import type { Knex } from 'knex';

import type { MapperPort } from '../../application/ports/database/mapper.port';
import type { RepositoryPort } from '../../application/ports/database/repository.port';
import type { EntityInterface } from '../../domain/entity/entity.interface';
import { EntityNotFoundError } from '../../domain/errors/entity-not-found.error';
import { EntitySaveError } from '../../domain/errors/entity-save.error';
import type { EntityLikeRowType } from '../knex.types';

/**
 * Very basic knex repository
 *
 * Example:
 *
 * import { getCatsKnexMapper } from './cats.knex-mapper';
 *
 * export class CatsKnexRepository extends KnexRepository<CatEntity> {
 *   constructor(knex: Knex) {
 *     super(knex, getCatsKnexMapper(), CatEntity.name, TableEnum.CATS);
 *   }
 * }
 */
export abstract class KnexRepository<
  TEntity extends EntityInterface,
> implements RepositoryPort<TEntity> {
  constructor(
    protected readonly knex: Knex,
    protected readonly mapper: MapperPort<TEntity, EntityLikeRowType>,
    protected readonly entityName: string,
    protected readonly tableName: string,
    protected readonly idColumn = 'id',
  ) {}

  get table() {
    return this.knex<EntityLikeRowType>(this.tableName);
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
