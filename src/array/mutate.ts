export type Push<T extends readonly unknown[], V> = [...T, V];

export type Pop<T extends readonly unknown[]> = T extends [...infer Init, unknown] ? Init : [];

export type Shift<T extends readonly unknown[]> = T extends [unknown, ...infer Rest] ? Rest : [];

export type Unshift<T extends readonly unknown[], V> = [V, ...T];

export type Concat<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];

export type Slice<
	T extends readonly unknown[],
	Start extends number,
	End extends number = T["length"],
	I extends unknown[] = [],
	Acc extends unknown[] = [],
> = I["length"] extends End
	? Acc
	: T extends [infer H, ...infer Rest]
		? I["length"] extends Start
			? SliceInner<[H, ...Rest], End, I, Acc>
			: Slice<Rest, Start, End, [...I, unknown], Acc>
		: Acc;

type SliceInner<
	T extends readonly unknown[],
	End extends number,
	I extends unknown[],
	Acc extends unknown[],
> = I["length"] extends End
	? Acc
	: T extends [infer H, ...infer Rest]
		? SliceInner<Rest, End, [...I, unknown], [...Acc, H]>
		: Acc;

export type Reverse<T extends readonly unknown[]> = T extends [infer H, ...infer Rest] ? [...Reverse<Rest>, H] : [];

export type Flat<T extends readonly unknown[]> = T extends [infer H, ...infer Rest]
	? H extends readonly unknown[]
		? [...H, ...Flat<Rest>]
		: [H, ...Flat<Rest>]
	: [];

export type Unique<T extends readonly unknown[], Seen extends unknown[] = []> = T extends [infer H, ...infer Rest]
	? H extends Seen[number]
		? Unique<Rest, Seen>
		: [H, ...Unique<Rest, [...Seen, H]>]
	: [];

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _PushTest = Expect<IsEqual<Push<[1, 2], 3>, [1, 2, 3]>>;
type _PopTest = Expect<IsEqual<Pop<[1, 2, 3]>, [1, 2]>>;
type _ShiftTest = Expect<IsEqual<Shift<[1, 2, 3]>, [2, 3]>>;
type _UnshiftTest = Expect<IsEqual<Unshift<[2, 3], 1>, [1, 2, 3]>>;
type _ConcatTest = Expect<IsEqual<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>;
type _SliceTest = Expect<IsEqual<Slice<[1, 2, 3, 4, 5], 1, 4>, [2, 3, 4]>>;
type _ReverseTest = Expect<IsEqual<Reverse<[1, 2, 3]>, [3, 2, 1]>>;
type _FlatTest = Expect<IsEqual<Flat<[1, [2, 3], 4]>, [1, 2, 3, 4]>>;
type _UniqueTest = Expect<IsEqual<Unique<[1, 2, 1, 3, 2]>, [1, 2, 3]>>;
