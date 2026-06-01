export interface ValidationRow<T extends object> {
  property: keyof T;
  valid: boolean;
  message?: string;
}

export type ValidationDetails<T extends object> = Array<ValidationRow<T>>;

export interface ValidationResult<T extends object> {
  valid: boolean;
  details: ValidationDetails<T>;
}

// helpers
export type RequireOnly<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;
