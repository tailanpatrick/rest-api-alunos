import { NextFunction, Response } from "express";
import { RequestWithData } from "../interfaces/RequestWithData";
import jwt, { JwtPayload } from 'jsonwebtoken';

export default (req: RequestWithData, res: Response, next: NextFunction) => {
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

        req.userId = id;
        req.userEmail = email;

        return next();

    } catch (e) {
        return res.status(401).json({
            errors: ['Token expirado ou inválido.']
        })
    }
}

