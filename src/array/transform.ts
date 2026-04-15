import type { Apply, TypeFn } from "../internal/hkt.js";

export type Map<T extends readonly unknown[], F extends TypeFn> = T extends [infer H, ...infer Rest]
	? [Apply<F, H>, ...Map<Rest, F>]
	: [];

export type Filter<T extends readonly unknown[], F extends TypeFn> = T extends [infer H, ...infer Rest]
	? Apply<F, H> extends true
		? [H, ...Filter<Rest, F>]
		: Filter<Rest, F>
	: [];

export type Reduce<T extends readonly unknown[], F extends TypeFn, Init> = T extends [infer H, ...infer Rest]
	? Reduce<Rest, F, Apply<F, { acc: Init; item: H }>>
	: Init;

export type FlatMap<T extends readonly unknown[], F extends TypeFn> = T extends [infer H, ...infer Rest]
	? Apply<F, H> extends readonly unknown[]
		? [...Apply<F, H>, ...FlatMap<Rest, F>]
		: [Apply<F, H>, ...FlatMap<Rest, F>]
	: [];

export type Zip<A extends readonly unknown[], B extends readonly unknown[]> = A extends [infer AH, ...infer AR]
	? B extends [infer BH, ...infer BR]
		? [[AH, BH], ...Zip<AR, BR>]
		: []
	: [];

export type Every<T extends readonly unknown[], F extends TypeFn> = T extends [infer H, ...infer Rest]
	? Apply<F, H> extends true
		? Every<Rest, F>
		: false
	: true;

export type Some<T extends readonly unknown[], F extends TypeFn> = T extends [infer H, ...infer Rest]
	? Apply<F, H> extends true
		? true
		: Some<Rest, F>
	: false;

export type Find<T extends readonly unknown[], F extends TypeFn> = T extends [infer H, ...infer Rest]
	? Apply<F, H> extends true
		? H
		: Find<Rest, F>
	: never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

interface Double extends TypeFn {
	output: this["input"] extends number ? [...BuildTuple<this["input"]>, ...BuildTuple<this["input"]>]["length"] : never;
}

type BuildTuple<N extends number, Acc extends unknown[] = []> = Acc["length"] extends N
	? Acc
	: BuildTuple<N, [...Acc, unknown]>;

interface IsString extends TypeFn {
	output: this["input"] extends string ? true : false;
}

type _MapTest = Expect<IsEqual<Map<[1, 2, 3], Double>, [2, 4, 6]>>;
type _FilterTest = Expect<IsEqual<Filter<[1, "a", 2, "b"], IsString>, ["a", "b"]>>;
type _ZipTest = Expect<IsEqual<Zip<[1, 2], ["a", "b"]>, [[1, "a"], [2, "b"]]>>;
type _EveryTest = Expect<IsEqual<Every<["a", "b"], IsString>, true>>;
type _SomeTest = Expect<IsEqual<Some<[1, "a"], IsString>, true>>;
