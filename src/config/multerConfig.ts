<<<<<<< HEAD
import multer from 'multer';

// Configuração do multer para armazenar os arquivos no buffer
const storage = multer.memoryStorage(); // Usando a memória, ao invés de um diretório

const multerConfig = {
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB (ajuste conforme necessário)
  },
  fileFilter: (req:any, file:any, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos permitidos
    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new Error('Tipo de arquivo não permitido.'));
    }
  }
};

export default multerConfig;
=======
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
>>>>>>> 6fb0a4b6c9402367fc7e62a3ecf299c33d6d8508
