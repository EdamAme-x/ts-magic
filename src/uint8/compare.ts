import type { NatSub } from "../utils/number.js";
import type { ToNumber } from "./convert.js";
import type { UInt8, Unwrap } from "./uint8.js";

export type Equal<A extends UInt8, B extends UInt8> = Unwrap<A> extends Unwrap<B>
	? Unwrap<B> extends Unwrap<A>
		? true
		: false
	: false;

export type NotEqual<A extends UInt8, B extends UInt8> = Equal<A, B> extends true ? false : true;

type ToNum<A extends UInt8> = ToNumber<A>;

export type LessThan<A extends UInt8, B extends UInt8> = ToNum<A> extends ToNum<B>
	? false
	: NatSub<ToNum<B>, ToNum<A>> extends never
		? false
		: true;

export type GreaterThan<A extends UInt8, B extends UInt8> = LessThan<B, A>;

export type LessThanOrEqual<A extends UInt8, B extends UInt8> = GreaterThan<A, B> extends true ? false : true;

export type GreaterThanOrEqual<A extends UInt8, B extends UInt8> = LessThan<A, B> extends true ? false : true;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber } from "./convert.js";
import type { One, Zero } from "./uint8.js";

type _EqTest = Expect<IsEqual<Equal<One, One>, true>>;
type _NeqTest = Expect<IsEqual<NotEqual<One, Zero>, true>>;
type _LtTest = Expect<IsEqual<LessThan<Zero, One>, true>>;
type _GtTest = Expect<IsEqual<GreaterThan<One, Zero>, true>>;
type _LteTest = Expect<IsEqual<LessThanOrEqual<One, One>, true>>;
type _GteTest = Expect<IsEqual<GreaterThanOrEqual<FromNumber<5>, FromNumber<3>>, true>>;
