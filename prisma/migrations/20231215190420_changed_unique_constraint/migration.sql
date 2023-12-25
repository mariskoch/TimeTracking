/*
  Warnings:

  - A unique constraint covering the columns `[day,userId]` on the table `WorkTimeEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WorkTimeEntry_day_key";

-- CreateIndex
CREATE UNIQUE INDEX "WorkTimeEntry_day_userId_key" ON "WorkTimeEntry"("day", "userId");
