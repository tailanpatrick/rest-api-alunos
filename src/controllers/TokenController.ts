import { Request, Response } from "express";
import UserService from "../services/UserService";
import jwt from 'jsonwebtoken';

class TokenController {
  async create(req: Request, res: Response) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais ausentes.']
      });
    }

    const user = await UserService.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        errors: ['Email não cadastrado..']
      });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        errors: ['Senha incorreta.']
      });
    }

    const { id } = user;
    
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;

    if (!TOKEN_SECRET) {
      return res.status(500).json({
        errors: ['Erro interno: chave secreta do token não definida.']
      });
    }

 
    const token = jwt.sign({ id, email }, TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRATION
    });

    return res.json({ token });
  }
}

export default new TokenController();
