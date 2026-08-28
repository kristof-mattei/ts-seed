import { describe, expect, it, vi } from "vitest";

import { getRandomIntInclusive } from "../utils/random";

vi.setConfig({ testTimeout: 1000 });

describe("getRandomIntInclusive", () => {
    it("maps Math.random onto the inclusive range", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.4);

        expect(getRandomIntInclusive(0, 10)).toBe(4);
    });
});
