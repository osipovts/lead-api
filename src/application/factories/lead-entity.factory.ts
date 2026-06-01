import type { LeadProperties } from '../../domain/lead/lead.entity';
import { LeadEntity } from '../../domain/lead/lead.entity';
import type { CreateLeadDto } from '../dto/create-lead.dto';
import type { EntityIdGeneratorPort } from '../ports/entity-id-generator.port';

export class LeadEntityFactory {
  constructor(private readonly entityIdGenerator: EntityIdGeneratorPort) {}

  fromDto(dto: CreateLeadDto): LeadEntity {
    const id = this.entityIdGenerator.generate();
    const properties: LeadProperties = { ...dto };

    return new LeadEntity(id, properties);
  }
}
