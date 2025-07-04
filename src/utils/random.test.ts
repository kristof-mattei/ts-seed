import { expect, test, vi } from "vitest";

import { getRandomIntInclusive } from "./random.ts";

test("getRandomIntInclusive", () => {
    Math.random = vi.fn(() => 0.4);

    expect(getRandomIntInclusive(0, 10)).toBe(4);
});
