-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'FOLLOWERS', 'PRIVATE');

-- CreateEnum
CREATE TYPE "MessagePrivacy" AS ENUM ('EVERYONE', 'FOLLOWERS', 'FOLLOWING', 'MUTUALS', 'NOBODY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activityVisibility" "Visibility" NOT NULL DEFAULT 'FOLLOWERS',
ADD COLUMN     "allowMessages" "MessagePrivacy" NOT NULL DEFAULT 'FOLLOWERS',
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "favoritesVisibility" "Visibility" NOT NULL DEFAULT 'FOLLOWERS',
ADD COLUMN     "reviewsVisibility" "Visibility" NOT NULL DEFAULT 'FOLLOWERS',
ADD COLUMN     "watchlistVisibility" "Visibility" NOT NULL DEFAULT 'FOLLOWERS';

-- CreateTable
CREATE TABLE "FavoriteMovie" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "poster" TEXT,
    "backdrop" TEXT,
    "overview" TEXT,
    "releaseDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteMovie_userId_tmdbId_key" ON "FavoriteMovie"("userId", "tmdbId");

-- AddForeignKey
ALTER TABLE "FavoriteMovie" ADD CONSTRAINT "FavoriteMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
