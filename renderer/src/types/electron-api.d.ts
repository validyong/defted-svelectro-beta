import type { DeftedAuth } from "./deftedTypes";
import type { Game, LoLAuthRes, MatchHistory } from "./lolTypes";
import type { Guild } from "@svelectro/types";

declare global {
	interface Window {
		electronAPI: {
			getCookies: (url: string) => Promise<Electron.Cookie[]>;
			openExternal: (url: string) => Promise<void>;
			getIsPackaged: () => Promise<boolean>;
			onProtocolData: (data: ProtocolData) => Promise<Electron.IpcRenderer>;
			getCustomProtocolData: (
				data: ProtocolData,
			) => Promise<Electron.IpcRenderer>;

			getAuthData: () => Promise<DeftedAuth>;
			refreshLoLAuth: () => Promise<LoLAuthRes>;
			requestLolMatchHistory: () => Promise<MatchHistory>;
			requestLolMatch: (gameId: string) => Promise<Game>;
			setGuild: (guild: Guild) => Promise<void>;
			fetchGuild: () => Promise<Guild>;
		};
	}
}

export type DummyType = undefined;
