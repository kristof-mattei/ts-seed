FROM node:26.5.1-alpine3.24@sha256:233761595746769ebfdb6090f44fc7cdf818ae0ce62d2b37e0367723b9823e36 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm uninstall --global corepack && npm install --global corepack

WORKDIR /app
COPY package.json pnpm-lock.yaml vite.config.ts tsconfig.json ./

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
