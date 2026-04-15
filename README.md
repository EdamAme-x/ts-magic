# ts-magic

Type-level programming in TypeScript. No runtime, just types.

An experiment to push TypeScript's type system to its limits — building integers, arithmetic, strings, arrays, and eventually a Brainfuck interpreter, all at the type level.

## Install

```bash
npm install ts-magic
```

## Usage

Everything lives under the `TSMagic` namespace with sub-namespaces. All operations are pure types — zero runtime cost.

### Nat (Natural Numbers)

```ts
import type { TSMagic } from "ts-magic";

type A = TSMagic.Nat.FromNumber<6>;
type B = TSMagic.Nat.FromNumber<7>;
type R = TSMagic.Nat.Mul<A, B>;
type Answer = TSMagic.Nat.ToNumber<R>;  // 42
```

### Int (Signed Integers)

```ts
import type { TSMagic } from "ts-magic";

type A = TSMagic.Int.FromNumber<-10>;
type B = TSMagic.Int.FromNumber<3>;
type R = TSMagic.Int.Add<A, B>;
type Answer = TSMagic.Int.ToNumber<R>;  // -7
```

### Int8 (8-bit, bitwise)

```ts
import type { TSMagic } from "ts-magic";

type A = TSMagic.Int8.FromNumber<5>;
type B = TSMagic.Int8.FromNumber<3>;
type R = TSMagic.Int8.BitwiseXor<A, B>;
type Answer = TSMagic.Int8.ToNumber<R>;  // 6
```

### Char/ASCII

```ts
import type { TSMagic } from "ts-magic";

type Ch = TSMagic.Char.FromCharCode<65>;     // "A"
type Code = TSMagic.Char.ToCharCode<"A">;    // 65
type Yes = TSMagic.Char.IsAlpha<"x">;        // true
```

### String

```ts
import type { TSMagic } from "ts-magic";

type Parts = TSMagic.Str.Split<"a,b,c", ",">;         // ["a", "b", "c"]
type Joined = TSMagic.Str.Join<["x", "y"], "-">;       // "x-y"
type Len = TSMagic.Str.Length<"hello">;                 // 5
type N = TSMagic.Str.ParseInt<"42">;                    // 42
type R = TSMagic.Str.Replace<"foo bar", "bar", "baz">;  // "foo baz"
```

### Array

```ts
import type { TSMagic } from "ts-magic";

type A = TSMagic.Arr.Reverse<[1, 2, 3]>;       // [3, 2, 1]
type B = TSMagic.Arr.Flat<[1, [2, 3], 4]>;      // [1, 2, 3, 4]
type C = TSMagic.Arr.Unique<[1, 2, 1, 3]>;      // [1, 2, 3]
type D = TSMagic.Arr.Zip<[1, 2], ["a", "b"]>;   // [[1, "a"], [2, "b"]]
```

### Object

```ts
import type { TSMagic } from "ts-magic";

type A = { a: 1; b: 2 };
type B = { b: 3; c: 4 };
type R = TSMagic.Obj.Merge<A, B>;  // { a: 1; b: 3; c: 4 }
type V = TSMagic.Obj.Get<R, "c">;  // 4
```

### HKT (Higher-Kinded Types)

```ts
import type { TSMagic } from "ts-magic";

interface ToStr extends TSMagic.TypeFn {
  output: `${this["input"] & number}`;
}

type R = TSMagic.Arr.Map<[1, 2, 3], ToStr>;  // ["1", "2", "3"]
```

## Modules

| Namespace | Description |
|-----------|-------------|
| `TSMagic.Nat` | Natural numbers (tuple-length based), Add/Sub/Mul/Div/Mod/Pow |
| `TSMagic.Int` | Signed integers (sign + magnitude), full arithmetic |
| `TSMagic.Int8` | 8-bit signed integers (two's complement), bitwise ops |
| `TSMagic.Char` | ASCII table, char classification (IsDigit, IsAlpha, etc.) |
| `TSMagic.Str` | String ops (Split, Join, Replace, Trim, ParseInt, etc.) |
| `TSMagic.Arr` | Array ops (Map, Filter, Reduce, Slice, Zip, Unique, etc.) |
| `TSMagic.Obj` | Object ops (Get, Set, Merge, Pick, MapValues, etc.) |

## Roadmap

- [x] Nat (natural numbers, Mul/Div/Mod/Pow)
- [x] Int (arbitrary signed integers)
- [x] Int8 (8-bit, bitwise operations)
- [x] Char/ASCII (bidirectional table, classification)
- [x] String (Split, Join, Replace, Trim, ParseInt, etc.)
- [x] Array (Map, Filter, Reduce, Zip, Unique, Flat, etc.)
- [x] Object (Get, Set, Merge, Pick, MapValues, etc.)
- [x] HKT (Higher-Kinded Types for Map/Filter/Reduce)
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
