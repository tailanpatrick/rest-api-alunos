import { Request, Response } from "express";
import StudentService from "../services/StudentService";
import StudentHelper from "../utils/StudentHelper";
import { Prisma } from "@prisma/client";

class StudentController {
  static handleError(e: any, res: Response) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({
          errors: `O campo ${e.meta?.target} já existe na base de dados.`,
        });
      }
      return res.status(400).json({ errors: `Erro do Prisma: ${e.message}` });
    }

    if (e instanceof Error) {
      return res.status(400).json({ errors: e.message });
    }

    return res.status(500).json({ errors: "Ocorreu um erro inesperado." });
  }

  async index(req: Request, res: Response) {
    try {
      const students = await StudentService.list();
      res.json(students);
    } catch (e) {
      return StudentController.handleError(e, res);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const student = await StudentHelper.prepareStudentData(req.body);

      const validationErrors = await StudentHelper.validateStudentData(student);
      if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
      }

      const newStudent = await StudentService.create(student);
      return res.json(newStudent);
    } catch (e) {
      return StudentController.handleError(e, res);
    }
  }

  async showById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["Id não enviado"] });
      }

      const student = await StudentService.find(id);
      if (!student) {
        return res.status(400).json({ errors: ["Aluno não existe"] });
      }

      return res.json(student);
    } catch (e) {
      return StudentController.handleError(e, res);
    }
  }

  async showByEmail(req: Request, res: Response) {
    try {
  
      const { email } = req.params;

      if (!email) {
        return res.status(400).json({ errors: ["Email não enviado"] });
      }

      const student = await StudentService.findByEmail(email);
      if (!student) {
        return res.status(400).json({ errors: ["Aluno não existe"] });
      }

      return res.json(student);
    } catch (e) {
      return StudentController.handleError(e, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["Id não enviado"] });
      }

      const student = await StudentService.find(id);
      if (!student) {
        return res.status(400).json({ errors: ["Aluno não existe"] });
      }

      const studentEdited = await StudentHelper.prepareStudentData(req.body);

      const updatedStudent = await StudentService.update(studentEdited, id);
      return res.json(updatedStudent);
    } catch (e) {
      return StudentController.handleError(e, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["Id não enviado"] });
      }

      const student = await StudentService.find(id);
      if (!student) {
        return res.status(400).json({ errors: ["Aluno não existe"] });
      }

      const studentDeleted = await StudentService.delete(id);
      return res.json({ studentDeleted });
    } catch (e) {
      return StudentController.handleError(e, res);
    }
  }
}

export default new StudentController();
