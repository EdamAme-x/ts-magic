export type {
	Int8,
	Int8Bits,
	Unwrap,
	Wrap,
	Zero,
	One,
	MinusOne,
	Max,
	Min,
	IsNegative,
	IsZero,
	IsPositive,
	SignBit,
} from "./int8.js";
export type { Add, Sub, Negate, Inc, Dec, Abs } from "./arithmetic.js";
export type {
	BitwiseNot,
	BitwiseAnd,
	BitwiseOr,
	BitwiseXor,
	ShiftLeft,
	ShiftRight,
	LogicalShiftRight,
} from "./bitwise.js";
export type { Equal, NotEqual, LessThan, GreaterThan, LessThanOrEqual, GreaterThanOrEqual } from "./compare.js";
export type { ToNumber, FromNumber } from "./convert.js";
