FROM node:24.11.0-alpine3.22@sha256:d2062677e6d878d3943bd6dd7e9790e22133d69bec957e43b0ab9f350d195968 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml vite.config.ts tsconfig.json ./

RUN npm pkg delete scripts.prepare
# install the corepack our package requires
RUN corepack install

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY ./src ./src
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE 5000

CMD [ "pnpm", "start" ]
