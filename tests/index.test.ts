import { describe, expect, it } from "bun:test";

describe("ts-magic", () => {
	it("should be importable", async () => {
		const mod = await import("../src/index");
		expect(mod).toBeDefined();
	});
});
