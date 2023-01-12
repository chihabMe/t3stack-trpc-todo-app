-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "inboxId" TEXT,
ADD COLUMN     "todayId" TEXT;

-- CreateTable
CREATE TABLE "Inbox" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Today" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Today_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inbox" ADD CONSTRAINT "Inbox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Today" ADD CONSTRAINT "Today_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_inboxId_fkey" FOREIGN KEY ("inboxId") REFERENCES "Inbox"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todayId_fkey" FOREIGN KEY ("todayId") REFERENCES "Today"("id") ON DELETE SET NULL ON UPDATE CASCADE;
