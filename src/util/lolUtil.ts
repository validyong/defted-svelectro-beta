import type { ChampionData } from "$/types/lolTypes";
import type { Summoner } from "$/types/user.type";
import type { Summoner as DBSummoner } from "@svelectro/types";

export const regions = [
	"br1",
	"eun1",
	"euw1",
	"jp1",
	"kr",
	"la1",
	"la2",
	"na1",
	"oc1",
	"ph2",
	"ru",
	"sg2",
	"th2",
	"tr1",
	"tw2",
	"vn2",
];

export const displayRegion = {
	br1: "BR",
	eun1: "EUN",
	euw1: "EUW",
	jp1: "JP",
	kr: "KR",
	la1: "LA1",
	la2: "LA2",
	na1: "NA1",
	oc1: "OC",
	ph2: "PH",
	ru: "RU",
	sg2: "SG",
	th2: "TH",
	tr1: "TR",
	tw2: "TW",
	vn2: "VN",
};

export type AbstractRegion = "AMERICAS" | "ASIA" | "ESPORTS" | "EUROPE";
export type Region =
	| "br1"
	| "eun1"
	| "euw1"
	| "jp1"
	| "kr"
	| "la1"
	| "la2"
	| "na1"
	| "oc1"
	| "ph2"
	| "ru"
	| "sg2"
	| "th2"
	| "tr1"
	| "tw2"
	| "vn2";

export const regionToAbstractRegion: { [key in Region]?: AbstractRegion } = {
	br1: "AMERICAS",
	la1: "AMERICAS",
	la2: "AMERICAS",
	na1: "AMERICAS",
	jp1: "ASIA",
	kr: "ASIA",
	tw2: "ASIA",
	vn2: "ASIA",
	eun1: "EUROPE",
	euw1: "EUROPE",
	ru: "EUROPE",
	tr1: "EUROPE",
	oc1: "AMERICAS",
	ph2: "ASIA",
	sg2: "ASIA",
	th2: "ASIA",
};
const D_DRAGON_BASE_URL = "https://ddragon.leagueoflegends.com";

export const getProfileIconUrl = (version: string, profileIconId: number) => {
	return `${D_DRAGON_BASE_URL}/cdn/${version}/img/profileicon/${profileIconId}.png`;
};

export const getChampIconUrl = (version: string, champName: string) => {
	return `${D_DRAGON_BASE_URL}/cdn/${version}/img/champion/${champName}.png`;
};

export function formatPoints(points: number): string {
	if (points >= 1e6) {
		return `${(points / 1e6).toFixed(2)}m`;
	}
	if (points >= 1e3) {
		return `${(points / 1e3).toFixed(1)}k`;
	}
	return points.toString();
}

export function format3DigPoints(points: number): string {
	if (points >= 1e6) {
		return `${(points / 1e6).toPrecision(3)}m`;
	}
	if (points >= 1e3) {
		return `${(points / 1e3).toPrecision(3)}k`;
	}
	// 1000未満の場合は、そのまま有効数字3桁で表示
	return points.toPrecision(3);
}

export type ChampionTag =
	| "Fighter"
	| "Tank"
	| "Mage"
	| "Assassin"
	| "Marksman"
	| "Support";

interface RoleIcon {
	[key: string]: string;
}

const roleIcons: RoleIcon = {
	Fighter: "fas fa-fist-raised",
	Tank: "fas fa-shield-alt",
	Mage: "fas fa-hat-wizard",
	Assassin: "fas fa-user-secret",
	Support: "fas fa-hands-helping",
	Marksman: "fas fa-crosshairs",
};

export const championRoles = (championData: ChampionData) => {
	return Object.values(championData.data).reduce(
		(acc, champion) => {
			acc[champion.key] = champion.tags; // `key`はチャンピオンID、`tags`はロールの配列
			return acc;
		},
		{} as Record<string, ChampionTag[]>,
	);
};

export const getMasteryPointsByRoles = (
	summoner: DBSummoner,
	championData: ChampionData,
) => {
	return summoner.masteries.reduce(
		(acc, mastery) => {
			const roles = championRoles(championData)[mastery.championId.toString()]; // チャンピオンIDに対応するロールを取得
			if (roles) {
				for (const role of roles) {
					if (!acc[role]) acc[role] = 0;
					acc[role] += mastery.championPoints; // ロールごとにマスタリーポイントを加算
				}
			}
			return acc;
		},
		{} as Record<ChampionTag, number>,
	);
};

export type MPRoles = Record<ChampionTag, number>;

export const calculateRoleMasteryTotals = (
	summoners: DBSummoner[],
	championData: ChampionData,
): MPRoles => {
	const roleTotals: Record<string, number> = {};

	for (const summoner of summoners) {
		for (const mastery of summoner.masteries) {
			const championKey = String(mastery.championId); // ChampionMasteryからchampionIdを取得
			const champion = Object.values(championData.data).find(
				(champ) => champ.key === championKey,
			);
			if (champion) {
				for (const tag of champion.tags) {
					if (!roleTotals[tag]) roleTotals[tag] = 0;
					roleTotals[tag] += mastery.championPoints; // ロール別にマスタリーポイントを加算
				}
			}
		}
	}

	return roleTotals as MPRoles;
};
type IconDefinition = [prefix: string, iconName: string];
type IconsRoles = Record<ChampionTag, IconDefinition>;

export const iconsByRole: IconsRoles = {
	Fighter: ["fas", "hand-fist"],
	Tank: ["fas", "shield-halved"],
	Mage: ["fas", "hat-wizard"],
	Assassin: ["fas", "bolt"],
	Marksman: ["fas", "gun"],
	Support: ["fas", "hands-holding-child"],
};
