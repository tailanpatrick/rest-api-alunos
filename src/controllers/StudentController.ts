import { Request, Response } from "express";
import StudentService from "../services/StudentService";

class StudentController {

  async index(req: Request, res: Response) {
    const students = await StudentService.list();
    
    res.json(students)
  }

}

export default new  StudentController();
