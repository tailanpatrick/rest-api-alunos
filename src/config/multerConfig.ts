import multer, { FileFilterCallback, MulterError } from 'multer';
import { extname, resolve } from 'path';
import { Request } from 'express';
import fs from 'fs';

const random = () => Math.random().toString(36).substring(2, 8);

const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'O arquivo precisa ser: JPEG, JPG, PNG ou GIF'));
  }
}

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = resolve(__dirname, '..', '..', 'uploads', 'images');

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    }
  }),
  fileFilter: imageFilter,
};
