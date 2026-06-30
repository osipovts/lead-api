export type Constructor<T, Args extends unknown[] = [T]> = new (...args: Args) => T;
export type Maybe<T = unknown> = undefined | T;
export type MaybeAsyncVoid = void | Promise<void>;
export type Unknownify<T> = {
  [K in keyof T]: unknown;
};

// Pojo
export type Pojo = Record<string, unknown>;

export function isPojo(obj: unknown): obj is Pojo {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return false;
  }

  return Object.getPrototypeOf(obj) === Object.prototype || Object.getPrototypeOf(obj) === null;
}

// Typeguards
export type TypeOfResult =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'function'
  | 'object';

export function has(v: Pojo, f: string, typeOf?: TypeOfResult) {
  return f in v && (!typeOf || typeof v[f] === typeOf);
}

export function maybeHas(v: Pojo, f: string, typeOf?: TypeOfResult) {
  return !(f in v) || !typeOf || typeof v[f] === typeOf;
}

export function hasInstance<T>(v: Pojo, f: string, ctor?: Constructor<T>) {
  return f in v && (!ctor || v[f] instanceof ctor);
}

export function maybeHasInstance<T>(v: Pojo, f: string, ctor?: Constructor<T>) {
  return !(f in v) || !ctor || v[f] instanceof ctor;
}
