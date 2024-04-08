import type {
	Match,
	Post,
	Review,
	SocialLink,
	User,
	UserProfileMetrics,
} from "./user";
import type { ChampionMastery, LeagueEntry, Region } from "./lol";

export interface Guild {
	id: string;
	name: string;
	icon: string;
	owner: boolean;
	permissions: number;
	permissions_new: string;
	features: string[];
	guildProfile?: GuildProfile;
}

export interface GuildProfile {
	id: string;
	region?: string;
	guildId: string;
	description?: string;
	welcomeMessage?: string;
	customFields?: object;
}

export interface GuildMember {
	guildId: string;
	discordAccountId: string;
	avatar?: string;
	nick?: string;
	//   roles: JsonValue // `roles`がJSON型で保存される場合、適切なJSON型を指定
	joinedAt?: Date;
	guild: Guild;
	discordAccount: DiscordAccount;
	createdAt: Date;
	updatedAt: Date;
}

export interface DiscordAccount {
	id: string;
	username: string;
	accentColor?: number;
	avatarDecoration?: string;
	displayName?: string;
	discriminator: string;
	avatar: string;
	banner: string;
	globalName?: string;
	user: User;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CustomGame {
	gameId: string;
	organizerId?: string;
	iconUrl?: string;
	name?: string;
	blue: GuildMember[];
	red: GuildMember[];
}

// `JsonValue`型は、JSONデータを受け入れる場合に使用します。
// TypeScript標準ではないため、適宜実装が必要ですが、ここでは例として簡易的に定義します。
export type JsonValue =
	| string
	| number
	| boolean
	| { [key: string]: JsonValue }
	| JsonValue[];
