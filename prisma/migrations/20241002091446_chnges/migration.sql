/*
  Warnings:

  - You are about to drop the column `content` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `author` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crimeType` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "content",
DROP COLUMN "locationId",
DROP COLUMN "mediaUrl",
DROP COLUMN "type",
DROP COLUMN "userId",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "crimeType" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
