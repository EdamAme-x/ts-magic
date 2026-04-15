import type * as NatT from "../nat/nat.js";
import type { Int, Negative, Positive } from "./int.js";

export type FromNat<N extends NatT.Nat> = Positive<N>;

export type ToNat<A extends Int> = A extends Int<infer _S, infer M> ? M : never;

export type FromNumber<N extends number> = `${N}` extends `-${infer P extends number}`
	? Negative<NatT.FromNumber<P>>
	: Positive<NatT.FromNumber<N>>;

export type ToNumber<A extends Int> = A extends Int<infer S, infer M>
	? M extends []
		? 0
		: S extends "+"
			? NatT.ToNumber<M>
			: NatT.ToNumber<M> extends infer R extends number
				? `-${R}` extends `${infer Neg extends number}`
					? Neg
					: never
				: never
	: never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _RT0 = Expect<IsEqual<ToNumber<FromNumber<0>>, 0>>;
type _RT5 = Expect<IsEqual<ToNumber<FromNumber<5>>, 5>>;
type _RTn3 = Expect<IsEqual<ToNumber<FromNumber<-3>>, -3>>;
type _RT42 = Expect<IsEqual<ToNumber<FromNumber<42>>, 42>>;
type _RTn100 = Expect<IsEqual<ToNumber<FromNumber<-100>>, -100>>;
