import { prismaClient } from "../db/PrismaClient";
import User from "../models/User";

class UserService {

  static async create(user: User){

    const newUser = await prismaClient.user.create({
      data : {
        name: user.name,
        password_hash: user.password_hash,
        email: user.email
      }
    });
    
    const {password_hash, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  static async list(){
    const users = await prismaClient.user.findMany();
    
    return users;
  }

  static async find(id: string ){
    const user = await prismaClient.user.findUnique({
      where: {
        id: id
      }
    })

    return user;
  }

  static async update(user: User, id: string){

    const newUser = await prismaClient.user.update({
      data : {
        name: user.name,
        password_hash: user.password_hash,
        email: user.email
      }, 
      where:{
        id: id
      }
    });
    
    const {password_hash, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  static async delete(id: string ){
    const user = await prismaClient.user.delete({
      where: {
        id: id
      }
    })

    return user;
  }
}

export default UserService;
