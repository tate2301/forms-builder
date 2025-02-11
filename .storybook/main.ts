import path from "node:path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-webpack5-compiler-swc",
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {
			builder: {
				useSWC: true,
			},
		},
	},
	webpackFinal: async (config) => {
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				"@": path.resolve(__dirname, "../src"),
			};
		}

		if (!config.module) {
			config.module = { rules: [] };
		}
		if (!config.module.rules) {
			config.module.rules = [];
		}

		// Remove existing CSS rules
		config.module.rules = config.module.rules
			.filter((rule): rule is { test: RegExp } => {
				return typeof rule === "object" && rule !== null && "test" in rule;
			})
			.filter((rule) => rule.test.toString() !== "/\\.css$/");

		// Add our custom CSS rule
		config.module.rules.push({
			test: /\.css$/,
			use: [
				"style-loader",
				{
					loader: "css-loader",
					options: {
						importLoaders: 1,
					},
				},
				{
					loader: "postcss-loader",
					options: {
						postcssOptions: {
							plugins: {
								"@tailwindcss/postcss": {},
								autoprefixer: {},
							},
						},
					},
				},
			],
		});

		return config;
	},
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: "automatic",
				},
			},
		},
	}),
	docs: {
		autodocs: "tag",
	},
};

export default config;
