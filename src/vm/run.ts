import type { Dispatch, InstructionSet } from "./dispatch.js";
import type { Instruction } from "./instruction.js";
import type { VMState, WithHalted } from "./state.js";

export type Step<
	IS extends InstructionSet,
	Prog extends readonly Instruction[],
	S extends VMState,
> = S["halted"] extends true ? S : S["pc"] extends Prog["length"] ? WithHalted<S> : Dispatch<IS, S, Prog>;

export type Run<
	IS extends InstructionSet,
	Prog extends readonly Instruction[],
	S extends VMState,
> = S["halted"] extends true ? S : S["pc"] extends Prog["length"] ? WithHalted<S> : Run<IS, Prog, Step<IS, Prog, S>>;
