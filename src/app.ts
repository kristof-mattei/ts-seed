import Router from "@koa/router";
import Koa from "koa";

// NodeJS only supports a default import when importing from JSON
// so import { contents } from ... does not work
import solarSystem from "@/resources/solarSystem.json" with { type: "json" };
import { getRandomIntInclusive } from "@/utils/random";

export function createApp(): Koa {
    const app = new Koa();

    const r = new Router()
        .get("/", (ctx: Koa.Context) => {
            ctx.status = 200;

            const world =
                solarSystem.contents[
                    getRandomIntInclusive(0, solarSystem.contents.length)
                ];
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
