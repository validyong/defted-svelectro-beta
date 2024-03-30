// preload.ts

// From Electron 20 onwards, preload scripts are sandboxed by default
// and no longer have access to a full Node.js environment. Practically,
// this means that you have a polyfilled require function that only
// has access to a limited set of APIs.
// Read more: https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
console.log("preload.ts is loaded");

import { contextBridge, ipcRenderer } from "electron";

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
	refreshLoLAuth: async () => {
		console.log("refreshLoLAuth is called");
		return await ipcRenderer.invoke("refresh-lol-auth");
	},
	onRefreshLoLAuthResponse: (callback: RefreshLoLAuthCallback) => {
		ipcRenderer.on("refresh-lol-auth-response", (event, response) =>
			callback(response),
		);
	},
});
console.log("electronAPI is exposed");

// we can also expose variables, not just functions
contextBridge.exposeInMainWorld("versions", {
	chrome: () => process.versions.chrome,
});
