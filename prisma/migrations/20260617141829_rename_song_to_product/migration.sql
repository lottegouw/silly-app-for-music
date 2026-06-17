ALTER TABLE "Song"
RENAME TO "Product";

-- AlterTable
ALTER TABLE "Product" RENAME CONSTRAINT "Song_pkey" TO "Product_pkey";

-- RenameIndex
ALTER INDEX "Song_title_artist_key" RENAME TO "Product_title_artist_key";
