export type Constructor<T, Args extends unknown[] = [T]> = new (...args: Args) => T;
export type Maybe<T = unknown> = undefined | T;
export type MaybeAsyncVoid = void | Promise<void>;

// Pojo
export type Pojo = Record<string, unknown>;

export function isPojo(obj: unknown): obj is Pojo {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return false;
  }

  return Object.getPrototypeOf(obj) === Object.prototype || Object.getPrototypeOf(obj) === null;
}
