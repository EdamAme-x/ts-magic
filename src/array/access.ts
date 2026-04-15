export type Length<T extends readonly unknown[]> = T["length"];

export type Get<T extends readonly unknown[], I extends number> = T[I];

export type Set<T extends readonly unknown[], I extends number, V, Acc extends unknown[] = []> = Acc["length"] extends I
	? T extends [unknown, ...infer Rest]
		? [...Acc, V, ...Rest]
		: [...Acc, V]
	: T extends [infer H, ...infer Rest]
		? Set<Rest, I, V, [...Acc, H]>
		: Acc;

export type IndexOf<T extends readonly unknown[], V, Acc extends unknown[] = []> = T extends [infer H, ...infer Rest]
	? H extends V
		? V extends H
			? Acc["length"]
			: IndexOf<Rest, V, [...Acc, unknown]>
		: IndexOf<Rest, V, [...Acc, unknown]>
	: -1;

export type First<T extends readonly unknown[]> = T extends [infer H, ...unknown[]] ? H : never;

export type Last<T extends readonly unknown[]> = T extends [...unknown[], infer L] ? L : never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _LenTest = Expect<IsEqual<Length<[1, 2, 3]>, 3>>;
type _GetTest = Expect<IsEqual<Get<["a", "b", "c"], 1>, "b">>;
type _SetTest = Expect<IsEqual<Set<[1, 2, 3], 1, 99>, [1, 99, 3]>>;
type _IOTest = Expect<IsEqual<IndexOf<["a", "b", "c"], "b">, 1>>;
type _IONone = Expect<IsEqual<IndexOf<["a", "b"], "z">, -1>>;
type _FirstTest = Expect<IsEqual<First<[1, 2, 3]>, 1>>;
type _LastTest = Expect<IsEqual<Last<[1, 2, 3]>, 3>>;
