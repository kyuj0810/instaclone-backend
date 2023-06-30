/*
  Warnings:

  - You are about to drop the column `biod` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "biod",
ADD COLUMN     "bio" TEXT;
