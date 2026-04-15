export type Length<T extends readonly unknown[]> = T["length"];

export type Head<T extends readonly unknown[]> = T extends [infer H, ...unknown[]] ? H : never;

export type Tail<T extends readonly unknown[]> = T extends [unknown, ...infer R] ? R : [];

export type Last<T extends readonly unknown[]> = T extends [...unknown[], infer L] ? L : never;

export type Reverse<T extends readonly unknown[]> = T extends [infer H, ...infer R] ? [...Reverse<R>, H] : [];

export type Push<T extends readonly unknown[], V> = [...T, V];

export type Unshift<T extends readonly unknown[], V> = [V, ...T];

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _LenTest = Expect<IsEqual<Length<[1, 2, 3]>, 3>>;
type _HeadTest = Expect<IsEqual<Head<[1, 2, 3]>, 1>>;
type _TailTest = Expect<IsEqual<Tail<[1, 2, 3]>, [2, 3]>>;
type _LastTest = Expect<IsEqual<Last<[1, 2, 3]>, 3>>;
type _ReverseTest = Expect<IsEqual<Reverse<[1, 2, 3]>, [3, 2, 1]>>;
type _PushTest = Expect<IsEqual<Push<[1, 2], 3>, [1, 2, 3]>>;
type _UnshiftTest = Expect<IsEqual<Unshift<[2, 3], 1>, [1, 2, 3]>>;
