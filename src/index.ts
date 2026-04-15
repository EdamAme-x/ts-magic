import type * as _Int8 from "./int8/index.js";
import type * as _Internal from "./internal/index.js";
import type * as _Utils from "./utils/index.js";

export declare namespace TSMagic {
	// Int8 types
	export type Int8 = _Int8.Int8;
	export type Int8Bits = _Int8.Int8Bits;

	// Int8 constants
	export type Zero = _Int8.Zero;
	export type One = _Int8.One;
	export type MinusOne = _Int8.MinusOne;
	export type Max = _Int8.Max;
	export type Min = _Int8.Min;

	// Int8 constructors
	export type FromNumber<N extends number> = _Int8.FromNumber<N>;
	export type ToNumber<A extends Int8> = _Int8.ToNumber<A>;

	// Int8 predicates
	export type IsNegative<A extends Int8> = _Int8.IsNegative<A>;
	export type IsZero<A extends Int8> = _Int8.IsZero<A>;
	export type IsPositive<A extends Int8> = _Int8.IsPositive<A>;

	// Int8 arithmetic
	export type Add<A extends Int8, B extends Int8> = _Int8.Add<A, B>;
	export type Sub<A extends Int8, B extends Int8> = _Int8.Sub<A, B>;
	export type Negate<A extends Int8> = _Int8.Negate<A>;
	export type Inc<A extends Int8> = _Int8.Inc<A>;
	export type Dec<A extends Int8> = _Int8.Dec<A>;
	export type Abs<A extends Int8> = _Int8.Abs<A>;

	// Int8 comparison
	export type Equal<A extends Int8, B extends Int8> = _Int8.Equal<A, B>;
	export type NotEqual<A extends Int8, B extends Int8> = _Int8.NotEqual<A, B>;
	export type LessThan<A extends Int8, B extends Int8> = _Int8.LessThan<A, B>;
	export type GreaterThan<A extends Int8, B extends Int8> = _Int8.GreaterThan<A, B>;
	export type LessThanOrEqual<A extends Int8, B extends Int8> = _Int8.LessThanOrEqual<A, B>;
	export type GreaterThanOrEqual<A extends Int8, B extends Int8> = _Int8.GreaterThanOrEqual<A, B>;

	// Int8 bitwise
	export type BitwiseNot<A extends Int8> = _Int8.BitwiseNot<A>;
	export type BitwiseAnd<A extends Int8, B extends Int8> = _Int8.BitwiseAnd<A, B>;
	export type BitwiseOr<A extends Int8, B extends Int8> = _Int8.BitwiseOr<A, B>;
	export type BitwiseXor<A extends Int8, B extends Int8> = _Int8.BitwiseXor<A, B>;
	export type ShiftLeft<A extends Int8> = _Int8.ShiftLeft<A>;
	export type ShiftRight<A extends Int8> = _Int8.ShiftRight<A>;
	export type LogicalShiftRight<A extends Int8> = _Int8.LogicalShiftRight<A>;

	// Utils
	export type IsEqual<A, B> = _Utils.IsEqual<A, B>;
	export type Expect<T extends true> = _Utils.Expect<T>;
	export type If<Cond extends boolean, Then, Else> = _Utils.If<Cond, Then, Else>;
	export type Not<T extends boolean> = _Utils.Not<T>;
	export type And<A extends boolean, B extends boolean> = _Utils.And<A, B>;
	export type Or<A extends boolean, B extends boolean> = _Utils.Or<A, B>;
}
