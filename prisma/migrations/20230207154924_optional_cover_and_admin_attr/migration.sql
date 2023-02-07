/*
  Warnings:

  - Added the required column `admin` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "cover" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "admin" BOOLEAN NOT NULL;
