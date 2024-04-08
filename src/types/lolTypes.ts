export interface MatchHistory {
	accountId: number;
	games: Games;
	platformId: string;
}

export interface Matchset {
	id: number;
	gameId: number;
	gameCreation: number;
	guildId: string;
	game: Game;
}

export interface Games {
	gameBeginDate: string;
	gameCount: number;
	gameEndDate: string;
	gameIndexBegin: number;
	gameIndexEnd: number;
	games: Game[];
}

export interface Game {
	endOfGameResult: string;
	gameCreation: number;
	gameCreationDate: string;
	gameDuration: number;
	gameId: number;
	gameMode: string;
	gameType: string;
	gameVersion: string;
	mapId: number;
	participantIdentities: ParticipantIdentity[];
	participants: Participant[];
	platformId: string;
	queueId: number;
	seasonId: number;
	teams: Team[];
}

export interface ParticipantIdentity {
	participantId: number;
	player: Player;
}

export interface Player {
	accountId: number;
	currentAccountId: number;
	currentPlatformId: string;
	gameName: string;
	matchHistoryUri: string;
	platformId: string;
	profileIcon: number;
	puuid: string;
	summonerId: number;
	summonerName: string;
	tagLine: string;
}

export interface Participant {
	championId: number;
	highestAchievedSeasonTier: string;
	participantId: number;
	spell1Id: number;
	spell2Id: number;
	stats: Stats;
	teamId: number;
	timeline: Timeline;
}

export interface Stats {
	assists: number;
	causedEarlySurrender: boolean;
	champLevel: number;
	combatPlayerScore: number;
	damageDealtToObjectives: number;
	damageDealtToTurrets: number;
	damageSelfMitigated: number;
	deaths: number;
	doubleKills: number;
	earlySurrenderAccomplice: boolean;
	firstBloodAssist: boolean;
	firstBloodKill: boolean;
	firstInhibitorAssist: boolean;
	firstInhibitorKill: boolean;
	firstTowerAssist: boolean;
	firstTowerKill: boolean;
	gameEndedInEarlySurrender: boolean;
	gameEndedInSurrender: boolean;
	goldEarned: number;
	goldSpent: number;
	inhibitorKills: number;
	item0: number;
	item1: number;
	item2: number;
	item3: number;
	item4: number;
	item5: number;
	item6: number;
	killingSprees: number;
	kills: number;
	largestCriticalStrike: number;
	largestKillingSpree: number;
	largestMultiKill: number;
	longestTimeSpentLiving: number;
	magicDamageDealt: number;
	magicDamageDealtToChampions: number;
	magicalDamageTaken: number;
	neutralMinionsKilled: number;
	neutralMinionsKilledEnemyJungle: number;
	neutralMinionsKilledTeamJungle: number;
	objectivePlayerScore: number;
	participantId: number;
	pentaKills: number;
	perk0: number;
	perk0Var1: number;
	perk0Var2: number;
	perk0Var3: number;
	perk1: number;
	perk1Var1: number;
	perk1Var2: number;
	perk1Var3: number;
	perk2: number;
	perk2Var1: number;
	perk2Var2: number;
	perk2Var3: number;
	perk3: number;
	perk3Var1: number;
	perk3Var2: number;
	perk3Var3: number;
	perk4: number;
	perk4Var1: number;
	perk4Var2: number;
	perk4Var3: number;
	perk5: number;
	perk5Var1: number;
	perk5Var2: number;
	perk5Var3: number;
	perkPrimaryStyle: number;
	perkSubStyle: number;
	physicalDamageDealt: number;
	physicalDamageDealtToChampions: number;
	physicalDamageTaken: number;
	playerAugment1: number;
	playerAugment2: number;
	playerAugment3: number;
	playerAugment4: number;
	playerScore0: number;
	playerScore1: number;
	playerScore2: number;
	playerScore3: number;
	playerScore4: number;
	playerScore5: number;
	playerScore6: number;
	playerScore7: number;
	playerScore8: number;
	playerScore9: number;
	playerSubteamId: number;
	quadraKills: number;
	sightWardsBoughtInGame: number;
	subteamPlacement: number;
	teamEarlySurrendered: boolean;
	timeCCingOthers: number;
	totalDamageDealt: number;
	totalDamageDealtToChampions: number;
	totalDamageTaken: number;
	totalHeal: number;
	totalMinionsKilled: number;
	totalPlayerScore: number;
	totalScoreRank: number;
	totalTimeCrowdControlDealt: number;
	totalUnitsHealed: number;
	tripleKills: number;
	trueDamageDealt: number;
	trueDamageDealtToChampions: number;
	trueDamageTaken: number;
	turretKills: number;
	unrealKills: number;
	visionScore: number;
	visionWardsBoughtInGame: number;
	wardsKilled: number;
	wardsPlaced: number;
	win: boolean;
}

export interface Timeline {
	creepsPerMinDeltas: object;
	csDiffPerMinDeltas: object;
	damageTakenDiffPerMinDeltas: object;
	damageTakenPerMinDeltas: object;
	goldPerMinDeltas: object;
	lane: string;
	participantId: number;
	role: string;
	xpDiffPerMinDeltas: object;
	xpPerMinDeltas: object;
}

export interface Team {
	bans: [];
	baronKills: number;
	dominionVictoryScore: number;
	dragonKills: number;
	firstBaron: boolean;
	firstBlood: boolean;
	firstDargon: boolean;
	firstInhibitor: boolean;
	firstTower: boolean;
	hordeKills: number;
	inhibitorKills: number;
	riftHeraldKills: number;
	teamId: number;
	towerKills: number;
	vilemawKills: number;
	win: string;
}

export interface ChampionData {
	type: string;
	format: string;
	version: string;
	data: {
		[key: string]: {
			id: string;
			key: string;
			name: string;
			title: string;
			blurb: string;
			info: {
				attack: number;
				defense: number;
				magic: number;
				difficulty: number;
			};
			image: object;
			tags: [];
			partype: string;
			stats: string;
		};
	};
}

export interface SummonerAllInfo {
	account: Account;
	summoner?: Summoner;
	championMasteries: ChampionMastery[];
	leagueEntries: LeagueEntry[];
	masteryByRole?: Record<string, number>;
}

export interface Account {
	puuid: string;
	gameName: string;
	tagLine: string;
}
export interface Summoner {
	id: string;
	accountId: string;
	puuid: string;
	name: string;
	profileIconId: number;
	revisionDate: bigint;
	summonerLevel: number;
}

export interface ChampionMastery {
	puuid: string;
	championId: number;
	championLevel: number;
	championPoints: number;
	lastPlayTime: number;
	championPointsSinceLastLevel: number;
	championPointsUntilNextLevel: number;
	chestGranted: boolean;
	tokensEarned: number;
	summonerId: string;
}

export interface LeagueEntry {
	leagueId: string;
	summonerId: string; //	Player's encrypted summonerId.
	summonerName: string;
	queueType: string;
	tier: string;
	rank: string; //	The player's division within a tier.
	leaguePoints: number;
	wins: number; //	Winning team on Summoners Rift.
	losses: number; // Losing team on Summoners Rift.
	hotStreak: boolean | null;
	veteran: boolean | null;
	freshBlood: boolean;
	inactive: boolean;
	miniSeries: MiniSeries | null;
}

export interface MiniSeries {
	losses: number;
	progress: string;
	target: number;
	wins: number;
}

export type ChampionTag =
	| "Fighter"
	| "Tank"
	| "Mage"
	| "Assassin"
	| "Support"
	| "Marksman";
