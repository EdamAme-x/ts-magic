export type Not<T extends boolean> = T extends true ? false : true;

export type And<A extends boolean, B extends boolean> = A extends true ? (B extends true ? true : false) : false;

export type Or<A extends boolean, B extends boolean> = A extends true ? true : B extends true ? true : false;

export type If<Cond extends boolean, Then, Else> = Cond extends true ? Then : Else;

// --- Tests ---

import type { Expect, IsEqual } from "./assert.js";

type _NotTest = Expect<IsEqual<Not<true>, false>>;
type _AndTest = Expect<IsEqual<And<true, false>, false>>;
type _OrTest = Expect<IsEqual<Or<false, true>, true>>;
type _IfTest = Expect<IsEqual<If<true, "yes", "no">, "yes">>;
