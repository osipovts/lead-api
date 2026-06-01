import type { Pojo } from '../../types';

export interface EntityInterface<TProperties extends Pojo = Pojo> {
  id: string;
  properties: TProperties;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EntityConstructor<TEntity, TArgs extends unknown[] = unknown[]> = new (
  ...args: TArgs
) => TEntity;
