-- DropForeignKey
ALTER TABLE `photos` DROP FOREIGN KEY `photos_studentId_fkey`;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
