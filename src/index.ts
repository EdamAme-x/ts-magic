import type * as _Arr from "./array/index.js";
import type * as _Bool from "./bool/index.js";
import type * as _Char from "./char/index.js";
import type * as _Float from "./float/index.js";
import type * as _Int from "./int/index.js";
import type * as _Int8 from "./int8/index.js";
import type * as _Internal from "./internal/index.js";
import type * as _Nat from "./nat/index.js";
import type * as _Obj from "./object/index.js";
import type * as _Str from "./string/index.js";
import type * as _UInt8 from "./uint8/index.js";
import type * as _Utils from "./utils/index.js";
import type * as _VM from "./vm/index.js";

export declare namespace TSMagic {
	// --- Utils ---
	export type IsEqual<A, B> = _Utils.IsEqual<A, B>;
	export type Expect<T extends true> = _Utils.Expect<T>;
	export type If<Cond extends boolean, Then, Else> = _Utils.If<Cond, Then, Else>;
	export type Not<T extends boolean> = _Utils.Not<T>;
	export type And<A extends boolean, B extends boolean> = _Utils.And<A, B>;
	export type Or<A extends boolean, B extends boolean> = _Utils.Or<A, B>;

	// --- HKT ---
	export type TypeFn = _Internal.TypeFn;
	export type Apply<F extends TypeFn, T> = _Internal.Apply<F, T>;

	// --- Nat (Natural Numbers) ---
	export namespace Nat {
		export type Nat = _Nat.Nat;
		export type Zero = _Nat.Zero;
		export type One = _Nat.One;
		export type IsZero<N extends Nat> = _Nat.IsZero<N>;
		export type FromNumber<N extends number> = _Nat.FromNumber<N>;
		export type ToNumber<N extends Nat> = _Nat.ToNumber<N>;
		export type Add<A extends Nat, B extends Nat> = _Nat.Add<A, B>;
		export type Sub<A extends Nat, B extends Nat> = _Nat.Sub<A, B>;
		export type Mul<A extends Nat, B extends Nat> = _Nat.Mul<A, B>;
		export type Div<A extends Nat, B extends Nat> = _Nat.Div<A, B>;
		export type Mod<A extends Nat, B extends Nat> = _Nat.Mod<A, B>;
		export type Inc<N extends Nat> = _Nat.Inc<N>;
		export type Dec<N extends Nat> = _Nat.Dec<N>;
		export type Min<A extends Nat, B extends Nat> = _Nat.Min<A, B>;
		export type Max<A extends Nat, B extends Nat> = _Nat.Max<A, B>;
		export type Pow<Base extends Nat, Exp extends Nat> = _Nat.Pow<Base, Exp>;
		export type Equal<A extends Nat, B extends Nat> = _Nat.Equal<A, B>;
		export type LessThan<A extends Nat, B extends Nat> = _Nat.LessThan<A, B>;
		export type GreaterThan<A extends Nat, B extends Nat> = _Nat.GreaterThan<A, B>;
		export type LessThanOrEqual<A extends Nat, B extends Nat> = _Nat.LessThanOrEqual<A, B>;
		export type GreaterThanOrEqual<A extends Nat, B extends Nat> = _Nat.GreaterThanOrEqual<A, B>;
	}

	// --- Int (Signed Integers) ---
	export namespace Int {
		export type Int = _Int.Int;
		export type Positive<N extends _Nat.Nat> = _Int.Positive<N>;
		export type Negative<N extends _Nat.Nat> = _Int.Negative<N>;
		export type IntZero = _Int.IntZero;
		export type IntOne = _Int.IntOne;
		export type IsZero<A extends Int> = _Int.IsZero<A>;
		export type IsNegative<A extends Int> = _Int.IsNegative<A>;
		export type IsPositive<A extends Int> = _Int.IsPositive<A>;
		export type FromNumber<N extends number> = _Int.FromNumber<N>;
		export type ToNumber<A extends Int> = _Int.ToNumber<A>;
		export type FromNat<N extends _Nat.Nat> = _Int.FromNat<N>;
		export type ToNat<A extends Int> = _Int.ToNat<A>;
		export type Add<A extends Int, B extends Int> = _Int.Add<A, B>;
		export type Sub<A extends Int, B extends Int> = _Int.Sub<A, B>;
		export type Mul<A extends Int, B extends Int> = _Int.Mul<A, B>;
		export type Div<A extends Int, B extends Int> = _Int.Div<A, B>;
		export type Mod<A extends Int, B extends Int> = _Int.Mod<A, B>;
		export type Negate<A extends Int> = _Int.Negate<A>;
		export type Abs<A extends Int> = _Int.Abs<A>;
		export type Inc<A extends Int> = _Int.Inc<A>;
		export type Dec<A extends Int> = _Int.Dec<A>;
		export type Equal<A extends Int, B extends Int> = _Int.Equal<A, B>;
		export type LessThan<A extends Int, B extends Int> = _Int.LessThan<A, B>;
		export type GreaterThan<A extends Int, B extends Int> = _Int.GreaterThan<A, B>;
		export type LessThanOrEqual<A extends Int, B extends Int> = _Int.LessThanOrEqual<A, B>;
		export type GreaterThanOrEqual<A extends Int, B extends Int> = _Int.GreaterThanOrEqual<A, B>;
	}

