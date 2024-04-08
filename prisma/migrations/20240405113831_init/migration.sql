/*
  Warnings:

  - Added the required column `updatedAt` to the `Matchset` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Matchset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "gameCreation" INTEGER NOT NULL,
    "guildId" TEXT,
    "game" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Matchset" ("game", "gameCreation", "gameId", "guildId", "id") SELECT "game", "gameCreation", "gameId", "guildId", "id" FROM "Matchset";
DROP TABLE "Matchset";
ALTER TABLE "new_Matchset" RENAME TO "Matchset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
