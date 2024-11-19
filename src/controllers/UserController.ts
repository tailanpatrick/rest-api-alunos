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

  async showById(req: Request, res: Response) {
    const { id } = req.params; // Extrai o id dos parâmetros da rota

    try {
      const user = await UserService.find(id);
      if (!user) {
        return res.status(404).json({ error: ['Usuário não encontrado pelo ID.'] });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: ['Erro ao buscar usuário.'] });
    }
  }

  async showByEmail(req: Request, res: Response) {
    const { email } = req.params; // Extrai o email dos parâmetros da rota

    try {
      const user = await UserService.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: ['Usuário não encontrado pelo email.'] });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: ['Erro ao buscar usuário.'] });
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


      return res.status(201).json({ userDeleted: user });
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