	// --- Int8 (8-bit Signed Integer) ---
	export namespace Int8 {
		export type Int8 = _Int8.Int8;
		export type Zero = _Int8.Zero;
		export type One = _Int8.One;
		export type MinusOne = _Int8.MinusOne;
		export type Max = _Int8.Max;
		export type Min = _Int8.Min;
		export type FromNumber<N extends number> = _Int8.FromNumber<N>;
		export type ToNumber<A extends Int8> = _Int8.ToNumber<A>;
		export type IsNegative<A extends Int8> = _Int8.IsNegative<A>;
		export type IsZero<A extends Int8> = _Int8.IsZero<A>;
		export type IsPositive<A extends Int8> = _Int8.IsPositive<A>;
		export type Add<A extends Int8, B extends Int8> = _Int8.Add<A, B>;
		export type Sub<A extends Int8, B extends Int8> = _Int8.Sub<A, B>;
		export type Negate<A extends Int8> = _Int8.Negate<A>;
		export type Inc<A extends Int8> = _Int8.Inc<A>;
		export type Dec<A extends Int8> = _Int8.Dec<A>;
		export type Abs<A extends Int8> = _Int8.Abs<A>;
		export type Equal<A extends Int8, B extends Int8> = _Int8.Equal<A, B>;
		export type NotEqual<A extends Int8, B extends Int8> = _Int8.NotEqual<A, B>;
		export type LessThan<A extends Int8, B extends Int8> = _Int8.LessThan<A, B>;
		export type GreaterThan<A extends Int8, B extends Int8> = _Int8.GreaterThan<A, B>;
		export type BitwiseNot<A extends Int8> = _Int8.BitwiseNot<A>;
		export type BitwiseAnd<A extends Int8, B extends Int8> = _Int8.BitwiseAnd<A, B>;
		export type BitwiseOr<A extends Int8, B extends Int8> = _Int8.BitwiseOr<A, B>;
		export type BitwiseXor<A extends Int8, B extends Int8> = _Int8.BitwiseXor<A, B>;
		export type ShiftLeft<A extends Int8> = _Int8.ShiftLeft<A>;
		export type ShiftRight<A extends Int8> = _Int8.ShiftRight<A>;
	}

	// --- UInt8 (8-bit Unsigned Integer) ---
	export namespace UInt8 {
		export type UInt8 = _UInt8.UInt8;
		export type Zero = _UInt8.Zero;
		export type One = _UInt8.One;
		export type Max = _UInt8.Max;
		export type FromNumber<N extends number> = _UInt8.FromNumber<N>;
		export type ToNumber<A extends UInt8> = _UInt8.ToNumber<A>;
		export type IsZero<A extends UInt8> = _UInt8.IsZero<A>;
		export type Add<A extends UInt8, B extends UInt8> = _UInt8.Add<A, B>;
		export type Sub<A extends UInt8, B extends UInt8> = _UInt8.Sub<A, B>;
		export type Inc<A extends UInt8> = _UInt8.Inc<A>;
		export type Dec<A extends UInt8> = _UInt8.Dec<A>;
		export type Equal<A extends UInt8, B extends UInt8> = _UInt8.Equal<A, B>;
		export type NotEqual<A extends UInt8, B extends UInt8> = _UInt8.NotEqual<A, B>;
		export type LessThan<A extends UInt8, B extends UInt8> = _UInt8.LessThan<A, B>;
		export type GreaterThan<A extends UInt8, B extends UInt8> = _UInt8.GreaterThan<A, B>;
		export type BitwiseNot<A extends UInt8> = _UInt8.BitwiseNot<A>;
		export type BitwiseAnd<A extends UInt8, B extends UInt8> = _UInt8.BitwiseAnd<A, B>;
		export type BitwiseOr<A extends UInt8, B extends UInt8> = _UInt8.BitwiseOr<A, B>;
		export type BitwiseXor<A extends UInt8, B extends UInt8> = _UInt8.BitwiseXor<A, B>;
		export type ShiftLeft<A extends UInt8> = _UInt8.ShiftLeft<A>;
		export type ShiftRight<A extends UInt8> = _UInt8.ShiftRight<A>;
	}

