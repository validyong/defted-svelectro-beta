export interface User {
	id: number;
	puuid: string;
	discordAccount?: DiscordAccount;
	name: string;
	riotAccounts: RiotAccount[];
	bedtime?: Date;
	timeToWakeUp?: Date;
	visibility?: string;
	createdAt: Date;
	updatedAt: Date;
	post: Post[];
	writtenReviews: Review[];
	receivedReviews: Review[];
	userProfileMetrics?: UserProfileMetrics;
	socialLinks: SocialLink[];
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

export interface RiotAccount {
	puuid: string;
	gameName: string;
	tagLine: string;
	summoner?: Summoner;
	user?: User;
	userId?: number;
	region?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Summoner {
	id: string;
	accounId: string;
	puuid: string;
	name: string;
	profileIconId: number;
	revisionDate: bigint;
	summonerLevel: number;
	createdAt: Date;
	updatedAt: Date;
	riotAccount: RiotAccount;
	matches: Match[];
}

export interface Post {
	id: number;
	title: string;
	content: string;
	published: boolean;
}

export interface Review {
	id: number;
	comment: string;
	isPrivate: boolean;
	reviewerId: number;
	revieweeId: number;
}

export interface Match {
	id: number;
	matchId: string;
}

export interface UserProfileMetrics {
	id: number;
	userId: number;
}

export interface SocialLink {
	id: number;
	userId: number;
	url: string;
}
