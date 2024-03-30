import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "node:path";
import serve = require("electron-serve");
import { setupIpcHandlers } from "./ipcHandlers";
import * as dotenv from "dotenv";
// const serveURL = serve({ directory: "." });
const isDev: boolean = !app.isPackaged;
const port: string = process.env.PORT ? process.env.PORT.toString() : "5173";

dotenv.config();

if (process.env.ELECTRON_ENABLE_LOGGING) {
	console.log("Electron logging is enabled.");
}

const serveURL = serve({
	directory: path.join(__dirname, "../renderer/build"),
});

let mainWindow: BrowserWindow | null;

console.log("Electron start");

// Create the main browser window
function createMainWindow() {
	console.log("isDev: ", isDev);
	const preloadPath = isDev
		? path.join(__dirname, "../dist/preload.js") // 開発環境のパス
		: path.join(__dirname, "preload.js");

	console.log("preload path is: ", preloadPath);

	const mainWindow = new BrowserWindow({
		height: 600,
		webPreferences: {
			preload: preloadPath,
			devTools: isDev, // 開発環境ではtrue, 製品環境ではfalse
			nodeIntegration: true,
			contextIsolation: true,
			sandbox: true,
		},
		width: 800,
		icon: path.join(__dirname, "../icon/gino.ico"),
	});

	// 開発環境と製品環境で読み込むURLを分けます
	if (isDev) {
		// 開発環境：Viteの開発サーバー
		mainWindow.webContents.openDevTools();
		mainWindow.loadURL(`http://localhost:${port}`);
	} else {
		// 製品環境：ビルドされたSvelteKitアプリケーション
		serveURL(mainWindow); // この関数呼び出しで製品環境のアプリをロード
	}

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
function launchMainWindow() {
	console.log("launchMainWindow");
	mainWindow = createMainWindow();
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	setupIpcHandlers();
	launchMainWindow();

	app.on("activate", () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) launchMainWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

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