	// --- Char/ASCII ---
	export namespace Char {
		export type FromCharCode<N extends number> = _Char.FromCharCode<N>;
		export type ToCharCode<C extends string> = _Char.ToCharCode<C>;
		export type IsDigit<C extends string> = _Char.IsDigit<C>;
		export type IsUpper<C extends string> = _Char.IsUpper<C>;
		export type IsLower<C extends string> = _Char.IsLower<C>;
		export type IsAlpha<C extends string> = _Char.IsAlpha<C>;
		export type ToUpper<C extends string> = _Char.ToUpper<C>;
		export type ToLower<C extends string> = _Char.ToLower<C>;
	}

	// --- String ---
	export namespace Str {
		export type Length<S extends string> = _Str.Length<S>;
		export type CharAt<S extends string, N extends number> = _Str.CharAt<S, N>;
		export type Substring<S extends string, Start extends number, End extends number> = _Str.Substring<S, Start, End>;
		export type Includes<S extends string, Sub extends string> = _Str.Includes<S, Sub>;
		export type StartsWith<S extends string, Pre extends string> = _Str.StartsWith<S, Pre>;
		export type EndsWith<S extends string, Suf extends string> = _Str.EndsWith<S, Suf>;
		export type IndexOf<S extends string, Sub extends string> = _Str.IndexOf<S, Sub>;
		export type Split<S extends string, Sep extends string> = _Str.Split<S, Sep>;
		export type Join<T extends readonly string[], Sep extends string> = _Str.Join<T, Sep>;
		export type Concat<A extends string, B extends string> = _Str.Concat<A, B>;
		export type Replace<S extends string, From extends string, To extends string> = _Str.Replace<S, From, To>;
		export type ReplaceAll<S extends string, From extends string, To extends string> = _Str.ReplaceAll<S, From, To>;
		export type Repeat<S extends string, N extends number> = _Str.Repeat<S, N>;
		export type Trim<S extends string> = _Str.Trim<S>;
		export type TrimStart<S extends string> = _Str.TrimStart<S>;
		export type TrimEnd<S extends string> = _Str.TrimEnd<S>;
		export type Reverse<S extends string> = _Str.Reverse<S>;
		export type ToString<T extends string | number | boolean | bigint> = _Str.ToString<T>;
		export type ParseInt<S extends string> = _Str.ParseInt<S>;
	}

	// --- Array ---
	export namespace Arr {
		export type Length<T extends readonly unknown[]> = _Arr.Length<T>;
		export type Get<T extends readonly unknown[], I extends number> = _Arr.Get<T, I>;
		export type Set<T extends readonly unknown[], I extends number, V> = _Arr.Set<T, I, V>;
		export type IndexOf<T extends readonly unknown[], V> = _Arr.IndexOf<T, V>;
		export type First<T extends readonly unknown[]> = _Arr.First<T>;
		export type Last<T extends readonly unknown[]> = _Arr.Last<T>;
		export type Push<T extends readonly unknown[], V> = _Arr.Push<T, V>;
		export type Pop<T extends readonly unknown[]> = _Arr.Pop<T>;
		export type Shift<T extends readonly unknown[]> = _Arr.Shift<T>;
		export type Unshift<T extends readonly unknown[], V> = _Arr.Unshift<T, V>;
		export type Concat<A extends readonly unknown[], B extends readonly unknown[]> = _Arr.Concat<A, B>;
		export type Slice<T extends readonly unknown[], Start extends number, End extends number> = _Arr.Slice<
			T,
			Start,
			End
		>;
		export type Reverse<T extends readonly unknown[]> = _Arr.Reverse<T>;
		export type Flat<T extends readonly unknown[]> = _Arr.Flat<T>;
		export type Unique<T extends readonly unknown[]> = _Arr.Unique<T>;
		export type Map<T extends readonly unknown[], F extends _Internal.TypeFn> = _Arr.Map<T, F>;
		export type Filter<T extends readonly unknown[], F extends _Internal.TypeFn> = _Arr.Filter<T, F>;
		export type Reduce<T extends readonly unknown[], F extends _Internal.TypeFn, Init> = _Arr.Reduce<T, F, Init>;
		export type FlatMap<T extends readonly unknown[], F extends _Internal.TypeFn> = _Arr.FlatMap<T, F>;
		export type Zip<A extends readonly unknown[], B extends readonly unknown[]> = _Arr.Zip<A, B>;
		export type Every<T extends readonly unknown[], F extends _Internal.TypeFn> = _Arr.Every<T, F>;
		export type Some<T extends readonly unknown[], F extends _Internal.TypeFn> = _Arr.Some<T, F>;
		export type Find<T extends readonly unknown[], F extends _Internal.TypeFn> = _Arr.Find<T, F>;
	}

