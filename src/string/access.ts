type ToTuple<S extends string, Acc extends string[] = []> = S extends `${infer C}${infer Rest}`
	? ToTuple<Rest, [...Acc, C]>
	: Acc;

export type Length<S extends string, Acc extends unknown[] = []> = S extends `${string}${infer Rest}`
	? Length<Rest, [...Acc, unknown]>
	: Acc["length"];

export type CharAt<S extends string, N extends number> = ToTuple<S>[N] extends infer R extends string ? R : never;

export type Substring<S extends string, Start extends number, End extends number = Length<S>> = SliceTuple<
	ToTuple<S>,
	Start,
	End
> extends infer R extends string[]
	? Join<R>
	: never;

type SliceTuple<
	T extends string[],
	Start extends number,
	End extends number,
	I extends unknown[] = [],
	Acc extends string[] = [],
> = I["length"] extends End
	? Acc
	: T extends [infer H extends string, ...infer Rest extends string[]]
		? I["length"] extends Start
			? SliceTupleInner<[H, ...Rest], End, I, Acc>
			: SliceTuple<Rest, Start, End, [...I, unknown], Acc>
		: Acc;

type SliceTupleInner<
	T extends string[],
	End extends number,
	I extends unknown[],
	Acc extends string[],
> = I["length"] extends End
	? Acc
	: T extends [infer H extends string, ...infer Rest extends string[]]
		? SliceTupleInner<Rest, End, [...I, unknown], [...Acc, H]>
		: Acc;

type Join<T extends string[], Sep extends string = ""> = T extends [infer H extends string, ...infer R extends string[]]
	? R extends []
		? H
		: `${H}${Sep}${Join<R, Sep>}`
	: "";

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _LenTest = Expect<IsEqual<Length<"hello">, 5>>;
type _LenEmpty = Expect<IsEqual<Length<"">, 0>>;
type _CharAt0 = Expect<IsEqual<CharAt<"hello", 0>, "h">>;
type _CharAt4 = Expect<IsEqual<CharAt<"hello", 4>, "o">>;
type _SubTest = Expect<IsEqual<Substring<"hello", 1, 4>, "ell">>;
