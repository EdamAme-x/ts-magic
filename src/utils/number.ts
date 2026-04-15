export type BuildTuple<N extends number, T extends readonly unknown[] = []> = T["length"] extends N
	? T
	: BuildTuple<N, [...T, unknown]>;

export type NatAdd<A extends number, B extends number> = [
	...BuildTuple<A>,
	...BuildTuple<B>,
]["length"] extends infer R extends number
	? R
	: never;

export type NatSub<A extends number, B extends number> = BuildTuple<A> extends [...BuildTuple<B>, ...infer R]
	? R["length"]
	: never;

// --- Tests ---

import type { Expect, IsEqual } from "./assert.js";

type _BuildTest = Expect<IsEqual<BuildTuple<3>["length"], 3>>;
type _AddTest = Expect<IsEqual<NatAdd<3, 4>, 7>>;
type _SubTest = Expect<IsEqual<NatSub<10, 3>, 7>>;
