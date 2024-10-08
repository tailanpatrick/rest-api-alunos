import { Request, Response } from "express";
import { prismaClient } from '../db/PrismaClient';
import { validate } from "class-validator";
import User from "../models/User";

class UserController {
  async create(req: Request, res: Response) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const errors = await validate(user);

    if (errors.length > 0) {
      const validationErrors = errors.map(err => ({
        property: err.property,
        constraints: err.constraints,
      }));
      return res.status(400).json({ errors: validationErrors });
    }

    try {
      await user.hashPassword();

      const newUser = await prismaClient.user.create({
        data: {
          name: user.name,
          email: user.email,
          password_hash: user.password_hash,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      });

      return res.status(201).json({ newUser });
    } catch (e: any) {
      if (e.code === 'P2002') {
        return res.status(400).json({ errors: `O campo ${e.meta.target} deve ser único` });
      }

      if (e instanceof Error) {
        return res.status(400).json({ errors: e.message });
      }

      return res.status(400).json('Ocorreu um erro inesperado');
    }
  }
}

export default new UserController();
