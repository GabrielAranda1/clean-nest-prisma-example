-- CreateTable
CREATE TABLE "People" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "People_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "clientTypeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Locals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Locals_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
