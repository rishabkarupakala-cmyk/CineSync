/*
  Warnings:

  - A unique constraint covering the columns `[userId,tmdbId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,tmdbId]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_tmdbId_key" ON "Review"("userId", "tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_tmdbId_key" ON "Watchlist"("userId", "tmdbId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
