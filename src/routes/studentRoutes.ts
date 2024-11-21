import { Router } from 'express';
import studentController from '../controllers/StudentController';

const studentRoutes: Router = Router();
 studentRoutes.get('/', studentController.index)

export { studentRoutes };
