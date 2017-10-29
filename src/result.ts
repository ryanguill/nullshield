import { OptT } from './option';

export interface ResultMatch<T, E, U, F> {
  ok: (ok: T) => U;
  err: (err: E) => F;
}

export interface Res<T, E> {
  isOk(): boolean;
  isErr(): boolean;
  ok(): OptT<T>;
  err(): OptT<E>;
  expect(message: string): T;
  unwrap(): T;
  unwrapOr(other: T): T;
  unwrapOrElse(func: (err: E) => T): T;
  expectErr(message: string): E;
  unwrapErr(): E;
  map<U>(func: (val: T) => U): Res<U, E>;
  mapErr<F>(func: (val: E) => F): Res<T, F>;
  and<U>(other: Res<U, E>): Res<U, E>;
  andThen<U>(func: (ok: T) => Res<U, E>): Res<U, E>;
  or<F>(other: Res<T, F>): Res<T, F>;
  orElse<F>(func: (err: E) => Res<T, F>): Res<T, F>;
  match<U, F>(options: ResultMatch<T, E, U, F>): U | F;
  clone(): Res<T, E>;
}
