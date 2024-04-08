import axios, {
	type AxiosError,
	type AxiosResponse,
	type AxiosRequestConfig,
} from "axios";
import { writable, get } from "svelte/store";
import Cookies from "js-cookie";

import { isPackaged } from "../store/generalStore";
import { initJwtToken } from "./authApi";
const apiUrl = get(isPackaged)
	? import.meta.env.VITE_DEV_API_BASE_URL
	: import.meta.env.VITE_LOCAL_API_BASE_URL;

// カスタムのAxiosRequestConfig型を定義
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean;
}
// APIリクエスト用のAxiosインスタンスを作成
const deftedApi = axios.create({
	baseURL: apiUrl, // あなたのAPIのベースURL
	withCredentials: true, // クロスオリジンCookieをサポート
});

// レスポンスインターセプターを設定
deftedApi.interceptors.response.use(
	(response: AxiosResponse) => response, // 正常なレスポンスの場合はそのまま返す
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				await initJwtToken();
				return deftedApi(originalRequest);
			} catch (refreshError) {
				console.error("Token refresh failed", refreshError);
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default deftedApi;
