import type { Nat } from "../nat/nat.js";

export type Sign = "+" | "-";

export type Float<S extends Sign = Sign, I extends Nat = Nat, F extends Nat = Nat, P extends Nat = Nat> = {
	readonly sign: S;
	readonly integer: I;
	readonly fraction: F;
	readonly precision: P;
};

export type FloatZero = Float<"+", [], [], [unknown]>;

export type IsZero<A extends Float> = A extends Float<Sign, infer I, infer F, Nat>
	? I extends []
		? F extends []
			? true
			: false
		: false
	: false;

export type IsNegative<A extends Float> = IsZero<A> extends true
	? false
	: A extends Float<"-", Nat, Nat, Nat>
		? true
		: false;

export type IsPositive<A extends Float> = IsZero<A> extends true
	? false
	: A extends Float<"+", Nat, Nat, Nat>
		? true
		: false;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _ZeroTest = Expect<IsEqual<IsZero<FloatZero>, true>>;
