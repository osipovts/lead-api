import type { Pojo } from '../../types';
import type { EntityInterface } from '../entity/entity.interface';

export interface LeadProperties extends Pojo {
  username: string;
  contact: string;
  message: string;
}

export class LeadEntity implements EntityInterface<LeadProperties> {
  constructor(
    public readonly id: string,
    public readonly properties: LeadProperties,
    public readonly createdAt: Date = new Date(),
  ) {}
}
