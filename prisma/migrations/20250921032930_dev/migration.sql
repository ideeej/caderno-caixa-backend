-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CashRegisters" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "initialAmount" INTEGER NOT NULL,
    "closingAmount" INTEGER,
    "isOpen" BOOLEAN NOT NULL,

    CONSTRAINT "CashRegisters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sales" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cashRegisterId" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "items" JSONB[],
    "state" TEXT NOT NULL,
    "customer" JSONB,
    "payments" JSONB[],

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."CashRegisters" ADD CONSTRAINT "CashRegisters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sales" ADD CONSTRAINT "Sales_cashRegisterId_fkey" FOREIGN KEY ("cashRegisterId") REFERENCES "public"."CashRegisters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
