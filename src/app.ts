import { performance } from "perf_hooks";

import Router from "@koa/router";
import Koa from "koa";

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

export function createApp(): Koa {
    const app = new Koa();

    const r = new Router()
        .get("/", (ctx: Koa.Context) => {
            ctx.status = 200;
            ctx.body = {
                message: "Hello World!",
            };
        })
        .get("/health", (ctx: Koa.Context) => {
            ctx.status = 200;
            ctx.body = {
                status: "ok",
            };
        })
        .get("/f/:param", (ctx: Koa.Context) => {
            ctx.status = 200;
            ctx.body = {
                status: "ok",
            };
        })
        .get("/f/:param/blah", (ctx: Koa.Context) => {
            ctx.status = 200;
            ctx.body = {
                status: "ok",
            };
        });

    app.use(r.routes());

    return app;
}
