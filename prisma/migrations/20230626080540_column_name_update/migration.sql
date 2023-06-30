/*
  Warnings:

  - You are about to drop the column `bioa` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bioa",
ADD COLUMN     "bio" TEXT;
