/*
  Warnings:

  - Added the required column `filePath` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `photos` ADD COLUMN `filePath` VARCHAR(191) NOT NULL;
