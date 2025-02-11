import { resolve } from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		passWithNoTests: true,
		coverage: {
			include: ["{src,tests}/**/*"],
		},
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	plugins: [tsconfigPaths()],
});
