import type { EntityInterface } from '../domain/entity/entity.interface';
import { has, isPojo, maybeHasInstance, type Pojo } from '../types';

export interface EntityLikeInterface {
  id: string;
  properties: Pojo;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EntityLikeRowType = Pojo & {
  id: string;
  created_at?: Date;
  updated_at?: Date;
};

export type EntityFactoryType<TEntity extends EntityInterface> = (
  id: string,
  properties: TEntity['properties'],
  createdAt?: Date,
  updatedAt?: Date,
) => TEntity;

export function isEntityLike(obj: unknown): obj is EntityLikeInterface {
  return (
    isPojo(obj) &&
    has(obj, 'id', 'string') &&
    has(obj, 'properties', 'object') &&
    maybeHasInstance<Date>(obj, 'createdAt', Date) &&
    maybeHasInstance<Date>(obj, 'updatedAt', Date)
  );
}
