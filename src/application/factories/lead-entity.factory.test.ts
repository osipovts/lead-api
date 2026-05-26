import { LeadEntity } from '../../domain/lead/lead.entity';
import type { EntityIdGeneratorPort } from '../ports/entity-id-generator.port';
import { LeadEntityFactory } from './lead-entity.factory';

describe('LeadEntityFactory', () => {
  let factory: LeadEntityFactory;
  let mockIdGenerator: EntityIdGeneratorPort;

  beforeEach(() => {
    mockIdGenerator = {
      generate: jest.fn().mockReturnValue('test-uuid-1234'),
    };
    factory = new LeadEntityFactory(mockIdGenerator);
  });

  it('should create a LeadEntity from DTO', () => {
    const dto = {
      username: 'testuser',
      contact: 'test@example.com',
      message: 'Test message',
    };

    const entity = factory.fromDto(dto);

    expect(entity).toBeInstanceOf(LeadEntity);
    expect(entity.id).toBe('test-uuid-1234');
    expect(entity.username).toBe('testuser');
    expect(entity.contact).toBe('test@example.com');
    expect(entity.message).toBe('Test message');
    expect(entity.createdAt).toBeInstanceOf(Date);
  });

  it('should call id generator generate method', () => {
    const dto = {
      username: 'testuser',
      contact: 'test@example.com',
      message: 'Test message',
    };

    factory.fromDto(dto);

    expect(mockIdGenerator.generate).toHaveBeenCalledTimes(1);
  });

  it('should create entity with different DTO values', () => {
    const dto = {
      username: 'anotheruser',
      contact: 'another@example.com',
      message: 'Another message',
    };

    const entity = factory.fromDto(dto);

    expect(entity.username).toBe('anotheruser');
    expect(entity.contact).toBe('another@example.com');
    expect(entity.message).toBe('Another message');
  });
});
