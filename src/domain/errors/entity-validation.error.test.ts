import type { ValidationRow } from '../entity-validator.types';
import { EntityValidationError } from './entity-validation.error';

interface TestEntity {
  id: string;
  username: string;
  contact: string;
}

describe('EntityValidationError', () => {
  it('should create an error with entity name and details', () => {
    const details: Array<ValidationRow<TestEntity>> = [
      { property: 'id', valid: false, message: 'Invalid format' },
    ];

    const error = new EntityValidationError<TestEntity>('TestEntity', details);

    expect(error).toBeInstanceOf(Error);
    expect(error.entityName).toBe('TestEntity');
    expect(error.details).toBe(details);
    expect(error.message).toBe(`TestEntity validation error`);
  });

  it('should store multiple validation details', () => {
    const details: Array<ValidationRow<TestEntity>> = [
      { property: 'id', valid: false, message: 'Invalid format' },
      { property: 'username', valid: false, message: 'Too short' },
      { property: 'contact', valid: true },
    ];

    const error = new EntityValidationError<TestEntity>('LeadEntity', details);

    expect(error.details).toHaveLength(3);
    expect(error.details[0]?.message).toBe('Invalid format');
    expect(error.details[1]?.message).toBe('Too short');
  });
});
