import Store from "electron-store";

interface StoreSchema {
	port: string;
	token: string;
}

export const lolStore = new Store<StoreSchema>({
	defaults: {
		port: "",
		token: "",
	},
});
