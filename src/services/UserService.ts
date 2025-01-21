import { prismaClient } from "../db/PrismaClient";
import User from "../models/User";

class UserService {

  static async create(userCreated: User) {

    const prismaUser = await prismaClient.user.create({
      data: {
        name: userCreated.name,
        password_hash: userCreated.password_hash,
        email: userCreated.email
      }
    });

    if (!prismaUser) {
      return null;
    }

    const user = User.fromPrisma(prismaUser);

    const {id,  password_hash, createdAt, updatedAt, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  static async list(): Promise<User[]> {
    const users = await prismaClient.user.findMany() as User[];

    return users;
  }

  static async find(id: string): Promise<User | null> {
    const prismaUser = await prismaClient.user.findUnique({
      where: {
        id
      }
    });

    if (!prismaUser) {
      return null;
    }

    const user = User.fromPrisma(prismaUser);


    return user;
  }

  static async findByEmail(email: string) {
    const prismaUser = await prismaClient.user.findUnique({
      where: {
        email
      }
    });

    if (!prismaUser) {
      return null;
    }

    const user = User.fromPrisma(prismaUser);

    return user;
  }

  static async update(userEdited: User, id: string) {

    const prismaUser = await prismaClient.user.update({
      data: {
        name: userEdited.name,
        password_hash: userEdited.password_hash ? userEdited.password_hash : undefined,
        email: userEdited.email
      },
      where: {
        id: id
      }
    });

    if (!prismaUser) {
      return null;
    }

    const user = User.fromPrisma(prismaUser);

    const { password_hash, createdAt, updatedAt, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  static async delete(id: string): Promise<User | null> {
    const user = await prismaClient.user.delete({
      where: {
        id: id
      }
    }) as User;

    return user;
  }

  static async checkEmailChange(id: string, email: string): Promise<User | null> {
    const prismaUser = await prismaClient.user.findUnique({
      where: {
        id, email
      }
    });

    if (!prismaUser) {
      return null;
    }

    const user = User.fromPrisma(prismaUser);


    return user;
  }

}



export default UserService;
