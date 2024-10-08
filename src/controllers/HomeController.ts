import { Request, Response } from "express";
import { prismaClient } from '../db/PrismaClient'

class HomeController {

  async index(req: Request, res: Response) {
    // exemplo de criação de um registro com o Prisma
    const novoAluno = await prismaClient.student.create({
      data: {
        name: 'Maria',
        surname: 'Miranda',
        email: 'maria@gmail.com',
        height: 1.65,
        weight: 57,
        age: 27
      }
    });

    res.status(200).json({
      novoAluno
    });
  }

}

export default new  HomeController();
