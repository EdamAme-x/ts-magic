export type SplitChars<S extends string, Acc extends string[] = []> = S extends `${infer C}${infer Rest}`
	? SplitChars<Rest, [...Acc, C]>
	: Acc;

export type FilterChars<T extends readonly string[], Allowed extends string, Acc extends string[] = []> = T extends [
	infer H extends string,
	...infer Rest extends string[],
]
	? H extends Allowed
		? FilterChars<Rest, Allowed, [...Acc, H]>
		: FilterChars<Rest, Allowed, Acc>
	: Acc;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _SplitTest = Expect<IsEqual<SplitChars<"abc">, ["a", "b", "c"]>>;
type _FilterTest = Expect<IsEqual<FilterChars<["a", "b", "c", "d"], "a" | "c">, ["a", "c"]>>;
