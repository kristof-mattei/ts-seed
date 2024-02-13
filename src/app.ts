import Router from "@koa/router";
import Koa from "koa";

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
