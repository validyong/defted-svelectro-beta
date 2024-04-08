import { writable } from "svelte/store";
import type { Load } from "@sveltejs/kit";

export const count = writable(0);
export const matches = writable(false);
