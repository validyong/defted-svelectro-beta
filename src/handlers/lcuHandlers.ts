import axios from "axios";
import { app, ipcMain, session, shell } from "electron";
import * as https from "node:https";

import { lolStore } from "../store/lolStore";
import { generalStore } from "../store/generalStore";
import { fetchGame, fetchLolMatches } from "$/api/lcu/matchHistory";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const baseURL = "https://127.0.0.1:";

async function setupMatchHistory() {
	ipcMain.handle("sync-lol-match-history", async (event, args) => {
		try {
			const matchHistory = await fetchLolMatches();
			const games = matchHistory.games.games; // 仮定のレスポンス形式

			// const pGame: Game = {}
			// pGame.participan
			// 処理済みの試合数を追跡
			let processedCount = 0;

			for (const game of games) {
				// Step 2: この試合がデータベースに既に存在するかチェック
				const existingMatchset = await prisma.matchset.findFirst({
					where: { gameCreation: game.gameCreation },
				});
				if (!existingMatchset) {
					// Step 3: まだ保存されていない試合について、詳細情報を取得

					const gameDetails = await fetchGame(game.gameId.toString());

					const newMatchSet = await prisma.matchset.create({
						data: {
							gameCreation: game.gameCreation,
							gameDuration: gameDetails.gameDuration,
							gameId: game.gameId,
							gameMode: gameDetails.gameMode,
							gameType: gameDetails.gameType,
							game: JSON.stringify(gameDetails),
						},
					});

					// Step 4: 試合詳細をデータベースに保存
					// await insertMatchset(guildId, gameDetails);
					processedCount++;
				}
			}

			return { processed: processedCount, message: "Sync completed" };
		} catch (e) {
			console.error("Error syncing LoL match history:", e);
		}
	});
	ipcMain.handle("request-lol-match-history", async (event, arg) => {
		const port = lolStore.get("port", "");
		const token = lolStore.get("token", "");

		// https://127.0.0.1:{{port}}/lol-match-history/v1/products/lol/current-summoner/matches

		if (port && token) {
			try {
				const response = await axios.get(
					`https://127.0.0.1:${port}/lol-match-history/v1/products/lol/current-summoner/matches`,
					{
						headers: {
							Accept: "application/json",
							Authorization: `Basic ${token}`,
						},
						httpsAgent: new https.Agent({
							rejectUnauthorized: false, // 自己署名証明書の場合
						}),
					},
				);
				console.log(response.data);
				return response.data;
			} catch (error) {
				console.error("Error fetching LoL match history:", error);
				event.sender.send("lol-match-history-response", {
					error: error.message,
				});
			}
		} else {
			console.error("port & token not set");
		}
	});

	ipcMain.handle("request-game", async (event, gameId: string) => {
		const port = lolStore.get("port", "");
		const token = lolStore.get("token", "");

		// https://127.0.0.1:{{port}}/lol-match-history/v1/games/{gameId}
		if (port && token) {
			try {
				const response = await axios.get(
					`https://127.0.0.1:${port}/lol-match-history/v1/games/${gameId}`,
					{
						headers: {
							Accept: "application/json",
							Authorization: `Basic ${token}`,
						},
						httpsAgent: new https.Agent({
							rejectUnauthorized: false, // 自己署名証明書の場合
						}),
					},
				);
				console.log(response.data);
				return response.data;
			} catch (error) {
				console.error("Error fetching LoL match history:", error);
				event.sender.send("lol-match-history-response", {
					error: error.message,
				});
			}
		} else {
			console.error("port & token not set");
		}
	});

	ipcMain.handle("fetch-matchsets", async (event, guildId: string) => {});
}

export function setupLcuHandlers() {
	setupMatchHistory();
}
