import type { ToCharCode } from "./char.js";

type InRange<Code extends number, Low extends number, High extends number> = Code extends number
	? `${Code}` extends `${Low}`
		? true
		: `${Code}` extends `${High}`
			? true
			: [Code, Low, High] extends [number, number, number]
				? CheckRange<Code, Low, High>
				: false
	: false;

type CheckRange<
	Code extends number,
	Low extends number,
	High extends number,
	Acc extends unknown[] = [],
> = Acc["length"] extends Code
	? true
	: Acc["length"] extends High
		? false
		: Acc["length"] extends Low
			? CheckRangeInner<Code, High, Acc>
			: CheckRange<Code, Low, High, [...Acc, unknown]>;

type CheckRangeInner<Code extends number, High extends number, Acc extends unknown[] = []> = Acc["length"] extends Code
	? true
	: Acc["length"] extends High
		? Acc["length"] extends Code
			? true
			: false
		: CheckRangeInner<Code, High, [...Acc, unknown]>;

export type IsDigit<C extends string> = ToCharCode<C> extends infer Code extends number ? IsDigitCode<Code> : false;

type IsDigitCode<Code extends number> = Code extends 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 ? true : false;

export type IsUpper<C extends string> = C extends
	| "A"
	| "B"
	| "C"
	| "D"
	| "E"
	| "F"
	| "G"
	| "H"
	| "I"
	| "J"
	| "K"
	| "L"
	| "M"
	| "N"
	| "O"
	| "P"
	| "Q"
	| "R"
	| "S"
	| "T"
	| "U"
	| "V"
	| "W"
	| "X"
	| "Y"
	| "Z"
	? true
	: false;

export type IsLower<C extends string> = C extends
	| "a"
	| "b"
	| "c"
	| "d"
	| "e"
	| "f"
	| "g"
	| "h"
	| "i"
	| "j"
	| "k"
	| "l"
	| "m"
	| "n"
	| "o"
	| "p"
	| "q"
	| "r"
	| "s"
	| "t"
	| "u"
	| "v"
	| "w"
	| "x"
	| "y"
	| "z"
	? true
	: false;

export type IsAlpha<C extends string> = IsUpper<C> extends true ? true : IsLower<C>;

export type ToUpper<C extends string> = Uppercase<C>;

export type ToLower<C extends string> = Lowercase<C>;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _Digit = Expect<IsEqual<IsDigit<"5">, true>>;
type _NotDigit = Expect<IsEqual<IsDigit<"a">, false>>;
type _Upper = Expect<IsEqual<IsUpper<"A">, true>>;
type _Lower = Expect<IsEqual<IsLower<"z">, true>>;
type _Alpha = Expect<IsEqual<IsAlpha<"X">, true>>;
type _ToUp = Expect<IsEqual<ToUpper<"a">, "A">>;
type _ToLo = Expect<IsEqual<ToLower<"A">, "a">>;