	// --- Object ---
	export namespace Obj {
		export type Get<M, K extends PropertyKey> = _Obj.Get<M, K>;
		export type Set<M, K extends PropertyKey, V> = _Obj.Set<M, K, V>;
		export type Has<M, K extends PropertyKey> = _Obj.Has<M, K>;
		export type Delete<M, K extends PropertyKey> = _Obj.Delete<M, K>;
		export type Keys<M> = _Obj.Keys<M>;
		export type Values<M> = _Obj.Values<M>;
		export type Entries<M> = _Obj.Entries<M>;
		export type Merge<A, B> = _Obj.Merge<A, B>;
		export type Pick<M, K extends keyof M> = _Obj.Pick<M, K>;
		export type OmitKeys<M, K extends PropertyKey> = _Obj.OmitKeys<M, K>;
		export type MapValues<M, F extends _Internal.TypeFn> = _Obj.MapValues<M, F>;
		export type Readonly<M> = _Obj.Readonly<M>;
		export type Mutable<M> = _Obj.Mutable<M>;
		export type Partial<M> = _Obj.Partial<M>;
		export type Required<M> = _Obj.Required<M>;
	}

	// --- Bool ---
	export namespace Bool {
		export type Bool = _Bool.Bool;
		export type True = _Bool.True;
		export type False = _Bool.False;
		export type Not<T extends Bool> = _Bool.Not<T>;
		export type And<A extends Bool, B extends Bool> = _Bool.And<A, B>;
		export type Or<A extends Bool, B extends Bool> = _Bool.Or<A, B>;
		export type Xor<A extends Bool, B extends Bool> = _Bool.Xor<A, B>;
		export type Nand<A extends Bool, B extends Bool> = _Bool.Nand<A, B>;
		export type Nor<A extends Bool, B extends Bool> = _Bool.Nor<A, B>;
		export type If<Cond extends Bool, Then, Else> = _Bool.If<Cond, Then, Else>;
		export type Implies<A extends Bool, B extends Bool> = _Bool.Implies<A, B>;
		export type Equal<A extends Bool, B extends Bool> = _Bool.Equal<A, B>;
	}

	// --- Float (Fixed-Point) ---
	export namespace Float {
		export type Float = _Float.Float;
		export type FloatZero = _Float.FloatZero;
		export type IsZero<A extends Float> = _Float.IsZero<A>;
		export type IsNegative<A extends Float> = _Float.IsNegative<A>;
		export type IsPositive<A extends Float> = _Float.IsPositive<A>;
		export type FromNumber<N extends number> = _Float.FromNumber<N>;
		export type ToNumber<A extends Float> = _Float.ToNumber<A>;
		export type Add<A extends Float, B extends Float> = _Float.Add<A, B>;
		export type Sub<A extends Float, B extends Float> = _Float.Sub<A, B>;
		export type Negate<A extends Float> = _Float.Negate<A>;
	}

	// --- VM ---
	export namespace VM {
		export type VMState = _VM.VMState;
		export type Instruction = _VM.Instruction;
		export type InstructionSet = _VM.InstructionSet;
		export type CreateState<
			Mem extends object = Record<string, never>,
			Input extends readonly unknown[] = [],
		> = _VM.CreateState<Mem, Input>;
		export type WithPC<S extends VMState, N extends number> = _VM.WithPC<S, N>;
		export type WithMemory<S extends VMState, M extends object> = _VM.WithMemory<S, M>;
		export type WithMp<S extends VMState, N extends number> = _VM.WithMp<S, N>;
		export type WithStack<S extends VMState, St extends readonly unknown[]> = _VM.WithStack<S, St>;
		export type WithInput<S extends VMState, I extends readonly unknown[]> = _VM.WithInput<S, I>;
		export type WithOutput<S extends VMState, O extends readonly unknown[]> = _VM.WithOutput<S, O>;
		export type WithHalted<S extends VMState> = _VM.WithHalted<S>;
		export type SparseMemory = _VM.SparseMemory;
		export type MemRead<M extends SparseMemory, Addr extends number, Zero> = _VM.MemRead<M, Addr, Zero>;
		export type MemWrite<M extends SparseMemory, Addr extends number, Val> = _VM.MemWrite<M, Addr, Val>;
		export type Step<IS extends InstructionSet, Prog extends readonly Instruction[], S extends VMState> = _VM.Step<
			IS,
			Prog,
			S
		>;
		export type Run<IS extends InstructionSet, Prog extends readonly Instruction[], S extends VMState> = _VM.Run<
			IS,
			Prog,
			S
		>;
		export type Dispatch<
			IS extends InstructionSet,
			S extends VMState,
			Prog extends readonly Instruction[],
		> = _VM.Dispatch<IS, S, Prog>;
		export type SplitChars<S extends string> = _VM.SplitChars<S>;
		export type FilterChars<T extends readonly string[], Allowed extends string> = _VM.FilterChars<T, Allowed>;
	}
}
