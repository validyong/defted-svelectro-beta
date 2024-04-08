// preload.ts

// From Electron 20 onwards, preload scripts are sandboxed by default
// and no longer have access to a full Node.js environment. Practically,
// this means that you have a polyfilled require function that only
// has access to a limited set of APIs.
// Read more: https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
console.log("preload.ts is loaded");

import { contextBridge, ipcRenderer, shell } from "electron";
import type { ProtocolData } from "./types/types";
import type { Guild } from "@svelectro/types";

interface RefreshLoLAuthResponse {
	success: boolean;
	port?: string;
	token?: string;
	error?: string;
}

type RefreshLoLAuthCallback = (response: RefreshLoLAuthResponse) => void;

// expose some IPC channels to the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
	requestProcessVersions: async () => {
		return await ipcRenderer.invoke("renderer:requestProcessVersions");
	},
	openExternal: async (url: string) =>
		await ipcRenderer.invoke("open-external", url),
	refreshLoLAuth: async () => {
		return await ipcRenderer.invoke("refresh-lol-auth");
	},
	getIsPackaged: () => {
		return ipcRenderer.invoke("get-app-isPackaged");
	},
	onRefreshLoLAuthResponse: (callback: RefreshLoLAuthCallback) => {
		ipcRenderer.on("refresh-lol-auth-response", (event, response) =>
			callback(response),
		);
	},
	getCookies: async (url: string) => {
		return await ipcRenderer.invoke("get-cookies", url);
	},
	getAuthData: async () => await ipcRenderer.invoke("get-auth-data"),
	onProtocolData: (callback: (data: ProtocolData) => void) =>
		ipcRenderer.on("protocol-data", (event, data) => callback(data)),
	getCustomProtocolData: async () => {
		const t = await ipcRenderer.invoke("get-custom-protocol-data");
		console.log("cus pro dat", JSON.stringify(t));
		return await ipcRenderer.invoke("get-custom-protocol-data");
	},
	getTest: () => {
		"test";
	},

	syncLolMatchHistory: async (guildId: string) =>
		await ipcRenderer.invoke("sync-lol-match-history"),
	requestLolMatchHistory: async () =>
		await ipcRenderer.invoke("request-lol-match-history"),

	requestLolGame: async (gameId: string) =>
		await ipcRenderer.invoke("request-game"),

	setGuild: (guild: Guild) => ipcRenderer.invoke("set-guild", guild),
	fetchGuild: () => ipcRenderer.invoke("get-guild"),
});
console.log("electronAPI is exposed");

// we can also expose variables, not just functions
contextBridge.exposeInMainWorld("versions", {
	chrome: () => process.versions.chrome,
});
