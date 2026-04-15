import type * as N from "../nat/arithmetic.js";
import type * as NC from "../nat/compare.js";
import type { Nat, Zero as NatZero } from "../nat/nat.js";
import type { Int, IntZero, Negative, Positive, Sign } from "./int.js";

type Normalize<S extends Sign, M extends Nat> = M extends [] ? IntZero : Int<S, M>;

export type Negate<A extends Int> = A extends Int<infer S, infer M>
	? M extends []
		? IntZero
		: S extends "+"
			? Negative<M>
			: Positive<M>
	: never;

export type Abs<A extends Int> = A extends Int<Sign, infer M> ? Positive<M> : never;

export type Add<A extends Int, B extends Int> = A extends Int<infer SA, infer MA>
	? B extends Int<infer SB, infer MB>
		? SA extends SB
			? Normalize<SA, N.Add<MA, MB>>
			: NC.GreaterThanOrEqual<MA, MB> extends true
				? Normalize<SA, N.Sub<MA, MB>>
				: Normalize<SB, N.Sub<MB, MA>>
		: never
	: never;

export type Sub<A extends Int, B extends Int> = Add<A, Negate<B>>;

export type Mul<A extends Int, B extends Int> = A extends Int<infer SA, infer MA>
	? B extends Int<infer SB, infer MB>
		? Normalize<SA extends SB ? "+" : "-", N.Mul<MA, MB>>
		: never
	: never;

export type Div<A extends Int, B extends Int> = A extends Int<infer SA, infer MA>
	? B extends Int<infer SB, infer MB>
		? Normalize<SA extends SB ? "+" : "-", N.Div<MA, MB>>
		: never
	: never;

export type Mod<A extends Int, B extends Int> = A extends Int<infer SA, infer MA>
	? B extends Int<Sign, infer MB>
		? Normalize<SA, N.Mod<MA, MB>>
		: never
	: never;

export type Inc<A extends Int> = Add<A, Positive<[unknown]>>;

export type Dec<A extends Int> = Sub<A, Positive<[unknown]>>;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber, ToNumber } from "./convert.js";

type _AddTest = Expect<IsEqual<ToNumber<Add<FromNumber<3>, FromNumber<5>>>, 8>>;
type _AddNeg = Expect<IsEqual<ToNumber<Add<FromNumber<3>, FromNumber<-5>>>, -2>>;
type _SubTest = Expect<IsEqual<ToNumber<Sub<FromNumber<10>, FromNumber<3>>>, 7>>;
type _MulTest = Expect<IsEqual<ToNumber<Mul<FromNumber<6>, FromNumber<-7>>>, -42>>;
type _DivTest = Expect<IsEqual<ToNumber<Div<FromNumber<10>, FromNumber<3>>>, 3>>;
type _NegTest = Expect<IsEqual<ToNumber<Negate<FromNumber<5>>>, -5>>;
type _AbsTest = Expect<IsEqual<ToNumber<Abs<FromNumber<-5>>>, 5>>;
type _IncTest = Expect<IsEqual<ToNumber<Inc<FromNumber<-1>>>, 0>>;
type _DecTest = Expect<IsEqual<ToNumber<Dec<FromNumber<0>>>, -1>>;
