/* eslint-disable @typescript-eslint/unbound-method */
import { LeadEntity } from '../../domain/lead/lead.entity';
import type { LeadEntityFactoryPort } from '../ports/lead-entity.factory.port';
import type { LeadValidatorPort } from '../ports/lead-validator.port';
import { CreateLeadUseCase } from './create-lead.use-case';

describe('CreateLeadUseCase', () => {
  let useCase: CreateLeadUseCase;
  let mockValidator: LeadValidatorPort;
  let mockFactory: LeadEntityFactoryPort;

  beforeEach(() => {
    mockValidator = {
      validate: jest.fn().mockReturnValue({ valid: true, details: [] }),
      validateOrThrow: jest.fn(),
    };

    mockFactory = {
      fromDto: jest.fn().mockReturnValue(
        new LeadEntity(
          'test-uuid-1234',
          {
            username: 'testuser',
            contact: 'test@example.com',
            message: 'Test message',
          },
          new Date(),
        ),
      ),
    };

    useCase = new CreateLeadUseCase(mockValidator, mockFactory);
  });

  it('should create a lead form entity from DTO', () => {
    const dto = {
      username: 'testuser',
      contact: 'test@example.com',
      message: 'Test message',
    };

    const entity = useCase.execute(dto);

    expect(entity).toBeInstanceOf(LeadEntity);
    expect(entity.properties.username).toBe('testuser');
    expect(entity.properties.contact).toBe('test@example.com');
    expect(entity.properties.message).toBe('Test message');
  });

  it('should call validator with entity', () => {
    const dto = {
      username: 'testuser',
      contact: 'test@example.com',
      message: 'Test message',
    };

    useCase.execute(dto);

    expect(mockValidator.validateOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should call factory fromDto with dto', () => {
    const dto = {
      username: 'testuser',
      contact: 'test@example.com',
      message: 'Test message',
    };

    useCase.execute(dto);

    expect(mockFactory.fromDto).toHaveBeenCalledTimes(1);
    expect(mockFactory.fromDto).toHaveBeenCalledWith(dto);
  });

  it('should throw when validation fails', () => {
    const dto = {
      username: 'testuser',
      contact: 'test@example.com',
      message: 'Test message',
    };

    (mockValidator.validateOrThrow as jest.Mock).mockImplementation(() => {
      throw new Error('Validation failed');
    });

    expect(() => useCase.execute(dto)).toThrow('Validation failed');
    expect(mockFactory.fromDto).not.toHaveBeenCalled();
  });
});
