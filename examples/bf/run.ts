import type { Run } from "../../src/vm/run.js";
import type { CreateState } from "../../src/vm/state.js";
import type { BrainFuckIS } from "./handlers.js";
import type { ParseBF } from "./parse.js";

export type RunBF<Source extends string, Input extends readonly unknown[] = []> = Run<
	BrainFuckIS,
	ParseBF<Source>,
	CreateState<Record<string, never>, Input>
>;

// --- Tests ---

import type { Expect, IsEqual } from "../../src/utils/assert.js";

// +++ -> cell 0 = 3
type _IncrTest = RunBF<"+++">;
type _IncrOutput = Expect<IsEqual<_IncrTest["halted"], true>>;

// +++[-] -> cell 0 = 0 (loop decrements to zero)
type _LoopTest = RunBF<"+++[-]">;
type _LoopHalted = Expect<IsEqual<_LoopTest["halted"], true>>;

// +++. -> output should contain 3
type _OutTest = RunBF<"+++.">;
type _OutResult = Expect<IsEqual<_OutTest["output"], [3]>>;
