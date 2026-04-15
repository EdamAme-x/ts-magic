import type { Nat, FromNumber as NatFrom, ToNumber as NatTo } from "../nat/nat.js";
import type { Float, Sign } from "./float.js";

export type FromNumber<N extends number> = `${N}` extends `-${infer P}`
	? ParsePositive<P> extends Float<"+", infer I, infer F, infer Pr>
		? Float<"-", I, F, Pr>
		: never
	: ParsePositive<`${N}`>;

type ParsePositive<S extends string> = S extends `${infer Int}.${infer Frac}`
	? ParseInt<Int> extends infer I extends number
		? ParseInt<Frac> extends infer F extends number
			? Float<"+", NatFrom<I>, NatFrom<F>, NatFrom<StringLen<Frac>>>
			: never
		: never
	: ParseInt<S> extends infer I extends number
		? Float<"+", NatFrom<I>, [], [unknown]>
		: never;

type ParseInt<S extends string, Acc extends number = 0> = S extends `${infer D extends number}${infer Rest}`
	? ParseInt<Rest, AddMul10<Acc, D>>
	: Acc;

type TupleOf<N extends number, T extends unknown[] = []> = T["length"] extends N ? T : TupleOf<N, [...T, unknown]>;

type AddMul10<A extends number, B extends number> = [
	...TupleOf<A>,
	...TupleOf<A>,
	...TupleOf<A>,
	...TupleOf<A>,
	...TupleOf<A>,
	...TupleOf<A>,
	...TupleOf<A>,
	...TupleOf<A>,
	...TupleOf<A>,
	...TupleOf<A>,
	...TupleOf<B>,
]["length"] extends infer R extends number
	? R
	: never;

type StringLen<S extends string, Acc extends unknown[] = []> = S extends `${string}${infer Rest}`
	? StringLen<Rest, [...Acc, unknown]>
	: Acc["length"];

export type ToNumber<A extends Float> = A extends Float<infer S, infer I, infer F, infer P>
	? I extends []
		? F extends []
			? 0
			: S extends "-"
				? `-0.${PadFrac<NatTo<F>, NatTo<P>>}` extends `${infer R extends number}`
					? R
					: never
				: `0.${PadFrac<NatTo<F>, NatTo<P>>}` extends `${infer R extends number}`
					? R
					: never
		: F extends []
			? S extends "-"
				? `-${NatTo<I>}` extends `${infer R extends number}`
					? R
					: never
				: NatTo<I>
			: S extends "-"
				? `-${NatTo<I>}.${PadFrac<NatTo<F>, NatTo<P>>}` extends `${infer R extends number}`
					? R
					: never
				: `${NatTo<I>}.${PadFrac<NatTo<F>, NatTo<P>>}` extends `${infer R extends number}`
					? R
					: never
	: never;

type PadFrac<V extends number, Len extends number> = PadStart<`${V}`, Len, "0">;

type PadStart<
	S extends string,
	Len extends number,
	Pad extends string,
	Acc extends unknown[] = [],
> = Acc["length"] extends Len
	? S
	: S extends `${string}${infer _}`
		? `${S}` extends `${infer _C}${infer _R}`
			? StringLen<S> extends Len
				? S
				: PadStart<`${Pad}${S}`, Len, Pad, [...Acc, unknown]>
			: S
		: PadStart<`${Pad}${S}`, Len, Pad, [...Acc, unknown]>;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _RT0 = Expect<IsEqual<ToNumber<FromNumber<0>>, 0>>;
type _RT5 = Expect<IsEqual<ToNumber<FromNumber<5>>, 5>>;
type _RTn3 = Expect<IsEqual<ToNumber<FromNumber<-3>>, -3>>;
