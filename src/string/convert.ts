export type ToString<T extends string | number | boolean | bigint> = `${T}`;

type DigitMap = { "0": 0; "1": 1; "2": 2; "3": 3; "4": 4; "5": 5; "6": 6; "7": 7; "8": 8; "9": 9 };

type ParseDigit<C extends string> = C extends keyof DigitMap ? DigitMap[C] : never;

type TupleOf<N extends number, Acc extends unknown[] = []> = Acc["length"] extends N
	? Acc
	: TupleOf<N, [...Acc, unknown]>;

type AddNat<A extends number, B extends number> = [...TupleOf<A>, ...TupleOf<B>]["length"] extends infer R extends
	number
	? R
	: never;

type MulBy10<N extends number> = AddNat<
	AddNat<AddNat<AddNat<N, N>, AddNat<N, N>>, AddNat<N, N>>,
	AddNat<AddNat<N, N>, AddNat<N, N>>
>;

export type ParseInt<S extends string> = S extends `-${infer Rest}`
	? ParseUnsigned<Rest> extends infer N extends number
		? `-${N}` extends `${infer R extends number}`
			? R
			: never
		: never
	: ParseUnsigned<S>;

type ParseUnsigned<S extends string, Acc extends number = 0> = S extends `${infer C}${infer Rest}`
	? ParseDigit<C> extends infer D extends number
		? MulBy10<Acc> extends infer M extends number
			? ParseUnsigned<Rest, AddNat<M, D>>
			: never
		: never
	: Acc;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _TS = Expect<IsEqual<ToString<42>, "42">>;
type _TSBool = Expect<IsEqual<ToString<true>, "true">>;
type _Parse0 = Expect<IsEqual<ParseInt<"0">, 0>>;
type _Parse42 = Expect<IsEqual<ParseInt<"42">, 42>>;
type _ParseNeg = Expect<IsEqual<ParseInt<"-5">, -5>>;
