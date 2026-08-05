import { expect, test, vi } from "vitest";

import { getRandomIntInclusive } from "../utils/random";

test("getRandomIntInclusive", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.4);

    expect(getRandomIntInclusive(0, 10)).toBe(4);
});
