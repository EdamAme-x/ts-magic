/**
 * IntN type-level code generator
 *
 * Generates int1/int2/int4/int8/int16 modules from a single template.
 * Run: bun run codegen/gen-intn.ts
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CONFIGS = [{ bits: 8 }] as const;

const SRC_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src");

function range(n: number): number[] {
	return Array.from({ length: n }, (_, i) => i);
}

function bitsTuple(bits: number): string {
	return `[${range(bits)
		.map(() => "Bit")
		.join(", ")}]`;
}

function zeroBits(bits: number): string {
	return `[${range(bits)
		.map(() => "0")
		.join(", ")}]`;
}

function oneBits(bits: number): string {
	const arr = range(bits).map(() => "0");
	arr[bits - 1] = "1";
	return `[${arr.join(", ")}]`;
}

function minusOneBits(bits: number): string {
	return `[${range(bits)
		.map(() => "1")
		.join(", ")}]`;
}

function maxBits(bits: number): string {
	const arr = range(bits).map(() => "1");
	arr[0] = "0";
	return `[${arr.join(", ")}]`;
}

function minBits(bits: number): string {
	const arr = range(bits).map(() => "0");
	arr[0] = "1";
	return `[${arr.join(", ")}]`;
}

// --- int.ts ---
function genIntDef(bits: number): string {
	const N = bits;
	const name = `Int${N}`;
	return `import type { Bit } from "../internal/bit.js";

declare const __int${N}Brand: unique symbol;

export type ${name}Bits = ${bitsTuple(N)};

export type ${name}<Bits extends ${name}Bits = ${name}Bits> = Bits & { readonly [__int${N}Brand]: true };

export type Unwrap<T extends ${name}> = T extends ${name}<infer B> ? B : never;

export type Wrap<B extends ${name}Bits> = ${name}<B>;

export type Zero = ${name}<${zeroBits(N)}>;

export type One = ${name}<${oneBits(N)}>;

export type MinusOne = ${name}<${minusOneBits(N)}>;

export type Max = ${name}<${maxBits(N)}>;

export type Min = ${name}<${minBits(N)}>;

export type IsNegative<A extends ${name}> = Unwrap<A>[0] extends 1 ? true : false;

export type IsZero<A extends ${name}> = Unwrap<A> extends ${zeroBits(N)} ? true : false;

export type IsPositive<A extends ${name}> = IsNegative<A> extends true ? false : IsZero<A> extends true ? false : true;

export type SignBit<A extends ${name}> = Unwrap<A>[0];

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _IsNegTest = Expect<IsEqual<IsNegative<MinusOne>, true>>;
type _IsZeroTest = Expect<IsEqual<IsZero<Zero>, true>>;
${N >= 2 ? "type _IsPosTest = Expect<IsEqual<IsPositive<One>, true>>;" : "type _IsPosTest = Expect<IsEqual<IsPositive<Zero>, false>>;"}
type _SignTest = Expect<IsEqual<SignBit<MinusOne>, 1>>;
`;
}

// --- bitwise.ts ---
function genBitwise(bits: number): string {
	const N = bits;
	const name = `Int${N}`;
	const indices = range(N);

	const notExprs = indices.map((i) => `BitNot<B[${i}]>`).join(", ");
	const binaryOp = (op: string, x: string, y: string) => indices.map((i) => `${op}<${x}[${i}], ${y}[${i}]>`).join(", ");

	const shiftLeftResult = [...indices.slice(1).map((i) => `B[${i}]`), "0"].join(", ");
	const shiftRightResult = ["B[0]", ...indices.slice(0, -1).map((i) => `B[${i}]`)].join(", ");
	const logicalShiftRight = ["0", ...indices.slice(0, -1).map((i) => `B[${i}]`)].join(", ");

	return `import type { BitAnd, BitNot, BitOr, BitXor } from "../internal/bit.js";
import type { ${name}, ${name}Bits, Unwrap, Wrap } from "./${name.toLowerCase()}.js";

export type BitwiseNot<A extends ${name}> = Unwrap<A> extends infer B extends ${name}Bits
	? Wrap<[${notExprs}]>
	: never;

export type BitwiseAnd<A extends ${name}, B extends ${name}> = [Unwrap<A>, Unwrap<B>] extends [
	infer X extends ${name}Bits,
	infer Y extends ${name}Bits,
]
	? Wrap<[${binaryOp("BitAnd", "X", "Y")}]>
	: never;

export type BitwiseOr<A extends ${name}, B extends ${name}> = [Unwrap<A>, Unwrap<B>] extends [
	infer X extends ${name}Bits,
	infer Y extends ${name}Bits,
]
	? Wrap<[${binaryOp("BitOr", "X", "Y")}]>
	: never;

export type BitwiseXor<A extends ${name}, B extends ${name}> = [Unwrap<A>, Unwrap<B>] extends [
	infer X extends ${name}Bits,
	infer Y extends ${name}Bits,
]
	? Wrap<[${binaryOp("BitXor", "X", "Y")}]>
	: never;

export type ShiftLeft<A extends ${name}> = Unwrap<A> extends infer B extends ${name}Bits
	? Wrap<[${shiftLeftResult}]>
	: never;

export type ShiftRight<A extends ${name}> = Unwrap<A> extends infer B extends ${name}Bits
	? Wrap<[${shiftRightResult}]>
	: never;

export type LogicalShiftRight<A extends ${name}> = Unwrap<A> extends infer B extends ${name}Bits
	? Wrap<[${logicalShiftRight}]>
	: never;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { MinusOne, Zero } from "./${name.toLowerCase()}.js";
import type { FromNumber, ToNumber } from "./convert.js";

type _NotZeroTest = Expect<IsEqual<BitwiseNot<Zero>, MinusOne>>;
${N >= 4 ? "type _XorTest = Expect<IsEqual<ToNumber<BitwiseXor<FromNumber<5>, FromNumber<3>>>, 6>>;" : ""}
${N >= 2 ? "type _ShiftLeftTest = Expect<IsEqual<ToNumber<ShiftLeft<FromNumber<1>>>, 2>>;" : ""}
${N >= 4 ? "type _ShiftRightTest = Expect<IsEqual<ToNumber<ShiftRight<FromNumber<4>>>, 2>>;" : ""}
`;
}

// --- arithmetic.ts ---
function genArithmetic(bits: number): string {
	const N = bits;
	const name = `Int${N}`;
	const indices = range(N);

	// Build the nested FullAdder chain from LSB to MSB
	const revIndices = [...indices].reverse();
	let adderChain = "";
	let indent = "";
	const sumVars: string[] = [];
	const carryVars: string[] = [];

	for (let k = 0; k < N; k++) {
		const i = revIndices[k];
		const sv = `S${i}`;
		const cv = `C${i}`;
		sumVars.push(sv);
		const prevCarry = k === 0 ? "C" : carryVars[k - 1];

		if (k < N - 1) {
			carryVars.push(cv);
			adderChain += `${indent}FullAdder<A[${i}], B[${i}], ${prevCarry}> extends {\n`;
			adderChain += `${indent}\tsum: infer ${sv} extends Bit;\n`;
			adderChain += `${indent}\tcarry: infer ${cv} extends Bit;\n`;
			adderChain += `${indent}}\n${indent}\t? `;
			indent += "\t\t";
		} else {
			adderChain += `FullAdder<A[${i}], B[${i}], ${prevCarry}> extends {\n`;
			adderChain += `${indent}\t\t\tsum: infer ${sv} extends Bit;\n`;
			adderChain += `${indent}\t\t}\n`;
			adderChain += `${indent}\t\t\t? Wrap<[${indices.map((j) => `S${j}`).join(", ")}]>\n`;
			adderChain += `${indent}\t\t\t: never`;
		}
	}

	// Close all the ternaries
	for (let k = N - 2; k >= 0; k--) {
		adderChain += `\n${"\t".repeat(k + 1)}\t: never`;
	}

	// Max positive value for this bit width
	const maxPos = 2 ** (bits - 1) - 1;
	// Pick test values that fit in range
	const canTestLarge = maxPos >= 127;
	const testA = canTestLarge ? 100 : Math.min(maxPos - 1, 1);
	const testB = canTestLarge ? 27 : Math.min(maxPos - testA, 1);
	const testSum = testA + testB;
	// Ensure Abs test value fits
	const absVal = Math.min(42, maxPos);
	// Ensure basic test values fit
	const addA = Math.min(3, maxPos);
	const addB = Math.min(5, maxPos - addA);
	const subA = Math.min(10, maxPos);
	const subB = Math.min(3, subA);
	const negVal = Math.min(5, maxPos);
	const incVal = Math.min(5, maxPos - 1);
	const decVal = Math.min(5, maxPos);

	return `import type { Bit, FullAdder } from "../internal/bit.js";
import type { BitwiseNot } from "./bitwise.js";
import type { ${name}, ${name}Bits, One, Unwrap, Wrap } from "./${name.toLowerCase()}.js";

type AddBits<A extends ${name}Bits, B extends ${name}Bits, C extends Bit> = ${adderChain};

export type Add<A extends ${name}, B extends ${name}> = AddBits<Unwrap<A>, Unwrap<B>, 0>;

export type Negate<A extends ${name}> = Add<BitwiseNot<A>, One>;

export type Sub<A extends ${name}, B extends ${name}> = Add<A, Negate<B>>;

export type Inc<A extends ${name}> = Add<A, One>;

export type Dec<A extends ${name}> = Sub<A, One>;

export type Abs<A extends ${name}> = Unwrap<A>[0] extends 1 ? Negate<A> : A;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber, ToNumber } from "./convert.js";
import type { Zero } from "./${name.toLowerCase()}.js";

type _AddTest = Expect<IsEqual<ToNumber<Add<FromNumber<${addA}>, FromNumber<${addB}>>>, ${addA + addB}>>;
type _SubTest = Expect<IsEqual<ToNumber<Sub<FromNumber<${subA}>, FromNumber<${subB}>>>, ${subA - subB}>>;
type _NegTest = Expect<IsEqual<ToNumber<Negate<FromNumber<${negVal}>>>, -${negVal}>>;
type _IncTest = Expect<IsEqual<ToNumber<Inc<FromNumber<${incVal}>>>, ${incVal + 1}>>;
type _DecTest = Expect<IsEqual<ToNumber<Dec<FromNumber<${decVal}>>>, ${decVal - 1}>>;
type _AbsTest = Expect<IsEqual<ToNumber<Abs<FromNumber<-${absVal}>>>, ${absVal}>>;
type _AddZero = Expect<IsEqual<ToNumber<Add<Zero, Zero>>, 0>>;
type _AddSum = Expect<IsEqual<ToNumber<Add<FromNumber<${testA}>, FromNumber<${testB}>>>, ${testSum}>>;
`;
}

// --- compare.ts ---
function genCompare(bits: number): string {
	const name = `Int${N(bits)}`;
	return `import type { Sub } from "./arithmetic.js";
import type { ${name}, IsNegative, IsZero } from "./${name.toLowerCase()}.js";

export type Equal<A extends ${name}, B extends ${name}> = IsZero<Sub<A, B>>;

export type NotEqual<A extends ${name}, B extends ${name}> = Equal<A, B> extends true ? false : true;

export type LessThan<A extends ${name}, B extends ${name}> = IsNegative<Sub<A, B>>;

export type GreaterThan<A extends ${name}, B extends ${name}> = LessThan<B, A>;

export type LessThanOrEqual<A extends ${name}, B extends ${name}> = GreaterThan<A, B> extends true ? false : true;

export type GreaterThanOrEqual<A extends ${name}, B extends ${name}> = LessThan<A, B> extends true ? false : true;

// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";
import type { FromNumber } from "./convert.js";
import type { One, Zero } from "./${name.toLowerCase()}.js";

type _EqTest = Expect<IsEqual<Equal<One, One>, true>>;
type _NeqTest = Expect<IsEqual<NotEqual<One, Zero>, true>>;
type _LtTest = Expect<IsEqual<LessThan<Zero, One>, true>>;
type _GtTest = Expect<IsEqual<GreaterThan<One, Zero>, true>>;
type _LteTest = Expect<IsEqual<LessThanOrEqual<One, One>, true>>;
${2 ** (bits - 1) - 1 >= 5 ? "type _GteTest = Expect<IsEqual<GreaterThanOrEqual<FromNumber<5>, FromNumber<3>>, true>>;" : "type _GteTest = Expect<IsEqual<GreaterThanOrEqual<One, One>, true>>;"}
`;
}

// --- convert.ts ---
function genConvert(bits: number): string {
	const N_val = bits;
	const name = `Int${N_val}`;
	const indices = range(N_val);

	// Powers of 2 for each bit position (MSB first)
	const powers = indices.map((i) => 2 ** (N_val - 1 - i));

	// Build ExtractBit chain for FromPositive (skip sign bit, so bits 1..N-1)
	const dataBits = N_val - 1;
	const dataPowers = powers.slice(1); // skip MSB (sign bit)

	let extractChain = "";

	if (dataBits === 0) {
		// Int1: only sign bit, no data bits. The only non-negative value is 0.
		extractChain = "Wrap<[0]>";
	} else {
		let extractIndent = "";
		const bitVarNames: string[] = [];

		for (let k = 0; k < dataBits; k++) {
			const bVar = `B${dataBits - 1 - k}`;
			bitVarNames.push(bVar);
			const rVar = `R${dataBits - 1 - k}`;
			const pow = dataPowers[k];

			if (k < dataBits - 1) {
				extractChain += `${extractIndent}ExtractBit<${k === 0 ? "N" : `R${dataBits - k}`}, ${pow}> extends { bit: infer ${bVar} extends Bit; rest: infer ${rVar} extends number }\n`;
				extractChain += `${extractIndent}\t? `;
				extractIndent += "\t\t";
			} else {
				const src = dataBits === 1 ? "N" : `R${dataBits - k}`;
				extractChain += `ExtractBit<${src}, ${pow}> extends { bit: infer ${bVar} extends Bit }\n`;
				extractChain += `${extractIndent}\t\t\t? Wrap<[0, ${bitVarNames.join(", ")}]>\n`;
				extractChain += `${extractIndent}\t\t\t: never`;
			}
		}

		for (let k = dataBits - 2; k >= 0; k--) {
			extractChain += `\n${"\t".repeat(k + 1)}\t: never`;
		}
	}

	// Build ToUnsignedBits — we need to sum bit*power for all bits
	// Use a tree of NatAdd to avoid deep nesting
	function buildAddTree(items: string[]): string {
		if (items.length === 1) return items[0];
		const mid = Math.floor(items.length / 2);
		const left = buildAddTree(items.slice(0, mid));
		const right = buildAddTree(items.slice(mid));
		return `NatAdd<${left}, ${right}>`;
	}

	const bitExprs = indices.map((i) => {
		if (i === N_val - 1) return `BitToNum<A[${i}]>`;
		return `MulBitByPow<A[${i}], ${powers[i]}>`;
	});
	const toUnsigned = buildAddTree(bitExprs);

	// Determine which round-trip tests are safe (TS literal limit is ~999 for tuples)
	const canTestMax = N_val <= 16;
	const maxVal = 2 ** (N_val - 1) - 1;

	const maxPos = 2 ** (N_val - 1) - 1;

	let tests = `
// --- Tests ---

import type { Expect, IsEqual } from "../utils/assert.js";

type _RoundTrip0 = Expect<IsEqual<ToNumber<FromNumber<0>>, 0>>;`;

	if (maxPos >= 3) {
		tests += "\ntype _RoundTrip3 = Expect<IsEqual<ToNumber<FromNumber<3>>, 3>>;";
	}
	tests += "\ntype _RoundTripNeg1 = Expect<IsEqual<ToNumber<FromNumber<-1>>, -1>>;";
	if (maxPos >= 42) {
		tests += "\ntype _RoundTripNeg42 = Expect<IsEqual<ToNumber<FromNumber<-42>>, -42>>;";
	}
	if (canTestMax && maxPos >= 127) {
		tests += "\ntype _RoundTrip127 = Expect<IsEqual<ToNumber<FromNumber<127>>, 127>>;";
	}

	return `import type { Bit } from "../internal/bit.js";
import type { BuildTuple, NatAdd, NatSub } from "../utils/number.js";
import type { Negate } from "./arithmetic.js";
import type { ${name}, ${name}Bits, Unwrap, Wrap } from "./${name.toLowerCase()}.js";

type BitToNum<B extends Bit> = B extends 1 ? 1 : 0;

type MulBitByPow<B extends Bit, Pow extends number> = B extends 1 ? Pow : 0;

type ToUnsignedBits<A extends ${name}Bits> = ${toUnsigned};

export type ToNumber<A extends ${name}> = Unwrap<A> extends infer B extends ${name}Bits
	? B[0] extends 0
		? ToUnsignedBits<B>
		: ToUnsignedBits<Unwrap<Negate<A>>> extends infer N extends number
			? \`-\${N}\` extends \`\${infer R extends number}\`
				? R
				: never
			: never
	: never;

type GTE<A extends number, B extends number> = BuildTuple<A> extends [...BuildTuple<B>, ...infer R] ? true : false;

type ExtractBit<N extends number, Pow extends number> = GTE<N, Pow> extends true
	? { bit: 1; rest: NatSub<N, Pow> }
	: { bit: 0; rest: N };

type FromPositive<N extends number> = ${extractChain};

export type FromNumber<N extends number> = \`\${N}\` extends \`-\${infer P extends number}\`
	? Negate<FromPositive<P>>
	: FromPositive<N>;
${tests}
`;
}

// --- index.ts ---
function genIndex(bits: number): string {
	const name = `Int${bits}`;
	const lower = name.toLowerCase();
	return `export type {
	${name},
	${name}Bits,
	Unwrap,
	Wrap,
	Zero,
	One,
	MinusOne,
	Max,
	Min,
	IsNegative,
	IsZero,
	IsPositive,
	SignBit,
} from "./${lower}.js";
export type { Add, Sub, Negate, Inc, Dec, Abs } from "./arithmetic.js";
export type {
	BitwiseNot,
	BitwiseAnd,
	BitwiseOr,
	BitwiseXor,
	ShiftLeft,
	ShiftRight,
	LogicalShiftRight,
} from "./bitwise.js";
export type { Equal, NotEqual, LessThan, GreaterThan, LessThanOrEqual, GreaterThanOrEqual } from "./compare.js";
export type { ToNumber, FromNumber } from "./convert.js";
`;
}

function N(bits: number): string {
	return `${bits}`;
}

// --- Main ---
for (const config of CONFIGS) {
	const { bits } = config;
	const dirName = `int${bits}`;
	const dir = join(SRC_DIR, dirName);

	mkdirSync(dir, { recursive: true });

	const files: Record<string, string> = {
		[`${dirName}.ts`]: genIntDef(bits),
		"bitwise.ts": genBitwise(bits),
		"arithmetic.ts": genArithmetic(bits),
		"compare.ts": genCompare(bits),
		"convert.ts": genConvert(bits),
		"index.ts": genIndex(bits),
	};

	for (const [filename, content] of Object.entries(files)) {
		writeFileSync(join(dir, filename), content);
	}

	console.log(`Generated src/${dirName}/ (${bits}-bit)`);
}

// --- Generate IntN namespace blocks for src/index.ts ---

function genNamespaceBlock(bits: number): string {
	const name = `Int${bits}`;
	const alias = `_Int${bits}`;
	return `
	// --- ${name} (${bits}-bit Signed Integer) ---
	export namespace ${name} {
		export type ${name} = ${alias}.${name};
		export type Zero = ${alias}.Zero;
		export type One = ${alias}.One;
		export type MinusOne = ${alias}.MinusOne;
		export type Max = ${alias}.Max;
		export type Min = ${alias}.Min;
		export type FromNumber<N extends number> = ${alias}.FromNumber<N>;
		export type ToNumber<A extends ${name}> = ${alias}.ToNumber<A>;
		export type IsNegative<A extends ${name}> = ${alias}.IsNegative<A>;
		export type IsZero<A extends ${name}> = ${alias}.IsZero<A>;
		export type IsPositive<A extends ${name}> = ${alias}.IsPositive<A>;
		export type Add<A extends ${name}, B extends ${name}> = ${alias}.Add<A, B>;
		export type Sub<A extends ${name}, B extends ${name}> = ${alias}.Sub<A, B>;
		export type Negate<A extends ${name}> = ${alias}.Negate<A>;
		export type Inc<A extends ${name}> = ${alias}.Inc<A>;
		export type Dec<A extends ${name}> = ${alias}.Dec<A>;
		export type Abs<A extends ${name}> = ${alias}.Abs<A>;
		export type Equal<A extends ${name}, B extends ${name}> = ${alias}.Equal<A, B>;
		export type NotEqual<A extends ${name}, B extends ${name}> = ${alias}.NotEqual<A, B>;
		export type LessThan<A extends ${name}, B extends ${name}> = ${alias}.LessThan<A, B>;
		export type GreaterThan<A extends ${name}, B extends ${name}> = ${alias}.GreaterThan<A, B>;
		export type BitwiseNot<A extends ${name}> = ${alias}.BitwiseNot<A>;
		export type BitwiseAnd<A extends ${name}, B extends ${name}> = ${alias}.BitwiseAnd<A, B>;
		export type BitwiseOr<A extends ${name}, B extends ${name}> = ${alias}.BitwiseOr<A, B>;
		export type BitwiseXor<A extends ${name}, B extends ${name}> = ${alias}.BitwiseXor<A, B>;
		export type ShiftLeft<A extends ${name}> = ${alias}.ShiftLeft<A>;
		export type ShiftRight<A extends ${name}> = ${alias}.ShiftRight<A>;
	}`;
}

// Read existing index.ts, replace IntN section
const indexPath = join(SRC_DIR, "index.ts");
const existingIndex = require("node:fs").readFileSync(indexPath, "utf8");

// Build imports for all IntN
const intImports = CONFIGS.map((c) => `import type * as _Int${c.bits} from "./int${c.bits}/index.js";`).join("\n");

// Build namespace blocks for all IntN
const intNamespaces = CONFIGS.map((c) => genNamespaceBlock(c.bits)).join("\n");

// Replace the existing Int8 import and namespace in index.ts
// Remove old _Int8 import and Int8 namespace block, inject all IntN
let newIndex = existingIndex;

// Remove old _Int8 import line
newIndex = newIndex.replace(/import type \* as _Int8 from "\.\/int8\/index\.js";\n/, "");

// Add all IntN imports after the last existing import
const lastImportMatch = newIndex.match(/^(import type .+\n)+/m);
if (lastImportMatch) {
	const lastImport = lastImportMatch[0];
	newIndex = newIndex.replace(lastImport, `${lastImport + intImports}\n`);
}

// Replace the Int8 namespace block with all IntN namespaces
newIndex = newIndex.replace(
	/\t\/\/ --- Int8 \(8-bit Signed Integer\) ---\n\texport namespace Int8 \{[\s\S]*?\n\t\}/,
	intNamespaces.trim(),
);

writeFileSync(indexPath, newIndex);
console.log("Updated src/index.ts with all IntN namespaces");

console.log("Done!");
