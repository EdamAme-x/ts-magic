export type SparseMemory = { readonly [addr: number]: unknown };

export type MemRead<M extends SparseMemory, Addr extends number, Zero> = Addr extends keyof M ? M[Addr] : Zero;

export type MemWrite<M extends SparseMemory, Addr extends number, Val> = Omit<M, Addr> & { readonly [K in Addr]: Val };

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type M0 = Record<string, never>;
type _ReadMiss = Expect<IsEqual<MemRead<M0, 0, "zero">, "zero">>;
type M1 = MemWrite<M0, 0, "hello">;
type _ReadHit = Expect<IsEqual<MemRead<M1, 0, "zero">, "hello">>;
type M2 = MemWrite<M1, 0, "world">;
type _Overwrite = Expect<IsEqual<MemRead<M2, 0, "zero">, "world">>;
