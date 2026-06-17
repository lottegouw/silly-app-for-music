-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SINGLE', 'EP', 'LP');

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "productType" "ProductType" NOT NULL DEFAULT 'SINGLE';
