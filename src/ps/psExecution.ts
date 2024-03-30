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
