export type Bool = true | false;

export type True = true;

export type False = false;

export type Not<T extends Bool> = T extends true ? false : true;

export type And<A extends Bool, B extends Bool> = A extends true ? (B extends true ? true : false) : false;

export type Or<A extends Bool, B extends Bool> = A extends true ? true : B extends true ? true : false;

export type Xor<A extends Bool, B extends Bool> = A extends B ? false : true;

export type Nand<A extends Bool, B extends Bool> = Not<And<A, B>>;

export type Nor<A extends Bool, B extends Bool> = Not<Or<A, B>>;

export type If<Cond extends Bool, Then, Else> = Cond extends true ? Then : Else;

export type Implies<A extends Bool, B extends Bool> = A extends true ? B : true;

export type Equal<A extends Bool, B extends Bool> = A extends B ? (B extends A ? true : false) : false;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _NotT = Expect<IsEqual<Not<true>, false>>;
type _NotF = Expect<IsEqual<Not<false>, true>>;
type _AndTT = Expect<IsEqual<And<true, true>, true>>;
type _AndTF = Expect<IsEqual<And<true, false>, false>>;
type _OrFF = Expect<IsEqual<Or<false, false>, false>>;
type _OrTF = Expect<IsEqual<Or<true, false>, true>>;
type _XorTT = Expect<IsEqual<Xor<true, true>, false>>;
type _XorTF = Expect<IsEqual<Xor<true, false>, true>>;
type _NandTT = Expect<IsEqual<Nand<true, true>, false>>;
type _NorFF = Expect<IsEqual<Nor<false, false>, true>>;
type _IfT = Expect<IsEqual<If<true, "yes", "no">, "yes">>;
type _ImpliesFF = Expect<IsEqual<Implies<false, false>, true>>;
type _EqTT = Expect<IsEqual<Equal<true, true>, true>>;
