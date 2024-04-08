import { generalStore } from "$/store/generalStore";
import { ipcMain } from "electron";
import type { Guild } from "@svelectro/types";

export function setupDiscordHandlers() {
	ipcMain.handle("set-guild", (event, guild: Guild) => {
		generalStore.set("selectedGuild", guild);
	});

	ipcMain.handle("fetch-guild", (event, guild: Guild) => {
		generalStore.get("selectedGuild");
	});
}
