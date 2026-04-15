import type { Bit } from "../internal/bit.js";
import type { BuildTuple, NatAdd, NatSub } from "../utils/number.js";
import type { Negate } from "./arithmetic.js";
import type { Int8, Int8Bits, Unwrap, Wrap } from "./int8.js";

type BitToNum<B extends Bit> = B extends 1 ? 1 : 0;

type MulBitByPow<B extends Bit, Pow extends number> = B extends 1 ? Pow : 0;

type ToUnsignedBits<A extends Int8Bits> = NatAdd<
	NatAdd<NatAdd<MulBitByPow<A[0], 128>, MulBitByPow<A[1], 64>>, NatAdd<MulBitByPow<A[2], 32>, MulBitByPow<A[3], 16>>>,
	NatAdd<NatAdd<MulBitByPow<A[4], 8>, MulBitByPow<A[5], 4>>, NatAdd<MulBitByPow<A[6], 2>, BitToNum<A[7]>>>
>;

export type ToNumber<A extends Int8> = Unwrap<A> extends infer B extends Int8Bits
	? B[0] extends 0
		? ToUnsignedBits<B>
		: ToUnsignedBits<Unwrap<Negate<A>>> extends infer N extends number
			? `-${N}` extends `${infer R extends number}`
				? R
				: never
			: never
	: never;

type GTE<A extends number, B extends number> = BuildTuple<A> extends [...BuildTuple<B>, ...infer R] ? true : false;

type ExtractBit<N extends number, Pow extends number> = GTE<N, Pow> extends true
	? { bit: 1; rest: NatSub<N, Pow> }
	: { bit: 0; rest: N };

type FromPositive<N extends number> = ExtractBit<N, 64> extends {
	bit: infer B6 extends Bit;
	rest: infer R6 extends number;
}
	? ExtractBit<R6, 32> extends { bit: infer B5 extends Bit; rest: infer R5 extends number }
		? ExtractBit<R5, 16> extends { bit: infer B4 extends Bit; rest: infer R4 extends number }
			? ExtractBit<R4, 8> extends { bit: infer B3 extends Bit; rest: infer R3 extends number }
				? ExtractBit<R3, 4> extends { bit: infer B2 extends Bit; rest: infer R2 extends number }
					? ExtractBit<R2, 2> extends { bit: infer B1 extends Bit; rest: infer R1 extends number }
						? ExtractBit<R1, 1> extends { bit: infer B0 extends Bit }
							? Wrap<[0, B6, B5, B4, B3, B2, B1, B0]>
							: never
						: never
					: never
				: never
			: never
		: never
	: never;

export type FromNumber<N extends number> = `${N}` extends `-${infer P extends number}`
	? Negate<FromPositive<P>>
	: FromPositive<N>;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _RoundTrip0 = Expect<IsEqual<ToNumber<FromNumber<0>>, 0>>;
type _RoundTrip3 = Expect<IsEqual<ToNumber<FromNumber<3>>, 3>>;
type _RoundTripNeg1 = Expect<IsEqual<ToNumber<FromNumber<-1>>, -1>>;
type _RoundTripNeg42 = Expect<IsEqual<ToNumber<FromNumber<-42>>, -42>>;
type _RoundTrip127 = Expect<IsEqual<ToNumber<FromNumber<127>>, 127>>;
