export type Split<S extends string, Sep extends string> = S extends `${infer Head}${Sep}${infer Rest}`
	? [Head, ...Split<Rest, Sep>]
	: [S];

export type Join<T extends readonly string[], Sep extends string = ""> = T extends [
	infer H extends string,
	...infer R extends string[],
]
	? R extends []
		? H
		: `${H}${Sep}${Join<R, Sep>}`
	: "";

export type Concat<A extends string, B extends string> = `${A}${B}`;

export type Replace<S extends string, From extends string, To extends string> = S extends `${infer L}${From}${infer R}`
	? `${L}${To}${R}`
	: S;

export type ReplaceAll<
	S extends string,
	From extends string,
	To extends string,
> = S extends `${infer L}${From}${infer R}` ? ReplaceAll<`${L}${To}${R}`, From, To> : S;

export type Repeat<
	S extends string,
	N extends number,
	Acc extends string = "",
	Count extends unknown[] = [],
> = Count["length"] extends N ? Acc : Repeat<S, N, `${Acc}${S}`, [...Count, unknown]>;

export type Trim<S extends string> = TrimStart<TrimEnd<S>>;

export type TrimStart<S extends string> = S extends ` ${infer R}`
	? TrimStart<R>
	: S extends `\n${infer R}`
		? TrimStart<R>
		: S extends `\t${infer R}`
			? TrimStart<R>
			: S;

export type TrimEnd<S extends string> = S extends `${infer R} `
	? TrimEnd<R>
	: S extends `${infer R}\n`
		? TrimEnd<R>
		: S extends `${infer R}\t`
			? TrimEnd<R>
			: S;

export type Reverse<S extends string> = S extends `${infer C}${infer Rest}` ? `${Reverse<Rest>}${C}` : "";

import type { Length as StrLength } from "./access.js";

export type PadStart<
	S extends string,
	Len extends number,
	Pad extends string = " ",
> = StrLength<S> extends infer L extends number ? (L extends Len ? S : PadStart<`${Pad}${S}`, Len, Pad>) : never;

export type PadEnd<
	S extends string,
	Len extends number,
	Pad extends string = " ",
> = StrLength<S> extends infer L extends number ? (L extends Len ? S : PadEnd<`${S}${Pad}`, Len, Pad>) : never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _SplitTest = Expect<IsEqual<Split<"a,b,c", ",">, ["a", "b", "c"]>>;
type _JoinTest = Expect<IsEqual<Join<["a", "b", "c"], "-">, "a-b-c">>;
type _ConcatTest = Expect<IsEqual<Concat<"hello", " world">, "hello world">>;
type _ReplaceTest = Expect<IsEqual<Replace<"hello world", "world", "ts">, "hello ts">>;
type _ReplaceAllTest = Expect<IsEqual<ReplaceAll<"aaa", "a", "b">, "bbb">>;
type _RepeatTest = Expect<IsEqual<Repeat<"ab", 3>, "ababab">>;
type _TrimTest = Expect<IsEqual<Trim<"  hello  ">, "hello">>;
type _ReverseTest = Expect<IsEqual<Reverse<"abc">, "cba">>;
