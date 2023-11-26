-- CreateTable
CREATE TABLE "WorkTime" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkTime_day_key" ON "WorkTime"("day");
