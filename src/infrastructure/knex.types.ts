import type { EntityInterface } from '../domain/entity/entity.interface';
import { isPojo, type Pojo } from '../types';

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

const hasId = (o: Pojo) => 'id' in o && typeof o['id'] === 'string';
const hasProperties = (o: Pojo) => 'properties' in o && isPojo(o['properties']);
const maybeHasCreatedAt = (o: Pojo) => !('createdAt' in o) || o['createdAt'] instanceof Date;
const maybeHasUpdatedAt = (o: Pojo) => !('updatedAt' in o) || o['updatedAt'] instanceof Date;

export function isEntityLike(obj: unknown): obj is EntityLikeInterface {
  return (
    isPojo(obj) &&
    hasId(obj) &&
    hasProperties(obj) &&
    maybeHasCreatedAt(obj) &&
    maybeHasUpdatedAt(obj)
  );
}
