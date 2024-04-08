// import adapter from '@sveltejs/adapter-auto';
import adapter from "@sveltejs/adapter-static";
// import { vitePreprocess } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
// import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess";
import path from "node:path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte"],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	vitePlugin: {
		inspector: true,
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// 静的サイトジェネレータのオプション
			fallback: "index.html", // SPA用のフォールバックページを指定
			pages: "build", // ビルドされたページの出力先
			assets: "build", // 静的アセットの出力先
		}),
		alias: {
			$api: "src/api",
			$store: "src/store",
			$types: "src/types",
			$lib: "src/lib",
		},
		paths: {
			base: "",
			assets: "",
		},
	},
};
export default config;
