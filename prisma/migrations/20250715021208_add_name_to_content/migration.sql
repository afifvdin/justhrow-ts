/*
  Warnings:

  - Added the required column `name` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "name" TEXT NOT NULL;
