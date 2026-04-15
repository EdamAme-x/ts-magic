export type VMState = {
	readonly pc: number;
	readonly memory: object;
	readonly mp: number;
	readonly stack: readonly unknown[];
	readonly input: readonly unknown[];
	readonly output: readonly unknown[];
	readonly halted: boolean;
};

export type WithPC<S extends VMState, N extends number> = Omit<S, "pc"> & { readonly pc: N };

export type WithMemory<S extends VMState, M extends object> = Omit<S, "memory"> & { readonly memory: M };

export type WithMp<S extends VMState, N extends number> = Omit<S, "mp"> & { readonly mp: N };

export type WithStack<S extends VMState, St extends readonly unknown[]> = Omit<S, "stack"> & { readonly stack: St };

export type WithInput<S extends VMState, I extends readonly unknown[]> = Omit<S, "input"> & { readonly input: I };

export type WithOutput<S extends VMState, O extends readonly unknown[]> = Omit<S, "output"> & { readonly output: O };

export type WithHalted<S extends VMState> = Omit<S, "halted"> & { readonly halted: true };

export type CreateState<Mem extends object = Record<string, never>, Input extends readonly unknown[] = []> = {
	readonly pc: 0;
	readonly memory: Mem;
	readonly mp: 0;
	readonly stack: [];
	readonly input: Input;
	readonly output: [];
	readonly halted: false;
};

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type S0 = CreateState;
type _PcTest = Expect<IsEqual<S0["pc"], 0>>;
type _HaltedTest = Expect<IsEqual<S0["halted"], false>>;
type _WithPcTest = Expect<IsEqual<WithPC<S0, 5>["pc"], 5>>;
type _WithHaltTest = Expect<IsEqual<WithHalted<S0>["halted"], true>>;
