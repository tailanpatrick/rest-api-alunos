import { Student } from "@prisma/client";
import { prismaClient } from "../db/PrismaClient";
import { StudentWithoutTimestamps } from "../models/Student";
import Photo from "../models/Photo";
import appConfig from "../config/appConfig";


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

  static async find(id: string) {
    const student = await prismaClient.student.findUnique({
      where: {
        id
      },
      include: {
        photo: {
          select: {
            id: true,
            fileName: true,
            originalName: true,
            studentId: true,
            filePath: true,
          },
        },
      },
    });

    if (!student) {
      return null;
    }
    const { createdAt, updatedAt, ...filteredStudent } = student
    return filteredStudent;
  }

  static async findByEmail(email: string) {
    const student = await prismaClient.student.findUnique({
      where: {
        email
      },
      include: {
        photo: {
          select: {
            id: true,
            fileName: true,
            originalName: true,
            studentId: true,
            filePath: true,
          },
        },
      },
    });

    if (!student) {
      return null;
    }
    const { createdAt, updatedAt, ...filteredStudent } = student
    return filteredStudent;
  }
  static async list(): Promise<StudentWithoutTimestamps[]> {
    const students = await prismaClient.student.findMany({
      include: {
        photo: {
          select: {
            id: true,
            fileName: true,
            originalName: true,
            studentId: true,
            filePath:true
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  
    return students.map(student => {
      const { createdAt, updatedAt, photo, ...filteredStudent } = student;
      return {
        ...filteredStudent,
        photo: photo
          ? {
              id: photo.id,
              originalName: photo.originalName,
              fileName: photo.fileName,
              filePath: `${appConfig.url}/images/${photo.fileName}`,
            }
          : undefined,
      };
    });
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
