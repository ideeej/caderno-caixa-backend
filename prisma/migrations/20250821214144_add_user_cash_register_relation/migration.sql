/*
  Warnings:

  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `CashRegisters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `userId` to the `CashRegisters` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Transactions";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CashRegisters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "openedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" DATETIME,
    "initialAmount" INTEGER NOT NULL,
    "closingAmount" INTEGER,
    "isOpen" BOOLEAN NOT NULL,
    CONSTRAINT "CashRegisters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CashRegisters" ("closedAt", "closingAmount", "id", "initialAmount", "isOpen", "openedAt") SELECT "closedAt", "closingAmount", "id", "initialAmount", "isOpen", "openedAt" FROM "CashRegisters";
DROP TABLE "CashRegisters";
ALTER TABLE "new_CashRegisters" RENAME TO "CashRegisters";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
