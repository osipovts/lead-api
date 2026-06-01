import type { MapperPort } from '../../application/ports/database/mapper.port';
import type { EntityInterface } from '../../domain/entity/entity.interface';
import type { Pojo } from '../../types';
import type { EntityFactoryType, EntityLikeRowType } from '../knex.types';
import { isEntityLike } from '../knex.types';

/**
 * Very basic data mapper
 *
 * Example:
 *
 * function catEntityFactory(
 *   id: string,
 *   properties: CatEntity['properties'],
 *   createdAt?: Date,
 *   updatedAt?: Date,
 * ): LeadEntity {
 *   return new CatEntity(id, properties, createdAt, updatedAt);
 * }
 *
 * export const getCatsKnexMapper = () => new KnexMapper<CatEntity>(catEntityFactory);
 */
export class KnexMapper<TEntity extends EntityInterface> implements MapperPort<
  TEntity,
  EntityLikeRowType
> {
  constructor(protected readonly entityFactory: EntityFactoryType<TEntity>) {}

  toEntity(row: EntityLikeRowType): TEntity {
    const camel = this.transformKeys(row, this.toCamelCase.bind(this));

    if (!isEntityLike(camel)) {
      throw new Error('Unexpected row');
    }

    return this.entityFactory(camel.id, camel.properties, camel.createdAt, camel.updatedAt);
  }

  toRow(entity: TEntity): EntityLikeRowType {
    return {
      ...this.transformKeys(entity.properties, this.toSnakeCase.bind(this)),
      ...(entity.createdAt ? { created_at: entity.createdAt } : {}),
      ...(entity.updatedAt ? { updated_at: entity.updatedAt } : {}),
      id: entity.id,
    };
  }

  // helpers
  protected toCamelCase(value: string): string {
    return value.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
  }

  protected toSnakeCase(value: string): string {
    return value.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
  }

  protected transformKeys(input: Pojo, transformKey: (key: string) => string): Pojo {
    const result: Pojo = {};

    for (const [key, value] of Object.entries(input)) {
      result[transformKey(key)] = value;
    }

    return result;
  }
}
