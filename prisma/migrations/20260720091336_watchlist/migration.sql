/*
  Warnings:

  - You are about to drop the column `mediaType` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `Watchlist` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `title` to the `Watchlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_userId_fkey";

-- AlterTable
ALTER TABLE "Watchlist" DROP COLUMN "mediaType",
DROP COLUMN "notes",
ADD COLUMN     "backdrop" TEXT,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "poster" TEXT,
ADD COLUMN     "releaseDate" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PLANNED',
ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
