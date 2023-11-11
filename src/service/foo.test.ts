import { performance } from "perf_hooks";

import { Foo } from "service/foo";

import { createApp } from "app";

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
        expect(true).not.toEqual(true);
    });
});

describe("d", () => {
    it("koa", () => {
        expect(createApp()).not.toEqual(null);
    });
});
