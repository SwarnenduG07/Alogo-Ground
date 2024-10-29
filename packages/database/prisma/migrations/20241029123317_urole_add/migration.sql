/*
  Warnings:

  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastname" SET NOT NULL;
