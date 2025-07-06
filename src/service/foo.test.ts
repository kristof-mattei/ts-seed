import { performance } from "node:perf_hooks";

import { describe, expect, it } from "vitest";

import { createApp } from "@/app";
import { Foo } from "@/service/foo";

describe("a", () => {
    it("foo is bar", () => {
        expect(Foo()).toBe("Bar");
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
