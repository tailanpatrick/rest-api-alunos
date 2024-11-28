import { Router } from 'express';
import studentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const studentRoutes: Router = Router();

studentRoutes.get('/', loginRequired, studentController.index)
studentRoutes.post('/', loginRequired, studentController.create)
studentRoutes.put('/:id', loginRequired, studentController.update)
studentRoutes.get('/id/:id', loginRequired, studentController.showById)
studentRoutes.get('/email/:email', loginRequired, studentController.showByEmail)
studentRoutes.delete('/:id', loginRequired, studentController.delete)


export { studentRoutes };
