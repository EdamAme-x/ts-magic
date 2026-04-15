export interface TypeFn {
	readonly input: unknown;
	readonly output: unknown;
}

export type Apply<F extends TypeFn, T> = (F & { readonly input: T })["output"];
