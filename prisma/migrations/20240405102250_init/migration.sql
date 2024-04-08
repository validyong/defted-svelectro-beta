/*
  Warnings:

  - You are about to drop the column `game` on the `Matchset` table. All the data in the column will be lost.
  - Added the required column `matchsetId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matchsetId" INTEGER NOT NULL,
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
    "seasonId" INTEGER NOT NULL,
    CONSTRAINT "Game_matchsetId_fkey" FOREIGN KEY ("matchsetId") REFERENCES "Matchset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("endOfGameResult", "gameCreation", "gameCreationDate", "gameDuration", "gameId", "gameMode", "gameType", "gameVersion", "id", "mapId", "platformId", "queueId", "seasonId") SELECT "endOfGameResult", "gameCreation", "gameCreationDate", "gameDuration", "gameId", "gameMode", "gameType", "gameVersion", "id", "mapId", "platformId", "queueId", "seasonId" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_matchsetId_key" ON "Game"("matchsetId");
CREATE TABLE "new_Matchset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "gameCreation" INTEGER NOT NULL,
    "guildId" TEXT NOT NULL
);
INSERT INTO "new_Matchset" ("gameCreation", "gameId", "guildId", "id") SELECT "gameCreation", "gameId", "guildId", "id" FROM "Matchset";
DROP TABLE "Matchset";
ALTER TABLE "new_Matchset" RENAME TO "Matchset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
