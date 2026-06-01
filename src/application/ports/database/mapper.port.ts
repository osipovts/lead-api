import type { EntityInterface } from '../../../domain/entity/entity.interface';
import type { Pojo } from '../../../types';

export interface MapperPort<TEntity extends EntityInterface, TRow extends Pojo> {
  toEntity(row: TRow): TEntity;
  toRow(entity: TEntity): TRow;
}
