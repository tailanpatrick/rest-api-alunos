import { Student } from "@prisma/client";
import { prismaClient } from "../db/PrismaClient";

class UserService {

  static async create(studentCreated: Student) {

    const student = await prismaClient.student.create({
      data: {
        name: studentCreated.name,
        surname: studentCreated.surname,
        email: studentCreated.email,
        age: studentCreated.age,
        weight: studentCreated.weight,
        height: studentCreated.height,
      },
    });

    if (!student) {
      return null;
    }


    return student;
  }

  static async find(id: string): Promise<Student | null> {
    const student = await prismaClient.student.findUnique({
      where: {
        id
      }
    });

    if (!student) {
      return null;
    }
    

    return student;
  }

  static async findByEmail(email: string) {
    const student = await prismaClient.student.findUnique({
      where: {
        email
      }
    });

    if (!student) {
      return null;
    }

    return student;
  }

  static async list(): Promise<Student[]> {
    const students = await prismaClient.student.findMany() as Student[];

    return students;
  }

  static async update(studentEdited: Student, id: string) {

    const student = await prismaClient.student.update({
      data: {
        name: studentEdited.name,
        surname: studentEdited.surname,
        email: studentEdited.email,
        age: studentEdited.age,
        weight: studentEdited.weight,
        height: studentEdited.height,
      },
      where: {
        id: id
      }
    });

    return student;
  }

  static async delete(id: string): Promise<Student | null> {
    const student = await prismaClient.student.delete({
      where: {
        id: id
      }
    }) as Student;

    return student;
  }

}

export default UserService;
