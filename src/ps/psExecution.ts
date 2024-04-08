import { exec } from "node:child_process";
import * as path from "node:path";

import { lolStore } from "../store/lolStore";

export function executePowershellScript(): Promise<void> {
	return new Promise((resolve, reject) => {
		const scriptPath = path.join(
			process.env.NODE_ENV === "development"
				? __dirname
				: path.join(__dirname, "../"),
			"ps",
			"fetchPortToken.ps1",
		);
		exec(
			`powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}"`,
			(error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					reject(error);
					return;
				}
				if (stderr) {
					console.error(`stderr: ${stderr}`);
				}

				// stdoutからポートとトークンを抽出してstoreにセット
				const portMatch = stdout.match(/App Port: (\d+)/);
				const tokenMatch = stdout.match(/Encoded Auth Info: (.+)/);
				if (portMatch && tokenMatch) {
					lolStore.set("port", portMatch[1]);
					lolStore.set("token", tokenMatch[1]);
					console.log(
						`Port and token have been saved to the store. port:${portMatch[1]}`,
					);
					resolve();
				} else {
					reject(
						new Error(
							"Failed to extract port and token from PowerShell output",
						),
					);
				}
			},
		);
	});
}

export function fetchAndStoreLoLClientInfo() {
	// Windows Management Instrumentation Command-line (WMIC) を使用してLoLクライアントのコマンドライン引数を取得
	const command =
		"WMIC PROCESS WHERE \"Name='LeagueClientUx.exe'\" GET CommandLine";

	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`);
			return;
		}

		// コマンドライン引数からapp portとauth tokenを抽出
		const appPortRegex = /--app-port=(\d+)/;
		const authTokenRegex = /--remoting-auth-token=([a-zA-Z0-9_\-]+)/;

		const appPortMatch = stdout.match(appPortRegex);
		const authTokenMatch = stdout.match(authTokenRegex);

		if (appPortMatch) {
			console.log(`App Port: ${appPortMatch[1]}`);
			lolStore.set("port", appPortMatch[1]);
		}

		if (authTokenMatch) {
			console.log(`Auth Token: ${authTokenMatch[1]}`);
			const authInfo = `riot:${authTokenMatch[1]}`;
			const encodedAuthInfo = Buffer.from(authInfo).toString("base64");
			console.log(`Encoded Auth Info: ${encodedAuthInfo}`);
			lolStore.set("token", encodedAuthInfo);
		} else {
			console.log("Auth Token was not found.");
		}
	});
}
