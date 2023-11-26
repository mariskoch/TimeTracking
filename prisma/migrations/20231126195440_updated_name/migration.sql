/*
  Warnings:

  - You are about to drop the `WorkTime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WorkTime";

-- CreateTable
CREATE TABLE "WorkTimeEntry" (
    "id" TEXT NOT NULL,
    "day" DATE NOT NULL,
    "start" TIME NOT NULL,
    "end" TIME NOT NULL,
    "pause" TIME NOT NULL,

    CONSTRAINT "WorkTimeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkTimeEntry_day_key" ON "WorkTimeEntry"("day");
