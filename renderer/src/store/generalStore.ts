import { writable } from "svelte/store";
import type { Load } from "@sveltejs/kit";
import type { Guild, GuildMember } from "@defted-svelectro/types";

export const count = writable(0);
export const isPackaged = writable(false);
export const deftedGuilds = writable([] as Guild[]);
export const myDeftedGuilds = writable([] as Guild[]);
export const selectedGuild = writable(null as Guild | null);
export const selectedGuildMembers = writable([] as GuildMember[]);
export const meAsGuildMember = writable(null as GuildMember | null);
export const isSignedin = writable(false);
