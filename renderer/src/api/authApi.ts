import axios from "axios";
import { writable, get } from "svelte/store";
import Cookies from "js-cookie";

import { isPackaged } from "../store/generalStore";
const apiUrl = get(isPackaged)
	? import.meta.env.VITE_DEV_API_BASE_URL
	: import.meta.env.VITE_LOCAL_API_BASE_URL;

export async function initJwtToken() {
	const res = await axios.post(`${apiUrl}/api/auth/refresh`, {
		withCredentials: true,
	});

	const { jwtAccessToken } = res.data;

	Cookies.set("jwtAccessToken", jwtAccessToken);
}
