import { performance } from "perf_hooks";

import { Foo } from "../service/foo";

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
