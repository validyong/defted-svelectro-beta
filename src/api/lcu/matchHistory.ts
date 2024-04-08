import axios from "axios";
import https from "node:https";
import { lolStore } from "../../store/lolStore";
import type { Game, MatchHistory } from "$/types/lolTypes";

const localhost = "https://127.0.0.1";

export async function fetchLolMatches(): Promise<MatchHistory> {
	const port = lolStore.get("port", "");
	const token = lolStore.get("token", "");
	const res = await axios.get(
		`${localhost}:${port}/lol-match-history/v1/products/lol/current-summoner/matches`,
		{
			headers: {
				Accept: "application/json",
				Authorization: `Basic ${token}`,
			},
			httpsAgent: new https.Agent({
				rejectUnauthorized: false,
			}),
		},
	);
	return res.data;
}

export async function fetchGame(gameId: string): Promise<Game> {
	const port = lolStore.get("port", "");
	const token = lolStore.get("token", "");
	const res = await axios.get(
		`${localhost}:${port}/lol-match-history/v1/games/${gameId}`,
		{
			headers: {
				Accept: "application/json",
				Authorization: `Basic ${token}`,
			},
			httpsAgent: new https.Agent({
				rejectUnauthorized: false,
			}),
		},
	);

	return res.data;
}
