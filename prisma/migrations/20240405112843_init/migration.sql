-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Matchset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "gameCreation" INTEGER NOT NULL,
    "guildId" TEXT,
    "game" TEXT NOT NULL
);
INSERT INTO "new_Matchset" ("game", "gameCreation", "gameId", "guildId", "id") SELECT "game", "gameCreation", "gameId", "guildId", "id" FROM "Matchset";
DROP TABLE "Matchset";
ALTER TABLE "new_Matchset" RENAME TO "Matchset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
