import type { Nat, Zero } from "./nat.js";

export type Add<A extends Nat, B extends Nat> = [...A, ...B];

export type Sub<A extends Nat, B extends Nat> = A extends [...B, ...infer R] ? R : Zero;

export type Inc<N extends Nat> = [...N, unknown];

export type Dec<N extends Nat> = N extends [...infer R, unknown] ? R : Zero;

export type Mul<A extends Nat, B extends Nat, Acc extends Nat = []> = B extends [unknown, ...infer R]
	? Mul<A, R, [...Acc, ...A]>
	: Acc;

export type Div<A extends Nat, B extends Nat, Q extends Nat = []> = B extends []
	? never
	: A extends [...B, ...infer R]
		? Div<R, B, [...Q, unknown]>
		: Q;

export type Mod<A extends Nat, B extends Nat> = B extends [] ? never : A extends [...B, ...infer R] ? Mod<R, B> : A;

export type Min<A extends Nat, B extends Nat> = A extends [...B, ...Nat] ? B : A;

export type Max<A extends Nat, B extends Nat> = A extends [...B, ...Nat] ? A : B;

export type Pow<Base extends Nat, Exp extends Nat, Acc extends Nat = [unknown]> = Exp extends []
	? Acc
	: Exp extends [unknown, ...infer R]
		? Pow<Base, R, Mul<Acc, Base>>
		: never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber, ToNumber } from "./nat.js";

type _AddTest = Expect<IsEqual<ToNumber<Add<FromNumber<3>, FromNumber<5>>>, 8>>;
type _SubTest = Expect<IsEqual<ToNumber<Sub<FromNumber<10>, FromNumber<3>>>, 7>>;
type _SubZero = Expect<IsEqual<ToNumber<Sub<FromNumber<3>, FromNumber<10>>>, 0>>;
type _MulTest = Expect<IsEqual<ToNumber<Mul<FromNumber<6>, FromNumber<7>>>, 42>>;
type _DivTest = Expect<IsEqual<ToNumber<Div<FromNumber<10>, FromNumber<3>>>, 3>>;
type _ModTest = Expect<IsEqual<ToNumber<Mod<FromNumber<10>, FromNumber<3>>>, 1>>;
type _IncTest = Expect<IsEqual<ToNumber<Inc<FromNumber<5>>>, 6>>;
type _DecTest = Expect<IsEqual<ToNumber<Dec<FromNumber<5>>>, 4>>;
type _MinTest = Expect<IsEqual<ToNumber<Min<FromNumber<3>, FromNumber<7>>>, 3>>;
type _MaxTest = Expect<IsEqual<ToNumber<Max<FromNumber<3>, FromNumber<7>>>, 7>>;
type _PowTest = Expect<IsEqual<ToNumber<Pow<FromNumber<2>, FromNumber<8>>>, 256>>;
