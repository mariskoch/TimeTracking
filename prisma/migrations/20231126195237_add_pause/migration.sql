/*
  Warnings:

  - Added the required column `pause` to the `WorkTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkTime" ADD COLUMN     "pause" TIME NOT NULL;
