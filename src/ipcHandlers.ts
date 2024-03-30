// src/ipcHandlers.ts
import { ipcMain } from "electron";
import { executePowershellScript } from "./ps/psExecution";
import { lolStore } from "./store/lolStore";

// LoLクライアントの認証情報を更新するハンドラー
function setupRefreshLoLAuthHandler() {
	ipcMain.handle("refresh-lol-auth", async () => {
		try {
			await executePowershellScript();
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

// 他のIPCハンドラーもここに追加する

export function setupIpcHandlers() {
	setupRefreshLoLAuthHandler();
	// 他のハンドラーのセットアップ関数をここで呼び出す
}
