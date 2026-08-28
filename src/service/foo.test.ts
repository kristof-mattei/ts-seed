import { performance } from "node:perf_hooks";

import { describe, expect, it, vi } from "vitest";

import { createApp } from "../app";
import { foo } from "../service/foo";

vi.setConfig({ testTimeout: 1000 });

describe("a", () => {
    it("foo is bar", () => {
        expect(foo()).toBe("Bar");
    });
});

describe("b", () => {
    it("external import works", () => {
        expect(performance.now()).not.toBeNull();
    });
});

describe("c", () => {
    it("world is ok", () => {
        expect(true).not.toEqual(false);
    });
});

describe("d", () => {
    it("koa", () => {
        expect(createApp()).not.toEqual(null);
    });
});

describe("e", () => {
    it("mars is ok", () => {
        expect(true).not.toEqual(false);
    });
});
