import type { Server } from "node:http";
import type { AddressInfo } from "node:net";

import { createApp } from "./app.ts";
import { eventLoopChecker } from "./utils/event-loop-checker.ts";

eventLoopChecker((cycleTime: number) => {
    console.log(`We waited for ${cycleTime}`);
});

function main(): Server {
    const listener = createApp().listen(process.env["API_PORT"] ?? 5000);

    const address = listener.address();

    if (address === null) {
        throw new Error("No address, not listening.");
    }

    console.log(`Server listening on ${prettyAddress(address)}`);

    return listener;
}

function prettyAddress(addressInfo: AddressInfo | string): string {
    if (typeof addressInfo === "string") {
        console.warn("Listening on a pipe");
        return addressInfo;
    }

    let address = addressInfo.address;

    if (addressInfo.family.toLowerCase() === "ipv6") {
        address = `[${addressInfo.address}]`;

        // this means we've bound to ALL interfaces, so we change it to localhost
        if (address === "[::]") {
            address = "localhost";
        }
    }

    return `http://${address}:${addressInfo.port}`;
}

const server = main();

if (import.meta.hot !== undefined) {
    type Close = () => ReturnType<ReturnType<typeof main>["close"]>;
    const close: Close = () => server.close();

    import.meta.hot.accept(close);
    import.meta.hot.dispose(close);
}
