/*
  Warnings:

  - You are about to drop the `Ban` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipantIdentity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Timeline` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `game` to the `Matchset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Game_matchsetId_key";

-- DropIndex
DROP INDEX "Participant_timelineId_key";

-- DropIndex
DROP INDEX "Participant_statsId_key";

-- DropIndex
DROP INDEX "ParticipantIdentity_playerId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ban";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Game";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Participant";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ParticipantIdentity";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Player";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Stats";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Team";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Timeline";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Matchset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "gameCreation" INTEGER NOT NULL,
    "guildId" TEXT NOT NULL,
    "game" TEXT NOT NULL
);
INSERT INTO "new_Matchset" ("gameCreation", "gameId", "guildId", "id") SELECT "gameCreation", "gameId", "guildId", "id" FROM "Matchset";
DROP TABLE "Matchset";
ALTER TABLE "new_Matchset" RENAME TO "Matchset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
