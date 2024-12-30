import { Response } from "express";
import { RequestWithData } from "../interfaces/RequestWithData";
import User from '../models/User'
import UserService from "../services/UserService";
import UserHelper from "../utils/UserHelper";
import { Prisma } from '@prisma/client';

class UserController {

  async create(req: RequestWithData, res: Response) {
    try {
      const user = await UserHelper.prepareUserData(req.body);

      const validationErrors = await UserHelper.validateUserData(user);
      if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
      }

      const newUser = await UserService.create(user);
      return res.status(201).json({ newUser });
    } catch (e: any) {
      return UserController.handleError(e, res);
    }
  }

  // TODO: Remover na versão final essa função e sua rota respectiva
  async index(req: RequestWithData, res: Response) {
    try {
      const users = await UserService.list();

      return res.status(201).json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async showById(req: RequestWithData, res: Response) {
    const { userId } = req.params;

    try {
      const user = await UserService.find(userId);
      if (!user) {
        return res.status(404).json({ error: ['Usuário não encontrado pelo ID.'] });
      }

      const { id, name, email } = user;

      return res.json({ id, name, email });
    } catch (error) {
      return res.status(500).json({ error: ['Erro ao buscar usuário.'] });
    }
  }

  async showByEmail(req: RequestWithData, res: Response) {
    const { email } = req.params;

    try {
      const user = await UserService.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: ['Usuário não encontrado pelo email.'] });
      }

      const { name } = user as User;

      return res.json({ name, email });
    } catch (error) {
      return res.status(500).json({ error: ['Erro ao buscar usuário.'] });
    }
  }

  async update(req: RequestWithData, res: Response) {
    try {
      const userId = req.userId || '';

      if (!userId) {
        return res.status(400).json({ errors: ['Id não enviado.'] });
      }

      const userExists = await UserService.find(userId);
      if (!userExists) {
        return res.status(400).json({ errors: ['Usuário não existe.'] });
      }

      const user = await UserHelper.prepareUserData(req.body);

      const validationErrors = await UserHelper.validateUserData(user);
      if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
      }

      const userUp = await UserService.update(user, userId);

      return res.status(201).json({ userUpdated: { name: userUp?.name, email: userUp?.email } });

    } catch (e: any) {
      return UserController.handleError(e, res);
    }
  }

  async delete(req: RequestWithData, res: Response) {
    try {
      const userId = req.userId || '';

      if (!userId) {
        return res.status(400).json({ errors: ['Id não enviado.'] });
      }

      const userExists = await UserService.find(userId);

      if (!userExists) {
        return res.status(400).json({ errors: ['Usuário não existe.'] });
      }

      const user = await UserService.delete(userId);


      return res.status(201).json({ userDeleted: { name: user?.name, email: user?.email } });
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  static handleError(e: any, res: Response) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(400).json({ errors: `O  ${e.meta?.target} já existe na base de dados. ` });
      }
      return res.status(400).json({ errors: `Erro do Prisma: ${e.message}` });
    }

    if (e instanceof Error) {
      return res.status(400).json({ errors: e.message });
    }

    return res.status(500).json({ errors: "Ocorreu um erro inesperado." });
  }

}

export default new UserController();
