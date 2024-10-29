/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "userRole" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "DefaultCode" (
    "id" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "problemId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DefaultCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestPoints" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "ContestPoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DefaultCode_problemId_languageId_key" ON "DefaultCode"("problemId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "ContestPoints_contestId_userId_key" ON "ContestPoints"("contestId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "DefaultCode" ADD CONSTRAINT "DefaultCode_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultCode" ADD CONSTRAINT "DefaultCode_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestPoints" ADD CONSTRAINT "ContestPoints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
