import type { LeadEntity } from '../../domain/lead/lead.entity';
import type { CreateLeadDto } from '../dto/create-lead.dto';

export interface LeadEntityFactoryPort {
  fromDto(dto: CreateLeadDto): LeadEntity;
}
