/*
  Warnings:

  - You are about to drop the column `judfe0Id` on the `Language` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[judge0Id]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `judge0Id` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" DROP COLUMN "judfe0Id",
ADD COLUMN     "judge0Id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Language_judge0Id_key" ON "Language"("judge0Id");
