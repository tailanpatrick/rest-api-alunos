import { prismaClient } from "../db/PrismaClient";
import Photo from "../models/Photo";

class PhotoService {

    static async create(photo: Photo, studentId: string) {

        const photoCreated = await prismaClient.photo.create({
            data: {
                fileName: photo.fileName,
                originalName: photo.originalName,
                studentId: studentId
            },
        });

        if (!photoCreated) {
            return null;
        }


        return photoCreated;
    }

}

export default PhotoService;