import { beforeEach, describe, expect, it, vi } from "vitest";

import { eventLoopChecker } from "../utils/event-loop-checker";

vi.setConfig({ testTimeout: 1000 });

describe("eventLoopChecker", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    it("eventLoopChecker has sane defaults", () => {
        const nowSpy = vi.spyOn(performance, "now").mockReturnValue(0);

        let lastStall = 0;

        const eventLoopCheckerReference = eventLoopChecker((stall) => {
            lastStall = stall;
        });

        // now we stall for 100ms
        nowSpy.mockReturnValue(100);

        // tick event loop
        vi.advanceTimersToNextTimer();

        // a stall for 100ms is ok, as it is less than the interval (100) + the threshold (30)
        // since there is no stall, it is 0
        expect(lastStall).toBe(0);

        clearTimeout(eventLoopCheckerReference);
    });

    it("eventLoopChecker defaults triggers over 130", () => {
        const nowSpy = vi.spyOn(performance, "now").mockReturnValue(0);

        let lastStall = 0;

        const eventLoopCheckerReference = eventLoopChecker((stall) => {
            lastStall = stall;
        });

        // now we stall for 100ms
        nowSpy.mockReturnValue(131);

        // tick event loop
        vi.advanceTimersToNextTimer();

        expect(lastStall).toBe(31);

        clearTimeout(eventLoopCheckerReference);
    });

    it("eventLoopChecker with no threshold", () => {
        const nowSpy = vi.spyOn(performance, "now").mockReturnValue(0);

        let lastStall = 0;

        const eventLoopCheckerReference = eventLoopChecker(
            (stall) => {
                lastStall = stall;
            },
            100,
            0,
        );

        // now we stall for 101ms
        nowSpy.mockReturnValue(101);

        // tick event loop
        vi.advanceTimersToNextTimer();

        expect(lastStall).toBe(1);

        clearTimeout(eventLoopCheckerReference);
    });

    it("eventLoopChecker with treshold returns stall over interval without removing treshold", () => {
        const nowSpy = vi.spyOn(performance, "now").mockReturnValue(0);

        let lastStall = 0;

        const eventLoopCheckerReference = eventLoopChecker(
            (stall) => {
                lastStall = stall;
            },
            100,
            30,
        );

        // now we stall for 101ms
        nowSpy.mockReturnValue(150);

        // tick event loop
        vi.advanceTimersToNextTimer();

        expect(lastStall).toBe(50);

        clearTimeout(eventLoopCheckerReference);
    });
});
