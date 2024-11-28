import { Request, Response } from "express";
import multer from "multer";
import multerConfig from "../config/multerConfig";
import Photo from "../models/Photo";
import PhotoService from "../services/PhotoService";

const upload = multer(multerConfig).single("photo");

class PhotoController {
  async create(req: Request, res: Response) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Erro ao fazer upload da foto." });
      }

      try {
        
        if (!req.file) {
          return res.status(400).json({ error: "Arquivo não encontrado no upload." });
        }

        const { originalname, filename } = req.file; 
        const { student_id } = req.body; 

        if (!student_id) {
          return res.status(400).json({ error: "student_id é obrigatório." });
        }

  
        const photo = new Photo("", originalname, filename);
        const photoCreated = await PhotoService.create(photo, student_id);

        if (!photoCreated) {
          return res.status(500).json({ error: "Erro ao criar registro da foto no banco de dados." });
        }

        return res.status(201).json({
          message: "Foto enviada e salva com sucesso.",
          photo: photoCreated,
        });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Erro ao processar a criação da foto." });
      }
    });
  }
}

export default new PhotoController();
