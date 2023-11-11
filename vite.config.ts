import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    test: {
        globals: true,
        environment: "node",
        environmentOptions: {},
        setupFiles: ["./test.setup.ts"],
        coverage: {
            reportsDirectory: "coverage",
        },
    },
});
