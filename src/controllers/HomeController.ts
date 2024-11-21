import { Request, Response } from "express";
import { prismaClient } from '../db/PrismaClient'

class HomeController {

  async index(req: Request, res: Response) {
    res.json('Index')
  }

}

export default new  HomeController();
