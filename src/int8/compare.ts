import type { Sub } from "./arithmetic.js";
import type { Int8, IsNegative, IsZero } from "./int8.js";

export type Equal<A extends Int8, B extends Int8> = IsZero<Sub<A, B>>;

export type NotEqual<A extends Int8, B extends Int8> = Equal<A, B> extends true ? false : true;

export type LessThan<A extends Int8, B extends Int8> = IsNegative<Sub<A, B>>;

export type GreaterThan<A extends Int8, B extends Int8> = LessThan<B, A>;

export type LessThanOrEqual<A extends Int8, B extends Int8> = GreaterThan<A, B> extends true ? false : true;

export type GreaterThanOrEqual<A extends Int8, B extends Int8> = LessThan<A, B> extends true ? false : true;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber } from "./convert.js";
import type { One, Zero } from "./int8.js";

type _EqTest = Expect<IsEqual<Equal<One, One>, true>>;
type _NeqTest = Expect<IsEqual<NotEqual<One, Zero>, true>>;
type _LtTest = Expect<IsEqual<LessThan<Zero, One>, true>>;
type _GtTest = Expect<IsEqual<GreaterThan<One, Zero>, true>>;
type _LteTest = Expect<IsEqual<LessThanOrEqual<One, One>, true>>;
type _GteTest = Expect<IsEqual<GreaterThanOrEqual<FromNumber<5>, FromNumber<3>>, true>>;
