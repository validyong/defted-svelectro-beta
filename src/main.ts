import { app, BrowserWindow, ipcMain, protocol, session } from "electron";
import * as path from "node:path";
import serve = require("electron-serve");
import { setupIpcHandlers } from "./ipcHandlers";
import * as dotenv from "dotenv";
import installExtension from "electron-devtools-installer";
import { generalStore } from "./store/generalStore";
import { setAuthCookieAndCallApi } from "./api/deftedApi";
// const serveURL = serve({ directory: "." });
const isDev: boolean = !app.isPackaged;
const port: string = process.env.PORT ? process.env.PORT.toString() : "5174";

console.log(`Current working directory: ${process.cwd()}`);

import { Account } from "@svelectro/types";

// console.log("__dirname::: ", __dirname);
// require("electron-reload")(__dirname, {
// 	electron: path.join(
// 		__dirname,
// 		`../node_modules/.bin/electron${
// 			process.platform === "win32" ? ".cmd" : ""
// 		}`,
// 	),
// 	forceHardReset: true,
// 	hardResetMethod: "exit",
// });

// if (isDev) {
// 	require("electron-reload")(__dirname, {
// 		electron: path.join(__dirname, "../node_modules/.bin/electron"),
// 	});
// }

// if (isDev) {
// 	require("electron-reload")(__dirname, {
// 		electron: path.join(
// 			__dirname,
// 			`../node_modules/.bin/electron${
// 				process.platform === "win32" ? ".cmd" : ""
// 			}`,
// 		),
// 	});
// }

dotenv.config();

if (process.env.ELECTRON_ENABLE_LOGGING) {
	console.log("Electron logging is enabled.");
}

const serveURL = serve({
	directory: path.join(__dirname, "../renderer/build"),
});

let mainWindow: BrowserWindow | null;

console.log("Electron start");
console.log(
	"Electron path:",
	path.join(
		__dirname,
		"..",
		"node_modules",
		".bin",
		`electron${process.platform === "win32" ? ".cmd" : ""}`,
	),
);

// Create the main browser window
async function createMainWindow() {
	console.log("isDev: ", isDev);
	const preloadPath = isDev
		? path.join(__dirname, "../dist/preload.js") // 開発環境のパス
		: path.join(__dirname, "preload.js");

	console.log("preload path is: ", preloadPath);

	mainWindow = new BrowserWindow({
		height: 768,
		webPreferences: {
			preload: preloadPath,
			devTools: isDev, // 開発環境ではtrue, 製品環境ではfalse
			nodeIntegration: true,
			contextIsolation: true,
			sandbox: true,
			webSecurity: !isDev,
		},
		width: 1024,
		icon: path.join(__dirname, "./icon/gino.ico"),
	});

	console.log("isDev", isDev);

	// renderer
	if (isDev) {
		// vite dev

		mainWindow.webContents.session.webRequest.onHeadersReceived(
			(details, callback) => {
				callback({
					responseHeaders: {
						...details.responseHeaders,
						"Content-Security-Policy": [
							"default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*;",
						],
					},
				});
			},
		);

		// await loadExtension();

		mainWindow.loadURL(`http://localhost:${port}`);
		mainWindow.webContents.openDevTools();
	} else {
		// 製品環境：ビルドされたSvelteKitアプリケーション
		serveURL(mainWindow); // この関数呼び出しで製品環境のアプリをロード
	}

	// カスタムプロトコルによるリダイレクトを捕捉する
	mainWindow.webContents.on("will-navigate", (event, url) => {
		console.log(`Navigating to: ${url}`);
		const urlFirst = isDev ? "deftedsv://callback-dev" : "deftedsv://callback";

		if (url.startsWith(urlFirst)) {
			console.log("nav, dev");
			event.preventDefault(); // デフォルトのナビゲーションをキャンセル
			// URLから必要なデータを抽出
			// 例: 認証情報の処理
			// 必要に応じて、SvelteKitアプリ内でのルーティングや状態更新を行う
		}
	});

	return mainWindow;
}

// Load Vite to launch Svelte
function loadVite(port: string) {
	const url = `http://localhost:${port}`;
	const tryLoad = (attemptsLeft: number) => {
		mainWindow.loadURL(url).catch((e) => {
			console.log("Error loading URL, retrying", e);
			if (attemptsLeft > 0) {
				setTimeout(() => tryLoad(attemptsLeft - 1), 1000); // 1秒間隔でリトライ
			}
		});
	};

	tryLoad(10); // 最大10回までリトライ
}
async function launchMainWindow() {
	console.log("launchMainWindow");
	try {
		mainWindow = await createMainWindow();
	} catch (error) {
		console.error("Failed to create main window:", error);
	}

	const customProtocolUrl = process.argv.find((arg) =>
		arg.startsWith("deftedsv://"),
	);
	if (customProtocolUrl) {
		// URLから必要な情報を抽出し、処理
	}
	mainWindow.once("close", () => {
		mainWindow = null;
	});

	if (isDev) loadVite(port);
	else serveURL(mainWindow);
}

