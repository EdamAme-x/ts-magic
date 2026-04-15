export type Keys<M> = keyof M;

export type Values<M> = M[keyof M];

export type Entries<M> = { [K in keyof M]: [K, M[K]] }[keyof M];

export type KeyCount<M, K extends keyof M = keyof M, Acc extends unknown[] = []> = [K] extends [never]
	? Acc["length"]
	: K extends K
		? KeyCount<M, Exclude<keyof M, K | Acc["length"]>, [...Acc, unknown]>
		: never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type Obj = { a: 1; b: 2; c: 3 };

type _KeysTest = Expect<IsEqual<Keys<Obj>, "a" | "b" | "c">>;
type _ValuesTest = Expect<IsEqual<Values<Obj>, 1 | 2 | 3>>;
type _EntriesTest = Expect<IsEqual<Entries<Obj>, ["a", 1] | ["b", 2] | ["c", 3]>>;
