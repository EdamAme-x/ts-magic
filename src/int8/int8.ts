import type { Bit } from "../internal/bit.js";

declare const __int8Brand: unique symbol;

export type Int8Bits = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit];

export type Int8<Bits extends Int8Bits = Int8Bits> = Bits & { readonly [__int8Brand]: true };

export type Unwrap<T extends Int8> = T extends Int8<infer B> ? B : never;

export type Wrap<B extends Int8Bits> = Int8<B>;

export type Zero = Int8<[0, 0, 0, 0, 0, 0, 0, 0]>;

export type One = Int8<[0, 0, 0, 0, 0, 0, 0, 1]>;

export type MinusOne = Int8<[1, 1, 1, 1, 1, 1, 1, 1]>;

export type Max = Int8<[0, 1, 1, 1, 1, 1, 1, 1]>;

export type Min = Int8<[1, 0, 0, 0, 0, 0, 0, 0]>;

export type IsNegative<A extends Int8> = Unwrap<A>[0] extends 1 ? true : false;

export type IsZero<A extends Int8> = Unwrap<A> extends [0, 0, 0, 0, 0, 0, 0, 0] ? true : false;

export type IsPositive<A extends Int8> = IsNegative<A> extends true ? false : IsZero<A> extends true ? false : true;

export type SignBit<A extends Int8> = Unwrap<A>[0];

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _IsNegTest = Expect<IsEqual<IsNegative<MinusOne>, true>>;
type _IsZeroTest = Expect<IsEqual<IsZero<Zero>, true>>;
type _IsPosTest = Expect<IsEqual<IsPositive<One>, true>>;
type _SignTest = Expect<IsEqual<SignBit<MinusOne>, 1>>;
