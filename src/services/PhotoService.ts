import { prismaClient } from "../db/PrismaClient";
import Photo from "../models/Photo";

class PhotoService {

    static async create(photo: Photo, studentId: string, signedUrl: string) {

        const photoCreatedOrUpdated = await prismaClient.photo.upsert({
            where: { studentId },
            create: {
                fileName: photo.fileName,
                originalName: photo.originalName,
                studentId,
                filePath: signedUrl,
            },
            update: {
                fileName: photo.fileName,
                originalName: photo.originalName,
                filePath: signedUrl,
            },

        });

        if (!photoCreatedOrUpdated) {
            return null;
        }

        return photoCreatedOrUpdated;
    }

    static async delete(photoId: string){
      const photoDeleted = await prismaClient.photo.delete({
        where: { id : photoId }
      });

      return photoDeleted;
    }

}

export default PhotoService;
