import { prismaClient } from "../db/PrismaClient";
import User from "../models/User";

class UserService {

  static async create(user: User){

    const newUser = await prismaClient.user.create({
      data : user
    });

    return newUser;
  }
}

export default UserService;
