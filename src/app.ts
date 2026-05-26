import type { Static, TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import type {
    FastifyBaseLogger,
    FastifyInstance,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
} from "fastify";
import Fastify from "fastify";

import { contents } from "./resources/solarSystem.json" with { type: "json" };

import { getRandomIntInclusive } from "./utils/random";

export type App = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    TypeBoxTypeProvider
>;

export function createApp(): App {
    const app = Fastify().withTypeProvider<TypeBoxTypeProvider>();

    const Root = Type.Object({
        message: Type.String(),
    });
    type Root = Static<typeof Root>;

    app.get(
        "/",
        {
            schema: {
                response: {
                    200: Root,
                },
            },
        },
        (_request, _reply): Root => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we only get an index inside of `contents.length`.
            const world = contents[getRandomIntInclusive(0, contents.length - 1)]!;

            return { message: `Hello ${world}!` };
        },
    );

    app.get("/fail", (_request, _reply) => {
        // to inspect stacktrace
        throw new Error("OMG WTF BBQ");
    });

    const Health = Type.Object({
        status: Type.Literal("ok"),
    });
    type Health = Static<typeof Health>;

    app.get(
        "/health",
        {
            schema: {
                response: {
                    200: Health,
                },
            },
        },
        (_request, _reply): Health => {
            return { status: "ok" };
        },
    );

    const FParameter = Type.Object({
        status: Type.Literal("ok"),
        param_escaped: Type.String(),
    });
    type FParameter = Static<typeof FParameter>;

    app.get(
        "/f/:param",
        {
            schema: {
                params: Type.Object({ param: Type.String() }),
                response: {
                    200: FParameter,
                },
            },
        },
        (request, _reply): FParameter => {
            return {
                status: "ok",
                param_escaped: JSON.stringify(request.params.param),
            };
        },
    );

    const FParameterBlahParameter = Type.Object({
        status: Type.Literal("ok"),
        param1_escaped: Type.String(),
        param2_escaped: Type.String(),
    });
    type FParameterBlahParameter = Static<typeof FParameterBlahParameter>;

    app.get(
        "/f/:param1/blah/:param2",
        {
            schema: {
                params: Type.Object({
                    param1: Type.String(),
                    param2: Type.String(),
                }),
                response: {
                    200: FParameterBlahParameter,
                },
            },
        },
        (request, _reply): FParameterBlahParameter => {
            return {
                status: "ok",
                param1_escaped: JSON.stringify(request.params.param1),
                param2_escaped: JSON.stringify(request.params.param2),
            };
        },
    );

    return app;
}
