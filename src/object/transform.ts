import type { Apply, TypeFn } from "../internal/hkt.js";

export type Merge<A, B> = {
	[K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
};

export type Pick<M, K extends keyof M> = { [P in K]: M[P] };

export type OmitKeys<M, K extends PropertyKey> = { [P in keyof M as P extends K ? never : P]: M[P] };

export type MapValues<M, F extends TypeFn> = { [K in keyof M]: Apply<F, M[K]> };

export type Readonly<M> = { readonly [K in keyof M]: M[K] };

export type Mutable<M> = { -readonly [K in keyof M]: M[K] };

export type Partial<M> = { [K in keyof M]?: M[K] };

export type Required<M> = { [K in keyof M]-?: M[K] };

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type A = { a: 1; b: 2 };
type B = { b: 3; c: 4 };

type _MergeTest = Expect<IsEqual<Merge<A, B>, { a: 1; b: 3; c: 4 }>>;
type _PickTest = Expect<IsEqual<Pick<A, "a">, { a: 1 }>>;
type _OmitTest = Expect<IsEqual<OmitKeys<A, "a">, { b: 2 }>>;

interface ToStringFn extends TypeFn {
	output: `${this["input"] & number}`;
}

type _MapValuesTest = Expect<IsEqual<MapValues<{ x: 1; y: 2 }, ToStringFn>, { x: "1"; y: "2" }>>;
