import type { Nat, Zero as NatZero } from "../nat/nat.js";

export type Sign = "+" | "-";

export type Int<S extends Sign = Sign, N extends Nat = Nat> = { readonly sign: S; readonly magnitude: N };

export type Positive<N extends Nat> = Int<"+", N>;

export type Negative<N extends Nat> = Int<"-", N>;

export type IntZero = Positive<NatZero>;

export type IntOne = Positive<[unknown]>;

export type IsZero<A extends Int> = A extends Int<Sign, infer N> ? (N extends [] ? true : false) : false;

export type IsNegative<A extends Int> = IsZero<A> extends true ? false : A extends Int<"-", Nat> ? true : false;

export type IsPositive<A extends Int> = IsZero<A> extends true ? false : A extends Int<"+", Nat> ? true : false;

export type GetSign<A extends Int> = A extends Int<infer S, Nat> ? S : never;

export type GetMagnitude<A extends Int> = A extends Int<Sign, infer N> ? N : never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _ZeroTest = Expect<IsEqual<IsZero<IntZero>, true>>;
type _NegTest = Expect<IsEqual<IsNegative<Negative<[unknown, unknown]>>, true>>;
type _PosTest = Expect<IsEqual<IsPositive<Positive<[unknown]>>, true>>;
type _NegZero = Expect<IsEqual<IsNegative<IntZero>, false>>;
