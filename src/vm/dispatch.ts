import type { Apply, TypeFn } from "../internal/hkt.js";
import type { Instruction } from "./instruction.js";
import type { VMState, WithHalted } from "./state.js";

export type InstructionSet = TypeFn;

export type Dispatch<
	IS extends InstructionSet,
	S extends VMState,
	Prog extends readonly Instruction[],
> = S["pc"] extends number
	? Prog[S["pc"]] extends infer I extends Instruction
		? Apply<IS, { readonly instr: I; readonly state: S }> extends infer R extends VMState
			? R
			: WithHalted<S>
		: WithHalted<S>
	: WithHalted<S>;
