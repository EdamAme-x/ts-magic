import type * as N from "../nat/arithmetic.js";
import type * as NC from "../nat/compare.js";
import type { Nat } from "../nat/nat.js";
import type { BuildTuple } from "../utils/number.js";
import type { Float, FloatZero, Sign } from "./float.js";

type Pow10<P extends Nat> = P["length"] extends 0
	? BuildTuple<1>
	: P["length"] extends 1
		? BuildTuple<10>
		: P["length"] extends 2
			? N.Mul<BuildTuple<10>, BuildTuple<10>>
			: never;

type Normalize<S extends Sign, I extends Nat, F extends Nat, P extends Nat> = I extends []
	? F extends []
		? FloatZero
		: Float<S, I, F, P>
	: Float<S, I, F, P>;

type ToScaled<A extends Float> = A extends Float<Sign, infer I, infer F, infer P>
	? N.Add<N.Mul<I, Pow10<P>>, F>
	: never;

type FromScaled<S extends Sign, Scaled extends Nat, P extends Nat> = Pow10<P> extends infer Base extends Nat
	? Float<S, N.Div<Scaled, Base>, N.Mod<Scaled, Base>, P>
	: never;

export type Negate<A extends Float> = A extends Float<infer S, infer I, infer F, infer P>
	? IsZeroFloat<A> extends true
		? A
		: Float<S extends "+" ? "-" : "+", I, F, P>
	: never;

type IsZeroFloat<A extends Float> = A extends Float<Sign, infer I, infer F, Nat>
	? I extends []
		? F extends []
			? true
			: false
		: false
	: false;

export type Add<A extends Float, B extends Float> = A extends Float<infer SA, Nat, Nat, infer PA>
	? B extends Float<infer SB, Nat, Nat, infer PB>
		? PA["length"] extends PB["length"]
			? SA extends SB
				? FromScaled<SA, N.Add<ToScaled<A>, ToScaled<B>>, PA>
				: NC.GreaterThanOrEqual<ToScaled<A>, ToScaled<B>> extends true
					? FromScaled<SA, N.Sub<ToScaled<A>, ToScaled<B>>, PA>
					: FromScaled<SB, N.Sub<ToScaled<B>, ToScaled<A>>, PA>
			: never
		: never
	: never;

export type Sub<A extends Float, B extends Float> = Add<A, Negate<B>>;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _NegTest = Expect<IsEqual<IsZeroFloat<Negate<FloatZero>>, true>>;
