/*
  Warnings:

  - Added the required column `raca` to the `PetShops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PetShops" ADD COLUMN     "raca" TEXT NOT NULL;
