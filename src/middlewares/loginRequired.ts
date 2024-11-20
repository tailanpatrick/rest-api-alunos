import { NextFunction, Response } from "express";
import { RequestWithData } from "../interfaces/RequestWithData";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User'
import UserService from "../services/UserService";

export default async (req: RequestWithData, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            errors: ['É necessário fazer login.']
        })
    }

    const [, token] = authorization.split(' ');
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    
    if (!TOKEN_SECRET) {
        return res.status(401).json({
            errors: ['Erro desconhecido.']
        })
    }
    
    try {
        const data = jwt.verify(token, TOKEN_SECRET);

        const { id, email } = data as JwtPayload;

        const user = await UserService.checkEmailChange(id, email);

        if(!user) {
            return res.status(401).json({
                errors: ['Usuário não está logado, ele pode ter sido apagado ou seu email alterado.']
            })
        }

        req.userId = id;
        req.userEmail = email;

        return next();

    } catch (e) {
        return res.status(401).json({
            errors: ['Token expirado ou inválido.']
        })
    }
}

