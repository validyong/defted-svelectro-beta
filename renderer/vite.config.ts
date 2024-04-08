import { purgeCss } from "vite-plugin-tailwind-purgecss";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "node:path";
import { typescript } from "svelte-preprocess";

export default defineConfig({
	plugins: [
		sveltekit(),
		purgeCss({
			safelist: {
				// any selectors that begin with "hljs-" will not be purged
				greedy: [/^hljs-/],
			},
		}),
	],
	resolve: {
		alias: {
			$apis: path.resolve("./src/apis"), // これを追加
			// 他のエイリアスもここに追加する
		},
	},
	server: {
		port: 5174,
	},
});
