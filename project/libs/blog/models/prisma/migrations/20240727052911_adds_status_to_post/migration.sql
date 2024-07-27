-- CreateEnum
CREATE TYPE "PostStatusType" AS ENUM ('draft', 'published');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "status" "PostStatusType" NOT NULL DEFAULT 'published';
