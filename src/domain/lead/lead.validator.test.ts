import type { EntityValidationError } from '../errors/entity-validation.error';
import { LeadEntity } from './lead.entity';
import { LeadValidator } from './lead.validator';

describe('LeadValidator', () => {
  let validator: LeadValidator;

  beforeEach(() => {
    validator = new LeadValidator(LeadEntity.name);
  });

  describe('validate', () => {
    it('should return valid for a valid entity', () => {
      const entity = new LeadEntity(
        '12345678-1234-7123-89ab-123456789012',
        'testuser',
        'test@example.com',
        'Test message',
        new Date(),
      );

      const result = validator.validate(entity);

      expect(result.valid).toBe(true);
      expect(result.details).toHaveLength(5);
      expect(result.details.every((d) => d.valid)).toBe(true);
    });

    it('should return invalid for an invalid UUID', () => {
      const entity = new LeadEntity(
        'invalid-uuid',
        'testuser',
        'test@example.com',
        'Test message',
        new Date(),
      );

      const result = validator.validate(entity);

      expect(result.valid).toBe(false);
      expect(result.details.find((d) => d.property === 'id')?.valid).toBe(false);
    });

    it('should return invalid for username that is too short', () => {
      const entity = new LeadEntity(
        '12345678-1234-7123-89ab-123456789012',
        '',
        'test@example.com',
        'Test message',
        new Date(),
      );

      const result = validator.validate(entity);

      expect(result.valid).toBe(false);
      expect(result.details.find((d) => d.property === 'username')?.valid).toBe(false);
    });

    it('should return invalid for username that is too long', () => {
      const entity = new LeadEntity(
        '12345678-1234-7123-89ab-123456789012',
        'a'.repeat(129),
        'test@example.com',
        'Test message',
        new Date(),
      );

      const result = validator.validate(entity);

      expect(result.valid).toBe(false);
      expect(result.details.find((d) => d.property === 'username')?.valid).toBe(false);
    });

    it('should return invalid for contact that is too short', () => {
      const entity = new LeadEntity(
        '12345678-1234-7123-89ab-123456789012',
        'testuser',
        '',
        'Test message',
        new Date(),
      );

      const result = validator.validate(entity);

      expect(result.valid).toBe(false);
      expect(result.details.find((d) => d.property === 'contact')?.valid).toBe(false);
    });

    it('should return invalid for contact that is too long', () => {
      const entity = new LeadEntity(
        '12345678-1234-7123-89ab-123456789012',
        'testuser',
        'a'.repeat(257),
        'Test message',
        new Date(),
      );

      const result = validator.validate(entity);

      expect(result.valid).toBe(false);
      expect(result.details.find((d) => d.property === 'contact')?.valid).toBe(false);
    });

    it('should return invalid for message that is too short', () => {
      const entity = new LeadEntity(
        '12345678-1234-7123-89ab-123456789012',
        'testuser',
        'test@example.com',
        '',
        new Date(),
      );

      const result = validator.validate(entity);

      expect(result.valid).toBe(false);
      expect(result.details.find((d) => d.property === 'message')?.valid).toBe(false);
    });

    it('should return invalid for message that is too long', () => {
      const entity = new LeadEntity(
        '12345678-1234-7123-89ab-123456789012',
        'testuser',
        'test@example.com',
        'a'.repeat(1025),
        new Date(),
      );

      const result = validator.validate(entity);

      expect(result.valid).toBe(false);
      expect(result.details.find((d) => d.property === 'message')?.valid).toBe(false);
    });

    it('should return invalid for invalid createdAt', () => {
      const entity = new LeadEntity(
        '12345678-1234-7123-89ab-123456789012',
        'testuser',
        'test@example.com',
        'Test message',
        // @ts-expect-error - Testing validation
        'not-a-date',
      );

      const result = validator.validate(entity);

      expect(result.valid).toBe(false);
      expect(result.details.find((d) => d.property === 'createdAt')?.valid).toBe(false);
    });
  });

  describe('validate with partial fields', () => {
    it('should validate only specified fields', () => {
      const entity = new LeadEntity(
        'invalid-uuid',
        'testuser',
        'test@example.com',
        'Test message',
        new Date(),
      );

      const result = validator.validate(entity, ['username', 'contact', 'message'] as const);

      expect(result.valid).toBe(true);
      expect(result.details).toHaveLength(3);
    });

    it('should return invalid for invalid field in specified fields', () => {
      const entity = new LeadEntity(
        'invalid-uuid',
        'testuser',
        'test@example.com',
        'Test message',
        new Date(),
      );

      const result = validator.validate(entity, ['id'] as const);

      expect(result.valid).toBe(false);
      expect(result.details).toHaveLength(1);
      expect(result.details[0]?.property).toBe('id');
    });
  });

  describe('validateOrThrow', () => {
    it('should not throw for a valid entity', () => {
      const entity = new LeadEntity(
        '12345678-1234-7123-89ab-123456789012',
        'testuser',
        'test@example.com',
        'Test message',
        new Date(),
      );

      expect(() => {
        validator.validateOrThrow(entity);
      }).not.toThrow();
    });

    it('should throw EntityValidationError for an invalid entity', () => {
      const entity = new LeadEntity(
        'invalid-uuid',
        'testuser',
        'test@example.com',
        'Test message',
        new Date(),
      );

      expect(() => {
        validator.validateOrThrow(entity);
      }).toThrow();
    });

    it('should throw with correct entity name', () => {
      const entity = new LeadEntity(
        'invalid-uuid',
        'testuser',
        'test@example.com',
        'Test message',
        new Date(),
      );

      try {
        validator.validateOrThrow(entity);
        fail('Should have thrown');
      } catch (error) {
        expect((error as EntityValidationError<LeadEntity>).entityName).toBe(LeadEntity.name);
      }
    });
  });
});
