export type Includes<S extends string, Sub extends string> = S extends `${string}${Sub}${string}` ? true : false;

export type StartsWith<S extends string, Pre extends string> = S extends `${Pre}${string}` ? true : false;

export type EndsWith<S extends string, Suf extends string> = S extends `${string}${Suf}` ? true : false;

export type IndexOf<
	S extends string,
	Sub extends string,
	Acc extends unknown[] = [],
> = S extends `${infer _C}${infer Rest}`
	? S extends `${Sub}${string}`
		? Acc["length"]
		: IndexOf<Rest, Sub, [...Acc, unknown]>
	: -1;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _IncludesT = Expect<IsEqual<Includes<"hello world", "world">, true>>;
type _IncludesF = Expect<IsEqual<Includes<"hello", "xyz">, false>>;
type _StartsT = Expect<IsEqual<StartsWith<"hello", "hel">, true>>;
type _EndsT = Expect<IsEqual<EndsWith<"hello", "llo">, true>>;
type _IndexOf = Expect<IsEqual<IndexOf<"hello", "ll">, 2>>;
type _IndexOfNone = Expect<IsEqual<IndexOf<"hello", "xyz">, -1>>;
