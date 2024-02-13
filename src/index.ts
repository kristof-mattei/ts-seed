import type { AddressInfo } from "net";

import { createApp } from "@/app";
import { eventLoopChecker } from "@/utils/eventLoopChecker";

eventLoopChecker((cycleTime: number) => {
    console.log(`We waited for ${cycleTime}`);
});

const listener = createApp().listen(process.env["API_PORT"]);

console.log(`Server listening on ${prettyAddress(listener.address())}`);

function prettyAddress(address: AddressInfo | string | null): string {
    if (!address) {
        return "";
    }

    if (typeof address === "string") {
        return address;
    }

    if (address?.family.toLowerCase() === "ipv6") {
        return `[${address.address}]:${address.port}`;
    }

    return `${address.address}:${address.port}`;
}
