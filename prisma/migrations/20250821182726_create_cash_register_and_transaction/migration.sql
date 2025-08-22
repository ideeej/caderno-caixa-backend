-- CreateTable
CREATE TABLE "CashRegisters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "openedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" DATETIME,
    "initialAmount" INTEGER NOT NULL,
    "closingAmount" INTEGER,
    "isOpen" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cashRegisterId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transactions_cashRegisterId_fkey" FOREIGN KEY ("cashRegisterId") REFERENCES "CashRegisters" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
