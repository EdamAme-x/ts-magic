export type {
	Sign,
	Int,
	Positive,
	Negative,
	IntZero,
	IntOne,
	IsZero,
	IsNegative,
	IsPositive,
	GetSign,
	GetMagnitude,
} from "./int.js";
export type { Add, Sub, Mul, Div, Mod, Negate, Abs, Inc, Dec } from "./arithmetic.js";
export type { Equal, LessThan, GreaterThan, LessThanOrEqual, GreaterThanOrEqual } from "./compare.js";
export type { FromNumber, ToNumber, FromNat, ToNat } from "./convert.js";
