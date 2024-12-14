/*
  Warnings:

  - You are about to drop the column `judfe0id` on the `Language` table. All the data in the column will be lost.
  - Added the required column `judfe0Id` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" DROP COLUMN "judfe0id",
ADD COLUMN     "judfe0Id" INTEGER NOT NULL;
