# ts-magic

Type-level programming in TypeScript. No runtime, just types.

An experiment to push TypeScript's type system to its limits — building integers, arithmetic, bitwise operations, and eventually a Brainfuck interpreter, all at the type level.

## Install

```bash
npm install ts-magic
```

## Usage

Everything lives under the `TSMagic` namespace. All operations are pure types — zero runtime cost.

### Int8 Arithmetic

```ts
import type { TSMagic } from "ts-magic";

// Create Int8 from number literals
type Three = TSMagic.FromNumber<3>;
type Five = TSMagic.FromNumber<5>;

// Arithmetic
type Eight = TSMagic.Add<Three, Five>;       // TSMagic.Int8 representing 8
type Two = TSMagic.Sub<Five, Three>;         // TSMagic.Int8 representing 2
type NegFive = TSMagic.Negate<Five>;         // TSMagic.Int8 representing -5
type Six = TSMagic.Inc<Five>;               // TSMagic.Int8 representing 6
type Four = TSMagic.Dec<Five>;              // TSMagic.Int8 representing 4

// Convert back to number literal
type Result = TSMagic.ToNumber<Eight>;       // 8

// Comparison
type Yes = TSMagic.LessThan<Three, Five>;    // true
type No = TSMagic.Equal<Three, Five>;        // false
```

### Bitwise Operations

```ts
import type { TSMagic } from "ts-magic";

type A = TSMagic.FromNumber<5>;  // 00000101
type B = TSMagic.FromNumber<3>;  // 00000011

type Xor = TSMagic.BitwiseXor<A, B>;          // 00000110
type Result = TSMagic.ToNumber<Xor>;           // 6

type Shifted = TSMagic.ShiftLeft<A>;           // 00001010
type ShiftResult = TSMagic.ToNumber<Shifted>;  // 10
```

### Boolean & Utility Types

```ts
import type { TSMagic } from "ts-magic";

type T = TSMagic.And<true, false>;           // false
type U = TSMagic.Or<true, false>;            // true
type V = TSMagic.Not<true>;                  // false
type W = TSMagic.If<true, "yes", "no">;      // "yes"
```

## Roadmap

- [x] Int8 (8-bit signed integer)
- [x] Arithmetic (Add, Sub, Negate, Inc, Dec, Abs)
- [x] Bitwise operations (AND, OR, XOR, NOT, Shift)
- [x] Comparison (Equal, LessThan, GreaterThan, etc.)
- [x] Number conversion (FromNumber, ToNumber)
- [ ] Mul, Div, Mod
- [ ] String manipulation
- [ ] Brainfuck interpreter

## Development

```bash
bun install
bun run test       # Type check (tsc --noEmit)
bun run lint       # Biome lint
bun run build      # Build ESM/CJS/types
```

## License

MIT
