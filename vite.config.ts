import nodePath from "node:path";

import { codecovVitePlugin } from "@codecov/vite-plugin";
import type { UserConfig } from "vite";
import { loadEnv } from "vite";
import { checker } from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

import package_ from "./package.json";

export default defineConfig(({ mode }) => {
    const environment = loadEnv(mode, process.cwd());

    const config: UserConfig = {
        appType: "custom",
        build: {
            lib: {
                entry: nodePath.resolve("src/index.ts"),
                name: "ts-seed",
                fileName: (_format, entryName) => `${entryName}.js`,
                formats: ["es"],
            },
            minify: false,
            target: "esnext",
            emptyOutDir: true,
            sourcemap: true,
            rollupOptions: {
                external: Object.keys(package_.dependencies),
                output: {
                    preserveModules: true,
                },
            },
        },
        resolve: {
            alias: {
                "@/": nodePath.resolve("src/"),
            },
        },
        plugins: [
            viteTsConfigPaths(),
            dts(),
            checker({ typescript: true }),
            codecovVitePlugin({
                enableBundleAnalysis: environment["CODECOV_TOKEN"] !== undefined,
                bundleName: "ts-seed",
                uploadToken: environment["CODECOV_TOKEN"] ?? "",
            }),
        ],
        optimizeDeps: {
            noDiscovery: true,
        },
        test: {
            coverage: {
                exclude: [...coverageConfigDefaults.exclude, "./dependency-cruiser.config.mjs"],
                reporter: ["json", "html", "text"],
                provider: "v8",
                reportsDirectory: "coverage",
            },
            environment: "node",
            environmentOptions: {
                // node: {},
            },
            globals: false,
            outputFile: {
                junit: "./reports/test-report.xml",
            },
            restoreMocks: true,
            setupFiles: ["./test.setup.ts"],
        },
    };

    return config;
});
