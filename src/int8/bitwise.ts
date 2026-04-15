import type { BitAnd, BitNot, BitOr, BitXor } from "../internal/bit.js";
import type { Int8, Unwrap, Wrap } from "./int8.js";

export type BitwiseNot<A extends Int8> = Unwrap<A> extends infer B extends [any, any, any, any, any, any, any, any]
	? Wrap<
			[BitNot<B[0]>, BitNot<B[1]>, BitNot<B[2]>, BitNot<B[3]>, BitNot<B[4]>, BitNot<B[5]>, BitNot<B[6]>, BitNot<B[7]>]
		>
	: never;

export type BitwiseAnd<A extends Int8, B extends Int8> = [Unwrap<A>, Unwrap<B>] extends [
	infer X extends [any, any, any, any, any, any, any, any],
	infer Y extends [any, any, any, any, any, any, any, any],
]
	? Wrap<
			[
				BitAnd<X[0], Y[0]>,
				BitAnd<X[1], Y[1]>,
				BitAnd<X[2], Y[2]>,
				BitAnd<X[3], Y[3]>,
				BitAnd<X[4], Y[4]>,
				BitAnd<X[5], Y[5]>,
				BitAnd<X[6], Y[6]>,
				BitAnd<X[7], Y[7]>,
			]
		>
	: never;

export type BitwiseOr<A extends Int8, B extends Int8> = [Unwrap<A>, Unwrap<B>] extends [
	infer X extends [any, any, any, any, any, any, any, any],
	infer Y extends [any, any, any, any, any, any, any, any],
]
	? Wrap<
			[
				BitOr<X[0], Y[0]>,
				BitOr<X[1], Y[1]>,
				BitOr<X[2], Y[2]>,
				BitOr<X[3], Y[3]>,
				BitOr<X[4], Y[4]>,
				BitOr<X[5], Y[5]>,
				BitOr<X[6], Y[6]>,
				BitOr<X[7], Y[7]>,
			]
		>
	: never;

export type BitwiseXor<A extends Int8, B extends Int8> = [Unwrap<A>, Unwrap<B>] extends [
	infer X extends [any, any, any, any, any, any, any, any],
	infer Y extends [any, any, any, any, any, any, any, any],
]
	? Wrap<
			[
				BitXor<X[0], Y[0]>,
				BitXor<X[1], Y[1]>,
				BitXor<X[2], Y[2]>,
				BitXor<X[3], Y[3]>,
				BitXor<X[4], Y[4]>,
				BitXor<X[5], Y[5]>,
				BitXor<X[6], Y[6]>,
				BitXor<X[7], Y[7]>,
			]
		>
	: never;

export type ShiftLeft<A extends Int8> = Unwrap<A> extends infer B extends [any, any, any, any, any, any, any, any]
	? Wrap<[B[1], B[2], B[3], B[4], B[5], B[6], B[7], 0]>
	: never;

export type ShiftRight<A extends Int8> = Unwrap<A> extends infer B extends [any, any, any, any, any, any, any, any]
	? Wrap<[B[0], B[0], B[1], B[2], B[3], B[4], B[5], B[6]]>
	: never;

export type LogicalShiftRight<A extends Int8> = Unwrap<A> extends infer B extends [
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
]
	? Wrap<[0, B[0], B[1], B[2], B[3], B[4], B[5], B[6]]>
	: never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber, ToNumber } from "./convert.js";
import type { MinusOne, Zero } from "./int8.js";

type _NotZeroTest = Expect<IsEqual<BitwiseNot<Zero>, MinusOne>>;
type _XorTest = Expect<IsEqual<ToNumber<BitwiseXor<FromNumber<5>, FromNumber<3>>>, 6>>;
type _ShiftLeftTest = Expect<IsEqual<ToNumber<ShiftLeft<FromNumber<1>>>, 2>>;
type _ShiftRightTest = Expect<IsEqual<ToNumber<ShiftRight<FromNumber<4>>>, 2>>;
