export type Bit = 0 | 1;

export type BitNot<B extends Bit> = B extends 0 ? 1 : 0;

export type BitAnd<A extends Bit, B extends Bit> = A extends 1 ? (B extends 1 ? 1 : 0) : 0;

export type BitOr<A extends Bit, B extends Bit> = A extends 0 ? (B extends 0 ? 0 : 1) : 1;

export type BitXor<A extends Bit, B extends Bit> = A extends B ? 0 : 1;

export type HalfAdder<A extends Bit, B extends Bit> = {
	sum: BitXor<A, B>;
	carry: BitAnd<A, B>;
};

export type FullAdder<A extends Bit, B extends Bit, Cin extends Bit> = HalfAdder<A, B> extends {
	sum: infer S extends Bit;
	carry: infer C1 extends Bit;
}
	? HalfAdder<S, Cin> extends {
			sum: infer Sum extends Bit;
			carry: infer C2 extends Bit;
		}
		? { sum: Sum; carry: BitOr<C1, C2> }
		: never
	: never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _NotTest0 = Expect<IsEqual<BitNot<0>, 1>>;
type _NotTest1 = Expect<IsEqual<BitNot<1>, 0>>;
type _AndTest = Expect<IsEqual<BitAnd<1, 0>, 0>>;
type _OrTest = Expect<IsEqual<BitOr<0, 1>, 1>>;
type _XorTest = Expect<IsEqual<BitXor<1, 1>, 0>>;
type _HalfAdderTest = Expect<IsEqual<HalfAdder<1, 1>, { sum: 0; carry: 1 }>>;
type _FullAdderTest = Expect<IsEqual<FullAdder<1, 1, 1>, { sum: 1; carry: 1 }>>;
