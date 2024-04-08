import axios from "axios";
import { app, session } from "electron";

export async function setAuthCookieAndCallApi(jwtAccessToken: string) {
	const apiUrl = app.isPackaged
		? process.env.VITE_DEV_API_BASE_URL
		: process.env.VITE_LOCAL_API_BASE_URL;

	console.log("isp;", app.isPackaged);
	const cookie = {
		url: apiUrl,
		name: "jwtAccessToken",
		value: jwtAccessToken,
		secure: app.isPackaged,
		httpOnly: true,
	};

	// JWTトークンをCookieにセット
	await session.defaultSession.cookies.set(cookie);

	// Cookieをセットした状態でAPIを呼び出す

	console.log("token, ", await session.defaultSession.cookies.get({}));
	const url = `${apiUrl}/api/auth/set-auth`;

	try {
		const response = await axios.get(url, {
			headers: {
				"X-From-Deftedsv": "true",
				Authorization: `Bearer ${jwtAccessToken}`,
			},
			withCredentials: true, // Cookieをリクエストに含める
		});

		return response.data;
	} catch (error) {
		console.error("API call failed", error);
		throw new Error("API call failed");
	}
}
