export type Nat = readonly unknown[];

export type Zero = [];

export type One = [unknown];

export type IsZero<N extends Nat> = N extends [] ? true : false;

export type FromNumber<N extends number, Acc extends Nat = []> = Acc["length"] extends N
	? Acc
	: FromNumber<N, [...Acc, unknown]>;

export type ToNumber<N extends Nat> = N["length"] extends infer R extends number ? R : never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _ZeroTest = Expect<IsEqual<ToNumber<Zero>, 0>>;
type _OneTest = Expect<IsEqual<ToNumber<One>, 1>>;
type _FromTest = Expect<IsEqual<ToNumber<FromNumber<42>>, 42>>;
type _IsZeroT = Expect<IsEqual<IsZero<Zero>, true>>;
type _IsZeroF = Expect<IsEqual<IsZero<One>, false>>;
