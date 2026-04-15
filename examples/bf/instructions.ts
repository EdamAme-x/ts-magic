export type Incr = { readonly op: "+" };
export type Decr = { readonly op: "-" };
export type Right = { readonly op: ">" };
export type Left = { readonly op: "<" };
export type InOp = { readonly op: "," };
export type OutOp = { readonly op: "." };
export type LoopStart<Target extends number = number> = { readonly op: "["; readonly target: Target };
export type LoopEnd<Target extends number = number> = { readonly op: "]"; readonly target: Target };

export type BFInstruction = Incr | Decr | Right | Left | InOp | OutOp | LoopStart | LoopEnd;

export type BFChar = "+" | "-" | ">" | "<" | "," | "." | "[" | "]";
