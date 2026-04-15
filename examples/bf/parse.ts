import type { FilterChars, SplitChars } from "../../src/vm/parse.js";
import type {
	BFChar,
	BFInstruction,
	Decr,
	InOp,
	Incr,
	Left,
	LoopEnd,
	LoopStart,
	OutOp,
	Right,
} from "./instructions.js";

type CharToInstr<C extends string> = C extends "+"
	? Incr
	: C extends "-"
		? Decr
		: C extends ">"
			? Right
			: C extends "<"
				? Left
				: C extends ","
					? InOp
					: C extends "."
						? OutOp
						: C extends "["
							? LoopStart<-1>
							: C extends "]"
								? LoopEnd<-1>
								: never;

type CharsToInstrs<T extends readonly string[], Acc extends BFInstruction[] = []> = T extends [
	infer H extends string,
	...infer Rest extends string[],
]
	? CharsToInstrs<Rest, [...Acc, CharToInstr<H>]>
	: Acc;

type SetAt<T extends readonly unknown[], I extends number, V, Acc extends unknown[] = []> = Acc["length"] extends I
	? T extends [unknown, ...infer Rest]
		? [...Acc, V, ...Rest]
		: [...Acc, V]
	: T extends [infer H, ...infer Rest]
		? SetAt<Rest, I, V, [...Acc, H]>
		: Acc;

type MatchBrackets<
	Instrs extends readonly BFInstruction[],
	Pos extends unknown[] = [],
	Stack extends number[] = [],
	Out extends BFInstruction[] = [],
> = Instrs extends [infer I extends BFInstruction, ...infer Rest extends BFInstruction[]]
	? I extends LoopStart
		? MatchBrackets<Rest, [...Pos, unknown], [...Stack, Pos["length"]], [...Out, LoopStart<-1>]>
		: I extends LoopEnd
			? Stack extends [...infer SRest extends number[], infer Open extends number]
				? MatchBrackets<Rest, [...Pos, unknown], SRest, PatchLoop<[...Out, LoopEnd<Open>], Open, Pos["length"]>>
				: never
			: MatchBrackets<Rest, [...Pos, unknown], Stack, [...Out, I]>
	: Out;

type PatchLoop<Instrs extends readonly BFInstruction[], OpenIdx extends number, CloseIdx extends number> = SetAt<
	Instrs,
	OpenIdx,
	LoopStart<CloseIdx>
> extends infer R extends BFInstruction[]
	? R
	: never;

export type ParseBF<S extends string> = MatchBrackets<CharsToInstrs<FilterChars<SplitChars<S>, BFChar>>>;

// --- Tests ---

import type { Expect, IsEqual } from "../../src/utils/assert.js";

type _Simple = ParseBF<"+-">;
type _SimpleTest = Expect<IsEqual<_Simple, [Incr, Decr]>>;

type _Loop = ParseBF<"+[-]">;
type _LoopTest = Expect<IsEqual<_Loop, [Incr, LoopStart<3>, Decr, LoopEnd<1>]>>;

type _Filter = ParseBF<"+ hello -">;
type _FilterTest = Expect<IsEqual<_Filter, [Incr, Decr]>>;
