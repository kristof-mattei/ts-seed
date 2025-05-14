export function eventLoopChecker(
    stallDetected: (howLong: number) => void,
    interval = 100, // How often to check - 100ms
    threshold = 30, // 30ms
): NodeJS.Timeout {
    let lastNow = performance.now();

    return setInterval(() => {
        const delta = performance.now() - lastNow;
        const cycleTime = delta - interval;

        if (cycleTime > threshold) {
            stallDetected(cycleTime);
        }

        lastNow = performance.now();
    }, interval);
}
