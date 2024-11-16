import { Request, Response } from "express";
import UserService from "../services/UserService";
import UserHelper from "../utils/UserHelper";
import { Prisma } from '@prisma/client';

class UserController {

  async create(req: Request, res: Response) {
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


  async index(req: Request, res: Response) {
    try {
      const users = await UserService.list();
      
      return res.status(201).json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserService.find(id);


      return res.status(201).json(user);
    } catch (e) {
      return res.status(400).json(null);
    }
  }


  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['Id não enviado.'] });
      }

      const userExists = await UserService.find(id);
      if (!userExists) {
        return res.status(400).json({ errors: ['Usuário não existe.'] });
      }

      const user = await UserHelper.prepareUserData(req.body);

      const validationErrors = await UserHelper.validateUserData(user);
      if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
      }

      const userUpdated = await UserService.update(user, id);
      return res.status(201).json({ userUpdated });
    } catch (e: any) {
      return UserController.handleError(e, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['Id não enviado.'] });
      }

      const userExists = await UserService.find(id);

      if (!userExists) {
        return res.status(400).json({ errors: ['Usuário não existe.'] });
      }

      const user = await UserService.delete(id);


      return res.status(201).json({ userDeleted: user});
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
