import type { Guild } from "@defted-svelectro/types";
import deftedApi from "./apiClient";

export async function fetchMyDeftedGuilds() {
	try {
		const res = await deftedApi.get<Guild[]>("api/defted/guilds/@me", {
			withCredentials: true,
		});
		return res.data;
	} catch (e) {
		console.error("Failed to fetch defted error: ", e);
		throw e;
	}
}
