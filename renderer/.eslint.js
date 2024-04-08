module.exports = {
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		// 他のextendsがあればここに追加
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended", // TypeScript用の推奨ルール
	],
	plugins: [
		"svelte3",
		"@typescript-eslint",
		// 他に使用しているプラグインがあればここに追加
	],
	overrides: [
		{
			files: ["*.svelte"],
			processor: "svelte3/svelte3",
		},
	],
	settings: {
		"svelte3/typescript": true, // TypeScriptを使用する場合
		// svelte3/ignore-styles属性に関数を設定してスタイルのLintを無視することも可能
	},
	rules: {
		// ここにプロジェクト固有のルールを設定
	},
};
