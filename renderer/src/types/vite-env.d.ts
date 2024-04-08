/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_LOCAL_API_BASE_URL: string;
	readonly VITE_DEV_API_BASE_URL: string;
	readonly VITE_PORT: string;
	// 他の環境変数もここに追加
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
