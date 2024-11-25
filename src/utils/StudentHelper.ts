import { validate } from 'class-validator';
import Student from '../models/Student';

class StudentHelper {
  static async validateStudentData(student: Student) {
    const errors = await validate(student);

    if (errors.length > 0) {
      return errors.map(err => ({
        property: err.property,
        constraints: err.constraints,
      }));
    }

    return null;
  }

  static async prepareStudentData(body: any) {
    const now = new Date();

    const student = new Student(
      '', 
      body.name,
      body.surname,
      body.email,
      body.age,
      body.weight,
      body.height,
      now, 
      now  
    );

    return student;
  }
}

export default StudentHelper;
