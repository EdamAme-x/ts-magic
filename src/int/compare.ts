import type * as NC from "../nat/compare.js";
import type { Nat } from "../nat/nat.js";
import type { Int, IsNegative, IsPositive, IsZero, Sign } from "./int.js";

export type Equal<A extends Int, B extends Int> = A extends Int<infer SA, infer MA>
	? B extends Int<infer SB, infer MB>
		? IsZero<A> extends true
			? IsZero<B>
			: SA extends SB
				? NC.Equal<MA, MB>
				: false
		: never
	: never;

export type LessThan<A extends Int, B extends Int> = Equal<A, B> extends true
	? false
	: IsNegative<A> extends true
		? IsNegative<B> extends true
			? A extends Int<Sign, infer MA>
				? B extends Int<Sign, infer MB>
					? NC.GreaterThan<MA, MB>
					: never
				: never
			: true
		: IsNegative<B> extends true
			? false
			: A extends Int<Sign, infer MA>
				? B extends Int<Sign, infer MB>
					? NC.LessThan<MA, MB>
					: never
				: never;

export type GreaterThan<A extends Int, B extends Int> = LessThan<B, A>;

export type LessThanOrEqual<A extends Int, B extends Int> = GreaterThan<A, B> extends true ? false : true;

export type GreaterThanOrEqual<A extends Int, B extends Int> = LessThan<A, B> extends true ? false : true;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber } from "./convert.js";

type _EqT = Expect<IsEqual<Equal<FromNumber<5>, FromNumber<5>>, true>>;
type _EqF = Expect<IsEqual<Equal<FromNumber<3>, FromNumber<-3>>, false>>;
type _LtPos = Expect<IsEqual<LessThan<FromNumber<3>, FromNumber<5>>, true>>;
type _LtNeg = Expect<IsEqual<LessThan<FromNumber<-5>, FromNumber<-3>>, true>>;
type _LtMixed = Expect<IsEqual<LessThan<FromNumber<-1>, FromNumber<1>>, true>>;
type _GtTest = Expect<IsEqual<GreaterThan<FromNumber<5>, FromNumber<3>>, true>>;
