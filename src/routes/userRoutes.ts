import { Router } from 'express';
import userController from '../controllers/UserController';

const userRoutes: Router = Router();

userRoutes.post('/', userController.create)

export { userRoutes };
