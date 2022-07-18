-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Locals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "clientId" INTEGER,
    CONSTRAINT "Locals_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Locals" ("clientId", "createdAt", "createdBy", "id", "name", "updatedAt", "updatedBy") SELECT "clientId", "createdAt", "createdBy", "id", "name", "updatedAt", "updatedBy" FROM "Locals";
DROP TABLE "Locals";
ALTER TABLE "new_Locals" RENAME TO "Locals";
CREATE TABLE "new_People" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "clientId" INTEGER,
    CONSTRAINT "People_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_People" ("clientId", "createdAt", "createdBy", "documentNumber", "id", "name", "updatedAt", "updatedBy") SELECT "clientId", "createdAt", "createdBy", "documentNumber", "id", "name", "updatedAt", "updatedBy" FROM "People";
DROP TABLE "People";
ALTER TABLE "new_People" RENAME TO "People";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
