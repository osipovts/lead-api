import type { LeadEntity } from '../../../../domain/lead/lead.entity';
import type { RepositoryPort } from '../repository.port';

export type LeadRepositoryPort = RepositoryPort<LeadEntity>;
