/*
  Warnings:

  - You are about to drop the column `quoteAuthor` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `quoteText` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "quoteAuthor",
DROP COLUMN "quoteText",
ADD COLUMN     "is_repost" BOOLEAN DEFAULT false,
ADD COLUMN     "original_id" TEXT,
ADD COLUMN     "original_user_id" TEXT,
ADD COLUMN     "quote_author" TEXT,
ADD COLUMN     "quote_text" TEXT;
