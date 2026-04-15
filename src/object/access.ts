export type Get<M, K extends PropertyKey> = K extends keyof M ? M[K] : never;

export type Set<M, K extends PropertyKey, V> = Omit<M, K> & { [P in K]: V };

export type Has<M, K extends PropertyKey> = K extends keyof M ? true : false;

export type Delete<M, K extends PropertyKey> = Omit<M, K>;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type Obj = { a: 1; b: 2; c: 3 };

type _GetTest = Expect<IsEqual<Get<Obj, "a">, 1>>;
type _HasT = Expect<IsEqual<Has<Obj, "a">, true>>;
type _HasF = Expect<IsEqual<Has<Obj, "z">, false>>;
type _DeleteTest = Expect<IsEqual<Has<Delete<Obj, "a">, "a">, false>>;
