/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Sessions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MemesTypes" AS ENUM ('image', 'link');

-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Memes" (
    "id" UUID NOT NULL,
    "type" "MemesTypes" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link" TEXT NOT NULL,

    CONSTRAINT "Memes_pkey" PRIMARY KEY ("id")
);
