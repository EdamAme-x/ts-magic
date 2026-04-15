import type { Bit } from "../internal/bit.js";

declare const __uint8Brand: unique symbol;

export type UInt8Bits = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit];

export type UInt8<Bits extends UInt8Bits = UInt8Bits> = Bits & { readonly [__uint8Brand]: true };

export type Unwrap<T extends UInt8> = T extends UInt8<infer B> ? B : never;

export type Wrap<B extends UInt8Bits> = UInt8<B>;

export type Zero = UInt8<[0, 0, 0, 0, 0, 0, 0, 0]>;

export type One = UInt8<[0, 0, 0, 0, 0, 0, 0, 1]>;

export type Max = UInt8<[1, 1, 1, 1, 1, 1, 1, 1]>;

export type IsZero<A extends UInt8> = Unwrap<A> extends [0, 0, 0, 0, 0, 0, 0, 0] ? true : false;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _IsZeroTest = Expect<IsEqual<IsZero<Zero>, true>>;
type _IsZeroFalse = Expect<IsEqual<IsZero<One>, false>>;
