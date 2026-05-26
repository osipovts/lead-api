import type { LeadEntity } from '../../domain/lead/lead.entity';
import type { CreateLeadDto } from '../dto/create-lead.dto';
import type { LeadEntityFactoryPort } from '../ports/lead-entity.factory.port';
import type { LeadValidatorPort } from '../ports/lead-validator.port';

export class CreateLeadUseCase {
  constructor(
    private readonly validator: LeadValidatorPort,
    private readonly factory: LeadEntityFactoryPort,
  ) {}

  execute(dto: CreateLeadDto): LeadEntity {
    this.validator.validateOrThrow(dto, ['username', 'contact', 'message']);

    const entity = this.factory.fromDto(dto);

    return entity;
  }
}
