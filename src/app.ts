import type { Express } from "express";
import express from "express";

import solarSystem from "./resources/solarSystem.json" with { type: "json" };

import { getRandomIntInclusive } from "./utils/random.ts";

export function createApp(): Express {
    const app = express();

    app.get("/", (_request, response) => {
        const world = solarSystem.contents[getRandomIntInclusive(0, solarSystem.contents.length)];

        response.status(200).send({
            message: `Hello ${world}!`,
        });
    });

    app.get("/health", (_request, response) => {
        response.status(200).send({
            status: "ok",
        });
    });

    app.get("/f/:param", (request, response) => {
        response.status(200).send({
            status: "ok",
            param_escaped: JSON.stringify(request.params.param),
        });
    });

    app.get("/f/:param1/blah/:param2", (request, response) => {
        response.status(200).send({
            status: "ok",
            param1_escaped: JSON.stringify(request.params.param1),
            param2_escaped: JSON.stringify(request.params.param2),
        });
    });

    return app;
}
