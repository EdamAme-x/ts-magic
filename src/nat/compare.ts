import type { Nat } from "./nat.js";

export type Equal<A extends Nat, B extends Nat> = A["length"] extends B["length"]
	? B["length"] extends A["length"]
		? true
		: false
	: false;

export type LessThan<A extends Nat, B extends Nat> = A extends [...B, ...infer R]
	? R extends []
		? false
		: false
	: true;

export type GreaterThan<A extends Nat, B extends Nat> = LessThan<B, A>;

export type LessThanOrEqual<A extends Nat, B extends Nat> = GreaterThan<A, B> extends true ? false : true;

export type GreaterThanOrEqual<A extends Nat, B extends Nat> = LessThan<A, B> extends true ? false : true;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber } from "./nat.js";

type _EqT = Expect<IsEqual<Equal<FromNumber<5>, FromNumber<5>>, true>>;
type _EqF = Expect<IsEqual<Equal<FromNumber<3>, FromNumber<5>>, false>>;
type _LtT = Expect<IsEqual<LessThan<FromNumber<3>, FromNumber<5>>, true>>;
type _LtF = Expect<IsEqual<LessThan<FromNumber<5>, FromNumber<3>>, false>>;
type _LtEq = Expect<IsEqual<LessThan<FromNumber<5>, FromNumber<5>>, false>>;
type _GtT = Expect<IsEqual<GreaterThan<FromNumber<5>, FromNumber<3>>, true>>;
type _LteT = Expect<IsEqual<LessThanOrEqual<FromNumber<5>, FromNumber<5>>, true>>;
type _GteT = Expect<IsEqual<GreaterThanOrEqual<FromNumber<5>, FromNumber<5>>, true>>;
