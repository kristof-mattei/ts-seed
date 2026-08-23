import type { Static, TNumber, TObject } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import envSchema from "env-schema";

const Config: TObject<{ API_PORT: TNumber }> = Type.Object({
    API_PORT: Type.Number({ default: 5000 }),
});
type Config = Static<typeof Config>;

export const config: Config = envSchema<Config>({ schema: Config });
