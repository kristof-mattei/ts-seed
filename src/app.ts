import Router from "@koa/router";
import Koa from "koa";

import { contents } from "@/resources/solarSystem.json";
import { getRandomIntInclusive } from "@/utils/random";

export function createApp(): Koa {
    const app = new Koa();

    const r = new Router()
        .get("/", (ctx: Koa.Context) => {
            ctx.status = 200;

            const world = contents[getRandomIntInclusive(0, contents.length)];
            ctx.body = {
                message: `Hello ${world}!`,
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
