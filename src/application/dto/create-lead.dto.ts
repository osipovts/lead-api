import type { LeadEntity } from '../../domain/lead/lead.entity';

export type CreateLeadDto = Pick<LeadEntity, 'username' | 'contact' | 'message'>;
