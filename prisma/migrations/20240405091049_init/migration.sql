-- CreateTable
CREATE TABLE "Matchset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "gameCreation" INTEGER NOT NULL,
    "guildId" TEXT NOT NULL,
    "game" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endOfGameResult" TEXT NOT NULL,
    "gameCreation" INTEGER NOT NULL,
    "gameCreationDate" TEXT NOT NULL,
    "gameDuration" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "gameMode" TEXT NOT NULL,
    "gameType" TEXT NOT NULL,
    "gameVersion" TEXT NOT NULL,
    "mapId" INTEGER NOT NULL,
    "platformId" TEXT NOT NULL,
    "queueId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ParticipantIdentity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "ParticipantIdentity_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ParticipantIdentity_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountId" INTEGER NOT NULL,
    "currentAccountId" INTEGER NOT NULL,
    "currentPlatformId" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "matchHistoryUri" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "profileIcon" INTEGER NOT NULL,
    "puuid" TEXT NOT NULL,
    "summonerId" INTEGER NOT NULL,
    "summonerName" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "championId" INTEGER NOT NULL,
    "highestAchievedSeasonTier" TEXT NOT NULL,
    "participantId" INTEGER NOT NULL,
    "spell1Id" INTEGER NOT NULL,
    "spell2Id" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "statsId" INTEGER NOT NULL,
    "timelineId" INTEGER NOT NULL,
    CONSTRAINT "Participant_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participant_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participant_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "Timeline" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assists" INTEGER NOT NULL,
    "causedEarlySurrender" BOOLEAN NOT NULL,
    "champLevel" INTEGER NOT NULL,
    "combatPlayerScore" INTEGER NOT NULL,
    "damageDealtToStringives" INTEGER NOT NULL,
    "damageDealtToTurrets" INTEGER NOT NULL,
    "damageSelfMitigated" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "doubleKills" INTEGER NOT NULL,
    "earlySurrenderAccomplice" BOOLEAN NOT NULL,
    "firstBloodAssist" BOOLEAN NOT NULL,
    "firstBloodKill" BOOLEAN NOT NULL,
    "firstInhibitorAssist" BOOLEAN NOT NULL,
    "firstInhibitorKill" BOOLEAN NOT NULL,
    "firstTowerAssist" BOOLEAN NOT NULL,
    "firstTowerKill" BOOLEAN NOT NULL,
    "gameEndedInEarlySurrender" BOOLEAN NOT NULL,
    "gameEndedInSurrender" BOOLEAN NOT NULL,
    "goldEarned" INTEGER NOT NULL,
    "goldSpent" INTEGER NOT NULL,
    "inhibitorKills" INTEGER NOT NULL,
    "item0" INTEGER NOT NULL,
    "item1" INTEGER NOT NULL,
    "item2" INTEGER NOT NULL,
    "item3" INTEGER NOT NULL,
    "item4" INTEGER NOT NULL,
    "item5" INTEGER NOT NULL,
    "item6" INTEGER NOT NULL,
    "killingSprees" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "largestCriticalStrike" INTEGER NOT NULL,
    "largestKillingSpree" INTEGER NOT NULL,
    "largestMultiKill" INTEGER NOT NULL,
    "longestTimeSpentLiving" INTEGER NOT NULL,
    "magicDamageDealt" INTEGER NOT NULL,
    "magicDamageDealtToChampions" INTEGER NOT NULL,
    "magicalDamageTaken" INTEGER NOT NULL,
    "neutralMinionsKilled" INTEGER NOT NULL,
    "neutralMinionsKilledEnemyJungle" INTEGER NOT NULL,
    "neutralMinionsKilledTeamJungle" INTEGER NOT NULL,
    "StringivePlayerScore" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "pentaKills" INTEGER NOT NULL,
    "perk0" INTEGER NOT NULL,
    "perk0Var1" INTEGER NOT NULL,
    "perk0Var2" INTEGER NOT NULL,
    "perk0Var3" INTEGER NOT NULL,
    "perk1" INTEGER NOT NULL,
    "perk1Var1" INTEGER NOT NULL,
    "perk1Var2" INTEGER NOT NULL,
    "perk1Var3" INTEGER NOT NULL,
    "perk2" INTEGER NOT NULL,
    "perk2Var1" INTEGER NOT NULL,
    "perk2Var2" INTEGER NOT NULL,
    "perk2Var3" INTEGER NOT NULL,
    "perk3" INTEGER NOT NULL,
    "perk3Var1" INTEGER NOT NULL,
    "perk3Var2" INTEGER NOT NULL,
    "perk3Var3" INTEGER NOT NULL,
    "perk4" INTEGER NOT NULL,
    "perk4Var1" INTEGER NOT NULL,
    "perk4Var2" INTEGER NOT NULL,
    "perk4Var3" INTEGER NOT NULL,
    "perk5" INTEGER NOT NULL,
    "perk5Var1" INTEGER NOT NULL,
    "perk5Var2" INTEGER NOT NULL,
    "perk5Var3" INTEGER NOT NULL,
    "perkPrimaryStyle" INTEGER NOT NULL,
    "perkSubStyle" INTEGER NOT NULL,
    "physicalDamageDealt" INTEGER NOT NULL,
    "physicalDamageDealtToChampions" INTEGER NOT NULL,
    "physicalDamageTaken" INTEGER NOT NULL,
    "playerAugment1" INTEGER NOT NULL,
    "playerAugment2" INTEGER NOT NULL,
    "playerAugment3" INTEGER NOT NULL,
    "playerAugment4" INTEGER NOT NULL,
    "playerScore0" INTEGER NOT NULL,
    "playerScore1" INTEGER NOT NULL,
    "playerScore2" INTEGER NOT NULL,
    "playerScore3" INTEGER NOT NULL,
    "playerScore4" INTEGER NOT NULL,
    "playerScore5" INTEGER NOT NULL,
    "playerScore6" INTEGER NOT NULL,
    "playerScore7" INTEGER NOT NULL,
    "playerScore8" INTEGER NOT NULL,
    "playerScore9" INTEGER NOT NULL,
    "playerSubteamId" INTEGER NOT NULL,
    "quadraKills" INTEGER NOT NULL,
    "sightWardsBoughtInGame" INTEGER NOT NULL,
    "subteamPlacement" INTEGER NOT NULL,
    "teamEarlySurrendered" BOOLEAN NOT NULL,
    "timeCCingOthers" INTEGER NOT NULL,
    "totalDamageDealt" INTEGER NOT NULL,
    "totalDamageDealtToChampions" INTEGER NOT NULL,
    "totalDamageTaken" INTEGER NOT NULL,
    "totalHeal" INTEGER NOT NULL,
    "totalMinionsKilled" INTEGER NOT NULL,
    "totalPlayerScore" INTEGER NOT NULL,
    "totalScoreRank" INTEGER NOT NULL,
    "totalTimeCrowdControlDealt" INTEGER NOT NULL,
    "totalUnitsHealed" INTEGER NOT NULL,
    "tripleKills" INTEGER NOT NULL,
    "trueDamageDealt" INTEGER NOT NULL,
    "trueDamageDealtToChampions" INTEGER NOT NULL,
    "trueDamageTaken" INTEGER NOT NULL,
    "turretKills" INTEGER NOT NULL,
    "unrealKills" INTEGER NOT NULL,
    "visionScore" INTEGER NOT NULL,
    "visionWardsBoughtInGame" INTEGER NOT NULL,
    "wardsKilled" INTEGER NOT NULL,
    "wardsPlaced" INTEGER NOT NULL,
    "win" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Timeline" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creepsPerMinDeltas" TEXT NOT NULL,
    "csDiffPerMinDeltas" TEXT NOT NULL,
    "damageTakenDiffPerMinDeltas" TEXT NOT NULL,
    "damageTakenPerMinDeltas" TEXT NOT NULL,
    "goldPerMinDeltas" TEXT NOT NULL,
    "lane" TEXT NOT NULL,
    "participantId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "xpDiffPerMinDeltas" TEXT NOT NULL,
    "xpPerMinDeltas" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "baronKills" INTEGER NOT NULL,
    "dominionVictoryScore" INTEGER NOT NULL,
    "dragonKills" INTEGER NOT NULL,
    "firstBaron" BOOLEAN NOT NULL,
    "firstBlood" BOOLEAN NOT NULL,
    "firstDargon" BOOLEAN NOT NULL,
    "firstInhibitor" BOOLEAN NOT NULL,
    "firstTower" BOOLEAN NOT NULL,
    "hordeKills" INTEGER NOT NULL,
    "inhibitorKills" INTEGER NOT NULL,
    "riftHeraldKills" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "towerKills" INTEGER NOT NULL,
    "vilemawKills" INTEGER NOT NULL,
    "win" TEXT NOT NULL,
    CONSTRAINT "Team_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ban" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" INTEGER NOT NULL,
    "championId" INTEGER NOT NULL,
    "pickTurn" INTEGER NOT NULL,
    CONSTRAINT "Ban_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantIdentity_playerId_key" ON "ParticipantIdentity"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_statsId_key" ON "Participant"("statsId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_timelineId_key" ON "Participant"("timelineId");
