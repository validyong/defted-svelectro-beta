// src/ipcHandlers.ts
import { app, ipcMain, session, shell } from "electron";
import {
	executePowershellScript,
	fetchAndStoreLoLClientInfo,
} from "./ps/psExecution";
import { lolStore } from "./store/lolStore";
import { generalStore } from "./store/generalStore";
import { setupLcuHandlers } from "./handlers/lcuHandlers";

// LoLクライアントの認証情報を更新するハンドラー
function setupRefreshLoLAuthHandler() {
	ipcMain.handle("refresh-lol-auth", async () => {
		try {
			// await executePowershellScript();
			await fetchAndStoreLoLClientInfo();
			// 成功した場合は、storeから最新の値を取得して返す
			const port = lolStore.get("port");
			const token = lolStore.get("token");
			return { success: true, port, token };
		} catch (error) {
			console.error(`Error in refresh-lol-auth: ${error}`);
			return { success: false, error: error.message };
		}
	});
}

function setupGetCookiesHandler() {
	ipcMain.handle("get-auth-data", async (event) => {
		const jwtToken = generalStore.get("jwtToken");
		const tokenExpiresAt = generalStore.get("tokenExpiresAt");
		const signinType = generalStore.get("signinType");
		const refreshToken = generalStore.get("refreshToken");
		return { jwtToken, tokenExpiresAt, signinType, refreshToken };
	});

	ipcMain.handle("get-cookies", async (event, url: string) => {
		try {
			const cookies = await session.defaultSession.cookies.get({ url });
			return cookies; // 成功した場合は、取得したCookieを返送
		} catch (error) {
			console.error(`Error in get-cookies: ${error}`);
			throw error; // エラーをレンダラープロセスに伝播させる
		}
	});
}

function setupIsPackaged() {
	ipcMain.handle("get-app-isPackaged", (event) => {
		return app.isPackaged;
	});
}

function setupOpenExternal() {
	ipcMain.handle("open-external", async (event, url: string) => {
		try {
			await shell.openExternal(url);
			return { success: true }; // 成功時には成功を示す応答を返すこともできます。
		} catch (error) {
			console.error("Failed to open URL:", error);
			return { success: false, error: error.message }; // 失敗時にはエラー情報を含む応答を返すこともできます。
		}
	});
}

function setupCustomprotoclData() {
	ipcMain.handle("get-custom-protocol-data", async (event) => {
		// ここでカスタムURLスキームからのデータを取得し、レンダラーに送信する処理を実装
		// 例えば、起動時のコマンドライン引数からカスタムURLの情報を取得
		const url = process.argv.find((arg) => arg.startsWith("deftedsv://"));
		if (url) {
			// URLを解析して必要なデータを抽出
			const parsedUrl = new URL(url);
			const jwtToken = parsedUrl.searchParams.get("jwtToken");
			const signinType = parsedUrl.searchParams.get("signinType");
			return { jwtToken, signinType };
		}
		return {}; // カスタムURLスキームからのデータがない場合は空オブジェクトを返す
	});
}

export function setupIpcHandlers() {
	setupRefreshLoLAuthHandler();
	setupGetCookiesHandler();
	setupIsPackaged();
	setupOpenExternal();
	setupCustomprotoclData();
	setupLcuHandlers();
}
