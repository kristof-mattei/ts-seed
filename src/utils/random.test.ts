import { expect, test, vi } from "vitest";

import { getRandomIntInclusive } from "@/utils/random.ts";

test("getRandomIntInclusive", () => {
    Math.random = vi.fn(() => {
        return 0.4;
    });

    expect(getRandomIntInclusive(0, 10)).toBe(4);
});
