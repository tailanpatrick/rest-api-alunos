import { Request, Response } from "express";
import multer, { FileFilterCallback } from 'multer';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig).single('photo');

class PhotoController {

  async create(req: Request, res: Response) {
    return upload(req, res, ( err )=>{
      try {
        if (!req.file) {
          return res.status(400).json({
            errors: [err.field]
          })
        }
  
  
        return res.status(200).json({
          message: "Arquivo enviado com sucesso.",
          file: req.file
        })
      } catch (e) {
        return res.status(500).json({ error: "Erro ao processar o upload do arquivo." });
      }
    });
  }

}

export default new PhotoController();
