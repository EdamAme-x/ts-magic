import type { TypeFn } from "../../src/internal/hkt.js";
import type { ToNumber } from "../../src/uint8/convert.js";
import type { Dec, Inc, IsZero } from "../../src/uint8/index.js";
import type { UInt8 } from "../../src/uint8/uint8.js";
import type { Zero as UInt8Zero } from "../../src/uint8/uint8.js";
import type { NatAdd, NatSub } from "../../src/utils/number.js";
import type { InstructionSet } from "../../src/vm/dispatch.js";
import type { MemRead, MemWrite, SparseMemory } from "../../src/vm/memory.js";
import type { VMState, WithHalted, WithInput, WithMemory, WithMp, WithOutput, WithPC } from "../../src/vm/state.js";
import type { BFInstruction, LoopEnd, LoopStart } from "./instructions.js";

type ReadCell<S extends VMState> = MemRead<S["memory"] & SparseMemory, S["mp"], UInt8Zero> & UInt8;

type Adv<S extends VMState> = NatAdd<S["pc"], 1>;

type ExecIncr<S extends VMState> = WithPC<
	WithMemory<S, MemWrite<S["memory"] & SparseMemory, S["mp"], Inc<ReadCell<S>>>>,
	Adv<S>
>;

type ExecDecr<S extends VMState> = WithPC<
	WithMemory<S, MemWrite<S["memory"] & SparseMemory, S["mp"], Dec<ReadCell<S>>>>,
	Adv<S>
>;

type ExecRight<S extends VMState> = WithPC<WithMp<S, NatAdd<S["mp"], 1>>, Adv<S>>;

type ExecLeft<S extends VMState> = S["mp"] extends 0
	? WithPC<S, Adv<S>>
	: WithPC<WithMp<S, NatSub<S["mp"], 1>>, Adv<S>>;

type ExecOut<S extends VMState> = WithPC<WithOutput<S, [...S["output"], ToNumber<ReadCell<S>>]>, Adv<S>>;

type ExecIn<S extends VMState> = S["input"] extends [infer V, ...infer Rest extends readonly unknown[]]
	? WithPC<WithInput<WithMemory<S, MemWrite<S["memory"] & SparseMemory, S["mp"], V>>, Rest>, Adv<S>>
	: WithPC<S, Adv<S>>;

type ExecLoopStart<S extends VMState, I extends LoopStart> = IsZero<ReadCell<S>> extends true
	? WithPC<S, NatAdd<I["target"], 1>>
	: WithPC<S, Adv<S>>;

type ExecLoopEnd<S extends VMState, I extends LoopEnd> = IsZero<ReadCell<S>> extends true
	? WithPC<S, Adv<S>>
	: WithPC<S, I["target"]>;

export interface BrainFuckIS extends TypeFn {
	output: this["input"] extends { instr: infer I extends BFInstruction; state: infer S extends VMState }
		? I extends { op: "+" }
			? ExecIncr<S>
			: I extends { op: "-" }
				? ExecDecr<S>
				: I extends { op: ">" }
					? ExecRight<S>
					: I extends { op: "<" }
						? ExecLeft<S>
						: I extends { op: "." }
							? ExecOut<S>
							: I extends { op: "," }
								? ExecIn<S>
								: I extends LoopStart<infer N extends number>
									? ExecLoopStart<S, LoopStart<N>>
									: I extends LoopEnd<infer N extends number>
										? ExecLoopEnd<S, LoopEnd<N>>
										: WithHalted<S>
		: never;
}
