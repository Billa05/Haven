/*
  Warnings:

  - You are about to drop the column `userId` on the `Vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailId,reportId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- DropIndex
DROP INDEX "Vote_userId_reportId_key";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "userId",
ADD COLUMN     "emailId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_emailId_reportId_key" ON "Vote"("emailId", "reportId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
