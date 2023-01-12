/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Inbox` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Today` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Inbox` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Today` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Inbox" DROP CONSTRAINT "Inbox_userId_fkey";

-- DropForeignKey
ALTER TABLE "Today" DROP CONSTRAINT "Today_userId_fkey";

-- AlterTable
ALTER TABLE "Inbox" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Today" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Inbox_userId_key" ON "Inbox"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Today_userId_key" ON "Today"("userId");

-- AddForeignKey
ALTER TABLE "Inbox" ADD CONSTRAINT "Inbox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Today" ADD CONSTRAINT "Today_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
