/*
  Warnings:

  - Added the required column `type` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "type" "PostType" NOT NULL;
