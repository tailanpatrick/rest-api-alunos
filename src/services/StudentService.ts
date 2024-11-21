import { Student } from "@prisma/client";
import { prismaClient } from "../db/PrismaClient";
import User from "../models/User";

class UserService {

  

  static async list(): Promise<Student[]> {
    const users = await prismaClient.student.findMany() as Student[];

    return users;
  }


}

export default UserService;
