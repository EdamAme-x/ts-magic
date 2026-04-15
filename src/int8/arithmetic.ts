import type { Bit, FullAdder } from "../internal/bit.js";
import type { BitwiseNot } from "./bitwise.js";
import type { Int8, Int8Bits, One, Unwrap, Wrap } from "./int8.js";

type AddBits<A extends Int8Bits, B extends Int8Bits, C extends Bit> = FullAdder<A[7], B[7], C> extends {
	sum: infer S7 extends Bit;
	carry: infer C7 extends Bit;
}
	? FullAdder<A[6], B[6], C7> extends {
			sum: infer S6 extends Bit;
			carry: infer C6 extends Bit;
		}
		? FullAdder<A[5], B[5], C6> extends {
				sum: infer S5 extends Bit;
				carry: infer C5 extends Bit;
			}
			? FullAdder<A[4], B[4], C5> extends {
					sum: infer S4 extends Bit;
					carry: infer C4 extends Bit;
				}
				? FullAdder<A[3], B[3], C4> extends {
						sum: infer S3 extends Bit;
						carry: infer C3 extends Bit;
					}
					? FullAdder<A[2], B[2], C3> extends {
							sum: infer S2 extends Bit;
							carry: infer C2 extends Bit;
						}
						? FullAdder<A[1], B[1], C2> extends {
								sum: infer S1 extends Bit;
								carry: infer C1 extends Bit;
							}
							? FullAdder<A[0], B[0], C1> extends {
									sum: infer S0 extends Bit;
								}
								? Wrap<[S0, S1, S2, S3, S4, S5, S6, S7]>
								: never
							: never
						: never
					: never
				: never
			: never
		: never
	: never;

export type Add<A extends Int8, B extends Int8> = AddBits<Unwrap<A>, Unwrap<B>, 0>;

export type Negate<A extends Int8> = Add<BitwiseNot<A>, One>;

export type Sub<A extends Int8, B extends Int8> = Add<A, Negate<B>>;

export type Inc<A extends Int8> = Add<A, One>;

export type Dec<A extends Int8> = Sub<A, One>;

export type Abs<A extends Int8> = Unwrap<A>[0] extends 1 ? Negate<A> : A;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber, ToNumber } from "./convert.js";
import type { MinusOne, Zero } from "./int8.js";

type _AddTest = Expect<IsEqual<ToNumber<Add<FromNumber<3>, FromNumber<5>>>, 8>>;
type _SubTest = Expect<IsEqual<ToNumber<Sub<FromNumber<10>, FromNumber<3>>>, 7>>;
type _NegTest = Expect<IsEqual<ToNumber<Negate<FromNumber<5>>>, -5>>;
type _IncTest = Expect<IsEqual<ToNumber<Inc<FromNumber<5>>>, 6>>;
type _DecTest = Expect<IsEqual<ToNumber<Dec<FromNumber<5>>>, 4>>;
type _AbsTest = Expect<IsEqual<ToNumber<Abs<FromNumber<-42>>>, 42>>;
type _AddZero = Expect<IsEqual<ToNumber<Add<Zero, Zero>>, 0>>;
type _Add100_27 = Expect<IsEqual<ToNumber<Add<FromNumber<100>, FromNumber<27>>>, 127>>;