async function sendProcessVersionsToRender() {
	const processVersions: ProcessVersions = process.versions;
	console.log("sending processVersions to IPC to pass on to renderer");
	return processVersions;
	// mainWindow.webContents.send('system:sendProcessVersions', processVersions);
}

protocol.registerSchemesAsPrivileged([
	{ scheme: "deftedsv", privileges: { secure: true, standard: true } },
]);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
	// カスタムプロトコルURLの処理
	const customProtocolUrl = process.argv.find((arg) =>
		arg.startsWith("deftedsv://"),
	);
	if (customProtocolUrl) {
		console.log("custom protocol", customProtocolUrl);
		const url = new URL(customProtocolUrl);
		// URLのパスやクエリパラメータから情報を取得
		const action = url.pathname; // "/callback-dev" などのパス
		const params = new URLSearchParams(url.search); // クエリパラメータ

		// 必要に応じて情報を処理
		console.log(`Action: ${action}, Params: ${params}`);
		// URLから必要な情報を抽出し、適切に処理します。
	}

	setupIpcHandlers();
	launchMainWindow();

	app.on("activate", () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) launchMainWindow();
	});

	app.on("open-url", (event, url) => {
		console.log("open-url");
		event.preventDefault();
		console.log(`Opened via protocol: ${url}`);
		// ここでURLを解析し、必要なアクションを実行します。
		// 例: mainWindow.webContents.send('protocol-action', data);
	});

	console.log("udi");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("ready", () => {
	console.log("app.on ready");

	console.log("process.execPath", process.execPath);
	console.log("path.resolve(process.argv[1]", path.resolve(process.argv[1]));
	if (isDev) {
		app.setAsDefaultProtocolClient("deftedsv", process.execPath, [
			path.resolve(process.argv[1]),
		]);
		// app.setAsDefaultProtocolClient("deftedsv");
	} else {
		app.setAsDefaultProtocolClient("deftedsv");
		// app.setAsDefaultProtocolClient("deftedsv", process.execPath, ["--"]);
	}

	// カスタムプロトコルURLの処理
	const customProtocolUrl = process.argv.find((arg) =>
		arg.startsWith("deftedsv://"),
	);

	console.log("custome p: ", process.argv);
	if (customProtocolUrl) {
		console.log("custom protocol", customProtocolUrl);
		// URLから必要な情報を抽出し、適切に処理します。
	}
});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", (event, commandLine) => {
		// WindowsでカスタムプロトコルのURLが渡される
		console.log("second instance");

		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();

			console.log("mainwindow focus");
		}
		const url = commandLine.find((arg) => arg.startsWith("deftedsv://"));
		if (url) {
			console.log("handle custom protocol");

			handleCustomProtocol(url);
		}
	});

	// アプリケーションが最初に起動したとき
	const primaryInstanceUrl = process.argv.find((arg) =>
		arg.startsWith("deftedsv://"),
	);
	if (primaryInstanceUrl) {
		handleCustomProtocol(primaryInstanceUrl);
	}
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.once("ready", () => {
	console.log("Electron is ready.");
	ipcMain.handle("renderer:requestProcessVersions", (event) => {
		console.log("Renderer is asking for process versions");
		const versionsToSend = sendProcessVersionsToRender();
		return versionsToSend;
	});
});

async function handleCustomProtocol(url: string) {
	// URLから情報を抽出して処理
	console.log("handlecus");
	console.log("uraru", url);
	const parsedUrl = new URL(url);
	const jwtToken = parsedUrl.searchParams.get("jwtToken");
	const tokenExpiresAt = parsedUrl.searchParams.get("tokenExpiresAt");
	const signinType = parsedUrl.searchParams.get("signinType");
	generalStore.set("jwtToken", jwtToken);
	generalStore.set("tokenExpiresAt", tokenExpiresAt);
	generalStore.set("signinType", signinType);

	const authInfo = await setAuthCookieAndCallApi(jwtToken);

	console.log("authinfo:", authInfo);
	generalStore.set("refreshToken", authInfo.refreshToken);

	console.log("store jwtt", generalStore.get("jwtToken"));

	if (mainWindow) {
		console.log("send protcoldata: j", jwtToken, signinType);
		mainWindow.webContents.send("protocol-data", { jwtToken, signinType });
	}
}

async function loadExtension() {
	const SVELTE_DEVTOOLS_ID = process.env.SVELTE_DEVTOOLS_ID;

	try {
		const name = await installExtension(SVELTE_DEVTOOLS_ID);
		console.log(`Added Extension:  ${name}`);
	} catch (err) {
		console.log("An error occurred: ", err);
	}

	// const devtoolPath = path.resolve(__dirname, "../Svelte-Devtools");

	// try {
	// 	await session.defaultSession.loadExtension(devtoolPath);
	// 	console.log("Svelte DevTools extension has been loaded");
	// } catch (err) {
	// 	console.error("Failed to load Svelte DevTools extension:", err);
	// }
}
