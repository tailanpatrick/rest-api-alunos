import { prismaClient } from "../db/PrismaClient";
import Photo from "../models/Photo";

class PhotoService {

    static async create(photo: Photo, studentId: string) {

        const photoCreatedorUpdated = await prismaClient.photo.upsert({
            where: {studentId},
            create: {
                fileName: photo.fileName,
                originalName: photo.originalName,
                studentId,
                filePath:photo.filePath
            },
            update: {
                fileName: photo.fileName,
                originalName: photo.originalName,
                filePath: photo.filePath
            },
        });

        if (!photoCreatedorUpdated) {
            return null;
        }


        return photoCreatedorUpdated;
    }

}

export default PhotoService;