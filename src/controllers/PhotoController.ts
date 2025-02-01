import { Request, Response } from "express";
import { supabase } from '../config/supabase';
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Photo from "../models/Photo";
import PhotoService from "../services/PhotoService";

const upload = multer(multerConfig).single('photo');

class PhotoController {
  async create(req: Request, res: Response) {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ errors: ["Erro ao fazer upload da foto."] });
      }

      try {
        if (!req.file) {
          return res.status(400).json({ errors: ["Arquivo não encontrado no upload."] });
        }

        const { originalname, buffer, mimetype } = req.file;
        const { student_id } = req.body;

        if (!student_id) {
          return res.status(400).json({ errors: ["student_id é obrigatório."] });
        }
        const filePath = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${originalname.split('.').pop()}`;

        const { data, error } = await supabase.storage
          .from('imagens')
          .upload(filePath, buffer, {
            contentType: mimetype,
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error(error);
          return res.status(500).json({ errors: ["Erro ao fazer upload da imagem para o Supabase."] });
        }


        const { data: signedData, error: signedError } = await supabase.storage
          .from('imagens')
          .createSignedUrl(filePath, 31536000);

        if (signedError) {
          console.error(signedError);
          return res.status(500).json({ errors: ["Erro ao gerar a URL assinada da imagem."] });
        }

        if (!signedData || !signedData.signedUrl) {
          return res.status(500).json({ errors: ["Não foi possível gerar a URL assinada da imagem."] });
        }

        const signedUrl = signedData.signedUrl;

        const photo = new Photo("", originalname, signedUrl, signedUrl);
        PhotoService.create(photo, student_id, signedUrl);

        return res.status(201).json({
          message: "Foto enviada e salva com sucesso.",
          photo: { signedUrl, originalname, filePath }
        });

      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: ["Erro ao processar a criação da foto."] });
      }
    });
  }

  async delete(req: Request, res: Response){
    const { photo_id } = req.params;

    if(!photo_id){
      return res.json({errors: ['Id de foto não enviado']});
    }

    const photoDeleted = await PhotoService.delete(photo_id);


    res.json({ photoDeleted });
  }
}

export default new PhotoController();
