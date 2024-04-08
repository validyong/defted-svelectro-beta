// src/store.ts
import Store from "electron-store";
import type { Guild } from "@svelectro/types";

interface StoreSchema {
	jwtToken: string;
	signinType: string;
	selectedGuild: Guild | null;
	tokenExpiresAt: string;
	refreshToken: string;
}

export const generalStore = new Store<StoreSchema>({
	defaults: {
		jwtToken: "",
		signinType: "",
		selectedGuild: null,
		tokenExpiresAt: "",
		refreshToken: "",
	},
});
