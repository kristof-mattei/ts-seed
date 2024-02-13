import { performance } from "perf_hooks";

export function eventLoopChecker(
    stallDetected: (howLong: number) => void,
    interval = 100, // How often to check - 100ms
    threshold = 30, // 30ms
): void {
    let start = performance.now();
    setInterval(() => {
        const delta = performance.now() - start;
        const cycleTime = delta - interval;
        if (cycleTime > threshold) {
            stallDetected(cycleTime);
        }
        start = performance.now();
    }, interval).unref();
}
