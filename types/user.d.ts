import type { DiscordAccount } from "./discord";
import type { RiotAccount } from "./lol";

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
