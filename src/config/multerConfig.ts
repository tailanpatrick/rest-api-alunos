import multer, { FileFilterCallback, MulterError } from 'multer';
import { extname, resolve } from 'path';
import { Request } from 'express';

const random = () => Math.floor(Math.random() * 10000 * 10000)

const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'O arquivo precisa ser: JPEG, JPG, PNG ou GIF'));
    }
}

export default {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`)
        }
    }),
    fileFilter: imageFilter
}